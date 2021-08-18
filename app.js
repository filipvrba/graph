import * as engine from './core/engine.js'
const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const clock = new engine.Clock();

/**
 * Scene
 */
const scene = new engine.Scene();
scene.addRenderer(ctx);
scene.setPosition(10, 10);

// Create pie and add to group for custom transformace
const pieChart = new engine.PieChart([
    {
        value: 40,
        name: "pc"
    },
    {
        value: 200,
        name: "mobile"
    },
    {
        value: 500,
        name: "tablet"
    },
    {
        value: 500,
        name: "other"
    }
]);
//pieChart.setPosition( canvas.width / 2, canvas.height / 2 );
//pieChart.scale = new engine.Vector2(200, 20);
scene.add(pieChart);

// const x = new engine.Vector2(1, 0);
// const y = new engine.Vector2(0, 1);
// const origin = new engine.Vector2(3, 1);
// const transform = new engine.Transform2D(x, y, origin);

// const x1 = new engine.Vector2(1, 0);
// const y1 = new engine.Vector2(0, 1);
// const origin1 = new engine.Vector2(10, 10);
// const transformChild1 = new engine.Transform2D(x1, y1, origin1);

// const tran = transform.calculateChildWorld(transformChild1);
//const tran = transform.calculateChildWorld(transformChild1);

//console.log(tran);


/**
 * Loop
 */
 function tick() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update
    const dataTime = clock.getDT;
    for (let i = 0; i < scene.children.length; i++) {
        scene.children[i].dispatchEvent( { type: 'update', dt: dataTime } );
    }

    requestAnimationFrame(tick);
     
 }
 
 tick();