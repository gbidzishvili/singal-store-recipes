import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../core/models/recipe.model';
import { Observable } from 'rxjs';
import { GuidGeneratorService } from '../guid/guid-generator.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  http = inject(HttpClient);
  guidService = inject(GuidGeneratorService);
  getRecipes() {
    return this.http.get<Recipe[]>('http://localhost:3000/recipes');
  }
  addRecipe(partialRecipe: Partial<Recipe>): Observable<Recipe> {
    const recipe = {
      ...partialRecipe,
      id: GuidGeneratorService.newGuid(),
    };
    return this.http.post<Recipe>('http://localhost:3000/recipes', recipe);
  }
  deleteRecipe(id: string) {
    return this.http.delete(`http://localhost:3000/recipes/${id}`);
  }
  updateRecipe(id: string, recipe: Recipe) {
    return this.http.put(`http://localhost:3000/recipes/${id}`, recipe);
  }
}
