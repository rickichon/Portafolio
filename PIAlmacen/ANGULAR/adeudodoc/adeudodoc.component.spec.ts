import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdeudodocComponent } from './adeudodoc.component';

describe('AdeudodocComponent', () => {
  let component: AdeudodocComponent;
  let fixture: ComponentFixture<AdeudodocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdeudodocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdeudodocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
