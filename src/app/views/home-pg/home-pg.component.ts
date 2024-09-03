import {
  ChangeDetectionStrategy,
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
import { of, switchMap, takeUntil, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { TooltipDirective } from '../../shared/directives/tooltip.directive';

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
    MatDialogModule,
    TooltipDirective,
  ],
  templateUrl: './home-pg.component.html',
})
export class HomePgComponent extends Unsubscriber {
  store = inject(RecipesStore);
  router = inject(Router);
  readonly dialog = inject(MatDialog);

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
