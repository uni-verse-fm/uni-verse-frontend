import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { buildSessionCookie } from '$lib/session';
import apiConf from '$lib/api/conf';

export const actions: Actions = {
  default: async ({ request, cookies, fetch }) => {
    const data = await request.formData();

    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      return fail(400, { error: 'password is required', email });
    }

    const res = await fetch(`${apiConf.apiBaseUrl}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

    const body = await res.json();
    if (res.ok) {

      cookies.set('session', buildSessionCookie(body), { path: '/' });

      return redirect(303, '/');
    }

    return fail(res.status, { error: body.message ?? res.statusText, email })

    /*
        try {
    
          const res = await login(email?.toString(), password?.toString());
    
        } catch (e) {
          // TODO: Detect when wrong password
          const error = e as { code: number; message: string };
    
          return fail(error.code, { errors: error.message, email });
        }
    
        redirect(303, '/');
    */
  }
};
