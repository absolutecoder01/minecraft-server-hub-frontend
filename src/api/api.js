export function getCSRFToken() {
  const cookie = document.cookie;
  const parts = cookie.split('; csrf_access_token=');
  if (parts.length === 2) {
    const second_part = parts[1];
    const token = second_part.split(';')[0];
    return token;
  }
  return null;
}
window.getCSRFToken = getCSRFToken;

export async function apiRequest(url, options = {}) {
  const csrfToken = getCSRFToken();

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const authAPI = {
  login: (username, password) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  register: (username, password, role = "user") =>
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, role }),
    }),
  logout: () =>
    apiRequest('/api/auth/logout', {
      method: 'POST',
    }),
};

export const serversAPI = {
  getAll: () => apiRequest('/api/servers', { method: 'GET' }),
  getById: (id) => apiRequest(`/api/servers/${id}`, { method: 'GET' }),
  create: (data) => apiRequest("/api/servers", { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/api/servers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/api/servers/${id}`, { method: 'DELETE' }),
};

export const adminAPI = {
  getStats: () => apiRequest('/api/admin/stats', { method: 'GET' }),
};
