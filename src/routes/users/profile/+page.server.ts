import type { PageServerLoad } from './$types';
import apiConfig from '$lib/api/conf';
import type { User } from '$lib/api/types';
import { parseSessionCookie } from '$lib/session';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { buildJsonInit } from '$lib/api/utils';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const sessionCookie = cookies.get('session');

  if (!sessionCookie) {
    error(401, { message: 'No session available.' });
  }

  const session = parseSessionCookie(sessionCookie);

  const userRequest = await fetch(`${apiConfig.baseUrl}/users/${session.id}`);
  const user: User = await userRequest.json();

  return {
    user
  };
};

export const actions: Actions = {
  profilePicture: async ({ request, fetch }) => {
    const data = await request.formData();
    const profilePicture = data.get('profilePicture') as File;

    const payload = new FormData();
    payload.append('file', profilePicture, profilePicture.name);

    const res = await fetch(`${apiConfig.baseUrl}/users/upload`, {
      body: payload,
      method: 'POST'
    });

    if (!res.ok) {
      const content = await res.json();
      return fail(res.status, { error: content.message });
    }
  },
  passwordChange: async ({ request, fetch }) => {
    const data = await request.formData();
    const password = data.get('password');
    const passwordConfirm = data.get('passwordConfirm');

    if (password !== passwordConfirm) {
      return fail(400, { error: 'Passwords must match !' });
    }

    const res = await fetch(
      `${apiConfig.baseUrl}/users/password`,
      buildJsonInit({
        password
      })
    );

    if (!res.ok) {
      const content = await res.json();
      console.log(content);
      return fail(res.status, { error: content.message });
    }

    return {
      message: 'Password successfully changed !'
    };
  },
  stripeOnboard: async ({ fetch }) => {

    const res = await fetch(`${apiConfig.baseUrl}/users/onboard`);

    if (!res.ok) {
      const content = await res.json();
      console.log(content);
      return fail(res.status, { error: content.message });
    }

    const { onboardUrl } = await res.json()

    redirect(303, onboardUrl);
  }

};
