import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipePgComponent } from './add-recipe-pg.component';

describe('AddRecipePgComponent', () => {
  let component: AddRecipePgComponent;
  let fixture: ComponentFixture<AddRecipePgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipePgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipePgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
