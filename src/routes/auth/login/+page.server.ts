import { login } from '$lib/api/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();

    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      return fail(400, { error: 'password is required', email });
    }

    try {
      const res = await login(email?.toString(), password?.toString());

      cookies.set('session', JSON.stringify(res), { path: '/' });
    } catch (e) {
      // TODO: Detect when wrong password
      const error = e as { code: number; error: string };
      return fail(error.code, { ...error, email });
    }

    redirect(303, '/');
  }
};
