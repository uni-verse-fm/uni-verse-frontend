import { error } from '@sveltejs/kit';
import fetchApi from './lib';

export interface CreatedUser {
  email: string;
  username: string;
}

export async function register(
  username: string | undefined,
  email: string | undefined,
  password: string | undefined
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
