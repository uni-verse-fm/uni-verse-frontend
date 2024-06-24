export interface SessionInfos {
  id: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  profilePicture: string;
}

export class InvalidSessionError extends Error {
  constructor(message?: string) {
    super(message ?? 'An invalid session cookie was loaded.');
  }
}

export class InvalidTokenError extends Error {
  constructor(message?: string) {
    super(message ?? 'An invalid access token was provided.');
  }
}

/**
 * Creates a base64 encoded string that contains a JSON object,
 * with everything needed to manage the session.
 */
export function buildSessionCookie(sessionInfos: SessionInfos): string {
  const serialized = JSON.stringify(sessionInfos);

  return btoa(serialized);
}

/**
 * Parses the stored session token to extract its contents
 */
export function parseSessionCookie(cookie: string): SessionInfos {
  let res: string;
  try {
    res = atob(cookie);
    return JSON.parse(res);
  } catch (e) {
    if (e instanceof SyntaxError || (e as Error)?.name == 'InvalidCharacterError') {
      throw new InvalidSessionError((e as Error).message);
    }
    throw e;
  }
}

/**
 * Checks the validity of the accessToken
 */
export function isTokenExpired(token: string): boolean {
  const payload = token.split('.')[1];

  try {
    const parsed = JSON.parse(atob(payload));

    if (!parsed.exp) {
      throw new InvalidTokenError('JWT does not have an expiration date');
    }

    return parsed.exp <= Math.floor(Date.now() / 1000).toString();
  } catch (e) {
    if (e instanceof SyntaxError || (e as Error)?.name == 'InvalidCharacterError') {
      throw new InvalidTokenError((e as Error).message);
    }

    throw e;
  }
}
