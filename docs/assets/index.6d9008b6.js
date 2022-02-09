var L=Object.defineProperty;var C=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var x=(h,t,s)=>t in h?L(h,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):h[t]=s,w=(h,t)=>{for(var s in t||(t={}))A.call(t,s)&&x(h,s,t[s]);if(C)for(var s of C(t))M.call(t,s)&&x(h,s,t[s]);return h};var i=(h,t,s)=>(x(h,typeof t!="symbol"?t+"":t,s),s);const z=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&e(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}};z();class F{constructor(t){i(this,"_container");i(this,"_canvas");i(this,"_context");i(this,"_width",0);i(this,"_height",0);i(this,"_time",0);i(this,"_elapsed",0);i(this,"_animationRequestId",0);i(this,"_updateBind");i(this,"_resizeBind");this._container=t;const s=this._container.getBoundingClientRect();this._width=Math.floor(s.width),this._height=Math.floor(s.height),this._canvas=document.createElement("canvas"),this._canvas.width=this._width,this._canvas.height=this._height;const e=this._canvas.getContext("2d");if(e)this._context=e;else throw"unable to get 2d context";this._container.appendChild(this._canvas),this._updateBind=this.update.bind(this),this._resizeBind=this.resize.bind(this),this._animationRequestId=requestAnimationFrame(this._updateBind),window.addEventListener("resize",this._resizeBind)}update(){const t=new Date().getTime();this._elapsed=(t-(this._time||t))/1e3,this._time=t,this._animationRequestId=requestAnimationFrame(this._updateBind),this.draw()}resize(){if(this._container!==void 0){const t=this._container.getBoundingClientRect(),s=Math.floor(t.width),e=Math.floor(t.height);this._width=s,this._height=e,this._canvas.width=s,this._canvas.height=e}}dispose(){cancelAnimationFrame(this._animationRequestId),window.removeEventListener("resize",this._resizeBind)}}const p=(h,t)=>{const s=t-h;return t===h?h:Math.random()*s+h};class O{constructor(){i(this,"bubbles",[]);i(this,"total",22);i(this,"averageSpeed",50);i(this,"speedDeviation",12);i(this,"current",0);i(this,"swing",0);i(this,"averageSize",4);i(this,"minX",0);i(this,"maxX",0);i(this,"minY",0);i(this,"maxY",0);i(this,"yThreshold",0)}getBubble(){const t=p(this.minX,this.maxX),s=p(this.minY,this.maxY),e=p(this.averageSize*.5,this.averageSize*1.5),r=e<this.averageSize?.5:1,o=p(this.averageSpeed-this.speedDeviation,this.averageSpeed+this.speedDeviation),u=(s-this.yThreshold)/o;return new R(t,s,e,o,u,r)}resetBubble(t){this.bubbles=this.bubbles.filter(s=>s!==t),this.bubbles.push(this.getBubble())}reset(){this.bubbles=[];for(let t=0;t<this.total;t++)this.bubbles.push(this.getBubble())}}class R{constructor(t,s,e,r,o,n=1){i(this,"x",0);i(this,"y",0);i(this,"r",0);i(this,"velY",0);i(this,"lifespan",0);i(this,"currentRadius",0);i(this,"currentLifespan",0);i(this,"opacityThreshold",0);i(this,"currentOpacity",1);i(this,"opacityDecayingSpeed",0);this.x=t,this.y=s,this.r=e,this.velY=r,this.lifespan=o,this.currentLifespan=o,this.currentOpacity=n,this.opacityThreshold=this.lifespan*.2,this.opacityDecayingSpeed=100/this.lifespan*.2}get isDead(){return this.currentLifespan<=0}update(t){this.y-=this.velY*t,this.currentRadius<this.r&&(this.currentRadius+=20*t),this.currentLifespan<this.opacityThreshold&&(this.currentOpacity-=this.opacityDecayingSpeed*t,this.currentOpacity<=0&&(this.currentOpacity=0)),this.currentLifespan-=t}}class f{static pSBC(t,s,e=null,r=null){let o,n,u,l,a,c=typeof e=="string",g,_;const b=Math.round;return o=s.length>9,o=c?e.length>9?!0:e=="c"?!o:!1:o,_=this.pSBCr(s),g=t<0,a=e&&e!="c"?this.pSBCr(e):g?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},t=g?t*-1:t,g=1-t,!_||!a?null:(r?(n=b(g*_.r+t*a.r),u=b(g*_.g+t*a.g),l=b(g*_.b+t*a.b)):(n=b((g*_.r**2+t*a.r**2)**.5),u=b((g*_.g**2+t*a.g**2)**.5),l=b((g*_.b**2+t*a.b**2)**.5)),c=_.a,a=a.a,_=c>=0||a>=0,c=_?c<0?a:a<0?c:c*g+a*t:0,o?"rgb"+(_?"a(":"(")+n+","+u+","+l+(_?","+b(c*1e3)/1e3:"")+")":"#"+(4294967296+n*16777216+u*65536+l*256+(_?b(c*255):0)).toString(16).slice(1,_?void 0:-2))}static pSBCr(t){let s,e,r,o;const n=parseInt,u=Math.round;let l=t.length;const a={r:0,g:0,b:0,a:0};if(l>9){if([s,e,r,o]=t.split(","),l=t.length,l<3||l>4)return null;a.r=n(s[3]=="a"?s.slice(5):s.slice(4)),a.g=n(e),a.b=n(r),a.a=o?parseFloat(o):-1}else{if(l==8||l==6||l<4)return null;l<6&&(t="#"+t[1]+t[1]+t[2]+t[2]+t[3]+t[3]+(l>4?t[4]+t[4]:""));const c=n(t.slice(1),16);l==9||l==5?(a.r=c>>24&255,a.g=c>>16&255,a.b=c>>8&255,a.a=u((c&255)/.255)/1e3):(a.r=c>>16,a.g=c>>8&255,a.b=c&255,a.a=-1)}return a}}var m;(function(h){h[h.SLOW=0]="SLOW",h[h.NORMAL=1]="NORMAL",h[h.FAST=2]="FAST"})(m||(m={}));class d{}i(d,"ANGULAR_SPEED_NORMAL",Math.PI/2),i(d,"ANGULAR_SPEED_FAST",Math.PI),i(d,"ANGULAR_SPEED_SLOW",Math.PI/4),i(d,"HORIZONTAL_SPEED_NORMAL",55),i(d,"HORIZONTAL_SPEED_FAST",155),i(d,"HORIZONTAL_SPEED_SLOW",25);class k{static buildFluidLayersFromConfiguration(t,s){let e=d.ANGULAR_SPEED_NORMAL,r=d.HORIZONTAL_SPEED_NORMAL;const o=this.calculateFrequency(s);switch(t.horizontalSpeed){case 2:r=d.HORIZONTAL_SPEED_FAST;break;case 0:r=d.HORIZONTAL_SPEED_SLOW;break;default:r=d.HORIZONTAL_SPEED_NORMAL;break}switch(t.waveSpeed){case 2:e=d.ANGULAR_SPEED_FAST;break;case 0:e=d.ANGULAR_SPEED_SLOW;break;default:e=d.ANGULAR_SPEED_NORMAL;break}const n=f.pSBC(-.75,t.color),u=this.calculateWaveAmplitude(s),l={angle:0,horizontalPosition:0,color:t.color,frequency:o,waveAmplitude:u,horizontalSpeed:r,waveSpeed:e};return[{angle:0,horizontalPosition:0,color:n||t.color,frequency:o,waveAmplitude:u,horizontalSpeed:-r,waveSpeed:e},l]}static calculateWaveAmplitude(t){return t*.021}static calculateFrequency(t){return t/11}}const E={initialProgress:33,borderWidth:[{resolution:0,value:10},{resolution:768,value:15},{resolution:1440,value:30}],borderColor:"#75758b",padding:30,backgroundColor:"#9f9fae",showProgress:!0,showBubbles:!0,bubbleColor:"#ffb0b0",textColor:"#ffffff",textDropShadow:!0,fontFamily:"Arial",fontSize:[{resolution:0,value:13},{resolution:320,value:30},{resolution:718,value:90},{resolution:1440,value:95}],use3D:!0,dropShadow:!0,progressFormatter:h=>Math.round(h).toString(),fluidConfiguration:{color:"#ff0000",waveSpeed:m.NORMAL,horizontalSpeed:m.NORMAL}},D=(h,t)=>{var e,r;if(!t.length)return 0;const s=(r=(e=t.filter(o=>o.resolution<=h))==null?void 0:e.sort(v))==null?void 0:r[0];if(s)return s.value;{const o=t.sort(v).reverse()[0];return o?o.value:0}},v=(h,t)=>h.resolution<t.resolution?1:h.resolution>t.resolution?-1:0;class W extends F{constructor(t,s){super(t);i(this,"_fluidConfiguration");i(this,"_layers");i(this,"_bubbles",new O);i(this,"_meterDiameter",0);i(this,"_targetProgress");i(this,"_progress");i(this,"_calculatedBorderWidth",0);i(this,"_borderWidth");i(this,"_borderColor","#ff00ff");i(this,"_padding",15);i(this,"_backgroundColor","#ff00ff");i(this,"_textColor","");i(this,"_fontFamily","Arial");i(this,"_calculatedFontSize",0);i(this,"_fontSize");i(this,"_textDropShadow",!0);i(this,"_showProgress",!0);i(this,"_showBubbles",!0);i(this,"_bubbleColor","#ffffff");i(this,"_use3D",!0);i(this,"_dropShadow",!0);i(this,"_progressFormatter",t=>`${t}%`);const e=w(w({},E),s);this._borderWidth=e.borderWidth,this._borderColor=e.borderColor,this._padding=e.padding,this._progress=e.initialProgress,this._targetProgress=this._progress,this._backgroundColor=e.backgroundColor,this._fluidConfiguration=e.fluidConfiguration,this._textColor=e.textColor,this._textDropShadow=e.textDropShadow,this._showProgress=e.showProgress,this._fontFamily=e.fontFamily,this._fontSize=e.fontSize,this._showBubbles=e.showBubbles,this._bubbleColor=e.bubbleColor,this._use3D=e.use3D,this._dropShadow=e.dropShadow,this._progressFormatter=e.progressFormatter,this.calculateDrawingValues()}get targetProgress(){return this._targetProgress}set targetProgress(t){this._targetProgress=t}get progress(){return this._progress}set progress(t){this._progress=t}get borderWidth(){return this._borderWidth}set borderWidth(t){this._borderWidth=t,this.calculateDrawingValues()}get borderColor(){return this._borderColor}set borderColor(t){this._borderColor=t}get meterPadding(){return this._padding}set meterPadding(t){this._padding=t,this.calculateDrawingValues()}get backgroundColor(){return this._backgroundColor}set backgroundColor(t){this._backgroundColor=t}get textColor(){return this._textColor}set textColor(t){this._textColor=t}get fontFamily(){return this._fontFamily}set fontFamily(t){this._fontFamily=t}get fontSize(){return this._fontSize}set fontSize(t){this._fontSize=t}get textDropShadow(){return this._textDropShadow}set textDropShadow(t){this._textDropShadow=t}get showProgress(){return this._showProgress}set showProgress(t){this._showProgress=t}get showBubbles(){return this._showBubbles}set showBubbles(t){this._showBubbles=t}get bubbleColor(){return this._bubbleColor}set bubbleColor(t){this._bubbleColor=t}get use3D(){return this._use3D}set use3D(t){this._use3D=t}get dropShadow(){return this._dropShadow}set dropShadow(t){this._dropShadow=t}setProgressFormatter(t){this._progressFormatter=t}draw(){this.clear(),this._dropShadow&&(this._context.save(),this._context.beginPath(),this._context.filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.45))",this._context.arc(this._width/2,this._height/2,this._meterDiameter/2,0,2*Math.PI),this._context.closePath(),this._context.fill(),this._context.restore()),this.drawBackground(),this._context.save(),this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-this._calculatedBorderWidth,0,Math.PI*2),this._context.clip(),this._layers&&(this.drawLayer(this._layers[0],!1),this.drawLayer(this._layers[1])),this.drawBubbles(),this._showProgress&&this.drawText(),this._context.restore(),this.drawForeground()}clear(){this._context.clearRect(0,0,this._width,this._height)}calculateDrawingValues(){this._meterDiameter=this.calculateMeterDiameter(),this._layers=k.buildFluidLayersFromConfiguration(this._fluidConfiguration,this._meterDiameter);const t=window.innerWidth;typeof this._borderWidth=="number"?this._calculatedBorderWidth=this._borderWidth:this._calculatedBorderWidth=D(t,this._borderWidth),typeof this._fontSize=="number"?this._calculatedFontSize=this._fontSize:this._calculatedFontSize=D(t,this._fontSize),this.updateBubbleLayer(),this._bubbles.reset()}updateBubbleLayer(){const t=this.getMeterBottomLimit();let s=this.getFluidLevel();this._layers&&(s+=this._layers[0].waveAmplitude);let e=t*.85;e<s&&(e=s);const r=t,o=this._width/2-this._meterDiameter/2,n=this._width/2+this._meterDiameter/2;this._bubbles.minY=e,this._bubbles.maxY=r,this._bubbles.minX=o,this._bubbles.maxX=n,this._bubbles.yThreshold=s,this._bubbles.averageSize=this._meterDiameter*.006,this._bubbles.averageSpeed=this._meterDiameter*2/14,this._bubbles.speedDeviation=this._bubbles.averageSpeed*.25}getMeterBottomLimit(){return this._height-(this._height-this._meterDiameter)/2}getFluidLevel(){const t=this._meterDiameter*this._progress/100;return this.getMeterBottomLimit()-t}drawLayer(t,s=!0){let e=t.angle+t.waveSpeed*this._elapsed;e>Math.PI*2&&(e=e-Math.PI*2),t.angle=e,t.horizontalPosition+=t.horizontalSpeed*this._elapsed;let r=0,o=0;const n=t.waveAmplitude*Math.sin(t.angle),u=this.getMeterBottomLimit(),l=this.getFluidLevel();for(this._progress<this._targetProgress?(this.progress+=15*this._elapsed,this.updateBubbleLayer()):this._progress>this._targetProgress&&(this.progress-=15*this._elapsed,this.updateBubbleLayer()),this._context.save(),this._context.beginPath(),this._context.lineTo(0,l);r<this._width;)o=l+n*Math.sin((r+t.horizontalPosition)/t.frequency),this._context.lineTo(r,o),r++;if(this._context.lineTo(r,this._height),this._context.lineTo(0,this._height),this._context.closePath(),this._use3D&&s){const a=this._width/2,c=u,g=this._meterDiameter*.01,_=this._context.createRadialGradient(a,c,g,a,c,this._meterDiameter*.45),b=t.color,y=f.pSBC(-.8,t.color);_.addColorStop(0,b),y&&_.addColorStop(1,y),this._context.fillStyle=_}else this._context.fillStyle=t.color;this._context.fill(),this._context.restore()}drawText(){const t=this._progressFormatter(this._progress);this._context.save(),this._context.font=`${this._calculatedFontSize}px ${this._fontFamily}`,this._context.fillStyle=this._textColor,this._context.textAlign="center",this._context.textBaseline="middle",this._textDropShadow&&(this._context.filter="drop-shadow(0px 0px 5px rgba(0,0,0,0.4))"),this._context.fillText(t,this._width/2,this._height/2),this._context.restore()}drawBackground(){if(this._context.save(),this._context.beginPath(),this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-this._calculatedBorderWidth,0,2*Math.PI),this._context.closePath(),this._use3D){const t=this._width/2,s=this._height/2,e=this._meterDiameter*.1,r=this._context.createRadialGradient(t,s,e,t,s,this._meterDiameter*.75),o=this._backgroundColor,n=f.pSBC(-.8,this.backgroundColor);r.addColorStop(0,o),n&&r.addColorStop(.9,n),this._context.fillStyle=r}else this._context.fillStyle=this.backgroundColor;this._context.fill(),this._context.restore()}drawForeground(){this._context.save(),this._context.lineWidth=this._calculatedBorderWidth,this._context.strokeStyle=this._borderColor,this._context.beginPath(),this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-this._calculatedBorderWidth/2,0,2*Math.PI),this._context.closePath(),this._context.stroke();const t=f.pSBC(-.35,this._borderColor);this._context.lineWidth=this._calculatedBorderWidth*.25,this._context.strokeStyle=t||this._borderColor,this._context.beginPath(),this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-this._calculatedBorderWidth*.85,0,2*Math.PI),this._context.closePath(),this._context.stroke();const s=f.pSBC(.05,this._borderColor),e=this._calculatedBorderWidth*.15;if(this._context.lineWidth=e,this._context.strokeStyle=s||this._borderColor,this._context.beginPath(),this._context.arc(this._width/2,this._height/2,this._meterDiameter/2-e/2,0,2*Math.PI),this._context.closePath(),this._context.stroke(),this._context.restore(),this._use3D){this._context.save(),this._context.filter="blur(10px) blur(15px) opacity(0.65)";let r=this._width/2-this._meterDiameter/6,o=this._height/2-this._meterDiameter/6,n=this._meterDiameter*.095;this._context.fillStyle="white",this._context.beginPath(),this._context.arc(r,o,n,0,2*Math.PI),this._context.closePath(),this._context.fill(),this._context.restore(),this._context.save(),this._context.filter="blur(8px)  opacity(0.39)",r=this._width/2+this._meterDiameter/4.3,o=this._height/2+this._meterDiameter/4.3,n=this._meterDiameter*.045,this._context.fillStyle="white",this._context.beginPath(),this._context.arc(r,o,n,0,2*Math.PI),this._context.closePath(),this._context.fill(),this._context.restore()}}drawBubbles(){this._context.save(),this._bubbles.bubbles.forEach(t=>{t.update(this._elapsed),(t.isDead||t.y<this._bubbles.yThreshold)&&this._bubbles.resetBubble(t),this._context.beginPath(),this._context.strokeStyle=this._bubbleColor,this._context.arc(t.x-t.currentRadius/2,t.y-t.currentRadius/2,t.currentRadius,0,2*Math.PI),this._context.filter=`opacity(${t.currentOpacity})`,this._context.stroke(),this._context.closePath()}),this._context.restore()}calculateMeterDiameter(){return this._width>=this._height?this._height-this._padding:this._width-this._padding}resize(){super.resize(),this.calculateDrawingValues(),this._bubbles.reset()}}const T=document.querySelector("#app"),B=new W(T),S=document.querySelector("#update-button-1"),P=document.querySelector("#update-button-2");S==null||S.addEventListener("click",()=>{B.targetProgress=10});P==null||P.addEventListener("click",()=>{B.targetProgress=75});
