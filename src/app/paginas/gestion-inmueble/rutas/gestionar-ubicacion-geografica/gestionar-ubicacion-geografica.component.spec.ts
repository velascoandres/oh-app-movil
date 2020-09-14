import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionarUbicacionGeograficaComponent } from './gestionar-ubicacion-geografica.component';

describe('GestionarUbicacionGeograficaComponent', () => {
  let component: GestionarUbicacionGeograficaComponent;
  let fixture: ComponentFixture<GestionarUbicacionGeograficaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarUbicacionGeograficaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionarUbicacionGeograficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
