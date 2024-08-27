import { Recipe } from '../core/models/recipe.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { RecipesService } from '../services/recipes/recipes.service';
import { inject } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';

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
    loadAll() {
      patchState(store, { loading: true });
      return recipesService.getRecipes().pipe(
        switchMap((recipes: any) => {
          patchState(store, { recipes, loading: false });
          return of(recipes);
        }),
        catchError((error: any) => {
          console.error('Error Fetching recipes:', error);
          patchState(store, { loading: false });
          return of([]);
        })
      );
    },
  }))
);
