import Logo from './Logo';
import RegistrationForm from './RegistrationForm';

const RegisterPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <Logo />
      </div>
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegisterPage;