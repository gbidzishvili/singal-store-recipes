import { inject, Injectable } from '@angular/core';
import { Recipes } from '../../core/models/mock-data';
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
}
