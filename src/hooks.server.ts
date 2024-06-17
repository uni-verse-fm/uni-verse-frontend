import { error, type Handle, type HandleFetch } from '@sveltejs/kit';
import apiConf from '$lib/api/conf';
import { buildSessionCookie, isTokenExpired, parseSessionCookie } from '$lib/session';

const handleApifetch: HandleFetch = async ({ request, event, fetch }) => {
  const sessionCookie = event.cookies.get('session');

  if (!sessionCookie) {
    return fetch(request);
  }

  const parsedSessionCookie = parseSessionCookie(sessionCookie);

  let accessToken = parsedSessionCookie.accessToken;

  if (isTokenExpired(parsedSessionCookie.accessToken)) {
    const res = await fetch(`${apiConf.apiBaseUrl}/auth/refresh`, {
      headers: {
        Authorization: `Bearer ${parsedSessionCookie.refreshToken}`
      }
    });

    if (!res.ok) {
      event.cookies.delete('session', { path: '/' });
      return error(401, { message: 'Could not refresh your session token, please login again' });
    }

    const payload = await res.json();

    event.cookies.set(
      'session',
      buildSessionCookie({
        ...parsedSessionCookie,
        accessToken: payload.accessToken
      }),
      { path: '/' }
    );

    accessToken = payload.accessToken;
  }

  request.headers.set('Authorization', `Bearer ${accessToken}`);

  return fetch(request);
};

export const handleFetch: HandleFetch = async (input) => {
  if (input.request.url.startsWith(apiConf.apiBaseUrl)) {
    return handleApifetch(input);
  }

  return fetch(input.request);
};

export const handle: Handle = async ({ resolve, event }) => {
  const sessionCookie = event.cookies.get('session');

  if (!sessionCookie) {
    return resolve(event);
  }

  const parsedSessionCookie = parseSessionCookie(sessionCookie);

  if (isTokenExpired(parsedSessionCookie.refreshToken)) {
    event.cookies.delete('session', { path: '/' });
    return error(401, { message: 'Session expired. Please login again' });
  }

  return resolve(event);
};
