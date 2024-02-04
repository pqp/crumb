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

interface CollisionObject {
    [index: string]: boolean;
}

interface Collision {
    [index: string]: CollisionObject;
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
    height?: number,
    color: string,
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

// TODO: Palette switching?

// Arne's palette
// https://androidarts.com/palette/16pal.htm
const colors: ColorArray = {
    'black': 0x000000,
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
let currentColorName: string;
let app: PIXI.Application<HTMLCanvasElement>;
let input: InputState = {
    down: false,
    x: 0,
    y: 0
};

let mouseDown = false;
let keyDown = false;

function checkCollision(rect1: Rect): Collision {
    for (let i = 0; i < rects.length; i++) {
        const rect2 = rects[i];

        if (rect1 === rect2) return;

        const left = (rect1.x < rect2.x + rect2.width);
        const right = (rect1.x + rect1.width > rect2.x);
        const top = (rect1.y < rect2.y + rect2.height);
        const bottom = (rect1.y + rect1.height > rect2.y);

        // TODO: return Collision object

        let collision: Collision;
        collision = {};
        collision.colliding = {};

        if ((left && right) && (top && bottom)) {
            let color = rect1.color;

            collision.colliding[color] = true;
        }

        return collision;
    }
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
            input.x = Math.round(event.clientX / RENDER_SCALE);
            input.y = Math.round(event.clientY / RENDER_SCALE);
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

        update(delta);

        rects = [];
        circles = [];

        app.renderer.render(graphics, { renderTexture, clear: true });
        graphics.clear();
    });
}

export function color(colorName: string) {
    const color = colors[colorName];

    if (color === undefined) {
        console.error("undefined color");
    }

    currentColor = color;
    currentColorName = colorName;
}

export function text(x: number, y: number, str: string) {
    const initialX = Math.round(x);
    const initialY = Math.round(y);

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
}

export function rect(x: number, y: number, width: number, height?: number): Collision {
    height = (height === undefined) ? width : height;

    let rect = {
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(width),
        height: Math.round(height),
        color: currentColorName,
    };

    const color = colors[currentColorName];

    const collision = checkCollision(rect);

    rects.push(rect);

    graphics.beginFill(color);
    graphics.drawRect(x, y, width, height);
    graphics.endFill();

    return collision;
}

export function pixel(x: number, y: number) {
    graphics.beginFill(currentColor);
    graphics.drawRect(Math.round(x), Math.round(y), 1, 1);
    graphics.endFill();
}

export function circle(x: number, y: number, radius: number) {
    let circle = {
        x: Math.round(x),
        y: Math.round(y),
        radius: Math.round(radius),
        color: currentColor,
        colliding: {
        }
    };

    circles.push(circle);

    graphics.beginFill(currentColor);
    graphics.drawCircle(Math.round(x), Math.round(y), radius);
    graphics.endFill();
}

export function line(x1: number, y1: number, x2: number, y2: number, thickness?: number) {

}

export { input };