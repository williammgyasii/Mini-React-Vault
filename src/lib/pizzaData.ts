export type PizzaDataType = {
  name: string;
  ingredients: string;
  photoName?: string;
  price?: number;
  soldOut?: boolean;
};

export const PizzaData: PizzaDataType[] = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "../public/images/alan-hardman-SU1LFoeEUkk-unsplash.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "../public/images/ivan-torres-MQUqbmszGGM-unsplash.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "../public/images/sahal-hameed-Nq9KlQTTEbQ-unsplash.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "../public/images/shourav-sheikh-a66sGfOnnqQ-unsplash.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "../public/images/nik-owens-40OJLYVWeeM-unsplash.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "../public/images/ivan-torres-MQUqbmszGGM-unsplash.jpg",
    soldOut: false,
  },
];
