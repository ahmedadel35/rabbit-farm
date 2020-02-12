import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFetamPage } from './add-fetam.page';

describe('AddFetamPage', () => {
  let component: AddFetamPage;
  let fixture: ComponentFixture<AddFetamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFetamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFetamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
