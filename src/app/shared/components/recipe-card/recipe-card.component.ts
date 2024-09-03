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
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './recipe-card.component.html',
})
export class RecipeCardComponent {
  recipe = input.required<Recipe>();
  onEdit = output<string>();
  onDelete = output<string>();
  onFavorite = output<any>();
  eventMap: { [key: string]: OutputEmitterRef<any> } = {
    edit: this.onEdit,
    delete: this.onDelete,
    favorite: this.onFavorite,
  };
  onClick(event: Event, id: string, action: string) {
    event.stopPropagation();
    this.eventMap[action].emit(id);
  }
  addToFavorites(event: any, id: string, favorite: boolean) {
    // best practice needed on choosing favorites should I reload store and then get specific recipe?
    event.stopPropagation();
    this.onFavorite.emit({ id, favorite });
  }
}
