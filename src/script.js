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
scene.addRenderer(ctx)

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
pieChart.position = new engine.Vector2(canvas.width / 2, canvas.height / 2);

scene.add(pieChart);

/**
 * Loop
 */
 function tick() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update
    scene.emitSignal( { type: 'update', dt: clock.getDT } );
 
    requestAnimationFrame(tick);
     
 }
 
 tick();