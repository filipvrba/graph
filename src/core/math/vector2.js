class Vector2 {

	constructor( x = 0, y = 0 ) {

		this.x = x;
		this.y = y;

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

		let l = x * x + y * y;

		
		
		if (l !== 0) {

			l = Math.sqrt( l );
			this.x /= l;
			this.y /= l;

		}

		return this;

	}

	normalized() {

		const v = this.clone();
		v.normalize();

		return v;

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

	distanceTo( vector ) {

		return Math.sqrt( this.distanceToSquared( vector ) );

	}

	distanceToSquared( v ) {

		const dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	}

	dot( v ) {

		return this.x * v.x + this.y * v.y;

	}

	sub( v ) {

		this.x -= v.x;
		this.y -= v.y;

		return this;

	}

	subScalar( scalar ) {

		this.x -= scalar;
		this.y -= scalar;

		return this;

	}
}

export { Vector2 };