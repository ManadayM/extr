import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryIconComponent } from './category-icon.component';

describe('CategoryIconComponent', () => {
  let component: CategoryIconComponent;
  let fixture: ComponentFixture<CategoryIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.icon = 'vegetables';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should throw an error if icon is not provided', () => {
    expect(() => fixture.detectChanges()).toThrowError('Required input [icon] not provided.');
  });
});
