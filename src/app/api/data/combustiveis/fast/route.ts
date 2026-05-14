import { NextRequest, NextResponse } from "next/server";
import { getCombustiveisFastData } from "../_cache";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const forceRefresh = request.nextUrl.searchParams.get("refresh") === "1";
    const data = (await getCombustiveisFastData(forceRefresh)) ?? [];

    return NextResponse.json(
      {
        success: true,
        cached: !forceRefresh,
        total: data.length,
        data,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro ao carregar dados de combustíveis.",
      },
      { status: 500 }
    );
  }
}
