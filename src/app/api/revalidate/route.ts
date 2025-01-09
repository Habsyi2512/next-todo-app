import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  if (!tag) {
    return NextResponse.json(
      { message: "Missing tag parameter" },
      { status: 400 }
    );
  }
  revalidateTag(tag as string);
  return NextResponse.json({ revalidate: true, now: Date.now() });
}
