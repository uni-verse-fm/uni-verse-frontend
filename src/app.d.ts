// See https://kit.svelte.dev/docs/types#app

import type { Release } from '$lib/api/types';

// for information about these interfaces
declare global {
  namespace App {
    interface Error {
      message: string;
    }
    // interface Locals {}
    interface PageData {
      releases?: Release[];
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
