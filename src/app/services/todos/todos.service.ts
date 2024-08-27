import { Injectable } from '@angular/core';
import { Recipes } from '../../core/models/mock-data';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  async getRecipes() {
    await sleep(1000);
    return Recipes;
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
