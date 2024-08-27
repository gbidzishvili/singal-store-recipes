export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
  image: string;
  favorite: boolean;
};
