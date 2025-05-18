/* eslint-disable @next/next/no-img-element */
"use client";

import Sidebar from "../menu/Sidebar";

const CompletedOrder = () => {
  return (
    <div className="flex w-full h-screen bg-white">
        <Sidebar /> 
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-md w-full px-4 flex flex-col items-center text-center">
          <div className="w-64 h-64 mb-8">
            <img src="/pizzaend.png" alt="Pizza End" />
          </div>
          
          <h1 className="text-2xl font-medium mb-2">Ваш заказ успешно оформлен!</h1>
          
          <div className="mt-8">
            <button className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition font-medium">
              СДЕЛАТЬ НОВЫЙ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedOrder;