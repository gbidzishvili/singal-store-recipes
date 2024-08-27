import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../core/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  http = inject(HttpClient);
  getRecipes() {
    return this.http.get<Recipe[]>('http://localhost:3000/recipes');
  }
  addRecipe(partialRecipe: Partial<Recipe>) {
    const recipe = {
      id: Math.random().toString(36).substring(2, 9),
      ...partialRecipe,
    };
    return this.http.post<Recipe>('http://localhost:3000/recipes', recipe);
  }
}
