import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Md5 } from 'ts-md5/dist/md5';

describe('AppComponent', () => {
   let component: AppComponent;
   let fixture: ComponentFixture<AppComponent>;
   let canvasEl: HTMLCanvasElement;
   let canvasCtx: CanvasRenderingContext2D;
   const MYCANVAS_FINGERPRINT = "bebce8b08f55921c935093d2d3e5f508";

   beforeEach(async(() => {
      TestBed.configureTestingModule({
      declarations: [
      AppComponent
      ],
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      canvasEl = fixture.nativeElement.querySelector('canvas');
      canvasCtx = component.ctx;
   });
   it('should create the app', () => {
      expect(component).toBeTruthy();
   });

   it(`should have as title 'canvasTesting'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('canvasTesting');
   });

   it('should render title in a h1 tag', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Welcome to canvasTesting!');
   });
   describe('Canvas', () => {
      it('succeed drawing with original drawing', () => {
         // draw canvas image
         component.ngAfterViewInit();

         // compute fingerprint and compare ... it should fail first and then pass
         let imageData = canvasCtx.getImageData(0, 0, canvasEl.width, canvasEl.height)
         let figerPrint = Md5.hashStr(imageData.data.toString());
         expect(figerPrint).toBe(MYCANVAS_FINGERPRINT);
      });
      it('fail drawing with with additional drawing elements', () => {
         // draw canvas image
         component.ngAfterViewInit();

         // draw a dot in the middle of the canvas
         canvasCtx.fillRect(100,50,1,1); // fill in the pixel at (10,10)

         // compute fingerprint and compare ... it should fail
         let imageData = canvasCtx.getImageData(0, 0, canvasEl.width, canvasEl.height)
         let figerPrint = Md5.hashStr(imageData.data.toString());
         expect(figerPrint).not.toBe(MYCANVAS_FINGERPRINT);
      });
   });
});
