import { Recipe } from './recipe.model';

export const Recipes: Recipe[] = [
  {
    title: 'title1',
    image:
      'https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.jpg',
    description: 'desrptin1',
    ingredients: ['ing1', 'ing2', 'ing3'],
    category: 'Breakfast',
    favorite: true,
  },
  {
    title: 'title2',
    image:
      'https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.jpg',
    description: 'desrptin1',
    ingredients: ['ing12', 'ing22', 'ing32'],
    category: 'Dinner',
    favorite: false,
  },
  {
    title: 'title2',
    image:
      'https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.jpg',
    description: 'desrptin1',
    ingredients: ['ingf', 'ingsd', 'ingsfd'],
    category: 'Lunch',
    favorite: true,
  },
];
