class Dispatcher {

    #signals;

    constructor() {

        this.#signals = undefined;

    }

    connect( type, signal ) {

        if ( this.#signals === undefined ) {

            this.#signals = {};

        }

        const signals = this.#signals;

        if ( signals[type] === undefined ) {

            signals[type] = [];

        }

        if ( signals[type].indexOf(signal) === -1 ) {

            signals[type].push(signal);

        }

    }

    disconect( type, signal ) {

        if (this.#signals === undefined) return;

        const signals = this.#signals;
        const signalArray = signals[type];

        if ( signalArray !== undefined ) {

            const index = signalArray.indexOf(signal);

            if ( index !== -1 ) {

                signalArray.splice(index, 1);

            }
            
        }

    }

    hasSignal( type, listener ) {

		if ( this.#signals === undefined ) return false;

		const listeners = this.#signals;

		return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

	}

    emitSignal( signal ) {

        if (this.#signals === undefined) return;

        const signals = this.#signals;
        const signalArray = signals[signal.type];

        if (signalArray !== undefined) {

            signal.target = this;

            if ( signal.type === 'added' && typeof signal.target.ready === 'undefined' ) {

                return;

            }

            const array = signalArray.slice(0);

            for (let i = 0, l = array.length; i < l; i++) {

                array[i].call(this, signal);

            }

            signal.target = null;

        }
    }
    
}

export { Dispatcher };
// 0