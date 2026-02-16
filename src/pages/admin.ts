import { editablePages, getEditablePage } from '../content/editable-schema.ts';
import {
  applyPageContent,
  deletePageOverrides,
  extractPageContent,
  fetchPageOverrides,
  savePageOverrides,
  verifyAdminToken,
} from '../components/page-content.ts';

const TOKEN_STORAGE_KEY = 'wheelsense_admin_token';

type EditableField = {
  id: string;
  label: string;
  type: string;
  selector?: string;
  attr?: string;
  multiline?: boolean;
  defaultValue?: string;
};

type EditablePage = {
  key: string;
  title: string;
  path: string;
  fields: EditableField[];
};

type FieldDescriptor = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'list' | 'number' | 'contributors';
  placeholder?: string;
};

type VirtualConfig = {
  title: string;
  description: string;
  itemLabel: string;
  titleKey: string;
  template: Record<string, any>;
  fields: FieldDescriptor[];
};

const pageHints: Record<string, string> = {
  team: 'Use Team Members builder to edit personal information and profile images without writing raw JSON.',
  awards: 'Use milestone/certificate/publication builders to manage rewards and supporting documents in card format.',
};

const virtualFieldConfigs: Record<string, VirtualConfig> = {
  'data.members': {
    title: 'Team Members Builder',
    description: 'Manage personal information cards and profile photos for each team member.',
    itemLabel: 'Member',
    titleKey: 'name',
    template: {
      id: '',
      name: '',
      thaiName: '',
      level: '',
      role: '',
      subtitle: '',
      bio: '',
      photo: '',
      gradient: 'linear-gradient(135deg, #1a1b2e, #0e1018)',
      focus: [],
      projects: [],
      education: [],
      details: [],
      cv: null,
    },
    fields: [
      { key: 'id', label: 'Member ID (for URL)', type: 'text', placeholder: 'worapon-sangsasri' },
      { key: 'name', label: 'Display Name', type: 'text' },
      { key: 'thaiName', label: 'Thai Name', type: 'text' },
      { key: 'level', label: 'Level', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'subtitle', label: 'Subtitle / Organization', type: 'text' },
      { key: 'bio', label: 'Biography', type: 'textarea' },
      { key: 'photo', label: 'Profile Image URL', type: 'text', placeholder: '/assets/Arard/Profile/Worapon_Profile.png' },
      { key: 'gradient', label: 'Gradient Fallback', type: 'text' },
      { key: 'focus', label: 'Focus Areas (one per line)', type: 'list' },
      { key: 'projects', label: 'Projects (one per line)', type: 'list' },
      { key: 'education', label: 'Education (one per line)', type: 'list' },
    ],
  },
  'data.verifiedMilestones': {
    title: 'Verified Milestones Builder',
    description: 'Each card can contain multiple images (auto-slide), event details, and source evidence.',
    itemLabel: 'Milestone',
    titleKey: 'title',
    template: {
      id: '',
      era: 'all-wheelchair',
      eraLabel: 'ALL Wheelchair',
      eraColor: 'era2',
      title: '',
      event: '',
      year: '',
      description: '',
      images: [],
      sourceLabel: 'Open Source',
      sourceFile: '/assets/docs/award-recognition.pdf',
    },
    fields: [
      { key: 'id', label: 'Milestone ID', type: 'text' },
      { key: 'title', label: 'Card Title', type: 'text' },
      { key: 'event', label: 'Event', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'era', label: 'Era Key', type: 'text', placeholder: 'yes-wheelchair | all-wheelchair | wheelsense' },
      { key: 'eraLabel', label: 'Era Label', type: 'text' },
      { key: 'eraColor', label: 'Era Color Key', type: 'text', placeholder: 'era1 | era2 | era4' },
      { key: 'images', label: 'Images (one URL per line)', type: 'list' },
      { key: 'sourceLabel', label: 'Source Label', type: 'text' },
      { key: 'sourceFile', label: 'Source File URL', type: 'text' },
    ],
  },
  'data.certificates': {
    title: 'Certificates Builder',
    description: 'Manage certificate cards and supporting document links.',
    itemLabel: 'Certificate',
    titleKey: 'title',
    template: {
      id: '',
      title: '',
      image: '/assets/Arard/verified-milestones/yes-wheelchair-kide-2023-triple-honors/images/image-01.jpg',
      file: '/assets/docs/award-recognition.pdf',
      pages: 1,
      year: '',
      description: '',
    },
    fields: [
      { key: 'id', label: 'Certificate ID', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'year', label: 'Year', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Preview Image URL', type: 'text' },
      { key: 'file', label: 'PDF File URL', type: 'text' },
      { key: 'pages', label: 'Page Count', type: 'number' },
    ],
  },
  'data.publications': {
    title: 'Publications and IP Builder',
    description: 'Manage research and intellectual property publication cards.',
    itemLabel: 'Publication',
    titleKey: 'title',
    template: {
      title: '',
      journal: '',
      description: '',
      icon: 'Research',
      link: '',
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'journal', label: 'Journal / Source', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'icon', label: 'Icon Label', type: 'text' },
      { key: 'link', label: 'URL', type: 'text' },
    ],
  },
};

