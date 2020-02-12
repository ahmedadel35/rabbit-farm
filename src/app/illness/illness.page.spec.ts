import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IllnessPage } from './illness.page';

describe('IllnessPage', () => {
  let component: IllnessPage;
  let fixture: ComponentFixture<IllnessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllnessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IllnessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
