import * as PIXI from 'pixi.js';

const RENDER_WIDTH = 160;
const RENDER_HEIGHT = 120;

const RENDER_SCALE = 4;

const WINDOW_WIDTH = RENDER_WIDTH * RENDER_SCALE;
const WINDOW_HEIGHT = RENDER_HEIGHT * RENDER_SCALE;

interface ColorArray {
    [index : string]: number;
}

interface InputState {
    down: boolean,
    x: number,
    y: number,
};

// TODO: Palette switching

const colors : ColorArray = {
    'blue' : 0x0000FF,
    'white' : 0xFFFFFF
};

// keep a collection of rects
let rects: Object[] = [];

let graphics : PIXI.Graphics;
let renderTexture : PIXI.RenderTexture;
let canvas : PIXI.Sprite;
let currentColor : number;
let app : PIXI.Application<HTMLCanvasElement>;
let input: InputState = {
    down: false,
    x: 0,
    y: 0
};

let a =
`
xxxxx
xxxxx
xxxxx
`;

console.log(a);

function checkCollisions() {
}

function addListeners() {
    window.addEventListener("keydown", 
    (event) => {
        console.log("Key is down");
    });

    window.addEventListener("mousedown",
    (event) => {
        console.log("Mouse is down");
    });

    window.addEventListener("mousemove",
    (event) => {
        input.x = event.clientX / RENDER_SCALE;
        input.y = event.clientY / RENDER_SCALE;
    });
}

export function start(update: Function) {
    app = new PIXI.Application<HTMLCanvasElement>({
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        background: '#1099bb',
    });

    renderTexture = PIXI.RenderTexture.create({
        width: RENDER_WIDTH,
        height: RENDER_HEIGHT,
        scaleMode: PIXI.SCALE_MODES.NEAREST,
        resolution: 1,
        multisample: PIXI.MSAA_QUALITY.NONE
    });

    document.body.appendChild(app.view);

    graphics = new PIXI.Graphics();

    canvas = new PIXI.Sprite(renderTexture);
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    app.stage.addChild(canvas);

    addListeners();

    app.ticker.add((delta) => {
        checkCollisions();

        update(delta);

        app.renderer.render(graphics, { renderTexture, clear: true });
        rects = [];
        graphics.clear();
    });
}

export function color(col: string) {
    currentColor = colors[col];
}

export function text(x : number, y : number, str: string) {
}

export function rect(x: number, y: number, width: number, height?: number) {
    height = (height === undefined) ? width : height;

    let rect = {
        x: x,
        y: y,
        width: width,
        height: height,
        color: currentColor,
        colliding: {}
    };

    rects.push(rect);

    graphics.beginFill(currentColor);
    graphics.drawRect(x, y, width, height);
    graphics.endFill();
}

export function pixel(x: number, y: number) {
    rect(x, y, 1);
}

export function circle(x: number, y: number, radius: number) {
    let circle = {
        x: x,
        y: y,
        radius: radius,
        color: currentColor,
        colliding: {}
    };
}

export function line(x1 : number, y1: number, x2: number, y2: number, thickness? : number) {

}

export {input};