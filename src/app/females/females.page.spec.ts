import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FemalesPage } from './females.page';

describe('FemalesPage', () => {
  let component: FemalesPage;
  let fixture: ComponentFixture<FemalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FemalesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FemalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
