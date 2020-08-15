import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuInmueblesPage } from './menu-inmuebles.page';

describe('MenuInmueblesPage', () => {
  let component: MenuInmueblesPage;
  let fixture: ComponentFixture<MenuInmueblesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuInmueblesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuInmueblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
