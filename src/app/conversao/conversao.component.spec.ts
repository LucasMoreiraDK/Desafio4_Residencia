import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversaoComponent } from './conversao.component';

describe('ConversaoComponent', () => {
  let component: ConversaoComponent;
  let fixture: ComponentFixture<ConversaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversaoComponent]
    });
    fixture = TestBed.createComponent(ConversaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
