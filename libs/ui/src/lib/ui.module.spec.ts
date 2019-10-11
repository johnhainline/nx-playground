import { async, TestBed } from '@angular/core/testing';
import {UiModule} from "@nx-example/ui";

describe('UIModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiModule).toBeDefined();
  });
});
