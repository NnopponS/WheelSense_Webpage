import { editablePages, getEditablePage } from '../content/editable-schema.js';
import {
  applyPageContent,
  deletePageOverrides,
  extractPageContent,
  fetchPageOverrides,
  savePageOverrides,
  verifyAdminToken,
} from '../components/page-content.js';

const TOKEN_STORAGE_KEY = 'wheelsense_admin_token';
let adminToken = '';
let currentPageKey = editablePages[0]?.key || '';

const authView = document.getElementById('authView');
const editorView = document.getElementById('editorView');
const tokenForm = document.getElementById('tokenForm');
const adminTokenInput = document.getElementById('adminToken');
const authStatus = document.getElementById('authStatus');

const pageSelector = document.getElementById('pageSelector');
const editorPageSubtitle = document.getElementById('editorPageSubtitle');
const fieldEditor = document.getElementById('fieldEditor');
const saveBtn = document.getElementById('saveBtn');
const resetPageBtn = document.getElementById('resetPageBtn');
const reloadPageBtn = document.getElementById('reloadPageBtn');
const openPageBtn = document.getElementById('openPageBtn');
const logoutBtn = document.getElementById('logoutBtn');
const adminStatus = document.getElementById('adminStatus');
const previewFrame = document.getElementById('pagePreview');
const previewUrl = document.getElementById('previewUrl');

function setAuthStatus(message, isError = false) {
  authStatus.textContent = message;
  authStatus.style.color = isError ? '#fca5a5' : 'var(--color-text-tertiary)';
}

function setAdminStatus(message, tone = 'default') {
  adminStatus.textContent = message;
  adminStatus.classList.remove('is-error', 'is-success');

  if (tone === 'error') {
    adminStatus.classList.add('is-error');
  }

  if (tone === 'success') {
    adminStatus.classList.add('is-success');
  }
}

function toggleViews(isEditorVisible) {
  authView.style.display = isEditorVisible ? 'none' : '';
  editorView.classList.toggle('is-visible', isEditorVisible);
}

function populatePageSelector() {
  pageSelector.innerHTML = editablePages
    .map((page) => `<option value="${page.key}">${page.title}</option>`)
    .join('');

  if (currentPageKey) {
    pageSelector.value = currentPageKey;
  }
}

function getPreviewDocument() {
  return previewFrame.contentDocument || previewFrame.contentWindow?.document || null;
}

function readCurrentFormValues() {
  const values = {};
  fieldEditor.querySelectorAll('[data-field-id]').forEach((input) => {
    values[input.dataset.fieldId] = input.value;
  });
  return values;
}

function updatePreviewFromForm() {
  const previewDocument = getPreviewDocument();
  if (!previewDocument) return;

  const values = readCurrentFormValues();
  applyPageContent(currentPageKey, values, previewDocument);
}

function renderFieldEditor(page, values) {
  fieldEditor.innerHTML = '';

  page.fields.forEach((field) => {
    const value = values[field.id] || '';
    const useTextarea = Boolean(field.multiline) || value.length > 120;

    const wrapper = document.createElement('div');
    wrapper.className = 'admin-field';

    const label = document.createElement('label');
    label.className = 'admin-field__label';
    label.textContent = field.label;
    label.setAttribute('for', `field_${field.id}`);

    const input = useTextarea ? document.createElement('textarea') : document.createElement('input');
    input.className = useTextarea ? 'admin-textarea' : 'admin-input';
    input.id = `field_${field.id}`;
    input.dataset.fieldId = field.id;

    if (!useTextarea) {
      input.type = 'text';
    } else {
      input.rows = Math.min(7, Math.max(3, Math.ceil(value.length / 90)));
    }

    input.value = value;
    input.addEventListener('input', () => {
      updatePreviewFromForm();
      setAdminStatus('Unsaved changes.', 'default');
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    fieldEditor.appendChild(wrapper);
  });
}

function loadPreviewPage(path) {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('Preview load timed out.'));
    }, 15000);

    const onLoad = () => {
      cleanup();
      resolve();
    };

    function cleanup() {
      window.clearTimeout(timeoutId);
      previewFrame.removeEventListener('load', onLoad);
    }

    previewFrame.addEventListener('load', onLoad);
    previewFrame.src = `${path}${path.includes('?') ? '&' : '?'}cms_preview=${Date.now()}`;
  });
}

