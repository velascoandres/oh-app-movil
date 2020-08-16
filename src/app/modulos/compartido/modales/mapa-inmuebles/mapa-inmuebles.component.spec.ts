import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapaInmueblesComponent } from './mapa-inmuebles.component';

describe('MapaInmueblesComponent', () => {
  let component: MapaInmueblesComponent;
  let fixture: ComponentFixture<MapaInmueblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaInmueblesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaInmueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
