const { 
    Engine, 
    Render, 
    Runner, 
    World, 
    Bodies,
    Body,
    Events
} = Matter;

const cellsHorizontal = 14;
const cellsVertical = 10;
const width  = window.innerWidth;
const height = window.innerHeight;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const wallWidth = 2;

const engine = Engine.create();

//////////////////////////////////////////////////////////////////////////////////////////
// Disable gravity:
//////////////////////////////////////////////////////////////////////////////////////////
engine.world.gravity.y = 0;

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

//////////////////////////////////////////////////////////////////////////////////////////
// WALLS
//////////////////////////////////////////////////////////////////////////////////////////
const walls = [
    // TOP WALL
    Bodies.rectangle( width / 2, 0, width, wallWidth, {isStatic: true} ),
    // BOTTOM WALL
    Bodies.rectangle( width / 2, height, width, wallWidth, {isStatic: true} ),
    // LEFT WALL
    Bodies.rectangle( 0, height / 2, wallWidth, height, {isStatic: true} ),
    // RIGHT WALL
    Bodies.rectangle( width, height / 2, wallWidth, height, {isStatic: true} )
];
World.add(world, walls);

//////////////////////////////////////////////////////////////////////////////////////////
// Maze Generation
//////////////////////////////////////////////////////////////////////////////////////////
const shuffle = (array) => {
    let counter = array.length;
    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
            const temp = array[counter];
        array[counter] = array[index];
          array[index] = temp;
    }
    return array;
};

const grid = Array(cellsVertical).fill(null)
                .map( () => Array(cellsHorizontal).fill(false) );

const verticals = Array(cellsVertical).fill(null)
                    .map( () => Array(cellsHorizontal - 1).fill(false) );

const horizontals = Array(cellsVertical - 1).fill(null)
                    .map( () => Array(cellsHorizontal).fill(false) );

// console.log("grid:", grid);
// console.log("verticals:", verticals);
// console.log("horizontals:", horizontals);

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);
//console.log(`startRow: ${startRow}, startColumn: ${startColumn}`);

const stepThroughCell = (row, column) => {
    // If already have visisted [row, column], return.
    if (grid[row][column] === true) {
        return;
    }

    // Mark cell as visited (true).
    grid[row][column] = true;

    // Assemble randomly-ordered list of neighboring cells.
    //   CELL ABOVE: [row - 1, column]
    //   CELL RIGHT: [row, column + 1]
    //    CELL LEFT: [row, column - 1]
    //   CELL BELOW: [row + 1], column]
    
    //console.log(`(row): ${row}, column: ${column}]`);
    const neighbors = shuffle([
        [row - 1, column,       'up'    ], // UP
        [row,     column + 1,   'right' ], // RIGHT
        [row + 1, column,       'down'  ], // DOWN
        [row,     column - 1,   'left'  ]  // LEFT
    ]);
 
    // For each neighboring cell, do the following:
    //  1. Assure that neighbor traversal is in-bounds of grid array.
    //  2. If neighbor has already been visited, continue to next neighbor.
    //  3. Remove wall of neighbor that has been visited.
    //  4. Visit cell (call stepThroughCell(row, column))

    // For each neighboring cell, do the following:
    for (let neighbor of neighbors) {

        const [nextRow, nextColumn, direction] = neighbor;

        //  1. Assure that neighbor traversal is in-bounds of grid array.
        if ( (nextRow < 0 || nextRow >= cellsVertical) 
                || (nextColumn < 0 || nextColumn >= cellsHorizontal) ) {
            continue;
        }

        //  2. If neighbor has already been visited, continue to next neighbor.
        if (grid[nextRow][nextColumn] == true) {
            continue;
        }

        //  3. Remove wall of neighbor that has been visited.
        if (direction === 'left') {
            verticals[row][column - 1] = true;
        }
        if (direction === 'right') {
            verticals[row][column] = true;
        }
        //console.log("verticals", verticals);

        if (direction === 'up') {
            horizontals[row - 1][column] = true;
        }
        if (direction === 'down') {
            horizontals[row][column] = true;
        }
        //console.log("horizontals", horizontals);

        stepThroughCell(nextRow, nextColumn);
    }

};

stepThroughCell(startRow, startColumn);
//console.log("grid:", grid);

horizontals.forEach( (row, rowIndex) => {
    row.forEach( (open, columnIndex) => {
        if (open) { 
            return; 
        }
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX / 2, // x-coordinate
            rowIndex * unitLengthY + unitLengthY, // y-coordinate
            unitLengthX, // width
            5, // height
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        );
        World.add(world, wall);
   });
});

verticals.forEach( (row, rowIndex) => {
    row.forEach( (open, columnIndex) => {
        if (open) {
            return;
        }
        const wall = Bodies.rectangle(
            (columnIndex * unitLengthX) + unitLengthX, // x-coordinate
            (rowIndex * unitLengthY) + (unitLengthY / 2), // y-coordinate
            5, // width
            unitLengthY, // height
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        );
        World.add(world, wall);
    });
});

////////////////////////////////////////////////
// GOAL
////////////////////////////////////////////////
const goal = Bodies.rectangle (
    width   - (unitLengthX / 2), // x-coordinate
    height  - (unitLengthY / 2), // y-coordinate
    unitLengthX * 0.7, // width
    unitLengthY * 0.7, // height
    {
        label: 'goal', // needed to detect a 'win' event
        isStatic: true,
        render: {
            fillStyle: 'green'
        }
    }
);
World.add(world, goal);

////////////////////////////////////////////////
// BALL
////////////////////////////////////////////////
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(
    unitLengthX / 2, // x-coordinate
    unitLengthY / 2, // y-coordinate
    ballRadius, // radius
    {
        label: 'ball', // needed to detect a 'win' event
        render: {
            fillSyle: 'blue'
        }
    } 
);
World.add(world, ball);

document.addEventListener('keydown', event => {
    const {x, y} = ball.velocity;
  
    // UP
    if (event.keyCode === 87) {
        Body.setVelocity(ball, {x, y: y - 5} );
    }
    // RIGHT
    if (event.keyCode === 68) {
        Body.setVelocity(ball, {x: x + 5, y} );
    }
    // DOWN
    if (event.keyCode === 83) {
        Body.setVelocity(ball, {x, y: y + 5} );
    }

    // LEFT
    if (event.keyCode === 65) {
        Body.setVelocity(ball, {x: x - 5, y} );
    }
});

//////////////////////////////////////////////////////////////////////////////////////////
// WIN CONDITION
//////////////////////////////////////////////////////////////////////////////////////////
Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach( (collision) => {
        const labels = ['ball', 'goal'];
        if (labels.includes(collision.bodyA.label)
                && labels.includes(collision.bodyB.label)) {
            world.gravity.y = 1;
            world.bodies.forEach(body => {
                if (body.label === 'wall') {
                    Body.setStatic(body, false);
                }
            });
        }
    });
});