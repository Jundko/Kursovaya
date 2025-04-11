/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r h-full p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-6">
          <div className="avatar placeholder mb-3">
             <div className="bg-neutral text-neutral-content rounded-full w-16">
              <img src="/avatar.png" alt="User Avatar" />
            </div>
          </div>

      <div>
        <h2 className="font-semibold text-black text-lg">Алексей Сергеев</h2>
          <p className="text-sm text-gray-500">alex@yandex.ru</p>
        </div>
      </div>

      <nav className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-orange-500">
          <img src="/menu-icon.svg" alt="Меню" className="w-23 h-23" />
            <span>Меню</span>
        </div>

      <div className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-orange-500">
        <img src="/cart-icon-sidebar.svg" alt="Корзина" className="w-23 h-23" />
          <span>Корзина</span>
            </div>
        </nav>
      </div>
    
      <div className="mt-auto flex items-center justify-center gap-[9px]">
        <Link href="/" className="mr-auto flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition">
          <img src="/exit-icon.svg" alt="Выйти" className="w-23 h-23" />
          <span>Выйти</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;