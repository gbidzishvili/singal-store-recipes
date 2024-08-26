import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipePgComponent } from './edit-recipe-pg.component';

describe('EditRecipePgComponent', () => {
  let component: EditRecipePgComponent;
  let fixture: ComponentFixture<EditRecipePgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecipePgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecipePgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
