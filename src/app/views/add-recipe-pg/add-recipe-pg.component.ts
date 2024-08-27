import { Component, inject, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-recipe-pg',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    TextFieldModule,
    MatSelectModule,
    CommonModule,
    MatCheckboxModule,
  ],
  templateUrl: './add-recipe-pg.component.html',
})
export class AddRecipePgComponent implements OnInit {
  public fb = inject(FormBuilder);
  recipeForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.recipeForm = this.fb.group({
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
  getIngredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  onSubmit() {}
}
