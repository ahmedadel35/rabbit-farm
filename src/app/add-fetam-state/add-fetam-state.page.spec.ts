import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFetamStatePage } from './add-fetam-state.page';

describe('AddFetamStatePage', () => {
  let component: AddFetamStatePage;
  let fixture: ComponentFixture<AddFetamStatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFetamStatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFetamStatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
