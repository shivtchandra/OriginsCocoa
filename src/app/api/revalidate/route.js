import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const ping = searchParams.get("ping");

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return unauthorized();
  }

  if (ping === "1") {
    return NextResponse.json({
      ok: true,
      ping: true,
      site: process.env.NEXT_PUBLIC_SITE_SLUG ?? "origins-cocoa",
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Use POST with path=/tag= or ping=1 to test connection.",
  });
}

export async function POST(request) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");
  const tag = searchParams.get("tag");

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return unauthorized();
  }

  const results = [];

  if (tag) {
    revalidateTag(tag);
    results.push({ tag });

    if (tag === "products") {
      revalidatePath("/products/[slug]", "page");
      results.push({ path: "/products/[slug]", type: "page" });
    }
  }

  if (path) {
    revalidatePath(path);
    results.push({ path });
  }

  if (!results.length) {
    revalidatePath("/");
    results.push({ path: "/" });
  }

  return NextResponse.json({ revalidated: true, results, now: Date.now() });
}
