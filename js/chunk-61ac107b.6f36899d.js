(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61ac107b"],{"248bd":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"backup-state",attrs:{"data-cy":"backup_state"}},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{staticClass:"backup-state__description",attrs:{cols:"12"}},[t._v(" "+t._s(t.$t("backup-state.description"))+" ")])],1),n("v-list",{staticClass:"backup-state__buttons"},[n("v-tooltip",{attrs:{color:"#ea6464",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("div",t._g({},t.isConnected?null:i),[n("v-list-item",{staticClass:"backup-state__buttons__download-state",attrs:{disabled:!t.isConnected,"data-cy":"backup_state_buttons_download_state"},on:{click:function(e){t.downloadState=!0}}},[n("div",{staticClass:"backup-state__buttons__download-state__icon",class:{"backup-state__buttons__download-state__icon disabled-icon":!t.isConnected}},[n("v-img",{attrs:{src:o("e038")}})],1),n("v-list-item-content",[n("div",{staticClass:"backup-state__buttons__download-state__title"},[t._v(" "+t._s(t.$t("backup-state.download"))+" ")])])],1)],1)]}}])},[n("span",[t._v(t._s(t.$t("backup-state.disabled-download")))])]),n("v-tooltip",{attrs:{color:"#ea6464",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("div",t._g({},t.isConnected?i:null),[n("v-list-item",{staticClass:"backup-state__buttons__upload-state",attrs:{disabled:t.isConnected},on:{click:function(e){t.uploadState=!0}}},[n("div",{staticClass:"backup-state__buttons__upload-state__icon",class:{"backup-state__buttons__upload-state__icon disabled-icon":t.isConnected}},[n("v-img",{attrs:{src:o("3549")}})],1),n("v-list-item-content",[n("div",{staticClass:"backup-state__buttons__upload-state__title"},[t._v(" "+t._s(t.$t("backup-state.upload"))+" ")])])],1)],1)]}}])},[n("span",[t._v(t._s(t.$t("backup-state.disabled-upload")))])])],1),n("download-state-dialog",{attrs:{visible:t.downloadState},on:{cancel:function(e){t.downloadState=!1}}}),n("upload-state-dialog",{attrs:{visible:t.uploadState},on:{cancel:function(e){t.uploadState=!1}}})],1)},i=[],a=o("6dbe"),s=o("5cf9"),r=o("94ea"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("raiden-dialog",{staticClass:"download-state",attrs:{visible:t.visible},on:{close:t.cancel}},[n("v-card-title",[t._v(" "+t._s(t.$t("backup-state.download"))+" ")]),n("v-card-text",[n("v-img",{staticClass:"download-state__warning my-4",attrs:{src:o("afb7")}}),n("span",[t._v(t._s(t.$t("backup-state.download-warning")))])],1),n("v-card-actions",[n("action-button",{staticClass:"download-state__button",attrs:{"data-cy":"download_state_button",enabled:"","full-width":"",text:t.$t("backup-state.download-button")},on:{click:function(e){return t.getAndDownloadState()}}})],1)],1)},u=[],l=o("36d8"),f=o.n(l),d=o("750b"),p=o("66bc"),h=o("152b");function v(t){return v="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function b(t,e,o,n,i,a,s){try{var r=t[a](s),c=r.value}catch(u){return void o(u)}r.done?e(c):Promise.resolve(c).then(n,i)}function g(t){return function(){var e=this,o=arguments;return new Promise((function(n,i){var a=t.apply(e,o);function s(t){b(a,n,i,s,r,"next",t)}function r(t){b(a,n,i,s,r,"throw",t)}s(void 0)}))}}function m(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function y(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function w(t,e,o){return e&&y(t.prototype,e),o&&y(t,o),t}function _(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}function O(t,e){return O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},O(t,e)}function k(t){var e=C();return function(){var o,n=x(t);if(e){var i=x(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return S(this,o)}}function S(t,e){return!e||"object"!==v(e)&&"function"!==typeof e?j(t):e}function j(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function C(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function x(t){return x=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},x(t)}var D=function(t){_(o,t);var e=k(o);function o(){return m(this,o),e.apply(this,arguments)}return w(o,[{key:"cancel",value:function(){return!0}},{key:"getAndDownloadState",value:function(){var t=g(f.a.mark((function t(){var e,o,n;return f.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e="raiden_lc_state_".concat((new Date).toISOString(),".json"),t.next=3,this.getStateFileURL(e);case 3:o=t.sent,n=this.createDownloadLink(e,o),n.click(),this.revokeDownloadURL(o,n);case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"getStateFileURL",value:function(){var t=g(f.a.mark((function t(e){var o,n,i;return f.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$raiden.stopAndGetDatabaseDump();case 2:return o=t.sent,n=JSON.stringify(o),i=new File([n],e,{type:"application/json"}),t.abrupt("return",URL.createObjectURL(i));case 6:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"createDownloadLink",value:function(t,e){var o=document.createElement("a");return o.href=e,o.download=t,o.style.display="none",document.body.appendChild(o)}},{key:"revokeDownloadURL",value:function(t,e){setTimeout((function(){URL.revokeObjectURL(t),document.body.removeChild(e)}),1)}}]),o}(Object(s["c"])(h["a"]));Object(a["b"])([Object(s["e"])({required:!0,type:Boolean,default:!1})],D.prototype,"visible",void 0),Object(a["b"])([Object(s["b"])()],D.prototype,"cancel",null),D=Object(a["b"])([Object(s["a"])({components:{RaidenDialog:p["a"],ActionButton:d["a"]}})],D);var T=D,P=T,A=(o("f141"),o("a6c2")),L=o("411c"),R=o.n(L),z=o("e47e"),E=o("1331"),Y=Object(A["a"])(P,c,u,!1,null,"e2e35cee",null),B=Y.exports;R()(Y,{VCardActions:z["a"],VCardText:z["c"],VCardTitle:z["d"],VImg:E["a"]});var $=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("raiden-dialog",{staticClass:"upload-state",attrs:{visible:t.visible},on:{close:t.cancel}},[o("v-card-title",[t._v(t._s(t.$t("backup-state.upload")))]),t.dropzoneErrorMessage?o("v-card-text",[o("v-row",{staticClass:"upload-state__error",attrs:{justify:"center","no-gutters":""}},[t._v(" "+t._s(t.$t("backup-state.upload-error"))+" ")])],1):t.uploadingStateProgress?o("v-card-actions",[o("spinner")],1):o("v-card-actions",[o("div",{staticClass:"upload-state__dropzone",class:{"upload-state__dropzone active-dropzone":t.activeDropzone},on:{dragenter:t.onDropzoneEnter,dragleave:t.onDropzoneLeave,dragover:function(t){t.preventDefault()},drop:t.onDropzoneDrop}},[o("v-row",{staticClass:"upload-state__dropzone__icon",attrs:{justify:"center","no-gutters":""}},[o("v-icon",{staticClass:"upload-state__dropzone__icon--inactive-dropzone",class:{"upload-state__dropzone__icon--active-dropzone":t.activeDropzone},attrs:{size:"90px"}},[t._v(" mdi-upload ")])],1),o("v-row",{staticClass:"upload-state__dropzone__description",attrs:{justify:"center","no-gutters":""}},[t._v(" "+t._s(t.$t("backup-state.upload-drag-and-drop"))+" ")]),o("v-row",{staticClass:"upload-state__dropzone__description",attrs:{justify:"center","no-gutters":""}},[t._v(" "+t._s(t.$t("backup-state.upload-divider"))+" ")]),o("v-row",{staticClass:"upload-state__dropzone__button"},[o("input",{ref:"stateInput",attrs:{type:"file",hidden:""},on:{change:t.onFileSelect}}),o("action-button",{attrs:{enabled:!t.activeDropzone,text:t.$t("backup-state.upload-button")},on:{click:function(e){return t.$refs.stateInput.click()}}})],1)],1)])],1)},I=[],W=o("0527");function F(t){return F="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},F(t)}function N(t,e,o,n,i,a,s){try{var r=t[a](s),c=r.value}catch(u){return void o(u)}r.done?e(c):Promise.resolve(c).then(n,i)}function M(t){return function(){var e=this,o=arguments;return new Promise((function(n,i){var a=t.apply(e,o);function s(t){N(a,n,i,s,r,"next",t)}function r(t){N(a,n,i,s,r,"throw",t)}s(void 0)}))}}function V(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function X(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function H(t,e,o){return e&&X(t.prototype,e),o&&X(t,o),t}function U(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&J(t,e)}function J(t,e){return J=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},J(t,e)}function q(t){var e=K();return function(){var o,n=Q(t);if(e){var i=Q(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Z(this,o)}}function Z(t,e){return!e||"object"!==F(e)&&"function"!==typeof e?G(t):e}function G(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function K(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function Q(t){return Q=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Q(t)}var tt=function(t){U(o,t);var e=q(o);function o(){var t;return V(this,o),t=e.apply(this,arguments),t.dragCount=0,t.activeDropzone=!1,t.dropzoneErrorMessage=!1,t.uploadingStateProgress=!1,t}return H(o,[{key:"cancel",value:function(){return!0}},{key:"onDropzoneEnter",value:function(t){t.preventDefault(),this.dragCount++,this.activeDropzone=!0}},{key:"onDropzoneLeave",value:function(t){t.preventDefault(),this.dragCount--,this.dragCount<=0&&(this.activeDropzone=!1)}},{key:"onDropzoneDrop",value:function(t){var e,o;if(t.preventDefault(),this.activeDropzone=!1,null!==(e=t.dataTransfer)&&void 0!==e&&e.files){var n=null===(o=t.dataTransfer)||void 0===o?void 0:o.files;this.uploadState(n)}}},{key:"onFileSelect",value:function(t){if(t.target.files){var e=t.target.files;this.uploadState(e)}}},{key:"dropzoneError",value:function(){var t=this;this.uploadingStateProgress=!1,this.dropzoneErrorMessage=!0,setTimeout((function(){t.dropzoneErrorMessage=!1}),2e3)}},{key:"uploadState",value:function(t){var e=this;t.length>1&&this.dropzoneError();var o=new FileReader;o.onload=function(t){var o=t.target;if(t.target)try{e.uploadingStateProgress=!0;var n=JSON.parse(String(o.result));e.$store.commit("backupState",n),setTimeout(M(f.a.mark((function t(){return f.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.uploadingStateProgress=!1,e.navigateToHome();case 2:case"end":return t.stop()}}),t)}))),1e3)}catch(i){e.dropzoneError()}},o.readAsText(t[0])}}]),o}(Object(s["c"])(h["a"]));Object(a["b"])([Object(s["e"])({required:!0,type:Boolean,default:!1})],tt.prototype,"visible",void 0),Object(a["b"])([Object(s["b"])()],tt.prototype,"cancel",null),tt=Object(a["b"])([Object(s["a"])({components:{RaidenDialog:p["a"],ActionButton:d["a"],Spinner:W["a"]}})],tt);var et=tt,ot=et,nt=(o("80f3"),o("b503")),it=o("e614"),at=Object(A["a"])(ot,$,I,!1,null,"0b64d4b1",null),st=at.exports;function rt(t){return rt="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},rt(t)}function ct(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function ut(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?ct(Object(o),!0).forEach((function(e){lt(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):ct(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function lt(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function ft(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function dt(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&pt(t,e)}function pt(t,e){return pt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},pt(t,e)}function ht(t){var e=gt();return function(){var o,n=mt(t);if(e){var i=mt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return vt(this,o)}}function vt(t,e){return!e||"object"!==rt(e)&&"function"!==typeof e?bt(t):e}function bt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function gt(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function mt(t){return mt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},mt(t)}R()(at,{VCardActions:z["a"],VCardText:z["c"],VCardTitle:z["d"],VIcon:nt["a"],VRow:it["a"]});var yt=function(t){dt(o,t);var e=ht(o);function o(){var t;return ft(this,o),t=e.apply(this,arguments),t.downloadState=!1,t.uploadState=!1,t}return o}(s["g"]);yt=Object(a["b"])([Object(s["a"])({components:{DownloadStateDialog:B,UploadStateDialog:st},computed:ut({},Object(r["e"])(["isConnected"]))})],yt);var wt=yt,_t=wt,Ot=(o("4ec3f"),o("1fb1")),kt=o("add5"),St=o("d751"),jt=o("27a3"),Ct=o("dc05"),xt=Object(A["a"])(_t,n,i,!1,null,"fece32aa",null);e["default"]=xt.exports;R()(xt,{VCol:Ot["a"],VImg:E["a"],VList:kt["a"],VListItem:St["a"],VListItemContent:jt["b"],VRow:it["a"],VTooltip:Ct["a"]})},"2daf":function(t,e,o){},3549:function(t,e,o){t.exports=o.p+"img/state_upload.dea399eb.png"},"4ec3f":function(t,e,o){"use strict";o("2daf")},"6cb3":function(t,e,o){"use strict";var n=o("3e55"),i=o("d8d1"),a=o("b125"),s=o("9455"),r=o("a38b"),c=o("bc63");const u=Object(r["a"])(i["a"],n["a"],a["a"],s["a"]);e["a"]=u.extend().extend({name:"menuable",props:{allowOverflow:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[Number,String],default:"auto"},minWidth:[Number,String],nudgeBottom:{type:[Number,String],default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,openOnClick:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},data:()=>({activatorNode:[],absoluteX:0,absoluteY:0,activatedBy:null,activatorFixed:!1,dimensions:{activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0,offsetLeft:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0}},relativeYOffset:0,hasJustFocused:!1,hasWindow:!1,inputActivator:!1,isContentActive:!1,pageWidth:0,pageYOffset:0,stackClass:"v-menu__content--active",stackMinZIndex:6}),computed:{computedLeft(){const t=this.dimensions.activator,e=this.dimensions.content,o=(!1!==this.attach?t.offsetLeft:t.left)||0,n=Math.max(t.width,e.width);let i=0;if(i+=this.left?o-(n-t.width):o,this.offsetX){const e=isNaN(Number(this.maxWidth))?t.width:Math.min(t.width,Number(this.maxWidth));i+=this.left?-e:t.width}return this.nudgeLeft&&(i-=parseInt(this.nudgeLeft)),this.nudgeRight&&(i+=parseInt(this.nudgeRight)),i},computedTop(){const t=this.dimensions.activator,e=this.dimensions.content;let o=0;return this.top&&(o+=t.height-e.height),!1!==this.attach?o+=t.offsetTop:o+=t.top+this.pageYOffset,this.offsetY&&(o+=this.top?-t.height:t.height),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),o},hasActivator(){return!!this.$slots.activator||!!this.$scopedSlots.activator||!!this.activator||!!this.inputActivator},absoluteYOffset(){return this.pageYOffset-this.relativeYOffset}},watch:{disabled(t){t&&this.callDeactivate()},isActive(t){this.disabled||(t?this.callActivate():this.callDeactivate())},positionX:"updateDimensions",positionY:"updateDimensions"},beforeMount(){this.hasWindow="undefined"!==typeof window,this.hasWindow&&window.addEventListener("resize",this.updateDimensions,!1)},beforeDestroy(){this.hasWindow&&window.removeEventListener("resize",this.updateDimensions,!1)},methods:{absolutePosition(){return{offsetTop:0,offsetLeft:0,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0}},activate(){},calcLeft(t){return Object(c["g"])(!1!==this.attach?this.computedLeft:this.calcXOverflow(this.computedLeft,t))},calcTop(){return Object(c["g"])(!1!==this.attach?this.computedTop:this.calcYOverflow(this.computedTop))},calcXOverflow(t,e){const o=t+e-this.pageWidth+12;return t=(!this.left||this.right)&&o>0?Math.max(t-o,0):Math.max(t,12),t+this.getOffsetLeft()},calcYOverflow(t){const e=this.getInnerHeight(),o=this.absoluteYOffset+e,n=this.dimensions.activator,i=this.dimensions.content.height,a=t+i,s=o<a;return s&&this.offsetOverflow&&n.top>i?t=this.pageYOffset+(n.top-i):s&&!this.allowOverflow?t=o-i-12:t<this.absoluteYOffset&&!this.allowOverflow&&(t=this.absoluteYOffset+12),t<12?12:t},callActivate(){this.hasWindow&&this.activate()},callDeactivate(){this.isContentActive=!1,this.deactivate()},checkForPageYOffset(){this.hasWindow&&(this.pageYOffset=this.activatorFixed?0:this.getOffsetTop())},checkActivatorFixed(){if(!1!==this.attach)return;let t=this.getActivator();while(t){if("fixed"===window.getComputedStyle(t).position)return void(this.activatorFixed=!0);t=t.offsetParent}this.activatorFixed=!1},deactivate(){},genActivatorListeners(){const t=a["a"].options.methods.genActivatorListeners.call(this),e=t.click;return t.click=t=>{this.openOnClick&&e&&e(t),this.absoluteX=t.clientX,this.absoluteY=t.clientY},t},getInnerHeight(){return this.hasWindow?window.innerHeight||document.documentElement.clientHeight:0},getOffsetLeft(){return this.hasWindow?window.pageXOffset||document.documentElement.scrollLeft:0},getOffsetTop(){return this.hasWindow?window.pageYOffset||document.documentElement.scrollTop:0},getRoundedBoundedClientRect(t){const e=t.getBoundingClientRect();return{top:Math.round(e.top),left:Math.round(e.left),bottom:Math.round(e.bottom),right:Math.round(e.right),width:Math.round(e.width),height:Math.round(e.height)}},measure(t){if(!t||!this.hasWindow)return null;const e=this.getRoundedBoundedClientRect(t);if(!1!==this.attach){const o=window.getComputedStyle(t);e.left=parseInt(o.marginLeft),e.top=parseInt(o.marginTop)}return e},sneakPeek(t){requestAnimationFrame(()=>{const e=this.$refs.content;e&&"none"===e.style.display?(e.style.display="inline-block",t(),e.style.display="none"):t()})},startTransition(){return new Promise(t=>requestAnimationFrame(()=>{this.isContentActive=this.hasJustFocused=this.isActive,t()}))},updateDimensions(){this.hasWindow="undefined"!==typeof window,this.checkActivatorFixed(),this.checkForPageYOffset(),this.pageWidth=document.documentElement.clientWidth;const t={activator:{...this.dimensions.activator},content:{...this.dimensions.content}};if(!this.hasActivator||this.absolute)t.activator=this.absolutePosition();else{const e=this.getActivator();if(!e)return;t.activator=this.measure(e),t.activator.offsetLeft=e.offsetLeft,!1!==this.attach?t.activator.offsetTop=e.offsetTop:t.activator.offsetTop=0}this.sneakPeek(()=>{if(this.$refs.content){if(this.$refs.content.offsetParent){const e=this.getRoundedBoundedClientRect(this.$refs.content.offsetParent);this.relativeYOffset=window.pageYOffset+e.top,t.activator.top-=this.relativeYOffset,t.activator.left-=window.pageXOffset+e.left}t.content=this.measure(this.$refs.content)}this.dimensions=t})}}})},"80f3":function(t,e,o){"use strict";o("9aba")},"9aba":function(t,e,o){},afb7:function(t,e,o){t.exports=o.p+"img/warning.49bc56a9.svg"},c14b:function(t,e,o){},dc05:function(t,e,o){"use strict";o("c14b");var n=o("b125"),i=o("813e"),a=o("8edd"),s=o("dabc"),r=o("6cb3"),c=o("4254"),u=o("bc63"),l=o("2c5d"),f=o("a38b");e["a"]=Object(f["a"])(i["a"],a["a"],s["a"],r["a"],c["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,o=!this.bottom&&!this.left&&!this.top&&!this.right,n=!1!==this.attach?t.offsetLeft:t.left;let i=0;return this.top||this.bottom||o?i=n+t.width/2-e.width/2:(this.left||this.right)&&(i=n+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(i-=parseInt(this.nudgeLeft)),this.nudgeRight&&(i+=parseInt(this.nudgeRight)),this.calcXOverflow(i,this.dimensions.content.width)+"px"},calculatedTop(){const{activator:t,content:e}=this.dimensions,o=!1!==this.attach?t.offsetTop:t.top;let n=0;return this.top||this.bottom?n=o+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(n=o+t.height/2-e.height/2),this.nudgeTop&&(n-=parseInt(this.nudgeTop)),this.nudgeBottom&&(n+=parseInt(this.nudgeBottom)),this.calcYOverflow(n+this.pageYOffset)+"px"},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:Object(u["g"])(this.maxWidth),minWidth:Object(u["g"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick(()=>{this.value&&this.callActivate()})},mounted(){"v-slot"===Object(u["s"])(this,"activator",!0)&&Object(l["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=n["a"].options.methods.genActivatorListeners.call(this);return t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")},t.keydown=t=>{t.keyCode===u["w"].esc&&(this.getActivator(t),this.runDelay("close"))},t},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(t){return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent(()=>[this.genTransition()]),this.genActivator()])}})},e038:function(t,e,o){t.exports=o.p+"img/state_download.fc1f0473.png"},f141:function(t,e,o){"use strict";o("fba3")},fba3:function(t,e,o){}}]);