let adminToken = '';
let currentPageKey = (editablePages[0] as EditablePage | undefined)?.key || '';

const authView = document.getElementById('authView');
const editorView = document.getElementById('editorView');
const tokenForm = document.getElementById('tokenForm');
const adminTokenInput = document.getElementById('adminToken') as HTMLInputElement | null;
const authStatus = document.getElementById('authStatus');

const pageSelector = document.getElementById('pageSelector') as HTMLSelectElement | null;
const fieldSearch = document.getElementById('fieldSearch') as HTMLInputElement | null;
const editorPageSubtitle = document.getElementById('editorPageSubtitle');
const editorHint = document.getElementById('editorHint');
const fieldEditor = document.getElementById('fieldEditor');
const saveBtn = document.getElementById('saveBtn');
const resetPageBtn = document.getElementById('resetPageBtn');
const reloadPageBtn = document.getElementById('reloadPageBtn');
const openPageBtn = document.getElementById('openPageBtn');
const logoutBtn = document.getElementById('logoutBtn');
const adminStatus = document.getElementById('adminStatus');
const previewFrame = document.getElementById('pagePreview') as HTMLIFrameElement | null;
const previewUrl = document.getElementById('previewUrl');

function setAuthStatus(message: string, isError = false): void {
  if (!authStatus) return;
  authStatus.textContent = message;
  (authStatus as HTMLElement).style.color = isError ? '#fca5a5' : 'var(--color-text-tertiary)';
}

function setAdminStatus(message: string, tone: 'default' | 'error' | 'success' = 'default'): void {
  if (!adminStatus) return;
  adminStatus.textContent = message;
  adminStatus.classList.remove('is-error', 'is-success');

  if (tone === 'error') {
    adminStatus.classList.add('is-error');
  }

  if (tone === 'success') {
    adminStatus.classList.add('is-success');
  }
}

function toggleViews(isEditorVisible: boolean): void {
  if (authView) {
    (authView as HTMLElement).style.display = isEditorVisible ? 'none' : '';
  }

  if (editorView) {
    editorView.classList.toggle('is-visible', isEditorVisible);
  }
}

function populatePageSelector(): void {
  if (!pageSelector) return;

  pageSelector.innerHTML = editablePages
    .map((page: EditablePage) => `<option value="${page.key}">${page.title}</option>`)
    .join('');

  if (currentPageKey) {
    pageSelector.value = currentPageKey;
  }
}

function getPreviewDocument(): Document | null {
  if (!previewFrame) return null;
  return previewFrame.contentDocument || previewFrame.contentWindow?.document || null;
}

function readCurrentFormValues(): Record<string, string> {
  const values: Record<string, string> = {};
  if (!fieldEditor) return values;

  fieldEditor.querySelectorAll<HTMLElement>('[data-field-id]').forEach((input) => {
    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
      values[input.dataset.fieldId || ''] = input.value;
    }
  });

  return values;
}

function updatePreviewFromForm(): void {
  const previewDocument = getPreviewDocument();
  if (!previewDocument) return;

  const values = readCurrentFormValues();
  applyPageContent(currentPageKey, values, previewDocument);
}

function normalizeListValue(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
    .filter(Boolean);
}

function parseContributorsText(raw: string): Array<{ name: string; profileImage: string }> {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, profileImage] = line.split('|').map((part) => part.trim());
      return {
        name: name || '',
        profileImage: profileImage || '',
      };
    })
    .filter((entry) => entry.name || entry.profileImage);
}

