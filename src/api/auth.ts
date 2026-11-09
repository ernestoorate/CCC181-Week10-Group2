// Functions that talk to the CampusConnect API. Components call these instead
// of calling fetch directly. The address comes from .env (VITE_API_URL).
import type { AuthUser, LoginResult } from '../types';

const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? '').replace(/\/+$/, '');
const TOKEN_KEY = 'campusconnect_token';

// What went wrong, in terms the page can react to (never raw error text).
export type AuthErrorKind =
  | 'invalid' //      401 on login: wrong password or unknown email
  | 'bad-request' //  400: missing or badly formed input
  | 'unauthorized' // 401 on /users/me: token missing, wrong or expired
  | 'network' //      server stopped, wrong address, CORS, offline
  | 'server'; //      500 or higher, or an answer we cannot understand

export class AuthError extends Error {
  kind: AuthErrorKind;
  constructor(kind: AuthErrorKind) {
    super(kind);
    this.kind = kind;
  }
}

function isUser(value: unknown): value is AuthUser {
  if (typeof value !== 'object' || value === null) return false;
  const u = value as Record<string, unknown>;
  return typeof u.name === 'string' && typeof u.email === 'string';
}

async function send(path: string, init: RequestInit): Promise<Response> {
  if (!API_URL) throw new AuthError('network'); // VITE_API_URL is not set
  try {
    return await fetch(`${API_URL}${path}`, init);
  } catch {
    throw new AuthError('network');
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new AuthError('server');
  }
}

// POST /sessions. Resolves ONLY when the API answers 200 with a token and user.
export async function login(email: string, password: string): Promise<LoginResult> {
  const response = await send('/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 401) throw new AuthError('invalid');
  if (response.status === 400) throw new AuthError('bad-request');
  if (!response.ok) throw new AuthError('server');

  const data = (await readJson(response)) as { token?: unknown; user?: unknown };
  if (typeof data?.token !== 'string' || !data.token || !isUser(data.user)) {
    throw new AuthError('server');
  }
  return { token: data.token, user: data.user };
}

// GET /users/me with the token in the Authorization header.
export async function getMe(token: string): Promise<AuthUser> {
  const response = await send('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) throw new AuthError('unauthorized');
  if (!response.ok) throw new AuthError('server');

  const data = await readJson(response);
  if (!isUser(data)) throw new AuthError('server');
  return data;
}

// The token lives in sessionStorage only (never in the URL, code or console).
export function getToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function saveToken(token: string): void {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* storage blocked: the user simply has to log in again after a refresh */
  }
}

export function clearToken(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* nothing to clear */
  }
}
