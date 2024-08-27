import { Component, inject } from '@angular/core';
import { RecipesStore } from '../../store/recipes.store';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { Unsubscriber } from '../../core/services/unsubscriber.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-pg',
  standalone: true,
  imports: [MatSelectModule, MatFormField, MatInputModule, RecipeCardComponent],
  templateUrl: './home-pg.component.html',
})
export class HomePgComponent extends Unsubscriber {
  constructor() {
    super();
  }
  store = inject(RecipesStore);
  ngOnInit() {
    this.loadRecipes().pipe(takeUntil(this.destroy$)).subscribe(console.log);
  }
  loadRecipes() {
    return this.store.loadAll();
  }
}
