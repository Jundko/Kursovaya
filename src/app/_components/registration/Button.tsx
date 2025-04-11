interface ButtonProps {
  text: string;
}

function Button ({ text }: ButtonProps) {
  return (
    <div className="flex justify-center">
    <button className="w-52 bg-orange-500 text-white py-3 rounded-full shadow-lg hover:bg-orange-600 transition">
      {text}
    </button>
    </div>
  );
};

export default Button;