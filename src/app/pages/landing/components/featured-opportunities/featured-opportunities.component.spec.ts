import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedOpportunitiesComponent } from './featured-opportunities.component';

describe('FeaturedOpportunitiesComponent', () => {
  let component: FeaturedOpportunitiesComponent;
  let fixture: ComponentFixture<FeaturedOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedOpportunitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
