import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import apiConfig from '$lib/api/conf';

export const actions: Actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();

    const res = await fetch(`${apiConfig.apiBaseUrl}/releases`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: data
    });

    const parsed = await res.json();
    console.log(res.status);
    console.log(parsed);
    fail(res.status, { ...parsed });
  }
};
