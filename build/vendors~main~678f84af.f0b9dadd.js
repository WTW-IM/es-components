/*! For license information please see vendors~main~678f84af.f0b9dadd.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{667:function(u,e,r){"use strict";r.d(e,"a",(function(){return encode}));for(var D={},a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",t=0;t<a.length;t++)D[a.charCodeAt(t)]=t;function encode(u){for(var e=0,r=0,D=0,a=0,t="",n=0;n<u.length;n++){var o=u[n];if(n>0&&(t+=";"),0!==o.length){for(var c=0,i=[],s=0,C=o;s<C.length;s++){var A=C[s],F=encodeInteger(A[0]-c);c=A[0],A.length>1&&(F+=encodeInteger(A[1]-e)+encodeInteger(A[2]-r)+encodeInteger(A[3]-D),e=A[1],r=A[2],D=A[3]),5===A.length&&(F+=encodeInteger(A[4]-a),a=A[4]),i.push(F)}t+=i.join(",")}}return t}function encodeInteger(u){var e="";u=u<0?-u<<1|1:u<<1;do{var r=31&u;(u>>>=5)>0&&(r|=32),e+=a[r]}while(u>0);return e}},671:function(u,e){u.exports=function shallowEqual(u,e,r,D){var a=r?r.call(D,u,e):void 0;if(void 0!==a)return!!a;if(u===e)return!0;if("object"!=typeof u||!u||"object"!=typeof e||!e)return!1;var t=Object.keys(u),n=Object.keys(e);if(t.length!==n.length)return!1;for(var o=Object.prototype.hasOwnProperty.bind(e),c=0;c<t.length;c++){var i=t[c];if(!o(i))return!1;var s=u[i],C=e[i];if(!1===(a=r?r.call(D,s,C,i):void 0)||void 0===a&&s!==C)return!1}return!0}},710:function(u,e,r){"use strict";u.exports=r(711)},711:function(u,e,r){"use strict";var D,a,t,n;if("object"==typeof performance&&"function"==typeof performance.now){var o=performance;e.unstable_now=function(){return o.now()}}else{var c=Date,i=c.now();e.unstable_now=function(){return c.now()-i}}if("undefined"==typeof window||"function"!=typeof MessageChannel){var s=null,C=null,w=function(){if(null!==s)try{var u=e.unstable_now();s(!0,u),s=null}catch(u){throw setTimeout(w,0),u}};D=function(u){null!==s?setTimeout(D,0,u):(s=u,setTimeout(w,0))},a=function(u,e){C=setTimeout(u,e)},t=function(){clearTimeout(C)},e.unstable_shouldYield=function(){return!1},n=e.unstable_forceFrameRate=function(){}}else{var A=window.setTimeout,F=window.clearTimeout;if("undefined"!=typeof console){var E=window.cancelAnimationFrame;"function"!=typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),"function"!=typeof E&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var l=!1,p=null,f=-1,B=5,d=0;e.unstable_shouldYield=function(){return e.unstable_now()>=d},n=function(){},e.unstable_forceFrameRate=function(u){0>u||125<u?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<u?Math.floor(1e3/u):5};var h=new MessageChannel,g=h.port2;h.port1.onmessage=function(){if(null!==p){var u=e.unstable_now();d=u+B;try{p(!0,u)?g.postMessage(null):(l=!1,p=null)}catch(u){throw g.postMessage(null),u}}else l=!1},D=function(u){p=u,l||(l=!0,g.postMessage(null))},a=function(u,r){f=A((function(){u(e.unstable_now())}),r)},t=function(){F(f),f=-1}}function H(u,e){var r=u.length;u.push(e);u:for(;;){var D=r-1>>>1,a=u[D];if(!(void 0!==a&&0<I(a,e)))break u;u[D]=e,u[r]=a,r=D}}function J(u){return void 0===(u=u[0])?null:u}function K(u){var e=u[0];if(void 0!==e){var r=u.pop();if(r!==e){u[0]=r;u:for(var D=0,a=u.length;D<a;){var t=2*(D+1)-1,n=u[t],o=t+1,c=u[o];if(void 0!==n&&0>I(n,r))void 0!==c&&0>I(c,n)?(u[D]=c,u[o]=r,D=o):(u[D]=n,u[t]=r,D=t);else{if(!(void 0!==c&&0>I(c,r)))break u;u[D]=c,u[o]=r,D=o}}}return e}return null}function I(u,e){var r=u.sortIndex-e.sortIndex;return 0!==r?r:u.id-e.id}var v=[],m=[],y=1,b=null,R=3,k=!1,x=!1,P=!1;function T(u){for(var e=J(m);null!==e;){if(null===e.callback)K(m);else{if(!(e.startTime<=u))break;K(m),e.sortIndex=e.expirationTime,H(v,e)}e=J(m)}}function U(u){if(P=!1,T(u),!x)if(null!==J(v))x=!0,D(V);else{var e=J(m);null!==e&&a(U,e.startTime-u)}}function V(u,r){x=!1,P&&(P=!1,t()),k=!0;var D=R;try{for(T(r),b=J(v);null!==b&&(!(b.expirationTime>r)||u&&!e.unstable_shouldYield());){var n=b.callback;if("function"==typeof n){b.callback=null,R=b.priorityLevel;var o=n(b.expirationTime<=r);r=e.unstable_now(),"function"==typeof o?b.callback=o:b===J(v)&&K(v),T(r)}else K(v);b=J(v)}if(null!==b)var c=!0;else{var i=J(m);null!==i&&a(U,i.startTime-r),c=!1}return c}finally{b=null,R=D,k=!1}}var _=n;e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(u){u.callback=null},e.unstable_continueExecution=function(){x||k||(x=!0,D(V))},e.unstable_getCurrentPriorityLevel=function(){return R},e.unstable_getFirstCallbackNode=function(){return J(v)},e.unstable_next=function(u){switch(R){case 1:case 2:case 3:var e=3;break;default:e=R}var r=R;R=e;try{return u()}finally{R=r}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=_,e.unstable_runWithPriority=function(u,e){switch(u){case 1:case 2:case 3:case 4:case 5:break;default:u=3}var r=R;R=u;try{return e()}finally{R=r}},e.unstable_scheduleCallback=function(u,r,n){var o=e.unstable_now();switch("object"==typeof n&&null!==n?n="number"==typeof(n=n.delay)&&0<n?o+n:o:n=o,u){case 1:var c=-1;break;case 2:c=250;break;case 5:c=1073741823;break;case 4:c=1e4;break;default:c=5e3}return u={id:y++,callback:r,priorityLevel:u,startTime:n,expirationTime:c=n+c,sortIndex:-1},n>o?(u.sortIndex=n,H(m,u),null===J(v)&&u===J(m)&&(P?t():P=!0,a(U,n-o))):(u.sortIndex=c,H(v,u),x||k||(x=!0,D(V))),u},e.unstable_wrapCallback=function(u){var e=R;return function(){var r=R;R=e;try{return u.apply(this,arguments)}finally{R=r}}}},959:function(u,e,r){(function(u,D){var a;(function(){"use strict";var t={function:!0,object:!0},n=t[typeof window]&&window||this,o=t[typeof e]&&e&&!e.nodeType&&e,c=t[typeof u]&&u&&!u.nodeType,i=o&&c&&"object"==typeof D&&D;!i||i.global!==i&&i.window!==i&&i.self!==i||(n=i);var s=Object.prototype.hasOwnProperty;function fromCodePoint(){var u=Number(arguments[0]);if(!isFinite(u)||u<0||u>1114111||Math.floor(u)!=u)throw RangeError("Invalid code point: "+u);if(u<=65535)return String.fromCharCode(u);var e=55296+((u-=65536)>>10),r=u%1024+56320;return String.fromCharCode(e,r)}var C={};function assertType(u,e){if(-1==e.indexOf("|")){if(u==e)return;throw Error("Invalid node type: "+u+"; expected type: "+e)}if(!(e=s.call(C,e)?C[e]:C[e]=RegExp("^(?:"+e+")$")).test(u))throw Error("Invalid node type: "+u+"; expected types: "+e)}function generate(u){var e=u.type;if(s.call(A,e))return A[e](u);throw Error("Invalid node type: "+e)}function generateSequence(u,e){for(var r,D=-1,a=e.length,t="";++D<a;)r=e[D],D+1<a&&"value"==e[D].type&&"null"==e[D].kind&&"value"==e[D+1].type&&"symbol"==e[D+1].kind&&e[D+1].codePoint>=48&&e[D+1].codePoint<=57?t+="\\000":t+=u(r);return t}function generateAtom(u){return assertType(u.type,"anchor|characterClass|characterClassEscape|dot|group|reference|value"),generate(u)}function generateClassAtom(u){return assertType(u.type,"anchor|characterClassEscape|characterClassRange|dot|value"),generate(u)}function generateIdentifier(u){return assertType(u.type,"identifier"),u.value}function generateTerm(u){return assertType(u.type,"anchor|characterClass|characterClassEscape|empty|group|quantifier|reference|unicodePropertyEscape|value|dot"),generate(u)}var A={alternative:function generateAlternative(u){return assertType(u.type,"alternative"),generateSequence(generateTerm,u.body)},anchor:function generateAnchor(u){switch(assertType(u.type,"anchor"),u.kind){case"start":return"^";case"end":return"$";case"boundary":return"\\b";case"not-boundary":return"\\B";default:throw Error("Invalid assertion")}},characterClass:function generateCharacterClass(u){return assertType(u.type,"characterClass"),"["+(u.negative?"^":"")+generateSequence(generateClassAtom,u.body)+"]"},characterClassEscape:function generateCharacterClassEscape(u){return assertType(u.type,"characterClassEscape"),"\\"+u.value},characterClassRange:function generateCharacterClassRange(u){assertType(u.type,"characterClassRange");var e=u.min,r=u.max;if("characterClassRange"==e.type||"characterClassRange"==r.type)throw Error("Invalid character class range");return generateClassAtom(e)+"-"+generateClassAtom(r)},disjunction:function generateDisjunction(u){assertType(u.type,"disjunction");for(var e=u.body,r=-1,D=e.length,a="";++r<D;)0!=r&&(a+="|"),a+=generate(e[r]);return a},dot:function generateDot(u){return assertType(u.type,"dot"),"."},group:function generateGroup(u){assertType(u.type,"group");var e="";switch(u.behavior){case"normal":u.name&&(e+="?<"+generateIdentifier(u.name)+">");break;case"ignore":e+="?:";break;case"lookahead":e+="?=";break;case"negativeLookahead":e+="?!";break;case"lookbehind":e+="?<=";break;case"negativeLookbehind":e+="?<!";break;default:throw Error("Invalid behaviour: "+u.behaviour)}return"("+(e+=generateSequence(generate,u.body))+")"},quantifier:function generateQuantifier(u){assertType(u.type,"quantifier");var e="",r=u.min,D=u.max;return e=null==D?0==r?"*":1==r?"+":"{"+r+",}":r==D?"{"+r+"}":0==r&&1==D?"?":"{"+r+","+D+"}",u.greedy||(e+="?"),generateAtom(u.body[0])+e},reference:function generateReference(u){if(assertType(u.type,"reference"),u.matchIndex)return"\\"+u.matchIndex;if(u.name)return"\\k<"+generateIdentifier(u.name)+">";throw new Error("Unknown reference type")},unicodePropertyEscape:function generateUnicodePropertyEscape(u){return assertType(u.type,"unicodePropertyEscape"),"\\"+(u.negative?"P":"p")+"{"+u.value+"}"},value:function generateValue(u){assertType(u.type,"value");var e=u.kind,r=u.codePoint;if("number"!=typeof r)throw new Error("Invalid code point: "+r);switch(e){case"controlLetter":return"\\c"+fromCodePoint(r+64);case"hexadecimalEscape":return"\\x"+("00"+r.toString(16).toUpperCase()).slice(-2);case"identifier":return"\\"+fromCodePoint(r);case"null":return"\\"+r;case"octal":return"\\"+("000"+r.toString(8)).slice(-3);case"singleEscape":switch(r){case 8:return"\\b";case 9:return"\\t";case 10:return"\\n";case 11:return"\\v";case 12:return"\\f";case 13:return"\\r";case 45:return"\\-";default:throw Error("Invalid code point: "+r)}case"symbol":return fromCodePoint(r);case"unicodeEscape":return"\\u"+("0000"+r.toString(16).toUpperCase()).slice(-4);case"unicodeCodePointEscape":return"\\u{"+r.toString(16).toUpperCase()+"}";default:throw Error("Unsupported node kind: "+e)}}},F={generate:generate};void 0===(a=function(){return F}.call(e,r,e,u))||(u.exports=a),n.regjsgen=F}).call(this)}).call(this,r(208)(u),r(78))},960:function(u,e,r){var D,a,t,n;t=String.fromCodePoint||(D=String.fromCharCode,a=Math.floor,function fromCodePoint(){var u,e,r=16384,t=[],n=-1,o=arguments.length;if(!o)return"";for(var c="";++n<o;){var i=Number(arguments[n]);if(!isFinite(i)||i<0||i>1114111||a(i)!=i)throw RangeError("Invalid code point: "+i);i<=65535?t.push(i):(u=55296+((i-=65536)>>10),e=i%1024+56320,t.push(u,e)),(n+1==o||t.length>r)&&(c+=D.apply(null,t),t.length=0)}return c}),n={parse:function parse(u,e,r){function addRaw(e){return e.raw=u.substring(e.range[0],e.range[1]),e}function updateRawStart(u,e){return u.range[0]=e,addRaw(u)}function createAnchor(u,e){return addRaw({type:"anchor",kind:u,range:[c-e,c]})}function createValue(u,e,r,D){return addRaw({type:"value",kind:u,codePoint:e,range:[r,D]})}function createEscaped(u,e,r,D){return D=D||0,createValue(u,e,c-(r.length+D),c)}function createCharacter(u){var e,r=u[0],D=r.charCodeAt(0);return o&&1===r.length&&D>=55296&&D<=56319&&(e=lookahead().charCodeAt(0))>=56320&&e<=57343?createValue("symbol",1024*(D-55296)+e-56320+65536,++c-2,c):createValue("symbol",D,c-1,c)}function createDisjunction(u,e,r){return addRaw({type:"disjunction",body:u,range:[e,r]})}function createNamedReference(u){return addRaw({type:"reference",name:u,range:[u.range[0]-3,c]})}function createGroup(u,e,r,D){return addRaw({type:"group",behavior:u,body:e,range:[r,D]})}function createQuantifier(u,e,r,D){return null==D&&(r=c-1,D=c),addRaw({type:"quantifier",min:u,max:e,greedy:!0,body:null,range:[r,D]})}function createAlternative(u,e,r){return addRaw({type:"alternative",body:u,range:[e,r]})}function createCharacterClass(u,e,r,D){return addRaw({type:"characterClass",body:u,negative:e,range:[r,D]})}function createClassRange(u,e,r,D){return u.codePoint>e.codePoint&&bail("invalid range in character class",u.raw+"-"+e.raw,r,D),addRaw({type:"characterClassRange",min:u,max:e,range:[r,D]})}function flattenBody(u){return"alternative"===u.type?u.body:[u]}function incr(e){e=e||1;var r=u.substring(c,c+e);return c+=e||1,r}function skip(u){match(u)||bail("character",u)}function match(e){if(u.indexOf(e,c)===c)return incr(e.length)}function lookahead(){return u[c]}function current(e){return u.indexOf(e,c)===c}function next(e){return u[c+1]===e}function matchReg(e){var r=u.substring(c).match(e);return r&&(r.range=[],r.range[0]=c,incr(r[0].length),r.range[1]=c),r}function parseDisjunction(){var u=[],e=c;for(u.push(parseAlternative());match("|");)u.push(parseAlternative());return 1===u.length?u[0]:createDisjunction(u,e,c)}function parseAlternative(){for(var u,e=[],r=c;u=parseTerm();)e.push(u);return 1===e.length?e[0]:createAlternative(e,r,c)}function parseTerm(){if(c>=u.length||current("|")||current(")"))return null;var e=match("^")?createAnchor("start",1):match("$")?createAnchor("end",1):match("\\b")?createAnchor("boundary",2):match("\\B")?createAnchor("not-boundary",2):parseGroup("(?=","lookahead","(?!","negativeLookahead");if(e)return e;var r,D=parseAtomAndExtendedAtom();return D||(pos_backup=c,(r=parseQuantifier()||!1)&&(c=pos_backup,bail("Expected atom")),!o&&(res=matchReg(/^{/))?D=createCharacter(res):bail("Expected atom")),(r=parseQuantifier()||!1)?(r.body=flattenBody(D),updateRawStart(r,D.range[0]),r):D}function parseGroup(u,e,r,D){var a=null,t=c;if(match(u))a=e;else{if(!match(r))return!1;a=D}return finishGroup(a,t)}function finishGroup(u,e){var r=parseDisjunction();r||bail("Expected disjunction"),skip(")");var D=createGroup(u,flattenBody(r),e,c);return"normal"==u&&n&&a++,D}function parseQuantifier(){var u,e,r,D,a=c;return match("*")?e=createQuantifier(0):match("+")?e=createQuantifier(1):match("?")?e=createQuantifier(0,1):(u=matchReg(/^\{([0-9]+)\}/))?e=createQuantifier(r=parseInt(u[1],10),r,u.range[0],u.range[1]):(u=matchReg(/^\{([0-9]+),\}/))?e=createQuantifier(r=parseInt(u[1],10),void 0,u.range[0],u.range[1]):(u=matchReg(/^\{([0-9]+),([0-9]+)\}/))&&((r=parseInt(u[1],10))>(D=parseInt(u[2],10))&&bail("numbers out of order in {} quantifier","",a,c),e=createQuantifier(r,D,u.range[0],u.range[1])),e&&match("?")&&(e.greedy=!1,e.range[1]+=1),e}function parseAtomAndExtendedAtom(){var u;if(u=matchReg(/^[^^$\\.*+?()[\]{}|]/))return createCharacter(u);if(!o&&(u=matchReg(/^(?:]|})/)))return createCharacter(u);if(match("."))return addRaw({type:"dot",range:[c-1,c]});if(match("\\")){if(!(u=parseAtomEscape())){if(!o&&"c"==lookahead())return createValue("symbol",92,c-1,c);bail("atomEscape")}return u}if(u=parseCharacterClass())return u;if(r.lookbehind&&(u=parseGroup("(?<=","lookbehind","(?<!","negativeLookbehind")))return u;if(r.namedGroups&&match("(?<")){var e=parseIdentifier();skip(">");var D=finishGroup("normal",e.range[0]-3);return D.name=e,D}return parseGroup("(?:","ignore","(","normal")}function parseUnicodeSurrogatePairEscape(u){var e,r;if(o&&"unicodeEscape"==u.kind&&(e=u.codePoint)>=55296&&e<=56319&&current("\\")&&next("u")){var D=c;c++;var a=parseClassEscape();"unicodeEscape"==a.kind&&(r=a.codePoint)>=56320&&r<=57343?(u.range[1]=a.range[1],u.codePoint=1024*(e-55296)+r-56320+65536,u.type="value",u.kind="unicodeCodePointEscape",addRaw(u)):c=D}return u}function parseClassEscape(){return parseAtomEscape(!0)}function parseAtomEscape(u){var e,r=c;if(e=parseDecimalEscape()||parseNamedReference())return e;if(u){if(match("b"))return createEscaped("singleEscape",8,"\\b");if(match("B"))bail("\\B not possible inside of CharacterClass","",r);else{if(!o&&(e=matchReg(/^c([0-9])/)))return createEscaped("controlLetter",e[1]+16,e[1],2);if(!o&&(e=matchReg(/^c_/)))return createEscaped("controlLetter",31,"_",2)}if(o&&match("-"))return createEscaped("singleEscape",45,"\\-")}return e=parseCharacterEscape()}function parseDecimalEscape(){var u,e,r;if(u=matchReg(/^(?!0)\d+/)){e=u[0];var t=parseInt(u[0],10);return t<=a?(r=u[0],addRaw({type:"reference",matchIndex:parseInt(r,10),range:[c-1-r.length,c]})):(D.push(t),incr(-u[0].length),(u=matchReg(/^[0-7]{1,3}/))?createEscaped("octal",parseInt(u[0],8),u[0],1):updateRawStart(u=createCharacter(matchReg(/^[89]/)),u.range[0]-1))}return(u=matchReg(/^[0-7]{1,3}/))?(e=u[0],/^0{1,3}$/.test(e)?createEscaped("null",0,"0",e.length):createEscaped("octal",parseInt(e,8),e,1)):!!(u=matchReg(/^[dDsSwW]/))&&addRaw({type:"characterClassEscape",value:u[0],range:[c-2,c]})}function parseNamedReference(){if(r.namedGroups&&matchReg(/^k<(?=.*?>)/)){var u=parseIdentifier();return skip(">"),createNamedReference(u)}}function parseRegExpUnicodeEscapeSequence(){var u;return(u=matchReg(/^u([0-9a-fA-F]{4})/))?parseUnicodeSurrogatePairEscape(createEscaped("unicodeEscape",parseInt(u[1],16),u[1],2)):o&&(u=matchReg(/^u\{([0-9a-fA-F]+)\}/))?createEscaped("unicodeCodePointEscape",parseInt(u[1],16),u[1],4):void 0}function parseCharacterEscape(){var u,e,D,a=c;if(u=matchReg(/^[fnrtv]/)){var t=0;switch(u[0]){case"t":t=9;break;case"n":t=10;break;case"v":t=11;break;case"f":t=12;break;case"r":t=13}return createEscaped("singleEscape",t,"\\"+u[0])}return(u=matchReg(/^c([a-zA-Z])/))?createEscaped("controlLetter",u[1].charCodeAt(0)%32,u[1],2):(u=matchReg(/^x([0-9a-fA-F]{2})/))?createEscaped("hexadecimalEscape",parseInt(u[1],16),u[1],2):(u=parseRegExpUnicodeEscapeSequence())?((!u||u.codePoint>1114111)&&bail("Invalid escape sequence",null,a,c),u):r.unicodePropertyEscape&&o&&(u=matchReg(/^([pP])\{([^\}]+)\}/))?addRaw({type:"unicodePropertyEscape",negative:"P"===u[1],value:u[2],range:[u.range[0]-1,u.range[1]],raw:u[0]}):(D=lookahead(),o&&/[\^\$\.\*\+\?\(\)\\\[\]\{\}\|\/]/.test(D)||!o&&"c"!==D?"k"===D&&r.lookbehind?null:createEscaped("identifier",(e=incr()).charCodeAt(0),e,1):null)}function parseIdentifierAtom(e){var r=lookahead(),D=c;if("\\"===r){incr();var a=parseRegExpUnicodeEscapeSequence();return a&&e(a.codePoint)||bail("Invalid escape sequence",null,D,c),t(a.codePoint)}var n=r.charCodeAt(0);if(n>=55296&&n<=56319){var o=(r+=u[c+1]).charCodeAt(1);o>=56320&&o<=57343&&(n=1024*(n-55296)+o-56320+65536)}if(e(n))return incr(),n>65535&&incr(),r}function parseIdentifier(){var u,e=c,r=parseIdentifierAtom(isIdentifierStart);for(r||bail("Invalid identifier");u=parseIdentifierAtom(isIdentifierPart);)r+=u;return addRaw({type:"identifier",value:r,range:[e,c]})}function isIdentifierStart(u){return 36===u||95===u||u>=65&&u<=90||u>=97&&u<=122||u>=128&&/[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7B9\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDF00-\uDF1C\uDF27\uDF30-\uDF45]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFF1]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/.test(t(u))}function isIdentifierPart(u){return isIdentifierStart(u)||u>=48&&u<=57||u>=128&&/[0-9_\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDD30-\uDD39\uDF46-\uDF50]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC66-\uDC6F\uDC7F-\uDC82\uDCB0-\uDCBA\uDCF0-\uDCF9\uDD00-\uDD02\uDD27-\uDD34\uDD36-\uDD3F\uDD45\uDD46\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDDC9-\uDDCC\uDDD0-\uDDD9\uDE2C-\uDE37\uDE3E\uDEDF-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF3B\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC35-\uDC46\uDC50-\uDC59\uDC5E\uDCB0-\uDCC3\uDCD0-\uDCD9\uDDAF-\uDDB5\uDDB8-\uDDC0\uDDDC\uDDDD\uDE30-\uDE40\uDE50-\uDE59\uDEAB-\uDEB7\uDEC0-\uDEC9\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDC2C-\uDC3A\uDCE0-\uDCE9\uDE01-\uDE0A\uDE33-\uDE39\uDE3B-\uDE3E\uDE47\uDE51-\uDE5B\uDE8A-\uDE99]|\uD807[\uDC2F-\uDC36\uDC38-\uDC3F\uDC50-\uDC59\uDC92-\uDCA7\uDCA9-\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD50-\uDD59\uDD8A-\uDD8E\uDD90\uDD91\uDD93-\uDD97\uDDA0-\uDDA9\uDEF3-\uDEF6]|\uD81A[\uDE60-\uDE69\uDEF0-\uDEF4\uDF30-\uDF36\uDF50-\uDF59]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A\uDD50-\uDD59]|\uDB40[\uDD00-\uDDEF]/.test(t(u))}function parseCharacterClass(){var u,e=c;return(u=matchReg(/^\[\^/))?(u=parseClassRanges(),skip("]"),createCharacterClass(u,!0,e,c)):match("[")?(u=parseClassRanges(),skip("]"),createCharacterClass(u,!1,e,c)):null}function parseClassRanges(){var u,e;return current("]")?[]:((e=parseClassAtom())||bail("classAtom"),(u=current("]")?[e]:parseHelperClassRanges(e))||bail("nonEmptyClassRanges"),u)}function parseHelperClassRanges(u){var e,r,D,a,t;if(current("-")&&!next("]")){e=u.range[0],t=createCharacter(match("-")),(a=parseClassAtom())||bail("classAtom"),r=c;var n=parseClassRanges();return n||bail("classRanges"),"codePoint"in u&&"codePoint"in a?D=[createClassRange(u,a,e,r)]:o?bail("invalid character class"):D=[u,t,a],"empty"===n.type?D:D.concat(n)}return(D=parseNonemptyClassRangesNoDash())||bail("nonEmptyClassRangesNoDash"),[u].concat(D)}function parseNonemptyClassRangesNoDash(){var u=parseClassAtom();return u||bail("classAtom"),current("]")?u:parseHelperClassRanges(u)}function parseClassAtom(){return match("-")?createCharacter("-"):parseClassAtomNoDash()}function parseClassAtomNoDash(){var u;return(u=matchReg(/^[^\\\]-]/))?createCharacter(u[0]):match("\\")?((u=parseClassEscape())||bail("classEscape"),parseUnicodeSurrogatePairEscape(u)):void 0}function bail(e,r,D,a){D=null==D?c:D,a=null==a?D:a;var t=Math.max(0,D-10),n=Math.min(a+10,u.length),o="    "+u.substring(t,n),i="    "+new Array(D-t+1).join(" ")+"^";throw SyntaxError(e+" at position "+D+(r?": "+r:"")+"\n"+o+"\n"+i)}r||(r={});var D=[],a=0,n=!0,o=-1!==(e||"").indexOf("u"),c=0;""===(u=String(u))&&(u="(?:)");var i=parseDisjunction();i.range[1]!==u.length&&bail("Could not parse entire input - got stuck","",i.range[1]);for(var s=0;s<D.length;s++)if(D[s]<=a)return c=0,n=!1,parseDisjunction();return i}},u.exports?u.exports=n:window.regjsparser=n}}]);