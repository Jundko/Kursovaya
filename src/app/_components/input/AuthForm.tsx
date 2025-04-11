import Button from "./Button";
import Link from "next/link";

const AuthForm = () => {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-black">Вход</h2>

    <div className="mb-4">
      <label className="block text-gray-600 text-sm mb-1">Ваш email</label>
        <input type="email" placeholder="Email" className="input input-bordered w-full bg-white text-black" />
    </div>

    <div className="mb-6">
      <label className="block text-gray-600 text-sm mb-1">Ваш пароль</label>
        <input type="password" placeholder="Пароль" className="input input-bordered w-full bg-white text-black" />
    </div>
      <Link href="/menu" >
        <Button text="Вход" />
      </Link>
      <div className="text-center mt-4">
        <p className="text-gray-500 text-sm">Нет аккаунта?</p>
        <a href="/register" className="text-orange-500 font-medium block">Зарегистрироваться</a>
      </div>
    </div>
  );
};

export default AuthForm;