async function loadPage(pageKey) {
  const page = getEditablePage(pageKey);
  if (!page) return;

  currentPageKey = page.key;
  pageSelector.value = page.key;
  editorPageSubtitle.textContent = `${page.title} (${page.path})`;
  previewUrl.textContent = page.path;

  setAdminStatus('Loading page fields...');
  await loadPreviewPage(page.path);

  const previewDocument = getPreviewDocument();
  if (!previewDocument) {
    setAdminStatus('Preview is unavailable.', 'error');
    return;
  }

  const baseValues = extractPageContent(page.key, previewDocument);
  let storedValues = {};

  try {
    storedValues = await fetchPageOverrides(page.key, adminToken);
  } catch (error) {
    setAdminStatus(`Failed to load saved content: ${error.message}`, 'error');
  }

  const mergedValues = { ...baseValues, ...storedValues };
  applyPageContent(page.key, mergedValues, previewDocument);
  renderFieldEditor(page, mergedValues);
  setAdminStatus('Page fields loaded.');
}

async function saveCurrentPage() {
  const page = getEditablePage(currentPageKey);
  if (!page) return;

  const values = readCurrentFormValues();
  setAdminStatus('Saving changes...');

  try {
    await savePageOverrides(page.key, values, adminToken);
    setAdminStatus('Changes saved successfully.', 'success');
  } catch (error) {
    setAdminStatus(`Save failed: ${error.message}`, 'error');
  }
}

async function resetCurrentPage() {
  const page = getEditablePage(currentPageKey);
  if (!page) return;

  const confirmed = window.confirm(`Reset all overrides for ${page.title}?`);
  if (!confirmed) return;

  setAdminStatus('Resetting page overrides...');

  try {
    await deletePageOverrides(page.key, adminToken);
    await loadPage(page.key);
    setAdminStatus('Page overrides reset.', 'success');
  } catch (error) {
    setAdminStatus(`Reset failed: ${error.message}`, 'error');
  }
}

function logout() {
  adminToken = '';
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  fieldEditor.innerHTML = '';
  previewFrame.src = 'about:blank';
  setAdminStatus('');
  setAuthStatus('');
  toggleViews(false);
}

async function startSession(token) {
  try {
    await verifyAdminToken(token);
  } catch (error) {
    throw new Error(error.message);
  }

  adminToken = token;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

  toggleViews(true);
  populatePageSelector();

  try {
    await loadPage(currentPageKey);
  } catch (error) {
    logout();
    setAuthStatus(`Authentication failed: ${error.message}`, true);
  }
}

async function bootstrap() {
  populatePageSelector();

  const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (savedToken) {
    adminTokenInput.value = savedToken;
    try {
      await startSession(savedToken);
    } catch {
      logout();
    }
  }
}

tokenForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = adminTokenInput.value.trim();

  if (!token) {
    setAuthStatus('Please enter an admin token.', true);
    return;
  }

  setAuthStatus('Authenticating...');
  try {
    await startSession(token);
    setAuthStatus('');
  } catch (error) {
    setAuthStatus(`Authentication failed: ${error.message}`, true);
  }
});

pageSelector.addEventListener('change', async () => {
  await loadPage(pageSelector.value);
});

reloadPageBtn.addEventListener('click', async () => {
  await loadPage(currentPageKey);
});

openPageBtn.addEventListener('click', () => {
  const page = getEditablePage(currentPageKey);
  if (!page) return;

  window.open(page.path, '_blank', 'noopener,noreferrer');
});

saveBtn.addEventListener('click', async () => {
  await saveCurrentPage();
});

resetPageBtn.addEventListener('click', async () => {
  await resetCurrentPage();
});

logoutBtn.addEventListener('click', () => {
  logout();
});

bootstrap();
