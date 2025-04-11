import Logo from "./Logo";
import AuthForm from "./AuthForm";

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <Logo />
      </div>
    <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
