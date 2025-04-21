import FoodDetails from '../FoodDetails/FoodDetails';


const Food = [
  {
    id: 1,
    title: 'Наслаждение',
    description: 'Салями, руккола, помидоры, оливки',
    price: 300,
    rating: 4.5,
    imageUrl: 'pizza.png',
  },
  {
    id: 2,
    title: 'Такос',
    description: 'Острый перец, лепёшка, фарш',
    price: 250,
    rating: 4.5,
    imageUrl: 'tacos.png',
  },
  {
    id: 3,
    title: 'Портерхаус-стейк',
    description: 'Свинина, картофель-беби, малиновый соус',
    price: 450,
    rating: 4.5,
    imageUrl: 'meat.png',
  },
  {
    id: 4,
    title: 'Римская пицца',
    description: 'Вяленые томаты, моцарелла, дикие брокколи, сыр пармезан',
    price: 500,
    rating: 4.5,
    imageUrl: 'pizza1.png',
  }
];

const MenuGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-10">
      {Food.map((item, index) => (
        <FoodDetails key={index} {...item} />
      ))}
    </div>
  );
};

export default MenuGrid;
