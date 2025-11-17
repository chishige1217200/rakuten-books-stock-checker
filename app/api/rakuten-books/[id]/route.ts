import { ApiErrorResponse } from "@/types/ApiErrorResponse";
import { MultiFormatItems } from "@/types/MultiformatItems";
import { NextResponse } from "next/server";

// GET /api/rakuten-books/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Next.js v15以降ではパラメータがPromiseとなる
  const resolvedParams = await params;

  // 商品IDの抽出
  const id = resolvedParams.id;

  // 楽天ブックスAPIのURLを作成
  const API_URL = `https://gateway-api.global.rakuten.com/books/multiformatItems/rb/item/${id}/`;

  try {
    const res = await fetch(API_URL, { method: "GET", cache: "no-store" });

    if (!res.ok) {
      const apiErrorResponse: ApiErrorResponse = {
        error: `外部APIからデータを取得できませんでした (status: ${res.status})`,
        status: res.status,
      };
      return NextResponse.json(apiErrorResponse, { status: res.status });
    }

    const data: MultiFormatItems = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    const apiErrorResponse: ApiErrorResponse = {
      error: "サーバーサイドでエラーが発生しました",
      status: 500,
    };
    return NextResponse.json(apiErrorResponse, { status: 500 });
  }
}
