import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionInmueblePage } from './gestion-inmueble.page';

describe('GestionInmueblePage', () => {
  let component: GestionInmueblePage;
  let fixture: ComponentFixture<GestionInmueblePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionInmueblePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionInmueblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
