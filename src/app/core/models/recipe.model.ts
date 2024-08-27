export type Recipe = {
  title: string;
  description: string;
  ingredients: string[];
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
  image: string;
  favorite: boolean;
};
