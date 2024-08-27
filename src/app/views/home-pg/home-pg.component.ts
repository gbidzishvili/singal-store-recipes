import { Component, inject } from '@angular/core';
import { RecipesStore } from '../../store/recipes.store';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-home-pg',
  standalone: true,
  imports: [
    RecipesListComponent,
    MatSelectModule,
    MatFormField,
    MatInputModule,
    RecipeCardComponent,
  ],
  templateUrl: './home-pg.component.html',
})
export class HomePgComponent {
  store = inject(RecipesStore);
  ngOnInit() {
    this.loadRecipes().then(() => console.log('Recipes Loaded!'));
  }
  async loadRecipes() {
    await this.store.loadAll();
  }
}
