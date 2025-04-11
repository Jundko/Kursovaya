import Button from "./Button";
import Link from 'next/link';

const RegisterForm = () => {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-black">Регистрация</h2>

    <div className="mb-4">
      <label className="block text-gray-600 text-sm mb-1">Ваш email</label>
        <input type="email" placeholder="Email" className="input input-bordered w-full bg-white text-black" />
    </div>

    <div className="mb-6">
      <label className="block text-gray-600 text-sm mb-1">Ваш пароль</label>
        <input type="password" placeholder="Пароль" className="input input-bordered w-full bg-white text-black" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-600 text-sm mb-1">Ваше имя</label>
        <input type="text" placeholder="Имя" className="input input-bordered w-full bg-white text-black" />
    </div>
      <Button text="Зарегистрироваться" />

    <div className="text-center mt-4">
      <p className="text-gray-500 text-sm">Есть аккаунт?</p>
        <Link href="/" className="text-[14px] text-orange-500 font-medium">Войти</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
