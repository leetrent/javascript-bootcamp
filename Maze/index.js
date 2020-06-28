const { 
    Engine, 
    Render, 
    Runner, 
    World, 
    Bodies
} = Matter;

const cells = 5;
const width  = 600;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// WALLS
const walls = [
    // TOP WALL
    Bodies.rectangle( width / 2, 0, width, 40, {isStatic: true} ),
    // BOTTOM WALL
    Bodies.rectangle( width / 2, height, width, 40, {isStatic: true} ),
    // LEFT WALL
    Bodies.rectangle( 0, height / 2, 40, height, {isStatic: true} ),
    // RIGHT WALL
    Bodies.rectangle( width, height / 2, 40, height, {isStatic: true} )
];
World.add(world, walls);


// Maze Generation
const grid          = Array(cells).fill(null).map( () => Array(cells).fill(false) );
const verticals     = Array(cells).fill(null).map( () => Array(cells - 1).fill(false) );
const horizontals   = Array(cells -1).fill(null).map( () => Array(cells).fill(false) );

console.log("grid:", grid);
console.log("verticals:", verticals);
console.log("horizontals:", horizontals);
