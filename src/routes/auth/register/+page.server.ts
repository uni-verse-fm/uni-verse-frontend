import { register } from '$lib/api/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();

    const email = data.get('email');
    const username = data.get('username');
    const password = data.get('password');
    const confirmPassword = data.get('confirm-password');

    if (password != confirmPassword) {
      return fail(400, { error: 'Passwords do not match! ', email, username });
    }

    await register(
      username?.toString(),
      email?.toString(),
      password?.toString(),
      confirmPassword?.toString()
    )
      .then((user) => {
        cookies.set('session', user.token, { path: '/' });
        throw redirect(303, '/');
      })
      .catch((error) => {
        return fail(error.code, { ...error.message, username, email });
      });
  }
};
