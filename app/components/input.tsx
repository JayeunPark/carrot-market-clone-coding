import { InputHTMLAttributes } from "react";

// 따로 이유가 없다면 type보다 interface사용을 권장함(ts공식)
interface InputProps {
  // InputHTMLAttributes<HTMLInputElement>에서 받고있는 prop이기 때문에
  // 여기에서 또 적어줄 필요가 없음.
  // name은 내가 받는 데이터가 어떤 필드에서 오는건지 알아야하기 때문에 남김
  // type: string;
  // placeholder: string;
  // required: boolean;
  errors?: string[];
  name: string;
}
export default function Input({
  errors = [],
  name,
  // 나머지 props를 저장함
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1
             focus:ring-4 transition ring-neutral-500 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
