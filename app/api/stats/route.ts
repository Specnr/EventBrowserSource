import { GET_EVENT_STATS_URL } from "@/public/functions/constants";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const vanity = req.nextUrl.searchParams.get("vanity")?.trim();
  if (!vanity) {
    return Response.json({ error: "Missing vanity" }, { status: 400 });
  }

  try {
    const upstream = await fetch(GET_EVENT_STATS_URL(vanity), {
      next: { revalidate: 30 },
    });

    const headers = new Headers();
    for (const name of ["Content-Type", "Retry-After"]) {
      const value = upstream.headers.get(name);
      if (value) headers.set(name, value);
    }

    return new Response(upstream.body, { status: upstream.status, headers });
  } catch (error) {
    console.error("Failed to fetch PaceMan event stats", error);
    return Response.json({ error: "Unable to load event stats" }, { status: 502 });
  }
}
