import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { UniqueIdService } from "../../services/unique-id/unique-id.service";
import { LikeWidgetComponent } from "./like-widget.component";
import { LikeWidgetModule } from "./like-widget.module";

describe(LikeWidgetComponent.name, () => {

  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  //Ambos os metodos com e sem await vão funcionar
  beforeEach(async () => {

    // TestBed.configureTestingModule({
    //   imports: [LikeWidgetModule]
    // });

    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  //a variavel criada "done" tem que ser obrigatóriamente chamada ou vai quebrar
  // it(`#${LikeWidgetComponent.prototype.like.name}
  //   should trigger emission when called`, done => {
  //     fixture.detectChanges();
  //     component.liked.subscribe(() => {
  //       done();
  //     });
  //     component.like();
  // });

  it(`#${LikeWidgetComponent.prototype.like.name}
  should trigger (@Output liked) when called`, () => {
    spyOn(component.liked, 'emit'); //transforma o metodo emit em um spy
    fixture.detectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled(); //toHaveBeenCalled só funciona com o metodo spy
  });
});
