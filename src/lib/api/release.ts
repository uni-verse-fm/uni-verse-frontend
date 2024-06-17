import { ApiError, fetchApiWithFile } from './lib';

interface Track {
  title: string;
  file: string;
}

interface CreatedRelease { }

export async function createRelease(
  title: string,
  description: string,
  cover: Blob,
  tracks: Track[],
  token: string
): Promise<CreatedRelease> {
  const params = new FormData();

  params.append('title', title);
  params.append('description', description);
  params.append('cover', cover);

  tracks.forEach((t) => {
    params.append('tracks[][file]', t.file);
    params.append('tracks[][title]', t.title);
  });

  const res = await fetchApiWithFile(
    '/releases',
    {
      method: 'POST',
      body: params
    },
    token
  );

  const payload = await res.json();

  if (!res.ok) {
    throw new ApiError(res.status, payload.message);
  }

  return payload;
}
