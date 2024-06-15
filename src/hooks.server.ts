import type { HandleFetch } from '@sveltejs/kit';
import apiConf from '$lib/api/conf';

export const handleFetch: HandleFetch = ({ request, event, fetch }) => {
  if (request.url.startsWith(apiConf.apiBaseUrl)) {
    // Check the current token and refresh if needed
    const session = JSON.parse(event.cookies.get('session') ?? '{}');

    console.log(session);
  }

  return fetch(request);
};
