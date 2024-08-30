import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
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
import { of, switchMap, takeUntil } from 'rxjs';

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
  ],
  templateUrl: './edit-recipe-pg.component.html',
})
export class EditRecipePgComponent extends Unsubscriber implements OnInit {
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
        switchMap((params: any) =>
          params.id ? this.store.getRecipeById(params.id) : of(null)
        )
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

  onFileUpload(event: Event) {}

  onSubmit() {
    console.log(this.editRecipeForm);
  }
}
