class Vector2 {

	constructor( x = 0, y = 0 ) {

		this.x = x;
		this.y = y;

	}

	static get ZERO() {

		return new this.constructor(0, 0);

	}

	static get LEFT() {

		return new this.constructor(1, 0);

	}

	static get RIGHT() {

		return new this.constructor(0, 1);

	}

	length() {

		const x = this.x;
		const y = this.y;

		return Math.sqrt(x * x + y * y);

	}

	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	}

	normalize() {

		let x = this.x;
		let y = this.y;

		const l = x * x + y * y;
		

		if (l !== 0) {

			x /= l;
			y /= l;

		}

		return this;

	}

	multiply( vector ) {

		this.x *= vector.x;
		this.y *= vector.y;

		return this;

	}

	multiplyScalar( scalar ) {

		this.x *= scalar;
		this.y *= scalar;

		return this;

	}

	clone() {

		return new this.constructor( this.x, this.y );

	}

	add( vector ) {

		this.x += vector.x;
		this.y += vector.y;

		return this;

	}

	equals( x, y ) {

		return ( ( x === this.x ) && ( y === this.y ) );

	}
}

export { Vector2 };