function formatContributorsValue(value: unknown): string {
  if (!Array.isArray(value)) return '';

  return value
    .map((entry: any) => `${entry?.name || ''} | ${entry?.profileImage || ''}`.trim())
    .filter((line: string) => line && line !== '|')
    .join('\n');
}

function parseVirtualArray(rawValue: string, fallbackValue = '[]'): any[] {
  const source = rawValue && rawValue.trim() ? rawValue : fallbackValue;

  try {
    const parsed = JSON.parse(source);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Use fallback array if parsing fails.
  }

  return [];
}

function buildDescriptorInput(descriptor: FieldDescriptor, item: Record<string, any>): HTMLInputElement | HTMLTextAreaElement {
  const isTextarea = descriptor.type === 'textarea' || descriptor.type === 'list' || descriptor.type === 'contributors';
  const input = isTextarea ? document.createElement('textarea') : document.createElement('input');

  input.className = isTextarea ? 'admin-textarea' : 'admin-input';
  input.setAttribute('data-descriptor-key', descriptor.key);

  if (input instanceof HTMLInputElement) {
    input.type = descriptor.type === 'number' ? 'number' : 'text';
  }

  if (descriptor.placeholder) {
    input.placeholder = descriptor.placeholder;
  }

  if (input instanceof HTMLTextAreaElement) {
    input.rows = descriptor.type === 'textarea' ? 3 : 4;
  }

  if (descriptor.type === 'list') {
    input.value = normalizeListValue(item[descriptor.key]).join('\n');
  } else if (descriptor.type === 'contributors') {
    input.value = formatContributorsValue(item[descriptor.key]);
  } else {
    input.value = item[descriptor.key] === undefined || item[descriptor.key] === null
      ? ''
      : String(item[descriptor.key]);
  }

  return input;
}

function createVirtualFieldEditor(field: EditableField, value: string, markDirty: () => void): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'admin-field admin-field--virtual';
  wrapper.dataset.searchText = `${field.label} ${field.id}`.toLowerCase();

  const config = virtualFieldConfigs[field.id];

  const label = document.createElement('p');
  label.className = 'admin-field__label';
  label.textContent = config ? config.title : field.label;
  wrapper.appendChild(label);

  const hint = document.createElement('p');
  hint.className = 'admin-field__hint';
  hint.textContent = config ? config.description : 'Edit JSON directly. This field expects an array.';
  wrapper.appendChild(hint);

  const hiddenJson = document.createElement('textarea');
  hiddenJson.className = 'admin-textarea admin-textarea--raw';
  hiddenJson.dataset.fieldId = field.id;
  hiddenJson.value = value || String(field.defaultValue || '[]');
  hiddenJson.rows = 10;

  if (!config) {
    wrapper.appendChild(hiddenJson);
    hiddenJson.addEventListener('input', () => {
      markDirty();
    });
    return wrapper;
  }

  const controls = document.createElement('div');
  controls.className = 'admin-virtual__controls';

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'btn-compact';
  addBtn.textContent = `Add ${config.itemLabel}`;

  const toggleJsonBtn = document.createElement('button');
  toggleJsonBtn.type = 'button';
  toggleJsonBtn.className = 'btn-compact';
  toggleJsonBtn.textContent = 'Show JSON';

  controls.appendChild(addBtn);
  controls.appendChild(toggleJsonBtn);
  wrapper.appendChild(controls);

  const list = document.createElement('div');
  list.className = 'admin-virtual-list';
  wrapper.appendChild(list);

  hiddenJson.style.display = 'none';
  wrapper.appendChild(hiddenJson);

  let items = parseVirtualArray(hiddenJson.value, String(field.defaultValue || '[]'));

  const syncJson = () => {
    hiddenJson.value = JSON.stringify(items, null, 2);
  };

  const renderItems = () => {
    list.innerHTML = '';

    items.forEach((rawItem, index) => {
      const item = rawItem && typeof rawItem === 'object' && !Array.isArray(rawItem)
        ? rawItem
        : { ...config.template };
      items[index] = item;

      const card = document.createElement('div');
      card.className = 'admin-virtual-item';

      const header = document.createElement('div');
      header.className = 'admin-virtual-item__header';

      const title = document.createElement('p');
      title.className = 'admin-virtual-item__title';
      title.textContent = item[config.titleKey]
        ? `${config.itemLabel}: ${String(item[config.titleKey])}`
        : `${config.itemLabel} ${index + 1}`;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'btn-compact btn-danger';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        items.splice(index, 1);
        syncJson();
        renderItems();
        markDirty();
      });

      header.appendChild(title);
      header.appendChild(removeBtn);
      card.appendChild(header);

      config.fields.forEach((descriptor) => {
        const fieldWrap = document.createElement('div');
        fieldWrap.className = 'admin-virtual-item__field';

        const fieldLabel = document.createElement('label');
        fieldLabel.className = 'admin-field__label';
        fieldLabel.textContent = descriptor.label;

        const input = buildDescriptorInput(descriptor, item);

        input.addEventListener('input', () => {
          if (descriptor.type === 'list') {
            item[descriptor.key] = input.value
              .split('\n')
              .map((entry) => entry.trim())
              .filter(Boolean);
          } else if (descriptor.type === 'contributors') {
            item[descriptor.key] = parseContributorsText(input.value);
          } else if (descriptor.type === 'number') {
            const numeric = Number(input.value);
            item[descriptor.key] = Number.isFinite(numeric) ? numeric : 0;
          } else {
            item[descriptor.key] = input.value;
          }

          title.textContent = item[config.titleKey]
            ? `${config.itemLabel}: ${String(item[config.titleKey])}`
            : `${config.itemLabel} ${index + 1}`;

          syncJson();
          markDirty();
        });

        fieldWrap.appendChild(fieldLabel);
        fieldWrap.appendChild(input);
        card.appendChild(fieldWrap);
      });

      list.appendChild(card);
    });

    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'admin-field__hint';
      empty.textContent = `No ${config.itemLabel.toLowerCase()} items yet. Click "Add ${config.itemLabel}" to start.`;
      list.appendChild(empty);
    }
  };

  addBtn.addEventListener('click', () => {
    items.push(JSON.parse(JSON.stringify(config.template)));
    syncJson();
    renderItems();
    markDirty();
  });

  toggleJsonBtn.addEventListener('click', () => {
    const isVisible = hiddenJson.style.display !== 'none';
    hiddenJson.style.display = isVisible ? 'none' : 'block';
    toggleJsonBtn.textContent = isVisible ? 'Show JSON' : 'Hide JSON';
  });

  hiddenJson.addEventListener('input', () => {
    const parsed = parseVirtualArray(hiddenJson.value, '[]');
    if (parsed.length || hiddenJson.value.trim() === '[]') {
      items = parsed;
      renderItems();
      markDirty();
    }
  });

  syncJson();
  renderItems();
  return wrapper;
}

