"use server";

import { z } from "zod";
// validator 처럼 타입이 없는경우 사람들이 npm패키지로 만들어 놓을때가 있음
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone formmat"
  );
// formData.get()으로 받아오는 것을 숫자로 바꿔줌.
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export default async function smsLogin(
  prevState: ActionState,
  formData: FormData
) {
  const phone = formData.get("phone");
  const token = formData.get("token");
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    console.log(result);
    if (!result.success) {
      console.log(result.error.flatten());
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      // Good to know: redirect does not require you to use return redirect()
      // as it uses the TypeScript never type.(nextjs공식)
      redirect("/");
    }
  }
}
