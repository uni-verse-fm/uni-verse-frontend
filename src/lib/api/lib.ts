import { error } from '@sveltejs/kit';
import Conf from './conf';

type CustomRequestInit = Omit<RequestInit, 'body'> & {
  body: { [key: string]: string | undefined };
};

export default async function fetchApi(
  request: RequestInfo,
  init?: CustomRequestInit | undefined
): Promise<Response> {
  const res = await fetch(`${Conf.apiBaseUrl}${request}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(init?.body)
  });

  switch (res.status / 100) {
    case 5:
      return error(500, 'Something went wrong with the server...');
    default:
      return res;
  }
}
