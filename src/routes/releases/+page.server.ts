import type { PageServerLoad } from './$types';
import apiConfig from '$lib/api/conf';
import type { Release } from '$lib/api/types';

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch(`${apiConfig.baseUrl}/releases`);

  const releases: Release[] = await res.json();
  console.log(releases);
  return {
    releases
  };
};
