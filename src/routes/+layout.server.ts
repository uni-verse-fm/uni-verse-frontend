import type { ServerLoadEvent } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { parseSessionCookie } from "$lib/session";

export const load: LayoutServerLoad = ({ cookies }: ServerLoadEvent) => {
  const session = cookies.get("session");

  if (session)
    try {
      return { session: parseSessionCookie(session) }
    } catch {
      return {}
    }

  return {};
}




