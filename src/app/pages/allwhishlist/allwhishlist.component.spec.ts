import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllwhishlistComponent } from './allwhishlist.component';

describe('AllwhishlistComponent', () => {
  let component: AllwhishlistComponent;
  let fixture: ComponentFixture<AllwhishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllwhishlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllwhishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
