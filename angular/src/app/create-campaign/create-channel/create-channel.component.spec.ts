import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCreateCampaignComponent } from './create-channel.component';

describe('HeaderCreateCampaignComponent', () => {
  let component: HeaderCreateCampaignComponent;
  let fixture: ComponentFixture<HeaderCreateCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderCreateCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCreateCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
