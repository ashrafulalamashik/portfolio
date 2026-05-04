const BASE = '/api';

function getToken() {
  return localStorage.getItem('admin_token') || '';
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

async function handleResponse(res: Response) {
  const data = await res.json().catch(() => ({ message: res.statusText }));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (username: string, password: string) =>
    fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(handleResponse),

  me: () =>
    fetch(`${BASE}/auth/me`, { headers: authHeaders() }).then(handleResponse),

  changePassword: (currentPassword: string, newPassword: string) =>
    fetch(`${BASE}/auth/change-password`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    }).then(handleResponse),
};

// ── Content ───────────────────────────────────────────────────────────────────
export const contentApi = {
  get: () =>
    fetch(`${BASE}/content`, { headers: authHeaders() }).then(handleResponse),

  saveDraft: (data: object) =>
    fetch(`${BASE}/content`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  publish: (data: object) =>
    fetch(`${BASE}/content/publish`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// ── Upload ────────────────────────────────────────────────────────────────────
export const uploadApi = {
  profile: (file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    return fetch(`${BASE}/upload/profile`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: fd,
    }).then(handleResponse);
  },

  image: (folder: string, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    return fetch(`${BASE}/upload/image/${folder}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: fd,
    }).then(handleResponse);
  },

  cv: (file: File) => {
    const fd = new FormData();
    fd.append('cv', file);
    return fetch(`${BASE}/upload/cv`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: fd,
    }).then(handleResponse);
  },

  listFolder: (folder: string) =>
    fetch(`${BASE}/upload/list/${folder}`, { headers: authHeaders() }).then(handleResponse),

  deleteImage: (filePath: string) =>
    fetch(`${BASE}/upload/image`, {
      method: 'DELETE',
      headers: authHeaders(),
      body: JSON.stringify({ filePath }),
    }).then(handleResponse),
};

// ── Settings ──────────────────────────────────────────────────────────────────
export const settingsApi = {
  get: () =>
    fetch(`${BASE}/settings`, { headers: authHeaders() }).then(handleResponse),

  save: (data: object) =>
    fetch(`${BASE}/settings`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};
