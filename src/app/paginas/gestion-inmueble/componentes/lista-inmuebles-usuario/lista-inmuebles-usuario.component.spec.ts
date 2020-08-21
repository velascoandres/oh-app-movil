import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaInmueblesUsuarioComponent } from './lista-inmuebles-usuario.component';

describe('ListaInmueblesUsuarioComponent', () => {
  let component: ListaInmueblesUsuarioComponent;
  let fixture: ComponentFixture<ListaInmueblesUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInmueblesUsuarioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaInmueblesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
