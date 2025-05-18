/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from 'react';
import { useCart } from '~/app/_context/cart-context';
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const Basket = () => {
  const { data: cartItems = [], refetch, error } = api.basket.getCartItems.useQuery();
  const { refreshCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    void refetch();
  }, []);

  const changeQuantity = api.basket.updateCartItemCount.useMutation({
    onSuccess: async() => {
      await refetch();
      await refreshCart();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const removeItem = api.basket.removeFromCart.useMutation({
    onSuccess: async() => {
      await refetch();
      await refreshCart();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 300;
  const total = subtotal + deliveryFee;

  const buyMutation = api.basket.buy.useMutation({
    onSuccess: async() => {
      await refetch();
      await refreshCart();
      router.push("/completed-order");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div className="flex flex-col flex-1 h-full w-full bg-white p-8 overflow-auto">
      <div className="p-6 border-b w-full">
        <h1 className="text-2xl font-bold text-black">Корзина</h1>
      </div>
      <label className="text-red-500">{error?.message}</label>
      <div className="divide-y w-full">
        {cartItems.map(item => (
          <div key={item.id} className="p-4 flex items-center w-full">
            <div className="h-16 w-16 flex-shrink-0">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-md"/>
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-orange-500">{item.price} ₽</p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500" 
                onClick={() => changeQuantity.mutate({ itemId: item.id, delta: -1 })}
                aria-label="Уменьшить количество"
              >
                <img src="/minus-icon.svg" alt="Minus" />
              </button>
              <span className="w-8 text-center">{String(item.quantity).padStart(2, '0')}</span>
              <button 
                className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white"
                onClick={() => changeQuantity.mutate({ itemId: item.id, delta: 1 })}
              >
                <img src="/plus-icon.svg" alt="Plus" />
              </button>
              <button 
                className="ml-2 text-gray-400" 
                onClick={() => removeItem.mutate({ itemId: item.id })}
              >
                <img src="/delete-icon.svg" alt="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 border-t space-y-4 w-full">
        <div className="flex justify-between w-full">
          <span>Итог</span>
          <span className="font-semibold">{subtotal} ₽</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Доставка</span>
          <span className="font-semibold">{deliveryFee} ₽</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t w-full">
          <span>Итого</span>
          <span>{total} ₽</span>
        </div>
      </div>
      <div className="p-6 w-full">
        <button
          className="mx-auto block w-80 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition font-semibold"
          onClick={() => buyMutation.mutate()}
          disabled={buyMutation.status === 'pending'}
        >
          {buyMutation.status === 'pending' ? "Оформление..." : "ОФОРМИТЬ"}
        </button>
      </div>
    </div>
  );
};

export default Basket;
