import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, switchMap, of, Observable, map, tap } from 'rxjs';
import { Unsubscriber } from '../../services/unsubscriber/unsubscriber.service';
import { RecipesStore } from '../../store/recipes.store';
import { Recipe } from '../../core/models/recipe.model';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../../services/recipes/recipes.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-details-pg',
  standalone: true,
  imports: [MatListModule, CommonModule, MatIconModule],
  templateUrl: './details-pg.component.html',
})
export class DetailsPgComponent extends Unsubscriber implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(RecipesStore);
  isFavorite!: Boolean;

  public recipe$!: Observable<any>;
  ngOnInit(): void {
    // best practice needed on reload fetching recipes form resolver
    this.recipe$ = this.route.data.pipe(map((data) => data['recipe']));
  }

  addToFavorites(id: string, favorite: boolean) {
    // best practice needed on choosing favorites should I reload store and then get specific recipe?
    this.store
      .updateRecipe(id, { favorite })
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          return this.store.loadAll();
        }),
        tap(() => (this.recipe$ = this.store.getRecipeById(id)))
      )
      .subscribe();
  }
}
