import { Recipe } from '../core/models/recipe.model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { RecipesService } from '../services/recipes/recipes.service';
import { computed, inject } from '@angular/core';
import { catchError, of, switchMap, tap } from 'rxjs';

export type RecipesFilter = {
  name?: string;
  favorites?: boolean;
  category?: string;
};

type RecipesState = {
  recipes: Recipe[];
  loading: boolean;
  filter: RecipesFilter;
};

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  filter: { name: '', favorites: false, category: '' },
};

export const RecipesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, recipesService = inject(RecipesService)) => ({
    loadAll() {
      patchState(store, { loading: true });
      return recipesService.getRecipes().pipe(
        tap((recipes: any) => {
          patchState(store, { recipes, loading: false });
        }),
        catchError((error: any) => {
          console.error('Failed to load recipes:', error);
          patchState(store, { loading: false });
          return of([]);
        })
      );
    },
    addRecipe(partRecipe: Partial<Recipe>) {
      return recipesService.addRecipe(partRecipe).pipe(
        tap((recipe: Recipe) => {
          patchState(store, (state) => ({
            recipes: [...state.recipes, recipe],
          }));
        }),
        catchError((error: Error) => {
          console.error('Failed to add recipe:', error);
          return of([]);
        })
      );
    },
    deleteRecipe(id: string) {
      return recipesService.deleteRecipe(id).pipe(
        tap(() => {
          patchState(store, (state) => ({
            recipes: state.recipes.filter((recipe) => recipe.id !== id),
          }));
        }),
        catchError((error: Error) => {
          console.error('Failed to delete recipe', error);
          return of([]);
        })
      );
    },
    updateRecipe(id: string, newRecipe: Partial<Recipe>) {
      return recipesService.updateRecipe(id, newRecipe).pipe(
        tap(() => {
          patchState(store, (state) => ({
            recipes: state.recipes.map((recipe: Recipe) =>
              recipe.id === newRecipe.id ? { ...recipe, ...newRecipe } : recipe
            ),
          }));
        }),
        catchError((error: Error) => {
          console.error('Failed to update recipe', error);
          return of([]);
        })
      );
    },
    getRecipeById(id: string) {
      let recipe = store.recipes().find((recipe) => recipe.id === id);
      return recipe ? of(recipe) : of(null);
    },
    updateFilter(filter: RecipesFilter) {
      // patchState(store, {this.state.filter() filter });
      patchState(store, (state) => ({
        filter: { ...state.filter, ...filter },
      }));
    },
  })),
  withComputed((state) => ({
    filterdRecipes: computed(() => {
      let recipes = state.recipes();
      if (state?.filter?.favorites?.() === true) {
        recipes = recipes.filter((recipe) => recipe.favorite);
      }
      if (
        state?.filter?.category?.() &&
        state?.filter?.category?.() !== 'All'
      ) {
        recipes = recipes.filter(
          (recipe) => recipe.category === state?.filter?.category?.()
        );
      }
      if (state?.filter?.name?.()) {
        recipes = recipes.filter((recipe) =>
          recipe.title.includes(state?.filter?.name?.() as string)
        );
      }
      return recipes;
    }),
    favoriteRecipes: computed(() => {

        return state.recipes().filter(recipe=>recipe.favorite)
    })
  }
))
);
