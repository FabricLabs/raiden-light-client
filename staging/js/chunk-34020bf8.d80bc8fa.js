(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34020bf8"],{"0527":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"spinner",class:{"spinner--blocking":!t.inline}},[n("div",{staticClass:"spinner__circle",style:t.style})])},r=[],a=n("e921"),c=n("8509");function i(t){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function l(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}function f(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}function p(t,e){return p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},p(t,e)}function d(t){var e=y();return function(){var n,o=_(t);if(e){var r=_(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return b(this,n)}}function b(t,e){return!e||"object"!==i(e)&&"function"!==typeof e?v(t):e}function v(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function y(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function _(t){return _=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},_(t)}var h=function(t){f(n,t);var e=d(n);function n(){return u(this,n),e.apply(this,arguments)}return l(n,[{key:"style",get:function(){return{width:"".concat(this.size,"px"),height:"".concat(this.size,"px"),borderWidth:"".concat(this.width,"px")}}}]),n}(c["e"]);Object(a["a"])([Object(c["d"])({type:Boolean,default:!1})],h.prototype,"inline",void 0),Object(a["a"])([Object(c["d"])({type:Number,default:120})],h.prototype,"size",void 0),Object(a["a"])([Object(c["d"])({type:Number,default:7})],h.prototype,"width",void 0),h=Object(a["a"])([Object(c["a"])({})],h);var g=h,w=g,O=(n("81ae"),n("22b8")),m=Object(O["a"])(w,o,r,!1,null,"22d302c2",null);e["a"]=m.exports},"248b":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"backup-state"},[o("v-row",{attrs:{"no-gutters":""}},[o("v-col",{staticClass:"backup-state__description",attrs:{cols:"12"}},[t._v(" "+t._s(t.$t("backup-state.description"))+" ")])],1),o("v-list",{staticClass:"backup-state__buttons"},[o("v-tooltip",{attrs:{color:"#ea6464",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[o("div",t._g({},t.isConnected?null:r),[o("v-list-item",{staticClass:"backup-state__buttons__download-state",attrs:{disabled:!t.isConnected},on:{click:function(e){t.downloadState=!0}}},[o("div",{staticClass:"backup-state__buttons__download-state__icon",class:{"backup-state__buttons__download-state__icon disabled-icon":!t.isConnected}},[o("v-img",{attrs:{src:n("e038")}})],1),o("v-list-item-content",[o("div",{staticClass:"backup-state__buttons__download-state__title"},[t._v(" "+t._s(t.$t("backup-state.download"))+" ")])])],1)],1)]}}])},[o("span",[t._v(t._s(t.$t("backup-state.disabled-download")))])]),o("v-tooltip",{attrs:{color:"#ea6464",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[o("div",t._g({},t.isConnected?r:null),[o("v-list-item",{staticClass:"backup-state__buttons__upload-state",attrs:{disabled:t.isConnected},on:{click:function(e){t.uploadState=!0}}},[o("div",{staticClass:"backup-state__buttons__upload-state__icon",class:{"backup-state__buttons__upload-state__icon disabled-icon":t.isConnected}},[o("v-img",{attrs:{src:n("3549")}})],1),o("v-list-item-content",[o("div",{staticClass:"backup-state__buttons__upload-state__title"},[t._v(" "+t._s(t.$t("backup-state.upload"))+" ")])])],1)],1)]}}])},[o("span",[t._v(t._s(t.$t("backup-state.disabled-upload")))])])],1),o("download-state-dialog",{attrs:{visible:t.downloadState},on:{cancel:function(e){t.downloadState=!1}}}),o("upload-state-dialog",{attrs:{visible:t.uploadState},on:{cancel:function(e){t.uploadState=!1}}})],1)},r=[],a=n("e921"),c=n("8509"),i=n("2b7f"),u=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("raiden-dialog",{staticClass:"download-state",attrs:{visible:t.visible},on:{close:t.cancel}},[o("v-card-title",[t._v(" "+t._s(t.$t("backup-state.download"))+" ")]),o("v-card-text",[o("v-row",{attrs:{align:"center",justify:"center","no-gutters":""}},[o("v-col",{attrs:{cols:"6"}},[o("v-img",{staticClass:"download-state__warning",attrs:{src:n("afb7")}})],1),o("v-col",{attrs:{cols:"12"}},[t._v(" "+t._s(t.$t("backup-state.download-warning"))+" ")])],1)],1),o("v-card-actions",[o("action-button",{attrs:{enabled:"","full-width":"",text:t.$t("backup-state.download-button")},on:{click:function(e){return t.getAndDownloadState()}}})],1)],1)},s=[],l=n("4bf2"),f=n.n(l),p=n("66bc"),d=n("750b"),b=n("152b");function v(t){return v="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function y(t,e,n,o,r,a,c){try{var i=t[a](c),u=i.value}catch(s){return void n(s)}i.done?e(u):Promise.resolve(u).then(o,r)}function _(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var a=t.apply(e,n);function c(t){y(a,o,r,c,i,"next",t)}function i(t){y(a,o,r,c,i,"throw",t)}c(void 0)}))}}function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function w(t,e,n){return e&&g(t.prototype,e),n&&g(t,n),t}function O(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&m(t,e)}function m(t,e){return m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},m(t,e)}function j(t){var e=P();return function(){var n,o=C(t);if(e){var r=C(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return S(this,n)}}function S(t,e){return!e||"object"!==v(e)&&"function"!==typeof e?k(t):e}function k(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function P(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},C(t)}var D=function(t){O(n,t);var e=j(n);function n(){return h(this,n),e.apply(this,arguments)}return w(n,[{key:"cancel",value:function(){}},{key:"getAndDownloadState",value:function(){var t=_(f.a.mark((function t(){var e,n,o;return f.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e="raiden_lc_state_".concat((new Date).toISOString(),".json"),t.next=3,this.getStateFileURL(e);case 3:n=t.sent,o=this.createDownloadLink(e,n),o.click(),this.revokeDownloadURL(n,o),this.navigateToHome();case 8:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"getStateFileURL",value:function(){var t=_(f.a.mark((function t(e){var n,o,r;return f.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$raiden.getState();case 2:return n=t.sent,o=JSON.stringify(n),r=new File([o],e,{type:"application/json"}),t.abrupt("return",URL.createObjectURL(r));case 6:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"createDownloadLink",value:function(t,e){var n=document.createElement("a");return n.href=e,n.download=t,n.style.display="none",document.body.appendChild(n)}},{key:"revokeDownloadURL",value:function(t,e){setTimeout((function(){URL.revokeObjectURL(t),document.body.removeChild(e)}),1)}}]),n}(Object(c["c"])(b["a"]));Object(a["a"])([Object(c["d"])({required:!0,type:Boolean,default:!1})],D.prototype,"visible",void 0),Object(a["a"])([Object(c["b"])()],D.prototype,"cancel",null),D=Object(a["a"])([Object(c["a"])({components:{RaidenDialog:p["a"],ActionButton:d["a"]}})],D);var R=D,x=R,z=(n("26b2"),n("22b8")),E=n("fb44"),T=n.n(E),$=n("4149"),V=n("4fa0"),L=n("7946"),A=n("de75"),U=Object(z["a"])(x,u,s,!1,null,"7083d049",null),I=U.exports;T()(U,{VCardActions:$["a"],VCardText:$["b"],VCardTitle:$["c"],VCol:V["a"],VImg:L["a"],VRow:A["a"]});var F=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("raiden-dialog",{staticClass:"upload-state",attrs:{visible:t.visible},on:{close:t.cancel}},[n("v-card-title",[t._v(t._s(t.$t("backup-state.upload")))]),t.dropzoneErrorMessage?n("v-card-text",[n("v-row",{staticClass:"upload-state__error",attrs:{justify:"center","no-gutters":""}},[t._v(" "+t._s(t.$t("backup-state.upload-error"))+" ")])],1):t.uploadingStateProgress?n("v-card-actions",[n("spinner")],1):n("v-card-actions",[n("div",{staticClass:"upload-state__dropzone",class:{"upload-state__dropzone active-dropzone":t.activeDropzone},on:{dragenter:t.onDropzoneEnter,dragleave:t.onDropzoneLeave,dragover:function(t){t.preventDefault()},drop:t.onDropzoneDrop}},[n("v-row",{staticClass:"upload-state__dropzone__icon",attrs:{justify:"center","no-gutters":""}},[n("v-icon",{staticClass:"upload-state__dropzone__icon--inactive-dropzone",class:{"upload-state__dropzone__icon--active-dropzone":t.activeDropzone},attrs:{size:"90px"}},[t._v(" mdi-upload ")])],1),n("v-row",{staticClass:"upload-state__dropzone__description",attrs:{justify:"center","no-gutters":""}},[t._v(" "+t._s(t.$t("backup-state.upload-drag-and-drop"))+" ")]),n("v-row",{staticClass:"upload-state__dropzone__description",attrs:{justify:"center","no-gutters":""}},[t._v(" "+t._s(t.$t("backup-state.upload-divider"))+" ")]),n("v-row",{staticClass:"upload-state__dropzone__button"},[n("input",{ref:"stateInput",attrs:{type:"file",hidden:""},on:{change:t.onFileSelect}}),n("action-button",{attrs:{enabled:!t.activeDropzone,ghost:"",text:t.$t("backup-state.upload-button")},on:{click:function(e){return t.$refs.stateInput.click()}}})],1)],1)])],1)},B=[],J=n("0527");function M(t){return M="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},M(t)}function N(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function q(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?N(Object(n),!0).forEach((function(e){H(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function H(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function W(t,e,n,o,r,a,c){try{var i=t[a](c),u=i.value}catch(s){return void n(s)}i.done?e(u):Promise.resolve(u).then(o,r)}function G(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var a=t.apply(e,n);function c(t){W(a,o,r,c,i,"next",t)}function i(t){W(a,o,r,c,i,"throw",t)}c(void 0)}))}}function K(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Q(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function X(t,e,n){return e&&Q(t.prototype,e),n&&Q(t,n),t}function Y(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Z(t,e)}function Z(t,e){return Z=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},Z(t,e)}function tt(t){var e=ot();return function(){var n,o=rt(t);if(e){var r=rt(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return et(this,n)}}function et(t,e){return!e||"object"!==M(e)&&"function"!==typeof e?nt(t):e}function nt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function ot(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function rt(t){return rt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},rt(t)}var at=function(t){Y(n,t);var e=tt(n);function n(){var t;return K(this,n),t=e.apply(this,arguments),t.dragCount=0,t.activeDropzone=!1,t.dropzoneErrorMessage=!1,t.uploadingStateProgress=!1,t}return X(n,[{key:"cancel",value:function(){}},{key:"onDropzoneEnter",value:function(t){t.preventDefault(),this.dragCount++,this.activeDropzone=!0}},{key:"onDropzoneLeave",value:function(t){t.preventDefault(),this.dragCount--,this.dragCount<=0&&(this.activeDropzone=!1)}},{key:"onDropzoneDrop",value:function(t){var e,n;if(t.preventDefault(),this.activeDropzone=!1,null===(e=t.dataTransfer)||void 0===e?void 0:e.files){var o=null===(n=t.dataTransfer)||void 0===n?void 0:n.files;this.uploadState(o)}}},{key:"onFileSelect",value:function(t){if(t.target.files){var e=t.target.files;this.uploadState(e)}}},{key:"dropzoneError",value:function(){var t=this;this.uploadingStateProgress=!1,this.dropzoneErrorMessage=!0,setTimeout((function(){t.dropzoneErrorMessage=!1}),2e3)}},{key:"uploadState",value:function(t){var e=this;t.length>1&&this.dropzoneError();var n=new FileReader;n.onload=function(t){var n=t.target;if(t.target)try{e.uploadingStateProgress=!0;var o=JSON.parse(String(n.result));e.$store.commit("backupState",o),setTimeout(G(f.a.mark((function t(){return f.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.uploadingStateProgress=!1,e.cancel(),e.connectAndRedirect(o);case 3:case"end":return t.stop()}}),t)}))),1e3)}catch(r){e.dropzoneError()}},n.readAsText(t[0])}},{key:"connectAndRedirect",value:function(){var t=G(f.a.mark((function t(e){var n;return f.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=this.settings.useRaidenAccount,t.next=3,this.$raiden.connect(e,!!n||void 0);case 3:this.navigateToHome();case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()}]),n}(Object(c["c"])(b["a"]));Object(a["a"])([Object(c["d"])({required:!0,type:Boolean,default:!1})],at.prototype,"visible",void 0),Object(a["a"])([Object(c["b"])()],at.prototype,"cancel",null),at=Object(a["a"])([Object(c["a"])({components:{RaidenDialog:p["a"],ActionButton:d["a"],Spinner:J["a"]},computed:q({},Object(i["e"])(["settings"]))})],at);var ct=at,it=ct,ut=(n("9dba"),n("7746")),st=Object(z["a"])(it,F,B,!1,null,"235bf212",null),lt=st.exports;function ft(t){return ft="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ft(t)}function pt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function dt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?pt(Object(n),!0).forEach((function(e){bt(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):pt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function bt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function vt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function yt(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_t(t,e)}function _t(t,e){return _t=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},_t(t,e)}function ht(t){var e=Ot();return function(){var n,o=mt(t);if(e){var r=mt(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return gt(this,n)}}function gt(t,e){return!e||"object"!==ft(e)&&"function"!==typeof e?wt(t):e}function wt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Ot(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function mt(t){return mt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},mt(t)}T()(st,{VCardActions:$["a"],VCardText:$["b"],VCardTitle:$["c"],VIcon:ut["a"],VRow:A["a"]});var jt=function(t){yt(n,t);var e=ht(n);function n(){var t;return vt(this,n),t=e.apply(this,arguments),t.downloadState=!1,t.uploadState=!1,t}return n}(c["e"]);jt=Object(a["a"])([Object(c["a"])({components:{DownloadStateDialog:I,UploadStateDialog:lt},computed:dt({},Object(i["c"])(["isConnected"]))})],jt);var St=jt,kt=St,Pt=(n("f2fd"),n("6448")),Ct=n("23c0"),Dt=n("14f2"),Rt=n("a2ce"),xt=Object(z["a"])(kt,o,r,!1,null,"15353139",null);e["default"]=xt.exports;T()(xt,{VCol:V["a"],VImg:L["a"],VList:Pt["a"],VListItem:Ct["a"],VListItemContent:Dt["b"],VRow:A["a"],VTooltip:Rt["a"]})},"26b2":function(t,e,n){"use strict";var o=n("8dc9"),r=n.n(o);r.a},3549:function(t,e,n){t.exports=n.p+"img/state_upload.dea399eb.png"},"74a5":function(t,e,n){},"81ae":function(t,e,n){"use strict";var o=n("f893"),r=n.n(o);r.a},"8dc9":function(t,e,n){},"9dba":function(t,e,n){"use strict";var o=n("c172"),r=n.n(o);r.a},afb7:function(t,e,n){t.exports=n.p+"img/warning.49bc56a9.svg"},c172:function(t,e,n){},e038:function(t,e,n){t.exports=n.p+"img/state_download.fc1f0473.png"},f2fd:function(t,e,n){"use strict";var o=n("74a5"),r=n.n(o);r.a},f893:function(t,e,n){}}]);