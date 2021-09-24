import { MenuElement } from "./menuElement.js";

/**
 * Open menu one finger which touch move on a screen.
 */
class TouchMenuElement extends MenuElement {

    constructor() {

        super();

        this.start = new Vector2( 0, 0);
        this.distance = new Vector2( 0, 0 );

        this.delay = 100;
        this.distanceYMax = 30;

    }

    connectedCallback() {

        super.connectedCallback();

        this.touchStartHandler = ( event ) => {

            this.start.x = event.touches[ 0 ].clientX;
            this.start.y = event.touches[ 0 ].clientY;
        
        }
        document.addEventListener( 'touchstart', this.touchStartHandler );

        this.touchMoveHandler =  ( event ) => {

            this.distance.x = event.touches[ 0 ].clientX - this.start.x;
            this.distance.y = event.touches[ 0 ].clientY - this.start.y;

            const isDelay = ( this.distance.x ) >= this.delay;  
            const isDistanceTrue =  Math.abs( this.distance.y ) < this.distanceYMax;
            if ( ( isDelay && isDistanceTrue ) && !this.isVisible ) {
        
                this.clickHome();
        
            }
        
        }
        document.addEventListener( 'touchmove', this.touchMoveHandler );

    }

    disconnectedCallback() {

        super.disconnectedCallback();

        document.removeEventListener( 'touchstart', this.touchStartHandler );
        document.removeEventListener( 'touchmove', this.touchMoveHandler );

    }

}

export { TouchMenuElement };