/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "../../_context/cart-context";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();
  const { cartCount } = useCart();

  const displayName = session?.user 
    ? [session.user.firstname, session.user.surname].filter(Boolean).join(' ') || session.user.name || "Пользователь"
    : "Пользователь";

  if (!session) {
    return null;
  }

  return (
    <aside className="w-64 bg-white border-r h-screen p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-6">
          <div className="avatar placeholder mb-3">
            <div className="bg-neutral text-neutral-content rounded-full w-16">
              <img src="/avatar.png" alt="User Avatar" />
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-black text-lg">{displayName}</h2>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>

        <nav className="space-y-4">
          <Link href="/menu" className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-orange-500">
            <img src="/menu-icon.svg" alt="Меню" className="w-23 h-23" />
            <span>Меню</span>
          </Link>

          <Link href="/cartpage" className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-orange-500">
            <img src="/cart-icon-sidebar.svg" alt="Корзина" className="w-23 h-23" />
            <span>Корзина</span>
            {cartCount > 0 && (
              <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    
      <div className="mt-auto flex items-center justify-center gap-[9px]">
        <Link href="/api/auth/signout" className="mr-auto flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition">
          <img src="/exit-icon.svg" alt="Выйти" className="w-23 h-23" />
          <span>Выйти</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;