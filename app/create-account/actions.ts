"use server";
import { z } from "zod";

// zod에게 데이터 설명
const formSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(10),
  comfirm_password: z.string().min(10),
});

// 유효성 검사하고싶은 데이터들
export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
