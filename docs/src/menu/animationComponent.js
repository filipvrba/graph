class AnimationComponent {

    constructor( parent ) {

        this.menu = document.getElementById( 'menu' );
        this.fade = document.getElementById( 'fade' );
        this.body = document.querySelector( 'body' );

        this.parent = parent;
        this.isActivate = false;
        this.speed = 0.3;

        this.finishEvent = new CustomEvent( 'animFinish' );

    }

    init() {

        this.animationStartHandler = () => {

            this.isActivate = true;

        }
        this.menu.addEventListener( 'animationstart', this.animationStartHandler );

        this.animationEndHandler = () => {

            this.isActivate = false;

            if ( !this.parent.isVisible ) {

                this.fade.style.zIndex = -10;
                document.dispatchEvent( closedMenuEvent );

            }

        }
        this.menu.addEventListener( 'animationend', this.animationEndHandler );

    }

    free() {

        this.menu.removeEventListener( 'animationstart', this.animationStartHandler );
        this.menu.removeEventListener( 'animationend', this.animationEndHandler );

    }

    visible( isVisible ) {

        if ( isVisible ) {

            // Menu in
            this.menu.style.animation = `menuMove-in ${ this.speed }s forwards 0s`;

            // // Fade in
            this.fade.style.animation = `fade-in ${ this.speed }s forwards 0s`;
            this.fade.style.zIndex = 10;

            // Disabled scroll page
            this.body.style.overflow = "hidden";


        } else {

            // Menu out
            this.menu.style.animation = `menuMove-out ${ this.speed }s forwards 0s`;

            // // Fade out
            this.fade.style.animation = `fade-out ${ this.speed }s forwards 0s`;

            // Activate scroll page
            this.body.style.overflow = "auto";

        }

    }

    getIsActivate() {

        return this.isActivate;

    }

}

export { AnimationComponent };