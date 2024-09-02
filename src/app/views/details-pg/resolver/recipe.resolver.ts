import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RecipesStore } from '../../../store/recipes.store';
import { catchError, of, switchMap } from 'rxjs';

export const RecipeResolver: ResolveFn<any> = (route, state) => {
  const store = inject(RecipesStore);
  const id = route.queryParams['id'];
  return store.loadAll().pipe(
    switchMap(() => {
      return id ? store.getRecipeById(id) : of(null);
    }),
    catchError(() => of(null))
  );
};
