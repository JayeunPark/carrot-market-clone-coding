import FormInput from "../components/form-input";
import FormButton from "../components/form-btn";
import SocialLogin from "../components/social-login";

export default function Login() {
  // POST method 공부용 코드
  //   const onClick = async () => {
  //     const response = await fetch("/www/users", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: "nico",
  //         password: "1234",
  //       }),
  //     });
  //     console.log(await response.json());
  //   };

  //server Action
  async function handleForm(formData: FormData) {
    //use server: Next JS가 login이 submit 되었을 때 실행되어야한다는걸 알려줌
    //반드시 맨 첫줄에 있어야함
    "use server";
    console.log(formData.get("email"), formData.get("password"));
    console.log("i run in the server!");
  }

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
        <FormButton loading={false} text="Log in" />
      </form>
      {/* POST method 공부용 코드*/}
      {/* 버튼이 form 안에 있으면 submit 되어버림 
      <span onClick={onClick}> 
        <FormButton loading={false} text="Log in" /> 
       </span> */}
      <SocialLogin />
    </div>
  );
}
