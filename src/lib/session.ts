
export interface SessionInfos {
  id: string;
  username: string;
  accessToken: string;
  refreshToken: string;

}

/**
 * Creates a base64 encoded string that contains a JSON object, 
 * with everything needed to manage the session.
 */
export function buildSessionCookie(sessionInfos: SessionInfos): string {
  const serialized = JSON.stringify(sessionInfos);

  return btoa(serialized);
}
