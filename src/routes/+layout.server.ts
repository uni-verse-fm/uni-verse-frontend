import type { ServerLoadEvent } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }: ServerLoadEvent) => {
  const session = cookies.get("session");

  if (session)
    try {
      return { session: JSON.parse(session) }
    } catch {
      return {}
    }

  return {};
}




