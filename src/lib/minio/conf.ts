import { env } from '$env/dynamic/public';

export default {
  baseUrl: env.PUBLIC_MINIO_URL
};
