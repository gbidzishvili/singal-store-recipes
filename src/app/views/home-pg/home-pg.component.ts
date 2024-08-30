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
import { takeUntil } from 'rxjs';
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
  constructor() {
    super();
    effect(() => {
      // const filter = this.filter();
      // // filter?.value = this.store.filter();
      // console.log(filter, this.store.filter());
    });
  }
  ngOnInit() {
    this.loadRecipes().pipe(takeUntil(this.destroy$)).subscribe(console.log);
  }
  onChangeValue(event: any) {
    console.log(event);
  }
  loadRecipes() {
    return this.store.loadAll();
  }

  handleEditClick(id: string) {
    this.router.navigate(['/edit'], { queryParams: { id: id } });
  }
  handleDeleteClick(id: string) {
    if (confirm('Do you want to delete this Recipe'))
      this.store
        .deleteRecipe(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((v) => console.log('delete recipe in home-pg', v));
  }
  goTo(endpoint: string) {
    this.router.navigate([endpoint]);
  }
}
