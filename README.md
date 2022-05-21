# Fluid Meter

Dependency free library to represent progress as the amount of fluid in a container.

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

### Bundled version

A new bundled version has been added. It can be accessed via the IIFE on the global scope.

1 - Add the bundle file to your project (can be found as bundle.js in the /dist directory):

```html
<!-- make sure the path is correct -->
<script src="dist/bundle.js"></script>
```

2 - Access via the IIFE on the global scope (named **cfmModule**):

```js
const target = document.querySelector("#target");
new cfmModule.CircularFluidMeter(target, {
  initialProgress: 33,
});
```

#### Responsiveness

The library is prepared to work on a responsive scenario if needed via the BreakpointValueConfig:

```js
const config = {
  initialProgress: 75,
  borderWidth: [
    {
      resolution: 0,
      value: 15
    },
    {
      resolution: 1024,
      value: 60
    }
  ],
  fontSize: [
    {
      resolution: 0,
      value: 25
    },
    {
      resolution: 768,
      value: 50
    }
  ]
};
```

See the supported responsive values on the Configuration table

#### Configuration

Here are some examples on how to use it. It's with typescript but should be the same with plain javascript.
https://github.com/aarcoraci/fluid-meter/blob/main/src/main.ts

| option             | type                            | default                                                                  | info                                                                                             |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| initialProgress    | number                          | 0                                                                        | initial progress to show                                                                         |
| maxProgress        | number                          | 100                                                                      | max progress of the meter                                                                        |
| borderWidth        | number or BreakpointValueConfig | 30                                                                       | border width. Can be a number or an array of breakpoint value configs                            |
| borderColor        | string                          | #75758b                                                                  | color of the outer border.                                                                       |
| padding            | number                          | 30                                                                       | space between the boundaries of the container and the meter. Usefull if drop shadow is enabled   |
| backgroundColor    | string                          | #9f9fae                                                                  | meter background color                                                                           |
| showProgress       | boolean                         | true                                                                     | displays or not the center text                                                                  |
| showBubbles        | boolean                         | true                                                                     | displays or not the bubbles                                                                      |
| bubbleColor        | string                          | #ffffff                                                                  | color of the bubbles                                                                             |
| textColor          | string                          | #ffffff                                                                  | text color                                                                                       |
| textDropShadow     | boolean                         | true                                                                     | text has a small shadow. Helps when colors are too similar or on difficult contrasting scenarios |
| textShadowOpacity  | number                          | 1                                                                        | intensity of the shadow between 0 and 1: 0 invisible and 1 fully visible                         |
| textShadowColor    | string                          | #000000                                                                  | text shadow color                                                                                |
| fontFamily         | string                          | Arial                                                                    | name of the typeface to use                                                                      |
| fontSize           | number or BreakpointValueConfig | 30                                                                       | tex size. Can be a number of an array of breakpoint value configs                                |
| use3D              | boolean                         | true                                                                     | enables details that gives the impresion of depth                                                |
| dropShadow         | boolean                         | true                                                                     | meter drops shadow. Requires some padding to show correctly                                      |
| dropShadowColor    | string                          | #000000                                                                  | meter shadow color                                                                               |
| progressFormatter  | (value: number) => string       | (value: number) => Math.round(value).toString()                          | a function that transforms the value shown in the center of the meter                            |
| fluidConfiguration | FluidLayerConfiguration         | {color: '#ff0000',waveSpeed: Speed.NORMAL,horizontalSpeed: Speed.NORMAL} | values of the fluid being displayed                                                              |

#### API and Methods

##### Example:

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

##### List of setters and getters

| setter / getter                 | info                                |
| ------------------------------- | ----------------------------------- |
| progress                        | number                              |
| maxProgress (only getter)       | number                              |
| borderWidth                     | number or BreakpointValueConfig\[\] |
| borderColor                     | string                              |
| meterPadding                    | number                              |
| backgroundColor                 | string                              |
| textColor                       | string                              |
| fontFamily                      | string                              |
| fontSize                        | number or BreakpointValueConfig\[\] |
| textDropShadow                  | boolean                             |
| textShadowOpacity               | number (between 0 and 1)            |
| textShadowColor                 | string                              |
| showProgress                    | boolean                             |
| showBubbles                     | boolean                             |
| bubbleColor                     | string                              |
| use3D                           | boolean                             |
| dropShadow                      | boolean                             |
| dropShadowColor                 | string                              |
| progressFormatter (only getter) | (value: number) => string           |

##### Performance

If yo are using the library on a context where you will be adding it or removing it dynamically you should call dispose when removing it to correctly clear the animation:

```js
meter.dispose();
```
