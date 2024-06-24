

import type { PageServerLoad } from './$types';
import apiConfig from '$lib/api/conf';
import type { User } from '$lib/api/types';
import { parseSessionCookie } from '$lib/session';
import { error, fail, type Actions } from '@sveltejs/kit';

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

export const actions: Actions = {
  profilePicture: async ({ request, fetch }) => {
    const data = await request.formData();
    const profilePicture = data.get("profilePicture") as File;

    const payload = new FormData();
    payload.append('file', profilePicture, profilePicture.name);

    const res = await fetch(`${apiConfig.baseUrl}/users/upload`, {
      body: payload,
      method: "POST",
    })

    if (!res.ok) {
      const content = await res.json();
      console.log(content)
      return fail(res.status, { error: content.message })
    }
  }
};