function renderFieldEditor(page: EditablePage, values: Record<string, string>): void {
  if (!fieldEditor) return;
  fieldEditor.innerHTML = '';

  const markDirty = () => {
    setAdminStatus('Unsaved changes.', 'default');
  };

  page.fields.forEach((field) => {
    const value = values[field.id] || '';

    if (field.type === 'virtual') {
      const virtualField = createVirtualFieldEditor(field, value, markDirty);
      fieldEditor.appendChild(virtualField);
      return;
    }

    const useTextarea = Boolean(field.multiline) || value.length > 120;

    const wrapper = document.createElement('div');
    wrapper.className = 'admin-field';
    wrapper.dataset.searchText = `${field.label} ${field.id}`.toLowerCase();

    const label = document.createElement('label');
    label.className = 'admin-field__label';
    label.textContent = field.label;
    label.setAttribute('for', `field_${field.id}`);

    const keyHint = document.createElement('p');
    keyHint.className = 'admin-field__hint';
    keyHint.textContent = field.id;

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
      markDirty();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(keyHint);
    wrapper.appendChild(input);
    fieldEditor.appendChild(wrapper);
  });

  applyFieldFilter();
}

function applyFieldFilter(): void {
  if (!fieldEditor || !fieldSearch) return;
  const query = fieldSearch.value.trim().toLowerCase();

  fieldEditor.querySelectorAll<HTMLElement>('.admin-field').forEach((field) => {
    const text = field.dataset.searchText || '';
    field.style.display = !query || text.includes(query) ? '' : 'none';
  });
}

function loadPreviewPage(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!previewFrame) {
      reject(new Error('Preview frame not found.'));
      return;
    }

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

