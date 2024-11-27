"use client";
import Input from "../components/input";
import Button from "../components/button";
import SocialLogin from "../components/social-login";
import { login } from "./actions";
import { useActionState } from "react";
import { PASSWORD_MIN_LENGTH } from "../lib/constants";

export default function Login() {
  // [form에서 돌려줄 return value, form을 클릭했을 때 실행할 액션] = useFormState(실행할action,초기값)
  // useFormState는 handleForm 뿐 아니라 이전에 반환한 state와 함께 실행될 것
  //  useFormState > useActionState(이름바뀜)
  const [state, dispatch] = useActionState(login, null);

  // form이 로딩되고 있다는 사실을 사용자들에게 알려주기 위한 hook
  // 액션을 실행하는 곳에서 사용할 수 없는 hook임. form의 자식(내부)에서만 사용가능함.
  // const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
