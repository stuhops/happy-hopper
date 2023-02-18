import { Injectable } from '@angular/core';
import { CanvasContext } from 'src/app/models/canvas-context.model';
import { Coords } from 'src/app/models/coords.model';
import { WHSize } from 'src/app/models/wh-size.model';

@Injectable({
  providedIn: 'root',
})
export class GraphicService {
  static clearCanvas(canvasContext: CanvasContext) {
    canvasContext.context.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
  }

  static drawTexture(
    canvas: CanvasContext,
    image: any, // TODO
    center: Coords,
    rotation: number,
    size: WHSize,
  ) {
    canvas.context.save();

    canvas.context.translate(center.x, center.y);
    canvas.context.rotate(rotation);
    canvas.context.translate(-center.x, -center.y);

    canvas.context.drawImage(
      image,
      center.x - size.width / 2,
      center.y - size.height / 2,
      size.width,
      size.height,
    );

    canvas.context.restore();
  }
}
