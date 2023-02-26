import { Injectable } from '@angular/core';
import { CanvasContext } from 'src/app/models/canvas-context.model';
import { Coords } from 'src/app/models/coords.model';
import { Circle } from 'src/app/models/shapes.model';
import { WHSize } from 'src/app/models/wh-size.model';

@Injectable({
  providedIn: 'root',
})
export class GraphicService {
  static clearCanvas(canvasContext: CanvasContext) {
    canvasContext.context.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
  }

  static drawBox(
    canvas: CanvasContext,
    options: {
      position: Coords;
      size: WHSize;
      lineWidth?: number;
      fillStyle?: string;
      strokeStyle?: string;
    },
  ): void {
    canvas.context.save();
    canvas.context.lineWidth = options.lineWidth ?? 0;
    canvas.context.fillStyle = options.fillStyle ?? 'black';
    canvas.context.strokeStyle = options.strokeStyle ?? 'black';

    canvas.context.beginPath();
    canvas.context.moveTo(options.position.x, options.position.y);

    canvas.context.lineTo(options.position.x + options.size.width, options.position.y);
    canvas.context.lineTo(options.position.x + options.size.width, options.position.y);
    canvas.context.lineTo(
      options.position.x + options.size.width,
      options.position.y + options.size.height,
    );
    canvas.context.lineTo(options.position.x, options.position.y + options.size.height);

    canvas.context.closePath();
    if (options.fillStyle) canvas.context.fill();
    if (options.strokeStyle) canvas.context.stroke();

    canvas.context.restore();
  }

  static drawCircle(
    canvas: CanvasContext,
    options: {
      circle: Circle;
      lineWidth?: number;
      fillStyle?: string;
      strokeStyle?: string;
    },
  ): void {
    canvas.context.save();
    canvas.context.lineWidth = options.lineWidth ?? 0;
    canvas.context.fillStyle = options.fillStyle ?? 'black';
    canvas.context.strokeStyle = options.strokeStyle ?? 'black';

    canvas.context.beginPath();
    canvas.context.arc(
      options.circle.center.x,
      options.circle.center.y,
      options.circle.radius,
      0,
      2 * Math.PI,
    );
    canvas.context.closePath();

    if (options.fillStyle) canvas.context.fill();
    if (options.strokeStyle) canvas.context.stroke();

    canvas.context.restore();
  }

  static drawText(
    canvas: CanvasContext,
    options: {
      lineWidth: number;
      text: string;
      font?: string;
      fillStyle?: string;
      position?: Coords;
    },
  ): void {
    canvas.context.save();

    options['fillStyle'] = options['fillStyle'] ?? 'black';
    options['font'] = options['font'] ?? '32px Arial';
    options['position'] = options['position'] ?? { x: 0, y: 0 };
    canvas.context.fillText(options.text, options.position.x, options.position.y);

    canvas.context.restore();
  }

  static drawTexture(
    canvas: CanvasContext,
    image: HTMLImageElement, // TODO
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
