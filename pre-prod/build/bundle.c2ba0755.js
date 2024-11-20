"use strict";(self.webpackChunkes_components=self.webpackChunkes_components||[]).push([[266],{79266:function(e,t,n){var o,i=this&&this.__extends||(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function __(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}),r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},r.apply(this,arguments)},a=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var i=Object.getOwnPropertyDescriptor(t,n);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,i)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return s(t,e),t},c=this&&this.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]])}return n};Object.defineProperty(t,"__esModule",{value:!0});var u=l(n(14041)),d="undefined"!=typeof window&&"navigator"in window&&/Win/i.test(navigator.platform),p="undefined"!=typeof window&&"navigator"in window&&/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),h="npm__react-simple-code-editor__textarea",f="\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.".concat(h,":empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * Hack to apply on some CSS on IE10 and IE11\n */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /**\n    * IE doesn't support '-webkit-text-fill-color'\n    * So we use 'color: transparent' to make the text transparent on IE\n    * Unlike other browsers, it doesn't affect caret color in IE\n    */\n  .").concat(h," {\n    color: transparent !important;\n  }\n\n  .").concat(h,"::selection {\n    background-color: #accef7 !important;\n    color: transparent !important;\n  }\n}\n"),y=function(e){function Editor(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={capture:!0},t._recordCurrentState=function(){var e=t._input;if(e){var n=e.value,o=e.selectionStart,i=e.selectionEnd;t._recordChange({value:n,selectionStart:o,selectionEnd:i})}},t._getLines=function(e,t){return e.substring(0,t).split("\n")},t._recordChange=function(e,n){var o,i,a;void 0===n&&(n=!1);var s=t._history,l=s.stack,c=s.offset;if(l.length&&c>-1){t._history.stack=l.slice(0,c+1);var u=t._history.stack.length;if(u>100){var d=u-100;t._history.stack=l.slice(d,u),t._history.offset=Math.max(t._history.offset-d,0)}}var p=Date.now();if(n){var h=t._history.stack[t._history.offset];if(h&&p-h.timestamp<3e3){var f=/[^a-z0-9]([a-z0-9]+)$/i,y=null===(o=t._getLines(h.value,h.selectionStart).pop())||void 0===o?void 0:o.match(f),g=null===(i=t._getLines(e.value,e.selectionStart).pop())||void 0===i?void 0:i.match(f);if((null==y?void 0:y[1])&&(null===(a=null==g?void 0:g[1])||void 0===a?void 0:a.startsWith(y[1])))return void(t._history.stack[t._history.offset]=r(r({},e),{timestamp:p}))}}t._history.stack.push(r(r({},e),{timestamp:p})),t._history.offset++},t._updateInput=function(e){var n=t._input;n&&(n.value=e.value,n.selectionStart=e.selectionStart,n.selectionEnd=e.selectionEnd,t.props.onValueChange(e.value))},t._applyEdits=function(e){var n=t._input,o=t._history.stack[t._history.offset];o&&n&&(t._history.stack[t._history.offset]=r(r({},o),{selectionStart:n.selectionStart,selectionEnd:n.selectionEnd})),t._recordChange(e),t._updateInput(e)},t._undoEdit=function(){var e=t._history,n=e.stack,o=e.offset,i=n[o-1];i&&(t._updateInput(i),t._history.offset=Math.max(o-1,0))},t._redoEdit=function(){var e=t._history,n=e.stack,o=e.offset,i=n[o+1];i&&(t._updateInput(i),t._history.offset=Math.min(o+1,n.length-1))},t._handleKeyDown=function(e){var n=t.props,o=n.tabSize,i=n.insertSpaces,r=n.ignoreTabKey,a=n.onKeyDown;if(!a||(a(e),!e.defaultPrevented)){27===e.keyCode&&e.currentTarget.blur();var s=e.currentTarget,l=s.value,c=s.selectionStart,u=s.selectionEnd,h=(i?" ":"\t").repeat(o);if(9===e.keyCode&&!r&&t.state.capture)if(e.preventDefault(),e.shiftKey){var f=(v=t._getLines(l,c)).length-1,y=t._getLines(l,u).length-1,g=l.split("\n").map((function(e,t){return t>=f&&t<=y&&e.startsWith(h)?e.substring(h.length):e})).join("\n");if(l!==g){var _=v[f];t._applyEdits({value:g,selectionStart:(null==_?void 0:_.startsWith(h))?c-h.length:c,selectionEnd:u-(l.length-g.length)})}}else if(c!==u){var v,m=(v=t._getLines(l,c)).length-1,b=t._getLines(l,u).length-1;_=v[m];t._applyEdits({value:l.split("\n").map((function(e,t){return t>=m&&t<=b?h+e:e})).join("\n"),selectionStart:_&&/\S/.test(_)?c+h.length:c,selectionEnd:u+h.length*(b-m+1)})}else{var k=c+h.length;t._applyEdits({value:l.substring(0,c)+h+l.substring(u),selectionStart:k,selectionEnd:k})}else if(8===e.keyCode){var C=c!==u;if(l.substring(0,c).endsWith(h)&&!C){e.preventDefault();k=c-h.length;t._applyEdits({value:l.substring(0,c-h.length)+l.substring(u),selectionStart:k,selectionEnd:k})}}else if(13===e.keyCode){if(c===u){var S=t._getLines(l,c).pop(),E=null==S?void 0:S.match(/^\s+/);if(null==E?void 0:E[0]){e.preventDefault();var w="\n"+E[0];k=c+w.length;t._applyEdits({value:l.substring(0,c)+w+l.substring(u),selectionStart:k,selectionEnd:k})}}}else if(57===e.keyCode||219===e.keyCode||222===e.keyCode||192===e.keyCode){var O=void 0;57===e.keyCode&&e.shiftKey?O=["(",")"]:219===e.keyCode?O=e.shiftKey?["{","}"]:["[","]"]:222===e.keyCode?O=e.shiftKey?['"','"']:["'","'"]:192!==e.keyCode||e.shiftKey||(O=["`","`"]),c!==u&&O&&(e.preventDefault(),t._applyEdits({value:l.substring(0,c)+O[0]+l.substring(c,u)+O[1]+l.substring(u),selectionStart:c,selectionEnd:u+2}))}else!(p?e.metaKey&&90===e.keyCode:e.ctrlKey&&90===e.keyCode)||e.shiftKey||e.altKey?(p?e.metaKey&&90===e.keyCode&&e.shiftKey:d?e.ctrlKey&&89===e.keyCode:e.ctrlKey&&90===e.keyCode&&e.shiftKey)&&!e.altKey?(e.preventDefault(),t._redoEdit()):77!==e.keyCode||!e.ctrlKey||p&&!e.shiftKey||(e.preventDefault(),t.setState((function(e){return{capture:!e.capture}}))):(e.preventDefault(),t._undoEdit())}},t._handleChange=function(e){var n=e.currentTarget,o=n.value,i=n.selectionStart,r=n.selectionEnd;t._recordChange({value:o,selectionStart:i,selectionEnd:r},!0),t.props.onValueChange(o)},t._history={stack:[],offset:-1},t._input=null,t}return i(Editor,e),Editor.prototype.componentDidMount=function(){this._recordCurrentState()},Object.defineProperty(Editor.prototype,"session",{get:function(){return{history:this._history}},set:function(e){this._history=e.history},enumerable:!1,configurable:!0}),Editor.prototype.render=function(){var e=this,t=this.props,n=t.value,o=t.style,i=t.padding,a=t.highlight,s=t.textareaId,l=t.textareaClassName,d=t.autoFocus,p=t.disabled,y=t.form,_=t.maxLength,v=t.minLength,m=t.name,b=t.placeholder,k=t.readOnly,C=t.required,S=t.onClick,E=t.onFocus,w=t.onBlur,O=t.onKeyUp,x=(t.onKeyDown,t.onValueChange,t.tabSize,t.insertSpaces,t.ignoreTabKey,t.preClassName),K=c(t,["value","style","padding","highlight","textareaId","textareaClassName","autoFocus","disabled","form","maxLength","minLength","name","placeholder","readOnly","required","onClick","onFocus","onBlur","onKeyUp","onKeyDown","onValueChange","tabSize","insertSpaces","ignoreTabKey","preClassName"]),j={paddingTop:"object"==typeof i?i.top:i,paddingRight:"object"==typeof i?i.right:i,paddingBottom:"object"==typeof i?i.bottom:i,paddingLeft:"object"==typeof i?i.left:i},L=a(n);return u.createElement("div",r({},K,{style:r(r({},g.container),o)}),u.createElement("pre",r({className:x,"aria-hidden":"true",style:r(r(r({},g.editor),g.highlight),j)},"string"==typeof L?{dangerouslySetInnerHTML:{__html:L+"<br />"}}:{children:L})),u.createElement("textarea",{ref:function(t){return e._input=t},style:r(r(r({},g.editor),g.textarea),j),className:h+(l?" ".concat(l):""),id:s,value:n,onChange:this._handleChange,onKeyDown:this._handleKeyDown,onClick:S,onKeyUp:O,onFocus:E,onBlur:w,disabled:p,form:y,maxLength:_,minLength:v,name:m,placeholder:b,readOnly:k,required:C,autoFocus:d,autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"data-gramm":!1}),u.createElement("style",{dangerouslySetInnerHTML:{__html:f}}))},Editor.defaultProps={tabSize:2,insertSpaces:!0,ignoreTabKey:!1,padding:0},Editor}(u.Component);t.default=y;var g={container:{position:"relative",textAlign:"left",boxSizing:"border-box",padding:0,overflow:"hidden"},textarea:{position:"absolute",top:0,left:0,height:"100%",width:"100%",resize:"none",color:"inherit",overflow:"hidden",MozOsxFontSmoothing:"grayscale",WebkitFontSmoothing:"antialiased",WebkitTextFillColor:"transparent"},highlight:{position:"relative",pointerEvents:"none"},editor:{margin:0,border:0,background:"none",boxSizing:"inherit",display:"inherit",fontFamily:"inherit",fontSize:"inherit",fontStyle:"inherit",fontVariantLigatures:"inherit",fontWeight:"inherit",letterSpacing:"inherit",lineHeight:"inherit",tabSize:"inherit",textIndent:"inherit",textRendering:"inherit",textTransform:"inherit",whiteSpace:"pre-wrap",wordBreak:"keep-all",overflowWrap:"break-word"}}}}]);