# Fluid Meter

Dependency free vanilla library to represent progress as the amount of fluid in a container.

### Demo

https://aarcoraci.github.io/fluid-meter/

### Installation

```
npm i fluid-meter
```

### Usage

The library is higlhly customizable but it can be easily initialized. It **requires** a DOM container with a setted width and height (inline or css).

```html
<div id="target" style="width:500px;height:500px"></div>
```

```js
import { CircularFluidMeter } from 'fluid-meter';

const target = document.querySelector('#target');
new CircularFluidMeter(target, {
  initialProgress: 33
});
```

#### Configuration

Here are some examples on how to use it. It's with typescript but should be the same with plain javascript.
https://github.com/aarcoraci/fluid-meter/blob/main/src/main.ts

| option             | type                            | default                                                                                                                        | info                                                                                             |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| initialProgress    | number                          | 0                                                                                                                              | initial progress to show                                                                         |
| borderWidth        | number or BreakpointValueConfig | \[{ resolution: 0, value: 10 },{ resolution: 768, value: 15 },{ resolution: 1440, value: 30 }\]                                | border width. Can be a number or an array of breakpoint value configs                            |
| borderColor        | string                          | #75758b                                                                                                                        | color of the outer border.                                                                       |
| padding            | number                          | 30                                                                                                                             | space between the boundaries of the container and the meter. Usefull if dropshadow is enabled    |
| backgroundColor    | string                          | #9f9fae                                                                                                                        | meter background color                                                                           |
| showProgress       | boolean                         | TRUE                                                                                                                           | displays or not the center text                                                                  |
| showBubbles        | boolean                         | TRUE                                                                                                                           | displays or not the bubbles                                                                      |
| bubbleColor        | string                          | #ffffff                                                                                                                        | color of the bubbles                                                                             |
| textColor          | string                          | #ffffff                                                                                                                        | text color                                                                                       |
| textDropShadow     | boolean                         | TRUE                                                                                                                           | text has a small shadow. Helps when colors are too similar or on difficult contrasting scenarios |
| fontFamily         | string                          | Arial                                                                                                                          | name of the typeface to use                                                                      |
| fontSize           | number or BreakpointValueConfig | \[{ resolution: 0, value: 13 },{ resolution: 320, value: 30 },{ resolution: 718, value: 90 },{ resolution: 1440, value: 95 }\] | tex size. Can be a number of an array of breakpoint value configs                                |
| use3D              | boolean                         | TRUE                                                                                                                           | enables details that gives the impresion of depth                                                |
| dropShadow         | boolean                         | TRUE                                                                                                                           | meter drops shadow. Requires some padding to show correctly                                      |
| progressFormatter  | (value: number) => string       | (value: number) => Math.round(value).toString()                                                                                | a function that transforms the value shown in the center of the meter                            |
| fluidConfiguration | FluidLayerConfiguration         | {color: '#ff0000',waveSpeed: Speed.NORMAL,horizontalSpeed: Speed.NORMAL}                                                       | values of the fluid being displayed                                                              |

#### API and Methods

##### example:

```js
import { CircularFluidMeter } from 'fluid-meter';

const target = document.querySelector('#target');
const m = new CircularFluidMeter(target, {
  initialProgress: 50
});

m.targetProgress = 50;
m.dropShadow = false;
m.use3D = false;
```

##### list of setters and getters

| setter / getter   | info                      |
| ----------------- | ------------------------- | ------------------------- |
| progress          | number                    |
| borderWidth       | number                    | BreakpointValueConfig\[\] |
| borderColor       | string                    |
| meterPadding      | number                    |
| backgroundColor   | string                    |
| textColor         | string                    |
| fontFamily        | string                    |
| fontSize          | number                    | BreakpointValueConfig\[\] |
| textDropShadow    | boolean                   |
| showProgress      | boolean                   |
| showBubbles       | boolean                   |
| bubbleColor       | string                    |
| use3D             | boolean                   |
| dropShadow        | boolean                   |
| progressFormatter | (value: number) => string |
