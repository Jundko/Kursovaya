/* eslint-disable @next/next/no-img-element */
const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl text-black">Меню</h1>
      <div className="relative w-80">
        <img src="/search-icon.svg" alt="Поиск" className="w-15 h-15 absolute top-5 left-4" />
          <input
            type="text"
            placeholder="Введите блюдо или состав"
            className="w-full pl-10 pr-4 py-4 rounded-2xl border bg-gray-100 shadow-sm placeholder-gray-400 focus:outline-none"
          />
      <div className="absolute left-3 top-2.5">
        </div>
      </div>
    </div>
  );
};

export default Header;
