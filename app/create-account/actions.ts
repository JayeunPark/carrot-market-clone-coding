"use server";
import { z } from "zod";

// 유저네임 유효성 검사
const checkUsername = (username: string) =>
  username.includes("potato") ? false : true;

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return password == confirm_password;
};
// 비밀번호 정규 표현식
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

// zod에게 데이터 설명
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username??",
      })
      .min(3, "Way too short!")
      // .max(10, "That is too loooong~~")
      .toLowerCase()
      .trim()
      // transform에서 리턴하는게 그 항목의 최종결과가 됨
      .transform((username) => `🔥${username}🔥`)
      .refine(checkUsername, "No potatoes allowed!"),
    email: z.string().email(),
    password: z
      .string()
      .min(10)
      .regex(
        passwordRegex,
        "A password must have lowercase,UPPERCASE, a number and special characters"
      ),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswords, {
    // form전체에 대해 refine을 하고 있기 때문에 해당 에러메세지가
    // 어떤 필드에 일어나는건지 알려줘야함. 그렇지 않으면 global error로 인식함.
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
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
  } else {
    console.log(result.data);
  }
}
