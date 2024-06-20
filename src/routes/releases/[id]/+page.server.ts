import type { PageServerLoad } from './$types';
import apiConfig from '$lib/api/conf';
import type { Release } from '$lib/api/types';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { buildJsonInit } from '$lib/api/utils';

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
  comment: async ({ request, url, fetch }) => {
    const data = await request.formData();

    const track = data.get('trackId')?.toString();

    if (!track) {
      return fail(400, { message: 'Please provide a track ID for this comment' });
    }

    const content = data.get('comment');
    const isPositive = data.get('isPositive');

    const res = await fetch(
      `${apiConfig.baseUrl}/comments`,
      buildJsonInit({
        content,
        isPositive: isPositive === 'true',
        contentId: track,
        typeOfContent: 'track'
      })
    );

    if (res.ok) {
      url.searchParams.set('track', track);

      return redirect(303, url);
    }

    const json = await res.json();

    return fail(res.status, { error: json.message, track });
  }
};
