// src/services/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

function getToken() {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token'); 
  } catch (err) {
    console.error('Erro ao acessar localStorage', err);
    return null;
  }
}

function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  if (res.status === 401) {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    } catch (e) {
    }
    throw new Error('Não autorizado (401)');
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.detail || data?.message || `Erro ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export async function apiGet(path, { noAuth = false, params } = {}) {
  const url = params ? `${BASE_URL}${path}?${new URLSearchParams(params)}` : `${BASE_URL}${path}`;
  const headers = noAuth ? {} : getAuthHeader();

  const res = await fetch(url, {
    method: 'GET',
    headers,
  });

  return handleResponse(res);
}

export async function apiPost(path, body = {}, { noAuth = false } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(noAuth ? {} : getAuthHeader()),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse(res);
}

export async function apiPut(path, body = {}, { noAuth = false } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(noAuth ? {} : getAuthHeader()),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse(res);
}

export async function apiDelete(path, { noAuth = false } = {}) {
  const headers = noAuth ? {} : getAuthHeader();

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
    headers,
  });

  return handleResponse(res);
}

/* Utilitários opcionais */
export function setLocalToken(token) {
  if (typeof window !== 'undefined') localStorage.setItem('token', token);
}
export function clearLocalToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
}
