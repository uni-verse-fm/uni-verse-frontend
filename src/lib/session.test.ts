import { describe, it, expect } from 'vitest';
import {
  InvalidSessionError,
  InvalidTokenError,
  buildSessionCookie,
  isTokenExpired,
  parseSessionCookie,
  type SessionInfos
} from './session';

const validSessionInfos: SessionInfos = {
  id: '666d443f91dd4ead56947a86',
  username: 'vagahbond30',
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZkNDQzZjkxZGQ0ZWFkNTY5NDdhODYiLCJpYXQiOjE3MTg0Mzc2NjQsImV4cCI6MTcxODQzNzcyNH0.JcXs84Ql8TkJITy89e09aZi6jegCbLkw2FThnmg2xZ4',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZkNDQzZjkxZGQ0ZWFkNTY5NDdhODYiLCJpYXQiOjE3MTg0Mzc2NjQsImV4cCI6MTcxODUyNDA2NH0.itqF5pJKwuxd9pHLkEOcLyVw_3IitMukjlkSnJVueGw'
};

const validCookie: string =
  'eyJpZCI6IjY2NmQ0NDNmOTFkZDRlYWQ1Njk0N2E4NiIsInVzZXJuYW1lIjoidmFnYWhib25kMzAiLCJhY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVNXUWlPaUkyTmpaa05EUXpaamt4WkdRMFpXRmtOVFk1TkRkaE9EWWlMQ0pwWVhRaU9qRTNNVGcwTXpjMk5qUXNJbVY0Y0NJNk1UY3hPRFF6TnpjeU5IMC5KY1hzODRRbDhUa0pJVHk4OWUwOWFaaTZqZWdDYkxrdzJGVGhubWcyeFo0IiwicmVmcmVzaFRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5U1dRaU9pSTJOalprTkRRelpqa3haR1EwWldGa05UWTVORGRoT0RZaUxDSnBZWFFpT2pFM01UZzBNemMyTmpRc0ltVjRjQ0k2TVRjeE9EVXlOREEyTkgwLml0cUY1cEpLd3V4ZDlwSExrRU9jTHlWd18zSWl0TXVramxrU25KVnVlR3cifQ==';

const expiredToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZkNDQzZjkxZGQ0ZWFkNTY5NDdhODYiLCJpYXQiOjE3MTg0Mzc2NjQsImV4cCI6MTcxODQzNzcyNH0.JcXs84Ql8TkJITy89e09aZi6jegCbLkw2FThnmg2xZ4";



const validToken: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
  JSON.stringify(
    {
      userId: "665ea9b97756058792b96d4e",
      iat: 1718583299,
      exp: Math.round(Date.now() / 1000) + 50
    }
  )
)}.JcXs84Ql8TkJITy89e09aZi6jegCbLkw2FThnmg2xZ4`;

describe('buildSessionCookie', () => {
  it('Returns a valid string', () => {
    expect(buildSessionCookie(validSessionInfos)).toBeTruthy();
  });
  it('Creates a valid base64 string', () => {
    expect(() => {
      atob(buildSessionCookie(validSessionInfos));
    }).not.toThrowError();
  });
  it('Creates a valid base64 encoded json string', () => {
    expect(() => {
      JSON.parse(atob(buildSessionCookie(validSessionInfos)));
    }).not.toThrowError();
  });
  it('Creates a session with the required attributes', () => {
    const session = JSON.parse(atob(buildSessionCookie(validSessionInfos)));
    expect(session).toHaveProperty('id');
    expect(session).toHaveProperty('username');
    expect(session).toHaveProperty('accessToken');
    expect(session).toHaveProperty('refreshToken');
  });
  it('Creates a session with the right values', () => {
    const session = JSON.parse(atob(buildSessionCookie(validSessionInfos)));
    expect(session.id).toBe(validSessionInfos.id);
    expect(session.username).toBe(validSessionInfos.username);
    expect(session.accessToken).toBe(validSessionInfos.accessToken);
    expect(session.refreshToken).toBe(validSessionInfos.refreshToken);
  });
});

describe('parseCookie', () => {
  it('does not throw with valid input', () => {
    expect(() => {
      parseSessionCookie(validCookie);
    }).not.toThrowError();
  });
  it('throws when input is invalid', () => {
    expect(() => {
      parseSessionCookie('AAAAAAAAA');
    }).toThrowError(InvalidSessionError);
  });
  it('has all relevant fields', () => {
    const session = parseSessionCookie(validCookie);

    expect(session).toHaveProperty('id');
    expect(session).toHaveProperty('username');
    expect(session).toHaveProperty('accessToken');
    expect(session).toHaveProperty('refreshToken');
  });
  it('returns the right values for the properties', () => {
    const session = JSON.parse(atob(buildSessionCookie(validSessionInfos)));
    expect(session.id).toBe('666d443f91dd4ead56947a86');
    expect(session.username).toBe('vagahbond30');
    expect(session.accessToken).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZkNDQzZjkxZGQ0ZWFkNTY5NDdhODYiLCJpYXQiOjE3MTg0Mzc2NjQsImV4cCI6MTcxODQzNzcyNH0.JcXs84Ql8TkJITy89e09aZi6jegCbLkw2FThnmg2xZ4'
    );
    expect(session.refreshToken).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZkNDQzZjkxZGQ0ZWFkNTY5NDdhODYiLCJpYXQiOjE3MTg0Mzc2NjQsImV4cCI6MTcxODUyNDA2NH0.itqF5pJKwuxd9pHLkEOcLyVw_3IitMukjlkSnJVueGw'
    );
  });
});

describe("isTokenExpired", () => {
  it("does not throw for valid token", () => {
    expect(() => { isTokenExpired(expiredToken) }).not.toThrowError()
  })
  it("throws InvalidTokenError for invalid token", () => {
    expect(() => { isTokenExpired("AAAAAAAAA") }).toThrowError(InvalidTokenError);
  })
  it("detects expired token", () => {
    expect(isTokenExpired(expiredToken)).toEqual(true)
  })
  it("detects valid token", () => {
    expect(isTokenExpired(validToken)).toEqual(false)
  })
})
