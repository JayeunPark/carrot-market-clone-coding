"use server";

import { z } from "zod";
// validator 처럼 타입이 없는경우 사람들이 npm패키지로 만들어 놓을때가 있음
import validator from "validator";

// 같이 검사를 하지 않을 거라서 둘다 같은 스키마안에 둘 필요없음
const phoneSchema = z.string().trim().refine(validator.isMobilePhone);
// formData.get()으로 받아오는 것을 숫자로 바꿔줌.
const tokenSchema = z.coerce.number().min(100000).max(999999);

export default async function smsLogin(prevState: any, formData: FormData) {
  console.log(typeof formData.get("token"));
  console.log(typeof tokenSchema.parse(formData.get("token")));
}
