// route.ts라는 이름은 API route라는 뜻.

import { NextRequest } from "next/server";

// HTTP 요청을 받아서 json 반환하거나 사용자를 redirect시킴
// 이름을 GET으로 지어주면 HTTP request가 GET인지 POST인지 확인할 필요없음
export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}
export async function POST(request: NextRequest) {
  //   request.cookies.get("");
  const data = await request.json();
  return Response.json(data);
}
