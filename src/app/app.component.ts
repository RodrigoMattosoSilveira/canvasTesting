import { AfterViewInit, Component, ElementRef, Input, ViewChild  } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   @ViewChild('myCanvas') myCanvas: ElementRef;

   title = 'canvasTesting';
   canvasEl: HTMLCanvasElement
   ctx: CanvasRenderingContext2D;

   // see https://blog.angular-university.io/angular-viewchild/
   // for recommendation to use ngAfterViewInit instead of ngOnInit
   ngAfterViewInit() {
      this.canvasEl = this.myCanvas.nativeElement
      this.ctx = this.canvasEl.getContext('2d');
      this.ctx.font = "30px Arial";
      this.ctx.strokeText("Hello World", 10, 50);
      this.ctx.beginPath();
      this.ctx.arc(95, 50, 40, 0, 2 * Math.PI);
      this.ctx.stroke();
   }
}
