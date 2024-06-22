

import type { PageServerLoad } from './$types';
import apiConfig from '$lib/api/conf';
import type { User } from '$lib/api/types';
import { parseSessionCookie } from '$lib/session';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const sessionCookie = cookies.get('session');

  if (!sessionCookie) {
    error(401, { message: "No session available." })
  }

  const session = parseSessionCookie(sessionCookie);

  const userRequest = await fetch(`${apiConfig.baseUrl}/users/${session.id}`);
  const user: User = await userRequest.json();

  return {
    user,
  };
};

