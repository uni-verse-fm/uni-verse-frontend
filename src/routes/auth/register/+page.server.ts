import { register } from '$lib/api/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const email = data.get('email');
    const username = data.get('username');
    const password = data.get('password');
    const confirmPassword = data.get('confirm-password');

    if (!username) {
      return fail(400, { error: 'username is required', email })
    }

    if (!email) {
      return fail(400, { error: 'email is required', username })
    }

    if (!password) {
      return fail(400, { error: 'password is required', password })
    }

    if (password != confirmPassword) {
      return fail(400, {
        error: 'password does not match with password confirmation!',
        email,
        username
      });
    }

    try {
      // TODO: mail confirmation
      await register(username?.toString(), email?.toString(), password?.toString());
    } catch (e) {
      const error = e as { code: number; error: string };
      return fail(error.code, { ...error, username, email });
    }

    redirect(303, '/login');
  }
};
