import { error } from '@sveltejs/kit';
import Conf from './conf';

type CustomRequestInit = Omit<RequestInit, 'body'> & {
  body: { [key: string]: string | undefined };
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export async function fetchApiWithFile(request: RequestInfo, init: RequestInit, token?: string) {
  const res = await fetch(`${Conf.apiBaseUrl}${request}`, {
    ...init,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });

  switch (res.status / 100) {
    case 5:
      return error(500, 'Something went wrong with the server...');
    default:
      return res;
  }
}

export async function fetchApi(
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
