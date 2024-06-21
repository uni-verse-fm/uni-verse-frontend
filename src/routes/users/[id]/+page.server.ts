
import type { PageServerLoad } from './$types';
import apiConfig from '$lib/api/conf';
import type { User } from '$lib/api/types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const userRequest = await fetch(`${apiConfig.baseUrl}/users/${params.id}`);
  const user: User = await userRequest.json();

  const releasesRequest = await fetch(`${apiConfig.baseUrl}/releases/user/${params.id}`)
  const releases = await releasesRequest.json();


  return {
    user,
    releases
  };
};

