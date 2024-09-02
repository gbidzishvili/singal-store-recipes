import {
  Component,
  Input,
  Output,
  EventEmitter,
  output,
  input,
  Signal,
  OutputEmitterRef,
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
  eventMap: { [key: string]: OutputEmitterRef<string> } = {
    edit: this.onEdit,
    delete: this.onDelete,
  };
  onClick(event: Event, id: string, action: string) {
    event.stopPropagation();
    this.eventMap[action].emit(id);
  }
}
