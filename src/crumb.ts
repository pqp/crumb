import * as PIXI from 'pixi.js';
import { charset } from './charset';

const RENDER_WIDTH = 160;
const RENDER_HEIGHT = 120;

const RENDER_SCALE = 4;

const WINDOW_WIDTH = RENDER_WIDTH * RENDER_SCALE;
const WINDOW_HEIGHT = RENDER_HEIGHT * RENDER_SCALE;

const GLYPH_WIDTH = 8;
const GLYPH_HEIGHT = 5;

interface ColorArray {
    [index: string]: number;
}

interface InputState {
    down: boolean,
    x: number,
    y: number,
}

interface Rect {
    x: number,
    y: number,
    width: number,
    height?: number
}

interface Circle {
    x: number,
    y: number,
    radius: number
}

interface Vector {
    x: number,
    y: number,
    length: number
}

let test: Vector;

// TODO: Palette switching?

// Arne's palette
// https://androidarts.com/palette/16pal.htm
const colors: ColorArray = {
    'black:': 0x000000,
    'gray': 0x9D9D9D,
    'white': 0xFFFFFF,
    'red': 0xBE2633,
    'pink': 0xE06F8B,
    'darkbrown': 0x493C2B,
    'brown': 0xA46422,
    'orange': 0xEB8931,
    'yellow': 0xF7E26B,
    'darkgreen': 0x2F484E,
    'green': 0x44891A,
    'slimegreen': 0xA3CE27,
    'nightblue': 0x1B2632,
    'seablue': 0x005784,
    'skyblue': 0x31A2F2,
    'cloudblue': 0xB2DCEF,
};

// keep a collection of rects
let rects: Rect[] = [];
let circles: Circle[] = [];

let graphics: PIXI.Graphics;
let renderTexture: PIXI.RenderTexture;
let canvas: PIXI.Sprite;
let currentColor: number;
let app: PIXI.Application<HTMLCanvasElement>;
let input: InputState = {
    down: false,
    x: 0,
    y: 0
};


let mouseDown = false;
let keyDown = false;

console.log(charset['a']);

function checkCollisions() {
}

function addListeners() {
    window.addEventListener("keydown",
        (event) => {
            keyDown = true;
        });

    window.addEventListener("keyup",
        (event) => {
            keyDown = false;
        });

    window.addEventListener("mousedown",
        (event) => {
            mouseDown = true;
        });

    window.addEventListener("mouseup",
        (event) => {
            mouseDown = false;
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
        input.down = (mouseDown === true || keyDown === true);

        checkCollisions();

        update(delta);

        app.renderer.render(graphics, { renderTexture, clear: true });
        rects = [];
        circles = [];
        graphics.clear();
    });
}

export function color(col: string) {
    currentColor = colors[col];

    // TODO: check that string/color is defined in array
}

export function text(x: number, y: number, str: string) {
    const initialX = x;
    const initialY = y;

    str = str.toLowerCase();

    [...str].forEach((char) => {
        if (char === '\n') {
            y += GLYPH_HEIGHT + 1;
            x = initialX;
            return;
        }
        if (char === ' ') {
            x += GLYPH_WIDTH + 1;
            return;
        }

        for (let j = 0; j < GLYPH_HEIGHT; j++) {
            for (let i = 0; i < GLYPH_WIDTH; i++) {
                let newX = x + i;
                let newY = y + j;

                if (char === ',') {
                    newY += 2;
                }

                if (charset[char] === undefined) {
                    char = 'block';
                }

                // remove newlines in character definition
                let glyph = [...charset[char]].filter(f => (f != '\n'));

                let c = glyph[j * GLYPH_WIDTH + i];
                if (c === 'x')
                    pixel(newX, newY);
            }
        }

        x += GLYPH_WIDTH + 1;
    });

    for (let c = 0; c < str.length; c++) {

    }
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

    circles.push(circle);

    graphics.beginFill(currentColor);
    graphics.drawCircle(x, y, radius);
    graphics.endFill();
}

export function line(x1: number, y1: number, x2: number, y2: number, thickness?: number) {

}

export { input };