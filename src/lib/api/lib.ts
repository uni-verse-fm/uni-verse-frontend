import Conf from './conf';

export default function fetchApi(request: RequestInfo, init?: RequestInit | undefined) {
  fetch(`${Conf.apiBaseUrl}${request}`, init);
}
