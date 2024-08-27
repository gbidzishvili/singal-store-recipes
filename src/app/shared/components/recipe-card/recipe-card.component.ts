import { Component, Input } from '@angular/core';
import { Recipe } from '../../../core/models/recipe.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './recipe-card.component.html',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}
