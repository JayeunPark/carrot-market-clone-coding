"use client";
import FormInput from "../components/form-input";
import FormButton from "../components/form-btn";
import SocialLogin from "../components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import { useActionState } from "react";

export default function Login() {
  // [form에서 돌려줄 return value, form을 클릭했을 때 실행할 액션] = useFormState(실행할action,초기값)
  // useFormState는 handleForm 뿐 아니라 이전에 반환한 state와 함께 실행될 것
  //  useFormState > useActionState(이름바뀜)
  const [state, action] = useActionState(handleForm, null);

  // form이 로딩되고 있다는 사실을 사용자들에게 알려주기 위한 hook
  // 액션을 실행하는 곳에서 사용할 수 없는 hook임. form의 자식(내부)에서만 사용가능함.
  // const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
        />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
