import FormInput from "../components/form-input";
import FormButton from "../components/form-btn";
import SocialLogin from "../components/social-login";
import { redirect } from "next/dist/server/api-utils";
import { useFormState } from "react-dom";
import { error } from "console";

export default function Login() {
  //server Action
  async function handleForm(formData: FormData) {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // console.log(formData.get("email"), formData.get("password"));
    // console.log("logged in!");
  }
  // form이 로딩되고 있다는 사실을 사용자들에게 알려주기 위한 hook
  // 액션을 실행하는 곳에서 사용할 수 없는 hook임. form의 자식(내부)에서만 사용가능함.
  // const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
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
          errors={[]}
        />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
