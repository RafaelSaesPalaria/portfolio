import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaComponent } from './java.component';

describe('JavaComponent', () => {
  let component: JavaComponent;
  let fixture: ComponentFixture<JavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
