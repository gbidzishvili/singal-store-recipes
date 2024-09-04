import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RecipesStore } from '../../store/recipes.store';
import { Unsubscriber } from '../../services/unsubscriber/unsubscriber.service';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../core/models/recipe.model';
import { catchError, of, switchMap, takeUntil, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-recipe-pg',
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
  ],
  templateUrl: './edit-recipe-pg.component.html',
})
export class EditRecipePgComponent extends Unsubscriber implements OnInit {
  id = '';
  store = inject(RecipesStore);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  editRecipeForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
    this.fillEditRecipeForm();
  }

  initForm() {
    this.editRecipeForm = this.fb.group({
      id: [],
      title: [],
      description: [],
      ingredients: this.fb.array(
        // creating 3 initial input for ingredients
        ['', '', ''].map((value: any) => this.fb.control(value))
      ),
      category: [],
      image: [],
      favorite: [],
    });
  }
  fillEditRecipeForm() {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: any) => {
          this.id = params.id;
          return params.id ? this.store.getRecipeById(params.id) : of(null);
        })
      )
      .subscribe((recipe) =>
        recipe
          ? this.editRecipeForm.patchValue(recipe)
          : console.error('recipe not found to edit')
      );
  }
  getIngredients() {
    return this.editRecipeForm.get('ingredients') as FormArray;
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
        this.editRecipeForm.patchValue({ image: baseStringResult });
      };
      reader.readAsDataURL(fileInputElement.files[0]);
    }
  }

  onSubmit() {
    console.log('apache', this.id);
    this.store
      .updateRecipe(this.id, this.editRecipeForm.value)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => alert('recipe has updated')),
        catchError((error) => {
          alert('error has happened');
          return of([]);
        })
      )
      .subscribe();
  }
}
