import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { Recipe } from '../../../../core/models/recipe.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [MatCardModule, MatFormField],
  templateUrl: './recipes-list.component.html',
})
export class RecipesListComponent {
  @Input() recipes!: Recipe[];
}
