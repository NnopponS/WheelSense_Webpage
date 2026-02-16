import { getEditablePage } from '../content/editable-schema.ts';

const API_ENDPOINT = '/api/content';

function normalizeText(value) {
  if (value === null || value === undefined) return '';
  return String(value);
}

function setFieldValue(field, value, root = document) {
  if (field.type === 'virtual') {
    return;
  }

  if (!field.selector) {
    return;
  }

  const elements = root.querySelectorAll(field.selector);
  if (!elements.length) return;

  const normalized = normalizeText(value);

  elements.forEach((element) => {
    if (field.type === 'attr') {
      element.setAttribute(field.attr, normalized);
      return;
    }

    if (field.type === 'html') {
      element.innerHTML = normalized;
      return;
    }

    element.textContent = normalized;
  });
}

function getFieldValue(field, root = document) {
  if (field.type === 'virtual') {
    return normalizeText(field.defaultValue || '');
  }

  if (!field.selector) {
    return '';
  }

  const element = root.querySelector(field.selector);
  if (!element) return '';

  if (field.type === 'attr') {
    return element.getAttribute(field.attr) || '';
  }

  if (field.type === 'html') {
    return element.innerHTML || '';
  }

  return (element.textContent || '').trim();
}

function authHeaders(token) {
  if (!token) return {};
  return {
    'x-admin-token': token,
  };
}

async function parseResponse(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { error: text };
  }
}

export function extractPageContent(pageKey, root = document) {
  const page = getEditablePage(pageKey);
  if (!page) return {};

  const result = {};
  page.fields.forEach((field) => {
    result[field.id] = getFieldValue(field, root);
  });

  return result;
}

export function applyPageContent(pageKey, content = {}, root = document) {
  const page = getEditablePage(pageKey);
  if (!page) return;

  page.fields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(content, field.id)) {
      setFieldValue(field, content[field.id], root);
    }
  });
}

export async function fetchPageOverrides(pageKey, token = '') {
  const response = await fetch(`${API_ENDPOINT}?page=${encodeURIComponent(pageKey)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...authHeaders(token),
    },
  });

  if (!response.ok) {
    const payload = await parseResponse(response);
    const message = payload.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  const payload = await parseResponse(response);
  return payload.content && typeof payload.content === 'object' ? payload.content : {};
}

export async function verifyAdminToken(token) {
  if (!token) {
    throw new Error('Missing admin token.');
  }

  const response = await fetch(`${API_ENDPOINT}?verify=1`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...authHeaders(token),
    },
  });

  if (!response.ok) {
    const payload = await parseResponse(response);
    const message = payload.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return true;
}

export async function savePageOverrides(pageKey, content, token) {
  const response = await fetch(API_ENDPOINT, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify({ page: pageKey, content }),
  });

  if (!response.ok) {
    const payload = await parseResponse(response);
    const message = payload.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return parseResponse(response);
}

export async function deletePageOverrides(pageKey, token) {
  const response = await fetch(`${API_ENDPOINT}?page=${encodeURIComponent(pageKey)}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      ...authHeaders(token),
    },
  });

  if (!response.ok) {
    const payload = await parseResponse(response);
    const message = payload.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return parseResponse(response);
}

export async function applyPageOverrides(pageKey, root = document) {
  try {
    const overrides = await fetchPageOverrides(pageKey);
    applyPageContent(pageKey, overrides, root);
    return overrides;
  } catch {
    return {};
  }
}

