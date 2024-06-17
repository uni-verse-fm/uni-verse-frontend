import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import apiConfig from '$lib/api/conf';

export const actions: Actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();

    const trackFiles = data.getAll('tracks[][file]');

    const dataObject = {
      description: data.get('description'),
      title: data.get('description'),
      tracks: data.getAll('tracks[][title]').map((t, i) => {
        return { title: t, originalFileName: (trackFiles[i] as File).name };
      })
    };

    const adaptedData = new FormData();

    adaptedData.set('data', JSON.stringify(dataObject));

    adaptedData.set('cover', data.get('cover') as File);
    trackFiles.forEach((t) => adaptedData.append('tracks', t));

    console.log(dataObject.tracks.length);
    console.log(adaptedData.getAll('tracks'));

    const res = await fetch(`${apiConfig.apiBaseUrl}/releases`, {
      method: 'POST',
      body: adaptedData
    });

    const parsed = await res.json();

    if (res.ok) {
      return redirect(303, `/releases/${parsed.id}`);
    }

    const [title, description] = ['title', 'description'].map((n) => data.get(n));

    const tracks = data.getAll('tracks[][title]').map((t) => {
      return { title: t };
    });

    return fail(res.status, { error: parsed.message, title, description, tracks });
  }
};
