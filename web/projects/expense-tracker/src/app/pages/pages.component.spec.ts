import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../core/services';

import { PagesComponent } from './pages.component';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj(AuthService, ['loggedIn']);
    await TestBed.configureTestingModule({
      declarations: [PagesComponent],
      imports: [MatToolbarModule, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: authSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>

    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
