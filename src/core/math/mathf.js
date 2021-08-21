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

        if (value1 >= value2 - 0.001) {
            return 0;
        }

		return( value2 - value1 ) * alpha;
	}
}

export { Mathf };