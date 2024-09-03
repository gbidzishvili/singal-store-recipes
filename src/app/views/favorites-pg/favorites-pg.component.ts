import { Component, inject, OnInit } from '@angular/core';
import { RecipesStore } from '../../store/recipes.store';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Unsubscriber } from '../../services/unsubscriber/unsubscriber.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { of, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorites-pg',
  standalone: true,
  imports: [RecipeCardComponent, RouterLink, MatProgressSpinner],
  templateUrl: './favorites-pg.component.html',
})
export class FavoritesPgComponent extends Unsubscriber {
  store = inject(RecipesStore);
  router = inject(Router);
  readonly dialog = inject(MatDialog);

  handleDeleteClick(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Recipe',
        content: 'Would you like to delete this recipe',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((result: any) => {
          if (result) {
            return this.store.deleteRecipe(id);
          }
          return of(null);
        })
      )
      .subscribe();
  }
  handleFavoriteClick(event: any) {
    // best practice needed change store without reloading view
    this.store
      .updateRecipe(event.id, { favorite: event.favorite })
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.store.loadAll())
      )
      .subscribe();
  }
  goTo(id: string, endpoint: string) {
    this.router.navigate([endpoint], { queryParams: { id: id } });
  }
}
