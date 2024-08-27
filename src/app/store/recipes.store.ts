import { Recipe } from '../core/models/recipe.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { RecipesService } from '../services/todos/todos.service';
import { inject } from '@angular/core';

export type RecipesFilter = 'all' | 'name' | 'favorites' | 'category';

type RecipesState = {
  recipes: Recipe[];
  loading: boolean;
  filter: RecipesFilter;
};

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  filter: 'all',
};

export const RecipesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, recipesService = inject(RecipesService)) => ({
    async loadAll() {
      patchState(store, { loading: true });
      const recipes = await recipesService.getRecipes();
      patchState(store, { recipes, loading: false });
    },
  }))
);
