import { Vector2 } from "./vector2";

class Mathf {
    static radians(degrees) {
        return degrees * Math.PI / 180;
    }

    static degrees(radians) {

        return radians * 180 / Math.PI;

    }

    static per2deg(percentage) {
        return (percentage / 100) * 360;
    }

    static percentage(min, max) {
        return (100 * min) / max;
    }

    static lerp(value1, value2, alpha) {

		return( value2 - value1 ) * alpha;
	}

    static lerp2( a, b, t ) {

		return a + ( b - a ) * t;

	}

    static radianToVector( radian ) {

        return new Vector2( Math.cos( radian ), Math.sin( radian ) );

	}
}

export { Mathf };