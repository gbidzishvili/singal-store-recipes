import { Component, inject, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RecipesStore } from '../../store/recipes.store';
import { catchError, map, of, takeUntil, tap } from 'rxjs';
import { Unsubscriber } from '../../services/unsubscriber/unsubscriber.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-add-recipe-pg',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    TextFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './add-recipe-pg.component.html',
})
export class AddRecipePgComponent extends Unsubscriber implements OnInit {
  isSaved = false;
  store = inject(RecipesStore);
  fb = inject(FormBuilder);
  readonly dialog = inject(MatDialog);
  addRecipeForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.addRecipeForm = this.fb.group({
      id: [],
      title: [],
      description: [],
      ingredients: this.fb.array(
        // creating 3 initial input for ingredients
        ['', '', ''].map((value: any) => this.fb.control(value))
      ),
      category: [],
      image: [],
      favorite: [false],
    });
  }
  getIngredients() {
    return this.addRecipeForm.get('ingredients') as FormArray;
  }
  addNewIngredient() {
    this.getIngredients().push(new FormControl());
  }
  removeIngredient(idx: number) {
    this.getIngredients().removeAt(idx);
  }
  onFileUpload(event: Event) {
    const fileInputElement = event.target as HTMLInputElement;
    if (fileInputElement.files && fileInputElement.files[0]) {
      let reader = new FileReader();
      reader.onloadend = () => {
        let baseStringResult = reader.result as string;
        this.addRecipeForm.patchValue({ image: baseStringResult });
      };
      reader.readAsDataURL(fileInputElement.files[0]);
    }
  }
  canDeactivate(): any {
    if (this.addRecipeForm.dirty) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: {
          title: 'usaved Changes',
          content: 'Changes will not be saved would you like to proceed',
        },
      });
      return dialogRef.afterClosed().pipe(map((result) => !!result));
    }
    return true;
  }
  onSubmit() {
    this.store
      .addRecipe(this.addRecipeForm.value)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => alert('recipe added')),
        catchError((_) => {
          alert('error has happened');
          return of([]);
        })
      )
      .subscribe();
  }
}
