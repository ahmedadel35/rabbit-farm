import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonyPage } from './mony.page';

describe('MonyPage', () => {
  let component: MonyPage;
  let fixture: ComponentFixture<MonyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
