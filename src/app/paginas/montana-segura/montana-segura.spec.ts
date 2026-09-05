import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontanaSegura } from './montana-segura';

describe('MontanaSegura', () => {
  let component: MontanaSegura;
  let fixture: ComponentFixture<MontanaSegura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MontanaSegura],
    }).compileComponents();

    fixture = TestBed.createComponent(MontanaSegura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
