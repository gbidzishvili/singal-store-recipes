import {
  Component,
  Input,
  Output,
  EventEmitter,
  output,
  input,
} from '@angular/core';
import { Recipe } from '../../../core/models/recipe.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './recipe-card.component.html',
})
export class RecipeCardComponent {
  recipe = input.required<Recipe>();
  onEdit = output<string>();
  onDelete = output<string>();
  onEditIconClick(id: string) {
    this.onEdit.emit(id);
  }
  onDeleteIconClick(id: string) {
    this.onDelete.emit(id);
  }
}
