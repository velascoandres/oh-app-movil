import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemInmuebleGestionComponent } from './item-inmueble-gestion.component';

describe('ItemInmuebleGestionComponent', () => {
  let component: ItemInmuebleGestionComponent;
  let fixture: ComponentFixture<ItemInmuebleGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInmuebleGestionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemInmuebleGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
