import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MalesPage } from './males.page';

describe('MalesPage', () => {
  let component: MalesPage;
  let fixture: ComponentFixture<MalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
