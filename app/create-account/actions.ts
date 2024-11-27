"use server";
import { z } from "zod";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "../lib/constants";

// 유저네임 유효성 검사(refine에 넘겨줄 함수)
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
const passwordRegex = new RegExp(PASSWORD_REGEX);

// zod에게 데이터 설명
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username??",
      })
      // .min(3, "Way too short!")
      // .max(10, "That is too loooong~~")
      // .toLowerCase()
      // .trim()
      // transform에서 리턴하는게 그 항목의 최종결과가 됨
      .transform((username) => `🔥${username}🔥`)
      .refine(checkUsername, "No potatoes allowed!"),
    email: z.string().email(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(passwordRegex, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswords, {
    // 두개의 패스워드에 대해 체크를 해야하기 때문에 바깥에서 refine해야함.
    // 이제 form전체에 대해 refine을 하고 있기 때문에 해당 에러메세지가
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
