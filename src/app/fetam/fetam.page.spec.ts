import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FetamPage } from './fetam.page';

describe('FetamPage', () => {
  let component: FetamPage;
  let fixture: ComponentFixture<FetamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FetamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
