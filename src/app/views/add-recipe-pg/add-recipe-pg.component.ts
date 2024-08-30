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
import { RecipesStore } from '../../store/recipes.store';
import { takeUntil } from 'rxjs';
import { Unsubscriber } from '../../services/unsubscriber/unsubscriber.service';
import { MatButtonModule } from '@angular/material/button';
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
  ],
  templateUrl: './add-recipe-pg.component.html',
})
export class AddRecipePgComponent extends Unsubscriber implements OnInit {
  store = inject(RecipesStore);
  fb = inject(FormBuilder);
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
      favorite: [],
    });
  }
  getIngredients() {
    return this.addRecipeForm.get('ingredients') as FormArray;
  }
  onFileUpload(event: Event) {
    const fileInputElement = event.target as HTMLInputElement;
    if (fileInputElement.files && fileInputElement.files[0]) {
      console.log(fileInputElement.files[0]);
      let reader = new FileReader();
      reader.onloadend = () => {
        let baseStringResult = reader.result as string;
        this.addRecipeForm.patchValue({ image: baseStringResult });
      };
      reader.readAsDataURL(fileInputElement.files[0]);
    }
  }
  onSubmit() {
    // console.log(this.addRecipeForm);
    this.store
      .addRecipe(this.addRecipeForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((recipe) =>
        console.log('subscription in add recipe:', recipe)
      );
  }
}
