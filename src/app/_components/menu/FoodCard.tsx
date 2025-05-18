/* eslint-disable @next/next/no-img-element */
"use client";

import { api } from "~/trpc/react";
import { useCart } from "../../_context/cart-context";

interface FoodCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
}

function FoodCard({ title, description, price, rating, imageUrl, id }: FoodCardProps) {
  const { refreshCart } = useCart();
  
  const { mutate: addToCart, isPending } = api.basket.addToCart.useMutation({
    onSuccess: () => {
      void refreshCart(); 
    },
    onError: (error) => {
      console.error("Ошибка при добавлении в корзину:", error.message);
    }
  });

  const handleAddToCart = () => {
    if (isPending) return; 
    addToCart({ dishId: id });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
      <div className="relative"> 
        <img src={imageUrl} alt={title} className="w-full h-52 object-cover rounded-xl" />
        <div className="absolute top-2 left-2 bg-white text-black px-2 py-1 rounded-full">
          <span>{price}</span>
          <span className="text-orange-500 px-1">₽</span>
        </div>
        <div className="absolute top-2 right-2">
          <button onClick={handleAddToCart} disabled={isPending} className={`bg-orange-500 p-2 rounded-full transition cursor-pointer ${
            isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
            }`}>
            <img src="/cart-icon.svg" alt="Корзина" className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-[-14px] left-2 h-8 w-16 inline-flex items-center gap-1 bg-white text-black px-3 py-1 rounded-full">
          <span className="text-sm font-medium">{rating}</span>
          <img src="/star-icon.svg" alt="Звездочка" className="w-3 h-5" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-black">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default FoodCard;