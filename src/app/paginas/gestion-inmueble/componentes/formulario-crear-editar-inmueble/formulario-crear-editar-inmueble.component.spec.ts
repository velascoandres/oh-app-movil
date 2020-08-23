import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioCrearEditarInmuebleComponent } from './formulario-crear-editar-inmueble.component';

describe('FormularioCrearEditarInmuebleComponent', () => {
  let component: FormularioCrearEditarInmuebleComponent;
  let fixture: ComponentFixture<FormularioCrearEditarInmuebleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCrearEditarInmuebleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioCrearEditarInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
