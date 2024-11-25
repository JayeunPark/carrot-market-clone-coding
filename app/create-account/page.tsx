import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import FormInput from "../components/form-input";
import FormButton from "../components/form-btn";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="text" placeholder="Username" required errors={[]} />
        <FormInput type="email" placeholder="Email" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="Confirm Password"
          required
          errors={[]}
        />
        <FormButton loading={false} text="Create account" />
      </form>
      {/* 구분선으로 사용하기 위한 div */}
      <div className="w-full h-px bg-neutral-500" />
      {/* 소셜 로그인 버튼들 */}
      <div>
        <Link
          href="/sms"
          className="primary-btn flex h-10 items-center justify-center gap-3"
        >
          <span>
            <ChatBubbleOvalLeftIcon className="size-6" />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
