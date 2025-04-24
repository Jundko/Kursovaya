/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import Sidebar from '~/app/_components/menu/Sidebar';

interface Dish {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  ingredients: string[];
}

const Food: Dish[] = [
  {
    id: 1,
    title: 'Наслаждение',
    description: 'Салями, руккола, помидоры, оливки',
    price: 300,
    rating: 4.5,
    imageUrl: '/pizza.png',
    ingredients: ['Салями', 'Руккола', 'Помидоры', 'Оливки']
  },
  {
    id: 2,
    title: 'Такос',
    description: 'Острый перец, лепёшка, фарш',
    price: 250,
    rating: 4.5,
    imageUrl: '/tacos.png',
    ingredients: ['Острый перец', 'Лепёшка', 'Фарш']
  },
  {
    id: 3,
    title: 'Портерхаус-стейк',
    description: 'Свинина, картофель-беби, малиновый соус',
    price: 450,
    rating: 4.5,
    imageUrl: '/meat.png',
    ingredients: ['Свинина', 'Картофель-беби', 'Малиновый соус']
  },
  {
    id: 4,
    title: 'Римская пицца',
    description: 'Вяленые томаты, моцарелла, дикие брокколи, сыр пармезан',
    price: 500,
    rating: 4.5,
    imageUrl: '/pizza1.png',
    ingredients: ['Вяленые томаты' , 'Моцарелла' , 'Дикие брокколи', 'Сыр пармезан']
  }
];

export default function DishDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const dish = Food.find(item => item.id === Number(params.id));

  if (!dish) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <p className="text-xl">Блюдо не найдено</p>
        </div>
      </div>
    );
  }

  const goBack = () => {router.back()};

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        {/* Карточка блюда */}
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Заголовок и кнопка назад */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Заголовок и кнопка назад */}
            <div className="p-6 flex items-center gap-4">
              <button onClick={goBack}className="text-gray-500 hover:text-orange-500 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>  
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-black">{dish.title}</h1> 
            </div>
          </div>

          {/* Изображение блюда */}
          <div className="h-52 bg-gray-200 flex items-center justify-center">
            <img 
              src={dish.imageUrl} 
              alt={dish.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Информация о блюде */}
          <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-gray-600">Цена</span>
              <p className="text-xl text-black">{dish.price}₽</p>
            </div>
            <div>
              <span className="text-gray-600">Рейтинг</span>
              <div className="flex items-center gap-1">
                <p className="text-xl text-black">{dish.rating}</p>
                <img src="/star-icon.svg" alt="Звездочка" className="w-5 h-5" />
              </div>
            </div>
        </div>
            <div className="mb-6">
              <h3 className="font-semibold text-black mb-2">Состав:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {dish.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            {/* Кнопка "В корзину" */}
            <button className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-full hover:bg-orange-600 transition">
              <img src="/cart-icon.svg" alt="Корзина" className="w-5 h-5"/>
              <span>В корзину</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}