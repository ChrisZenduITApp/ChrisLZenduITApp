import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderPage } from './placeholder-page';

describe('PlaceholderPage', () => {
  let component: PlaceholderPage;
  let fixture: ComponentFixture<PlaceholderPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceholderPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceholderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the placeholder message', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const messageElement = compiled.querySelector('.placeholder-message');
      expect(messageElement?.textContent).toContain('Placeholder');
    });
});
