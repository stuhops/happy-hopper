import { Coords } from 'src/models/coords.model';
import { Circle, Line } from 'src/models/shapes.model';
import { WHSize } from 'src/app/models/wh-size.model';

export class CollisionService {
  static lineCircleIntersect(line: Line, circle: Circle): boolean {
    const v1 = { x: line.point2.x - line.point1.x, y: line.point2.y - line.point1.y };
    const v2 = { x: line.point1.x - circle.center.x, y: line.point1.y - circle.center.y };
    const b = -2 * (v1.x * v2.x + v1.y * v2.y);
    const c = 2 * (v1.x * v1.x + v1.y * v1.y);
    const d = Math.sqrt(
      b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius),
    );
    if (isNaN(d)) {
      // no intercept
      return false;
    }
    // These represent the unit distance of point one and two on the line
    const u1 = (b - d) / c;
    const u2 = (b + d) / c;
    if (u1 <= 1 && u1 >= 0) {
      // If point on the line segment
      return true;
    }
    if (u2 <= 1 && u2 >= 0) {
      // If point on the line segment
      return true;
    }
    return false;
  }

  static rectCircleIntersect(coords: Coords, size: WHSize, circle: Circle): boolean {
    const topLeft: Coords = coords;
    const topRight: Coords = { x: coords.x + size.width, y: coords.y };
    const bottomRight: Coords = { x: coords.x + size.width, y: coords.y + size.height };
    const bottomLeft: Coords = { x: coords.x, y: coords.y + size.height };

    const top = this.lineCircleIntersect({ point1: topLeft, point2: topRight }, circle);
    const right = this.lineCircleIntersect({ point1: topRight, point2: bottomRight }, circle);
    const bottom = this.lineCircleIntersect({ point1: bottomRight, point2: bottomLeft }, circle);
    const left = this.lineCircleIntersect({ point1: bottomLeft, point2: topLeft }, circle);
    const center =
      circle.center.x > coords.x &&
      circle.center.x < coords.x + size.width &&
      circle.center.y > coords.y &&
      circle.center.y < coords.y + size.height;

    return top || right || bottom || left || center;
  }
}
