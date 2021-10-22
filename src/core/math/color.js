class Color {

    constructor( rgb ) {

        if ( !rgb ) {

            /**
             * Colors palette - ZUGHY 32
             * https://lospec.com/palette-list/zughy-32
             */
            this.colors = [
                '#472d3c',
                '#5e3643',
                '#7a444a',
                '#a05b53',
                '#bf7958',
                '#eea160',
                '#f4cca1',
                '#b6d53c',
                '#71aa34',
                '#397b44',
                '#3c5956',
                '#302c2e',
                '#5a5353',
                '#7d7071',
                '#a0938e',
                '#cfc6b8',
                '#dff6f5',
                '#8aebf1',
                '#28ccdf',
                '#3978a8',
                '#394778',
                '#39314b',
                '#564064',
                '#8e478c',
                '#cd6093',
                '#ffaeb6',
                '#f4b41b',
                '#f47e1b',
                '#e6482e',
                '#a93b3b',
                '#827094',
                '#4f546b'
            ];

            this.bitMask = 0;

        } else {

            this.r = rgb.r;
            this.g = rgb.g;
            this.b = rgb.b;

        }

    }

    lerp( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	}

    getRandomPalettte() {

        const idRandom = Math.floor( Math.random() * this.colors.length );
        const idMask = 2 ** idRandom;

        if ( ( this.bitMask & idMask ) !== 0 ) {

            return this.getRandomPalettte();

        } 

        this.bitMask |= idMask;

        return this.colors[ idRandom ];

    }

    toString() {

        return `rgb(${ this.r }, ${ this.g }, ${ this.b })`;

    }

    static ranColorStyle() {

        return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    }

}

export { Color };