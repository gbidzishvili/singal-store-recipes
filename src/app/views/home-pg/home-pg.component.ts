import {
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { RecipesStore } from '../../store/recipes.store';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { Unsubscriber } from '../../services/unsubscriber/unsubscriber.service';
import { switchMap, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-pg',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormField,
    MatInputModule,
    RecipeCardComponent,
    RouterModule,
  ],
  templateUrl: './home-pg.component.html',
})
export class HomePgComponent extends Unsubscriber {
  store = inject(RecipesStore);
  router = inject(Router);
  filter = viewChild<ElementRef>('filter');
  ngOnInit() {
    this.loadRecipes().pipe(takeUntil(this.destroy$)).subscribe(console.log);
  }
  loadRecipes() {
    return this.store.loadAll();
  }
  onChangeFavorites(value: string) {
    // console.log(event.value, event, 'asdfasdlika');
    const filter = value === 'All' ? false : true;
    this.store.updateFilter({ favorites: filter });
  }
  onChangeCategory(value: string) {
    this.store.updateFilter({ category: value });
  }
  onInputChange(value: string) {
    console.log(value);
    this.store.updateFilter({ name: value });
  }
  handleDeleteClick(id: string) {
    if (confirm('Do you want to delete this Recipe'))
      this.store
        .deleteRecipe(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((v) => console.log('delete recipe in home-pg', v));
  }
  handleFavoriteClick(event: any) {
    // best practice needed change store without reloading view
    console.log(event);
    this.store
      .updateRecipe(event.id, { favorite: event.favorite })
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.store.loadAll())
      )
      .subscribe(console.log);
    console.log('recipes', this.store.recipes());
  }
  goTo(id: string, endpoint: string) {
    this.router.navigate([endpoint], { queryParams: { id: id } });
  }
}
