import { Redis } from '@upstash/redis';

const CONTENT_KEY = 'wheelsense:cms:content:v1';
let inMemoryStore = { pages: {} };
let redisClient;

function getRedisClient() {
  if (redisClient !== undefined) {
    return redisClient;
  }

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redisClient = Redis.fromEnv();
    return redisClient;
  }

  redisClient = null;
  return redisClient;
}

async function loadStore() {
  const redis = getRedisClient();

  if (!redis) {
    return inMemoryStore;
  }

  const store = await redis.get(CONTENT_KEY);
  if (!store || typeof store !== 'object') {
    return { pages: {} };
  }

  if (!store.pages || typeof store.pages !== 'object') {
    return { pages: {} };
  }

  return store;
}

async function saveStore(store) {
  const redis = getRedisClient();

  if (!redis) {
    inMemoryStore = store;
    return;
  }

  await redis.set(CONTENT_KEY, store);
}

function sendJson(res, statusCode, payload) {
  res.status(statusCode).json(payload);
}

function parseToken(req) {
  const headerToken = req.headers['x-admin-token'];
  if (typeof headerToken === 'string' && headerToken.trim()) {
    return headerToken.trim();
  }

  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  return '';
}

function requireAdminAuth(req, res) {
  const expected = process.env.ADMIN_MODE_TOKEN;
  if (!expected) {
    sendJson(res, 500, {
      error: 'ADMIN_MODE_TOKEN is not configured on the server.',
    });
    return false;
  }

  const provided = parseToken(req);
  if (!provided || provided !== expected) {
    sendJson(res, 401, {
      error: 'Unauthorized. Invalid admin token.',
    });
    return false;
  }

  return true;
}

function sanitizeContent(content) {
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return {};
  }

  const sanitized = {};
  Object.entries(content).forEach(([key, value]) => {
    if (!key || typeof key !== 'string') {
      return;
    }

    if (value === null || value === undefined) {
      sanitized[key] = '';
      return;
    }

    sanitized[key] = String(value);
  });

  return sanitized;
}

function getPageFromRequest(req) {
  const rawPage = req.query?.page;
  if (typeof rawPage !== 'string') {
    return '';
  }

  return rawPage.trim();
}

function isVerifyRequest(req) {
  const rawVerify = req.query?.verify;
  if (typeof rawVerify !== 'string') {
    return false;
  }

  const normalized = rawVerify.trim().toLowerCase();
  return normalized === '1' || normalized === 'true';
}

function parseJsonBody(req) {
  if (!req.body) {
    return { ok: true, value: {} };
  }

  if (typeof req.body === 'object') {
    return { ok: true, value: req.body };
  }

  if (typeof req.body !== 'string') {
    return { ok: false, error: 'Invalid request body format.' };
  }

  try {
    const value = JSON.parse(req.body || '{}');
    return { ok: true, value };
  } catch {
    return { ok: false, error: 'Invalid JSON payload.' };
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (isVerifyRequest(req)) {
      if (!requireAdminAuth(req, res)) return;

      sendJson(res, 200, {
        success: true,
        authenticated: true,
      });
      return;
    }

    const page = getPageFromRequest(req);
    const store = await loadStore();

    if (page) {
      const content = store.pages[page] && typeof store.pages[page] === 'object'
        ? store.pages[page]
        : {};

      sendJson(res, 200, {
        page,
        content,
      });
      return;
    }

    sendJson(res, 200, {
      pages: Object.keys(store.pages),
      content: store.pages,
    });
    return;
  }

  if (req.method === 'PUT') {
    if (!requireAdminAuth(req, res)) return;

    const parsed = parseJsonBody(req);
    if (!parsed.ok) {
      sendJson(res, 400, { error: parsed.error });
      return;
    }

    const body = parsed.value || {};

    const page = typeof body.page === 'string' ? body.page.trim() : '';
    if (!page) {
      sendJson(res, 400, { error: 'Missing required field: page' });
      return;
    }

    const content = sanitizeContent(body.content);
    const store = await loadStore();
    store.pages[page] = content;
    await saveStore(store);

    sendJson(res, 200, {
      success: true,
      page,
      content,
    });
    return;
  }

  if (req.method === 'DELETE') {
    if (!requireAdminAuth(req, res)) return;

    const page = getPageFromRequest(req);
    if (!page) {
      sendJson(res, 400, { error: 'Missing required query parameter: page' });
      return;
    }

    const store = await loadStore();
    delete store.pages[page];
    await saveStore(store);

    sendJson(res, 200, {
      success: true,
      page,
    });
    return;
  }

  sendJson(res, 405, { error: 'Method not allowed' });
}
