import type { PageServerLoad } from './$types';
import apiConfig from '$lib/api/conf';
import type { Release } from '$lib/api/types';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, params, url }) => {
  const res = await fetch(`${apiConfig.baseUrl}/releases/${params.id}`);
  const release: Release = await res.json();

  const track = url.searchParams.get('track');
  return {
    release,
    track
  };
};

export const actions: Actions = {
  comment: async ({ request, url }) => {
    const data = await request.formData();

    const track = data.get('trackId')?.toString();

    if (!track) {
      return fail(400, { message: 'Please provide a track ID for this comment' });
    }

    url.searchParams.set('track', track);

    return redirect(303, url);
  }
};
