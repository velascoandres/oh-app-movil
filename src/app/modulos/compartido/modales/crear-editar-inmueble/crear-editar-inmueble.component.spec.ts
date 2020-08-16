import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearEditarInmuebleComponent } from './crear-editar-inmueble.component';

describe('CrearEditarInmuebleComponent', () => {
  let component: CrearEditarInmuebleComponent;
  let fixture: ComponentFixture<CrearEditarInmuebleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarInmuebleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearEditarInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
