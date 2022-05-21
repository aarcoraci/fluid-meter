var cfmModule=function(e){"use strict";const t=(e,t,i)=>Math.min(Math.max(e,t),i),i=(e,t)=>{const i=t-e;return t===e?e:Math.random()*i+e};class r{constructor(){Object.defineProperty(this,"bubbles",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"total",{enumerable:!0,configurable:!0,writable:!0,value:22}),Object.defineProperty(this,"averageSpeed",{enumerable:!0,configurable:!0,writable:!0,value:50}),Object.defineProperty(this,"speedDeviation",{enumerable:!0,configurable:!0,writable:!0,value:12}),Object.defineProperty(this,"current",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"swing",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"averageSize",{enumerable:!0,configurable:!0,writable:!0,value:4}),Object.defineProperty(this,"minX",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"maxX",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"minY",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"maxY",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"yThreshold",{enumerable:!0,configurable:!0,writable:!0,value:0})}getBubble(){const e=i(this.minX,this.maxX),t=i(this.minY,this.maxY),r=i(.5*this.averageSize,1.5*this.averageSize),o=r<this.averageSize?.5:1,a=i(this.averageSpeed-this.speedDeviation,this.averageSpeed+this.speedDeviation),h=t-this.yThreshold;return new s(e,t,r,a,h/a,o)}resetBubble(e){this.bubbles=this.bubbles.filter((t=>t!==e)),this.bubbles.length<this.total&&this.bubbles.push(this.getBubble())}updateBubbleCount(){if(this.bubbles.length<this.total){const e=this.total-this.bubbles.length;for(let t=0;t<e;t++)this.bubbles.push(this.getBubble())}}reset(){this.bubbles=[];for(let e=0;e<this.total;e++)this.bubbles.push(this.getBubble())}}class s{constructor(e,t,i,r,s,o=1){Object.defineProperty(this,"x",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"y",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"r",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"velY",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"lifespan",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"currentRadius",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"currentLifespan",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"opacityThreshold",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"currentOpacity",{enumerable:!0,configurable:!0,writable:!0,value:1}),Object.defineProperty(this,"opacityDecayingSpeed",{enumerable:!0,configurable:!0,writable:!0,value:0}),this.x=e,this.y=t,this.r=i,this.velY=r,this.lifespan=s,this.currentLifespan=s,this.currentOpacity=o,this.opacityThreshold=.2*this.lifespan,this.opacityDecayingSpeed=100/this.lifespan*.2}get isDead(){return this.currentLifespan<=0}update(e){this.y-=this.velY*e,this.currentRadius<this.r&&(this.currentRadius+=20*e),this.currentLifespan<this.opacityThreshold&&(this.currentOpacity-=this.opacityDecayingSpeed*e,this.currentOpacity<=0&&(this.currentOpacity=0)),this.currentLifespan-=e}}class o{static pSBC(e,t,i=null,r=null){let s,o,a,h,l,n,b,u="string"==typeof i;const d=Math.round;return s=t.length>9,s=u?i.length>9||"c"==i&&!s:s,b=this.pSBCr(t),n=e<0,l=i&&"c"!=i?this.pSBCr(i):n?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},n=1-(e=n?-1*e:e),b&&l?(r?(o=d(n*b.r+e*l.r),a=d(n*b.g+e*l.g),h=d(n*b.b+e*l.b)):(o=d(Math.pow(n*Math.pow(b.r,2)+e*Math.pow(l.r,2),.5)),a=d(Math.pow(n*Math.pow(b.g,2)+e*Math.pow(l.g,2),.5)),h=d(Math.pow(n*Math.pow(b.b,2)+e*Math.pow(l.b,2),.5))),u=b.a,l=l.a,b=u>=0||l>=0,u=b?u<0?l:l<0?u:u*n+l*e:0,s?"rgb"+(b?"a(":"(")+o+","+a+","+h+(b?","+d(1e3*u)/1e3:"")+")":"#"+(4294967296+16777216*o+65536*a+256*h+(b?d(255*u):0)).toString(16).slice(1,b?void 0:-2)):null}static pSBCr(e){let t,i,r,s;const o=parseInt,a=Math.round;let h=e.length;const l={r:0,g:0,b:0,a:0};if(h>9){if([t,i,r,s]=e.split(","),h=e.length,h<3||h>4)return null;l.r=o("a"==t[3]?t.slice(5):t.slice(4)),l.g=o(i),l.b=o(r),l.a=s?parseFloat(s):-1}else{if(8==h||6==h||h<4)return null;h<6&&(e="#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+(h>4?e[4]+e[4]:""));const t=o(e.slice(1),16);9==h||5==h?(l.r=t>>24&255,l.g=t>>16&255,l.b=t>>8&255,l.a=a((255&t)/.255)/1e3):(l.r=t>>16,l.g=t>>8&255,l.b=255&t,l.a=-1)}return l}}var a;e.Speed=void 0,(a=e.Speed||(e.Speed={}))[a.SLOW=0]="SLOW",a[a.NORMAL=1]="NORMAL",a[a.FAST=2]="FAST";class h{}Object.defineProperty(h,"ANGULAR_SPEED_NORMAL",{enumerable:!0,configurable:!0,writable:!0,value:Math.PI/2}),Object.defineProperty(h,"ANGULAR_SPEED_FAST",{enumerable:!0,configurable:!0,writable:!0,value:Math.PI}),Object.defineProperty(h,"ANGULAR_SPEED_SLOW",{enumerable:!0,configurable:!0,writable:!0,value:Math.PI/4}),Object.defineProperty(h,"HORIZONTAL_SPEED_NORMAL",{enumerable:!0,configurable:!0,writable:!0,value:55}),Object.defineProperty(h,"HORIZONTAL_SPEED_FAST",{enumerable:!0,configurable:!0,writable:!0,value:155}),Object.defineProperty(h,"HORIZONTAL_SPEED_SLOW",{enumerable:!0,configurable:!0,writable:!0,value:25});const l={initialProgress:0,maxProgress:100,borderWidth:30,borderColor:"#75758b",padding:30,backgroundColor:"#9f9fae",showProgress:!0,showBubbles:!0,bubbleColor:"#ffffff",textColor:"#ffffff",textDropShadow:!0,textShadowOpacity:1,textShadowColor:"#000000",fontFamily:"Arial",fontSize:30,use3D:!0,dropShadow:!0,dropShadowColor:"#000000",progressFormatter:e=>Math.round(e).toString(),fluidConfiguration:{color:"#ff0000",waveSpeed:e.Speed.NORMAL,horizontalSpeed:e.Speed.NORMAL}},n=(e,t)=>{var i,r;if(!t.length)return 0;const s=null===(r=null===(i=t.filter((t=>t.resolution<=e)))||void 0===i?void 0:i.sort(b))||void 0===r?void 0:r[0];if(s)return s.value;{const e=t.sort(b).reverse()[0];return e?e.value:0}},b=(e,t)=>e.resolution<t.resolution?1:e.resolution>t.resolution?-1:0;return e.CircularFluidMeter=class extends class{constructor(e){Object.defineProperty(this,"_container",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_canvas",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_context",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_width",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_height",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_time",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_elapsed",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_animationRequestId",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_updateBind",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_resizeBind",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this._container=e;const t=this._container.getBoundingClientRect();this._width=Math.floor(t.width),this._height=Math.floor(t.height),this._canvas=document.createElement("canvas"),this._canvas.width=this._width,this._canvas.height=this._height;const i=this._canvas.getContext("2d");if(!i)throw"unable to get 2d context";this._context=i,this._container.appendChild(this._canvas),this._updateBind=this.update.bind(this),this._resizeBind=this.resize.bind(this),this._animationRequestId=requestAnimationFrame(this._updateBind),window.addEventListener("resize",this._resizeBind)}update(){const e=(new Date).getTime();this._elapsed=(e-(this._time||e))/1e3,this._time=e,this._animationRequestId=requestAnimationFrame(this._updateBind),this.draw()}resize(){if(void 0!==this._container){const e=this._container.getBoundingClientRect(),t=Math.floor(e.width),i=Math.floor(e.height);this._width=t,this._height=i,this._canvas.width=t,this._canvas.height=i}}dispose(){cancelAnimationFrame(this._animationRequestId),window.removeEventListener("resize",this._resizeBind)}}{constructor(e,t){super(e),Object.defineProperty(this,"_fluidConfiguration",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_layers",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_bubbles",{enumerable:!0,configurable:!0,writable:!0,value:new r}),Object.defineProperty(this,"_meterDiameter",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_targetProgress",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_progress",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_maxProgress",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_progressStepSpeed",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_calculatedBorderWidth",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_borderWidth",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_borderColor",{enumerable:!0,configurable:!0,writable:!0,value:"#ff00ff"}),Object.defineProperty(this,"_padding",{enumerable:!0,configurable:!0,writable:!0,value:15}),Object.defineProperty(this,"_backgroundColor",{enumerable:!0,configurable:!0,writable:!0,value:"#ff00ff"}),Object.defineProperty(this,"_textColor",{enumerable:!0,configurable:!0,writable:!0,value:""}),Object.defineProperty(this,"_fontFamily",{enumerable:!0,configurable:!0,writable:!0,value:"Arial"}),Object.defineProperty(this,"_calculatedFontSize",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_fontSize",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_textDropShadow",{enumerable:!0,configurable:!0,writable:!0,value:!0}),Object.defineProperty(this,"_textShadowOpacity",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_textShadowColor",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_showProgress",{enumerable:!0,configurable:!0,writable:!0,value:!0}),Object.defineProperty(this,"_showBubbles",{enumerable:!0,configurable:!0,writable:!0,value:!0}),Object.defineProperty(this,"_bubbleColor",{enumerable:!0,configurable:!0,writable:!0,value:"#ffffff"}),Object.defineProperty(this,"_use3D",{enumerable:!0,configurable:!0,writable:!0,value:!0}),Object.defineProperty(this,"_dropShadow",{enumerable:!0,configurable:!0,writable:!0,value:!0}),Object.defineProperty(this,"_dropShadowColor",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_progressFormatter",{enumerable:!0,configurable:!0,writable:!0,value:e=>`${e}%`});const i=Object.assign(Object.assign({},l),t);this._progress=i.initialProgress,this._maxProgress=i.maxProgress,this._borderWidth=i.borderWidth,this._borderColor=i.borderColor,this._padding=i.padding,this._targetProgress=this._progress,this._backgroundColor=i.backgroundColor,this._fluidConfiguration=i.fluidConfiguration,this._textColor=i.textColor,this._textDropShadow=i.textDropShadow,this._textShadowColor=i.textShadowColor,this._textShadowOpacity=i.textShadowOpacity,this._showProgress=i.showProgress,this._fontFamily=i.fontFamily,this._fontSize=i.fontSize,this._showBubbles=i.showBubbles,this._bubbleColor=i.bubbleColor,this._use3D=i.use3D,this._dropShadow=i.dropShadow,this._dropShadowColor=i.dropShadowColor,this._progressFormatter=i.progressFormatter,this.calculateDrawingValues()}get progress(){return this._progress}set progress(e){this._targetProgress=t(e,0,this._maxProgress)}get maxProgress(){return this._maxProgress}get borderWidth(){return this._borderWidth}set borderWidth(e){this._borderWidth=e,this.calculateDrawingValues()}get borderColor(){return this._borderColor}set borderColor(e){this._borderColor=e}get meterPadding(){return this._padding}set meterPadding(e){this._padding=e,this.calculateDrawingValues()}get backgroundColor(){return this._backgroundColor}set backgroundColor(e){this._backgroundColor=e}get textColor(){return this._textColor}set textColor(e){this._textColor=e}get fontFamily(){return this._fontFamily}set fontFamily(e){this._fontFamily=e}get fontSize(){return this._fontSize}set fontSize(e){this._fontSize=e}get textDropShadow(){return this._textDropShadow}set textDropShadow(e){this._textDropShadow=e}get textShadowOpacity(){return this._textShadowOpacity}set textShadowOpacity(e){this._textShadowOpacity=t(e,0,1)}get textShadowColor(){return this._textShadowColor}set textShadowColor(e){this._textShadowColor=e}get showProgress(){return this._showProgress}set showProgress(e){this._showProgress=e}get showBubbles(){return this._showBubbles}set showBubbles(e){this._showBubbles=e}get bubbleColor(){return this._bubbleColor}set bubbleColor(e){this._bubbleColor=e}get use3D(){return this._use3D}set use3D(e){this._use3D=e}get dropShadow(){return this._dropShadow}set dropShadow(e){this._dropShadow=e}get dropShadowColor(){return this._dropShadowColor}set dropShadowColor(e){this._dropShadowColor=e}set progressFormatter(e){this._progressFormatter=e}draw(){this.clear(),this._meterDiameter<=0||!this._width||!this._height||(this._dropShadow&&(this._context.save(),this._context.beginPath(),this._context.shadowColor=this._dropShadowColor,this._context.shadowBlur=10,this._context.shadowOffsetY=5,this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-1,0,2*Math.PI),this._context.closePath(),this._context.fill(),this._context.restore()),this.drawBackground(),this._context.save(),this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-this._calculatedBorderWidth,0,2*Math.PI),this._context.clip(),this._layers&&(this.drawLayer(this._layers[0],!1),this.drawLayer(this._layers[1])),this._showBubbles&&(this._bubbles.updateBubbleCount(),this.drawBubbles()),this._showProgress&&this.drawText(),this._context.restore(),this.drawForeground())}clear(){this._context.clearRect(0,0,this._width,this._height)}calculateDrawingValues(){this._meterDiameter=this.calculateMeterDiameter(),this._layers=class{static buildFluidLayersFromConfiguration(t,i){let r=h.ANGULAR_SPEED_NORMAL,s=h.HORIZONTAL_SPEED_NORMAL;const a=this.calculateFrequency(i);switch(t.horizontalSpeed){case e.Speed.FAST:s=h.HORIZONTAL_SPEED_FAST;break;case e.Speed.SLOW:s=h.HORIZONTAL_SPEED_SLOW;break;default:s=h.HORIZONTAL_SPEED_NORMAL}switch(t.waveSpeed){case e.Speed.FAST:r=h.ANGULAR_SPEED_FAST;break;case e.Speed.SLOW:r=h.ANGULAR_SPEED_SLOW;break;default:r=h.ANGULAR_SPEED_NORMAL}const l=o.pSBC(-.75,t.color||"#ffffff"),n=this.calculateWaveAmplitude(i),b={angle:0,horizontalPosition:0,color:t.color||"#ffffff",frequency:a,waveAmplitude:n,horizontalSpeed:s,waveSpeed:r};return[{angle:0,horizontalPosition:0,color:l||t.color||"#ffffff",frequency:a,waveAmplitude:n,horizontalSpeed:-s,waveSpeed:r},b]}static calculateWaveAmplitude(e){return.021*e}static calculateFrequency(e){return e/11}}.buildFluidLayersFromConfiguration(this._fluidConfiguration,this._meterDiameter),this._progressStepSpeed=this._maxProgress/6;const t=window.innerWidth;"number"==typeof this._borderWidth?this._calculatedBorderWidth=this._borderWidth:this._calculatedBorderWidth=n(t,this._borderWidth),"number"==typeof this._fontSize?this._calculatedFontSize=this._fontSize:this._calculatedFontSize=n(t,this._fontSize),this.updateBubbleLayer(),this._bubbles.reset()}updateBubbleLayer(){const e=this.getMeterBottomLimit();let t=this.getFluidLevel();this._layers&&(t+=this._layers[0].waveAmplitude);let i=.85*e;i<t&&(i=t);const r=e,s=this._width/2-this._meterDiameter/2,o=this._width/2+this._meterDiameter/2;this._bubbles.minY=i,this._bubbles.maxY=r,this._bubbles.minX=s,this._bubbles.maxX=o,this._bubbles.yThreshold=t,this._bubbles.averageSize=.006*this._meterDiameter,this._bubbles.averageSpeed=2*this._meterDiameter/14,this._bubbles.speedDeviation=.25*this._bubbles.averageSpeed;let a=.1*this._width;this._progress<.5*this._maxProgress&&this._progress>=.25*this._maxProgress?a*=.5:this._progress<.25*this._maxProgress&&this._progress>=.12*this._maxProgress?a*=.18:this._progress<.12*this._maxProgress&&(a*=.04),this._bubbles.total=a}getMeterBottomLimit(){return this._height-(this._height-this._meterDiameter)/2-this._calculatedBorderWidth}getFluidLevel(){let e=0;this._layers&&(e=this._layers[0].waveAmplitude/2);const t=(this._meterDiameter-e-2*this._calculatedBorderWidth)*this._progress/this._maxProgress;return this.getMeterBottomLimit()-t}updateProgress(){this._progress!==this._targetProgress&&(this._progress<this._targetProgress?(this._progress+=this._progressStepSpeed*this._elapsed,this._progress>this._targetProgress&&(this._progress=this._targetProgress)):this._progress>this._targetProgress&&(this._progress-=this._progressStepSpeed*this._elapsed,this._progress<this._targetProgress&&(this._progress=this._targetProgress)),this.updateBubbleLayer())}drawLayer(e,t=!0){let i=e.angle+e.waveSpeed*this._elapsed;i>2*Math.PI&&(i-=2*Math.PI),e.angle=i,e.horizontalPosition+=e.horizontalSpeed*this._elapsed;let r=0,s=0;const a=e.waveAmplitude*Math.sin(e.angle),h=this.getMeterBottomLimit(),l=this.getFluidLevel();for(this.updateProgress(),this._context.save(),this._context.beginPath(),this._context.lineTo(0,l);r<this._width;)s=l+a*Math.sin((r+e.horizontalPosition)/e.frequency),this._context.lineTo(r,s),r++;if(this._context.lineTo(r,this._height),this._context.lineTo(0,this._height),this._context.closePath(),this._use3D&&t){const t=this._width/2,i=h,r=.05*this._meterDiameter,s=this._context.createRadialGradient(t,i,r,t,i,.65*this._meterDiameter),a=e.color,l=o.pSBC(-.8,e.color);s.addColorStop(0,a),l&&s.addColorStop(1,l),this._context.fillStyle=s}else this._context.fillStyle=e.color;this._context.fill(),this._context.restore()}drawText(){const e=this._progressFormatter(this._progress);this._context.save(),this._context.font=`${this._calculatedFontSize}px ${this._fontFamily}`,this._context.fillStyle=this._textColor,this._context.textAlign="center",this._context.textBaseline="middle",this._textDropShadow&&(this._context.save(),this._context.shadowColor=this._textShadowColor,this._context.shadowBlur=7,this._context.globalAlpha=this._textShadowOpacity,this._context.fillText(e,this._width/2,this._height/2),this._context.restore()),this._context.fillText(e,this._width/2,this._height/2),this._context.restore()}drawBackground(){if(this._context.save(),this._context.beginPath(),this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-this._calculatedBorderWidth,0,2*Math.PI),this._context.closePath(),this._use3D){const e=this._width/2,t=this._height/2,i=.1*this._meterDiameter,r=this._context.createRadialGradient(e,t,i,e,t,.75*this._meterDiameter),s=this._backgroundColor,a=o.pSBC(-.8,this.backgroundColor);r.addColorStop(0,s),a&&r.addColorStop(.9,a),this._context.fillStyle=r}else this._context.fillStyle=this.backgroundColor;this._context.fill(),this._context.restore()}drawForeground(){this._context.save(),this._context.lineWidth=this._calculatedBorderWidth,this._context.strokeStyle=this._borderColor,this._context.beginPath(),this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-this._calculatedBorderWidth/2,0,2*Math.PI),this._context.closePath(),this._context.stroke();const e=o.pSBC(-.35,this._borderColor),t=.25*this._calculatedBorderWidth;this._context.lineWidth=t,this._context.strokeStyle=e||this._borderColor,this._context.beginPath(),this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-.85*this._calculatedBorderWidth-t/2,0,2*Math.PI),this._context.closePath(),this._context.stroke();const i=o.pSBC(.05,this._borderColor),r=.15*this._calculatedBorderWidth;if(this._context.lineWidth=r,this._context.strokeStyle=i||this._borderColor,this._context.beginPath(),this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-r/2,0,2*Math.PI),this._context.closePath(),this._context.stroke(),this._context.restore(),this._use3D){this._context.save(),this._context.shadowColor="#ffffff",this._context.shadowBlur=17;const e=this._meterDiameter-this._calculatedBorderWidth;let t=this._width/2-e/4.5,i=this._height/2-e/5.27,r=.045*e;const s=new Path2D;s.arc(2*-this._width,i,r,0,2*Math.PI),this._context.shadowOffsetX=2*this._width+t,this._context.globalAlpha=.7,this._context.fill(s),this._context.restore(),this._context.save(),this._context.shadowColor="#ffffff",this._context.shadowBlur=11,t=this._width/2+e/5,i=this._height/2+e/4,r=.025*e;const o=new Path2D;o.arc(2*-this._width,i,r,0,2*Math.PI),this._context.shadowOffsetX=2*this._width+t,this._context.globalAlpha=.45,this._context.fill(o),this._context.restore()}}drawBubbles(){this._context.save(),this._bubbles.bubbles.forEach((e=>{e.update(this._elapsed),(e.isDead||e.y<this._bubbles.yThreshold)&&this._bubbles.resetBubble(e),this._context.beginPath(),this._context.strokeStyle=this._bubbleColor,this._context.arc(e.x-e.currentRadius/2,e.y-e.currentRadius/2,e.currentRadius,0,2*Math.PI),this._context.filter=`opacity(${e.currentOpacity})`,this._context.stroke(),this._context.closePath()})),this._context.restore()}calculateMeterDiameter(){return this._width>=this._height?this._height-this._padding:this._width-this._padding}resize(){super.resize(),this.calculateDrawingValues(),this._bubbles.reset()}},Object.defineProperty(e,"__esModule",{value:!0}),e}({});