async function loadPage(pageKey: string): Promise<void> {
  const page = getEditablePage(pageKey) as EditablePage | null;
  if (!page || !pageSelector || !editorPageSubtitle || !previewUrl) return;

  currentPageKey = page.key;
  pageSelector.value = page.key;
  editorPageSubtitle.textContent = `${page.title} (${page.path})`;
  previewUrl.textContent = page.path;

  if (editorHint) {
    editorHint.textContent = pageHints[page.key] || 'Edit fields on the left. Changes are previewed live and saved when you click Save.';
  }

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
  } catch (error: any) {
    setAdminStatus(`Failed to load saved content: ${error.message}`, 'error');
  }

  const mergedValues = { ...baseValues, ...storedValues };
  applyPageContent(page.key, mergedValues, previewDocument);
  renderFieldEditor(page, mergedValues);
  setAdminStatus('Page fields loaded.');
}

function validateVirtualFields(page: EditablePage, values: Record<string, string>): void {
  page.fields
    .filter((field) => field.type === 'virtual')
    .forEach((field) => {
      const value = values[field.id] || '';
      if (!value.trim()) {
        throw new Error(`Missing JSON data in "${field.label}".`);
      }

      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
          throw new Error();
        }
      } catch {
        throw new Error(`Invalid JSON array in "${field.label}".`);
      }
    });
}

async function saveCurrentPage(): Promise<void> {
  const page = getEditablePage(currentPageKey) as EditablePage | null;
  if (!page) return;

  const values = readCurrentFormValues();
  setAdminStatus('Saving changes...');

  try {
    validateVirtualFields(page, values);
    await savePageOverrides(page.key, values, adminToken);
    setAdminStatus('Changes saved successfully.', 'success');
  } catch (error: any) {
    setAdminStatus(`Save failed: ${error.message}`, 'error');
  }
}

async function resetCurrentPage(): Promise<void> {
  const page = getEditablePage(currentPageKey) as EditablePage | null;
  if (!page) return;

  const confirmed = window.confirm(`Reset all overrides for ${page.title}?`);
  if (!confirmed) return;

  setAdminStatus('Resetting page overrides...');

  try {
    await deletePageOverrides(page.key, adminToken);
    await loadPage(page.key);
    setAdminStatus('Page overrides reset.', 'success');
  } catch (error: any) {
    setAdminStatus(`Reset failed: ${error.message}`, 'error');
  }
}

function logout(): void {
  adminToken = '';
  localStorage.removeItem(TOKEN_STORAGE_KEY);

  if (fieldEditor) {
    fieldEditor.innerHTML = '';
  }

  if (previewFrame) {
    previewFrame.src = 'about:blank';
  }

  if (editorHint) {
    editorHint.textContent = '';
  }

  setAdminStatus('');
  setAuthStatus('');
  toggleViews(false);
}

async function startSession(token: string): Promise<void> {
  try {
    await verifyAdminToken(token);
  } catch (error: any) {
    throw new Error(error.message);
  }

  adminToken = token;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

  toggleViews(true);
  populatePageSelector();

  try {
    await loadPage(currentPageKey);
  } catch (error: any) {
    logout();
    setAuthStatus(`Authentication failed: ${error.message}`, true);
  }
}

async function bootstrap(): Promise<void> {
  populatePageSelector();

  const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (savedToken && adminTokenInput) {
    adminTokenInput.value = savedToken;
    try {
      await startSession(savedToken);
    } catch {
      logout();
    }
  }
}

tokenForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = adminTokenInput?.value.trim() || '';

  if (!token) {
    setAuthStatus('Please enter an admin token.', true);
    return;
  }

  setAuthStatus('Authenticating...');
  try {
    await startSession(token);
    setAuthStatus('');
  } catch (error: any) {
    setAuthStatus(`Authentication failed: ${error.message}`, true);
  }
});

pageSelector?.addEventListener('change', async () => {
  await loadPage(pageSelector.value);
});

fieldSearch?.addEventListener('input', () => {
  applyFieldFilter();
});

reloadPageBtn?.addEventListener('click', async () => {
  await loadPage(currentPageKey);
});

openPageBtn?.addEventListener('click', () => {
  const page = getEditablePage(currentPageKey) as EditablePage | null;
  if (!page) return;

  window.open(page.path, '_blank', 'noopener,noreferrer');
});

saveBtn?.addEventListener('click', async () => {
  await saveCurrentPage();
});

resetPageBtn?.addEventListener('click', async () => {
  await resetCurrentPage();
});

logoutBtn?.addEventListener('click', () => {
  logout();
});

void bootstrap();


