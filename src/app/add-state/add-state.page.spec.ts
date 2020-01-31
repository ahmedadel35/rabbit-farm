import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddStatePage } from './add-state.page';

describe('AddStatePage', () => {
  let component: AddStatePage;
  let fixture: ComponentFixture<AddStatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddStatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
