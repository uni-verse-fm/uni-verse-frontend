import { describe, it, expect } from 'vitest';
import { buildSessionCookie, type SessionInfos } from './session';

const validInput: SessionInfos = {
  id: "666d443f91dd4ead56947a86",
  username: "vagahbond30",
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZkNDQzZjkxZGQ0ZWFkNTY5NDdhODYiLCJpYXQiOjE3MTg0Mzc2NjQsImV4cCI6MTcxODQzNzcyNH0.JcXs84Ql8TkJITy89e09aZi6jegCbLkw2FThnmg2xZ4",
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZkNDQzZjkxZGQ0ZWFkNTY5NDdhODYiLCJpYXQiOjE3MTg0Mzc2NjQsImV4cCI6MTcxODUyNDA2NH0.itqF5pJKwuxd9pHLkEOcLyVw_3IitMukjlkSnJVueGw"
};

describe('buildSessionCookie', () => {
  it("Returns a valid string", () => {
    expect(buildSessionCookie(validInput)).toBeTruthy();
  });
  it('Creates a valid base64 string', () => {
    expect(() => {
      atob(buildSessionCookie(validInput));
    }).not.toThrowError()
  });
  it('Creates a valid base64 encoded json string', () => {
    expect(() => { JSON.parse(atob(buildSessionCookie(validInput))) }).not.toThrowError()
  });
  it('Creates a session with the required attributes', () => {
    const session = JSON.parse(atob(buildSessionCookie(validInput)))
    expect(session).toHaveProperty("id")
    expect(session).toHaveProperty("username")
    expect(session).toHaveProperty("accessToken")
    expect(session).toHaveProperty("refreshToken")
  });

});
