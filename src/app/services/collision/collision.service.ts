import { Injectable } from '@angular/core';
import { Coords } from 'src/app/models/coords.model';
import { Circle, Line } from 'src/app/models/shapes.model';

@Injectable({
  providedIn: 'root',
})
export class CollisionService {
  static lineCircleIntersect(line: Line, circle: Circle): boolean {
    const pointVector: Coords = {
      x: line.point2.x - line.point1.x,
      y: line.point2.y - line.point1.y,
    };
    const pointCircleVector: Coords = {
      x: circle.center.x - line.point1.x,
      y: circle.center.y - line.point1.y,
    };
    const vectDistSqrd: number = pointVector.x * pointVector.x + pointVector.y * pointVector.y;
    const dot: number = pointVector.x * pointCircleVector.x + pointVector.y * pointCircleVector.y;
    const circleLineDistSqrd =
      circle.center.x ** 2 +
      circle.center.y ** 2 -
      line.point1.x ** 2 -
      line.point1.y ** 2 -
      dot ** 2 / vectDistSqrd;
    return circleLineDistSqrd <= circle.radius ** 2;
  }
}
