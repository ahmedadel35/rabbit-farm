import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowFetamPage } from './show-fetam.page';

describe('ShowFetamPage', () => {
  let component: ShowFetamPage;
  let fixture: ComponentFixture<ShowFetamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFetamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowFetamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
