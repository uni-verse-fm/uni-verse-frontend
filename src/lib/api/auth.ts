import { error } from '@sveltejs/kit';
import { fetchApi } from './lib';

export interface CreatedUser {
  email: string;
  username: string;
}

export interface LoggedInUser {
  id: string;
  stripeAccountId?: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}


export async function register(
  username: string,
  email: string,
  password: string
): Promise<CreatedUser> {
  const res = await fetchApi('/auth/register', {
    method: 'POST',
    body: {
      username,
      email,
      password
    }
  });

  const content = await res.json();

  if (res.ok) {
    return content;
  } else if (res.status / 100 === 4) {
    // Validation error
    throw { code: res.status, error: content.message };
  } else {
    error(res.status, 'Something went wrong.');
  }
}

export async function login(
  email: string,
  password: string
): Promise<LoggedInUser> {
  const res = await fetchApi('/auth/login', {
    method: 'POST',
    body: {
      email,
      password
    }
  });

  const content = await res.json();

  if (res.ok) {
    return content;
  } else if (res.status / 100 === 4) {
    // Validation error
    throw { code: res.status, error: content.message };
  } else {
    error(res.status, 'Something went wrong.');
  }
}

