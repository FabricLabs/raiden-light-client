(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b36a244c"],{"01f0":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"divider"},[n("div",{staticClass:"divider__line"})])}],i=n("9ab4"),a=n("5cf9");function c(t){return c="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}function l(t,e){return l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},l(t,e)}function f(t){var e=b();return function(){var n,r=h(t);if(e){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return p(this,n)}}function p(t,e){return!e||"object"!==c(e)&&"function"!==typeof e?d(t):e}function d(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function h(t){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},h(t)}var y=function(t){u(n,t);var e=f(n);function n(){return s(this,n),e.apply(this,arguments)}return n}(a["e"]);y=Object(i["a"])([Object(a["a"])({})],y);var v=y,m=v,_=(n("227b"),n("a6c2")),O=Object(_["a"])(m,r,o,!1,null,"d6796c02",null);e["a"]=O.exports},"227b":function(t,e,n){"use strict";n("e999")},"47cea":function(t,e,n){"use strict";var r=n("a38b"),o=n("5035"),i=n("6845");e["a"]=Object(r["a"])(o["a"],Object(i["b"])("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",e=>{this.$set(this.errorBag,t._uid,e)},{immediate:!0}),n={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",r=>{r&&(this.errorBag.hasOwnProperty(t._uid)||(n.valid=e(t)))}):n.valid=e(t),n},validate(){return 0===this.inputs.filter(t=>!t.validate(!0)).length},reset(){this.inputs.forEach(t=>t.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(t=>t.resetValidation()),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find(e=>e._uid===t._uid);if(!e)return;const n=this.watchers.find(t=>t._uid===e._uid);n&&(n.valid(),n.shouldValidate()),this.watchers=this.watchers.filter(t=>t._uid!==e._uid),this.inputs=this.inputs.filter(t=>t._uid!==e._uid),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},this.$slots.default)}})},"61c2":function(t,e,n){t.exports=n.p+"img/icon-deposit.83f3ca48.svg"},"69b8":function(t,e,n){},8716:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"token-information"},[r("span",{staticClass:"token-information__details"},[t._v(" "+t._s(t.$t("token-information.description",{symbol:t.token.symbol}))+" "),r("address-display",{staticClass:"token-information__details__address",attrs:{address:t.token.address}})],1),r("div",{staticClass:"token-information__balance"},[r("span",{staticClass:"token-information__balance__amount"},[t._v(" "+t._s(t._f("displayFormat")(t.token.balance||0,t.token.decimals))+" ")]),t.mainnet?t._e():r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({attrs:{icon:"",small:"","data-cy":"token_information_mint"},on:{click:function(e){t.showMintDialog=!0}}},o),[r("img",{staticClass:"token-information__balance__mint",attrs:{src:n("61c2")}})])]}}],null,!1,3617825944)},[r("span",[t._v(" "+t._s(t.$t("mint-dialog.title",{symbol:t.token.symbol||""}))+" ")])])],1),r("mint-dialog",{attrs:{token:t.token,visible:t.showMintDialog},on:{cancel:function(e){t.showMintDialog=!1},done:function(e){return t.tokenMinted()}}})],1)},o=[],i=n("36d8"),a=n.n(i),c=n("9ab4"),s=n("5cf9"),u=n("94ea"),l=n("9302"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("raiden-dialog",{attrs:{visible:t.visible},on:{close:t.cancel}},[t.error?t._e():n("v-card-title",[t._v(" "+t._s(t.$t("mint-dialog.title",{symbol:t.token.symbol}))+" ")]),n("v-card-text",[t.loading?n("v-row",[n("spinner")],1):t._e(),t.error?n("v-row",[n("error-message",{attrs:{error:t.error}})],1):t._e(),t.loading||t.error?t._e():n("v-row",[t._v(" "+t._s(t.$t("mint-dialog.description"))+" ")])],1),t.error?t._e():n("v-card-actions",[n("action-button",{staticClass:"mint-dialog__button",attrs:{"data-cy":"mint_dialog_button",arrow:"",enabled:!t.loading,text:t.$t("general.buttons.continue")},on:{click:function(e){return t.mint()}}})],1)],1)},p=[],d=n("750b"),b=n("66bc"),h=n("8e27"),y=n("0527"),v=n("a3d5");function m(t){return m="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function _(t,e,n,r,o,i,a){try{var c=t[i](a),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(r,o)}function O(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){_(i,r,o,a,c,"next",t)}function c(t){_(i,r,o,a,c,"throw",t)}a(void 0)}))}}function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function w(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function j(t,e,n){return e&&w(t.prototype,e),n&&w(t,n),t}function k(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&S(t,e)}function S(t,e){return S=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},S(t,e)}function P(t){var e=C();return function(){var n,r=R(t);if(e){var o=R(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return x(this,n)}}function x(t,e){return!e||"object"!==m(e)&&"function"!==typeof e?D(t):e}function D(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function C(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function R(t){return R=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},R(t)}var $=function(t){k(n,t);var e=P(n);function n(){var t;return g(this,n),t=e.apply(this,arguments),t.loading=!1,t.error=null,t.amount="1",t}return j(n,[{key:"mount",value:function(){var t=O(a.a.mark((function t(){return a.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$raiden.fetchAndUpdateTokenData([this.token.address]);case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"cancel",value:function(){this.error=null}},{key:"mint",value:function(){var t=O(a.a.mark((function t(){return a.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.error=null,this.loading=!0,t.prev=2,t.next=5,this.$raiden.mint(this.token.address,v["a"].parse(this.amount,this.token.decimals));case 5:this.$emit("done"),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](2),this.error=t.t0;case 11:this.loading=!1;case 12:case"end":return t.stop()}}),t,this,[[2,8]])})));function e(){return t.apply(this,arguments)}return e}()}]),n}(s["e"]);Object(c["a"])([Object(s["d"])({required:!0})],$.prototype,"token",void 0),Object(c["a"])([Object(s["d"])({required:!0,type:Boolean})],$.prototype,"visible",void 0),Object(c["a"])([Object(s["b"])()],$.prototype,"cancel",null),$=Object(c["a"])([Object(s["a"])({components:{ActionButton:d["a"],RaidenDialog:b["a"],ErrorMessage:h["a"],Spinner:y["a"]}})],$);var E=$,T=E,V=n("a6c2"),B=n("411c"),A=n.n(B),q=n("e47e"),M=n("e614"),I=Object(V["a"])(T,f,p,!1,null,null,null),z=I.exports;function U(t){return U="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},U(t)}function F(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function H(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?F(Object(n),!0).forEach((function(e){J(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):F(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function J(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function L(t,e,n,r,o,i,a){try{var c=t[i](a),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(r,o)}function Z(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){L(i,r,o,a,c,"next",t)}function c(t){L(i,r,o,a,c,"throw",t)}a(void 0)}))}}function G(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function K(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function N(t,e,n){return e&&K(t.prototype,e),n&&K(t,n),t}function Q(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&W(t,e)}function W(t,e){return W=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},W(t,e)}function X(t){var e=et();return function(){var n,r=nt(t);if(e){var o=nt(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Y(this,n)}}function Y(t,e){return!e||"object"!==U(e)&&"function"!==typeof e?tt(t):e}function tt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function et(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function nt(t){return nt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},nt(t)}A()(I,{VCardActions:q["a"],VCardText:q["b"],VCardTitle:q["c"],VRow:M["a"]});var rt=function(t){Q(n,t);var e=X(n);function n(){var t;return G(this,n),t=e.apply(this,arguments),t.showMintDialog=!1,t}return N(n,[{key:"tokenMinted",value:function(){var t=Z(a.a.mark((function t(){return a.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.showMintDialog=!1,t.next=3,this.$raiden.fetchAndUpdateTokenData([this.token.address]);case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}]),n}(s["e"]);Object(c["a"])([Object(s["d"])()],rt.prototype,"token",void 0),rt=Object(c["a"])([Object(s["a"])({components:{AddressDisplay:l["a"],MintDialog:z},computed:H({},Object(u["c"])(["mainnet"]))})],rt);var ot=rt,it=ot,at=(n("b94b"),n("9c46")),ct=n("dc05"),st=Object(V["a"])(it,r,o,!1,null,"29195124",null);e["a"]=st.exports;A()(st,{VBtn:at["a"],VTooltip:ct["a"]})},"947d":function(t,e,n){},"9db2":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-form",{staticClass:"open-channel",attrs:{autocomplete:"off","data-cy":"open_channel"},on:{submit:function(e){return e.preventDefault(),t.openChannel()}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("div",{staticClass:"open-channel__amount"},[n("amount-input",{attrs:{token:t.token,max:t.token.balance,placeholder:t.$t("transfer.amount-placeholder"),limit:""},model:{value:t.deposit,callback:function(e){t.deposit=e},expression:"deposit"}})],1),n("div",{staticClass:"open-channel__token-information"},[n("token-information",{attrs:{token:t.token}})],1),n("div",{staticClass:"open-channel__hub"},[n("span",{staticClass:"open-channel__hub__label"},[t._v(" "+t._s(t.$t("open-channel.hub"))+" ")]),n("div",{staticClass:"open-channel__hub__address"},[n("address-display",{attrs:{address:t.partner}})],1)]),n("div",{staticClass:"open-channel__button"},[n("action-button",{attrs:{"data-cy":"open_channel_button",enabled:t.valid,text:t.$t("open-channel.open-button")}})],1),n("open-channel-dialog",{attrs:{visible:t.loading,steps:t.steps,current:t.current,done:t.done,"done-step":t.doneStep},on:{cancel:function(e){return t.dismiss()}}}),n("error-dialog",{attrs:{error:t.error},on:{dismiss:function(e){t.error=null}}})],1)},o=[],i=n("36d8"),a=n.n(i),c=n("9ab4"),s=n("5cf9"),u=n("fbcd"),l=n("94ea"),f=n("dbe0"),p=n("87a2"),d=n("a3d5"),b=n("fc09"),h=n("152b"),y=n("8d6f"),v=n("01f0"),m=n("8716"),_=n("9302"),O=n("750b"),g=n("fb6b"),w=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("raiden-dialog",{staticClass:"open-channel-dialog",attrs:{"data-cy":"open_channel_dialog",visible:t.visible,"hide-close":""},on:{close:t.cancel}},[r("v-card-title",[r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-col",[t.done?r("span",[t._v(" "+t._s(t.doneStep.title)+" ")]):t.steps.length>t.current?r("span",[t._v(" "+t._s(t.steps[t.current].title)+" ")]):t._e()])],1)],1),r("v-card-actions",[t.done?r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"6"}},[r("v-img",{staticClass:"open-channel-dialog__done",attrs:{src:n("2e1f")}})],1)],1):r("v-row",[r("spinner")],1)],1),r("v-card-text",[r("v-row",{attrs:{align:"center",justify:"center"}},[t.done?r("span",[t._v(" "+t._s(t.doneStep.description)+" ")]):t.steps.length>t.current?r("span",[t._v(" "+t._s(t.steps[t.current].description)+" ")]):t._e()])],1)],1)},j=[],k=n("66bc"),S=n("0527");function P(t){return P="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function x(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function D(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function C(t,e,n){return e&&D(t.prototype,e),n&&D(t,n),t}function R(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&$(t,e)}function $(t,e){return $=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},$(t,e)}function E(t){var e=B();return function(){var n,r=A(t);if(e){var o=A(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return T(this,n)}}function T(t,e){return!e||"object"!==P(e)&&"function"!==typeof e?V(t):e}function V(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function B(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function A(t){return A=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},A(t)}var q=function(t){R(n,t);var e=E(n);function n(){return x(this,n),e.apply(this,arguments)}return C(n,[{key:"cancel",value:function(){return!0}}]),n}(s["e"]);Object(c["a"])([Object(s["d"])({required:!0})],q.prototype,"visible",void 0),Object(c["a"])([Object(s["d"])({required:!0})],q.prototype,"steps",void 0),Object(c["a"])([Object(s["d"])({required:!1,default:0})],q.prototype,"current",void 0),Object(c["a"])([Object(s["d"])({required:!1})],q.prototype,"done",void 0),Object(c["a"])([Object(s["d"])({required:!0})],q.prototype,"doneStep",void 0),Object(c["a"])([Object(s["b"])()],q.prototype,"cancel",null),q=Object(c["a"])([Object(s["a"])({components:{RaidenDialog:k["a"],Spinner:S["a"]}})],q);var M=q,I=M,z=n("a6c2"),U=n("411c"),F=n.n(U),H=n("e47e"),J=n("1fb1"),L=n("1331"),Z=n("e614"),G=Object(z["a"])(I,w,j,!1,null,null,null),K=G.exports;function N(t){return N="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},N(t)}function Q(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function W(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Q(Object(n),!0).forEach((function(e){X(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Q(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function X(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Y(t,e,n,r,o,i,a){try{var c=t[i](a),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(r,o)}function tt(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){Y(i,r,o,a,c,"next",t)}function c(t){Y(i,r,o,a,c,"throw",t)}a(void 0)}))}}function et(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function nt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function rt(t,e,n){return e&&nt(t.prototype,e),n&&nt(t,n),t}function ot(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&it(t,e)}function it(t,e){return it=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},it(t,e)}function at(t){var e=ut();return function(){var n,r=lt(t);if(e){var o=lt(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return ct(this,n)}}function ct(t,e){return!e||"object"!==N(e)&&"function"!==typeof e?st(t):e}function st(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function ut(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function lt(t){return lt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},lt(t)}F()(G,{VCardActions:H["a"],VCardText:H["b"],VCardTitle:H["c"],VCol:J["a"],VImg:L["a"],VRow:Z["a"]});var ft=function(t){ot(n,t);var e=at(n);function n(){var t;return et(this,n),t=e.apply(this,arguments),t.partner="",t.deposit="0.00",t.valid=!1,t.loading=!1,t.error=null,t.steps=[],t.doneStep=Object(p["c"])(),t.current=0,t.done=!1,t}return rt(n,[{key:"dismiss",value:function(){this.loading=!1}},{key:"beforeRouteLeave",value:function(t,e,n){this.loading?window.confirm(this.$t("open-channel.confirmation"))?n():n(!1):n()}},{key:"getStepDescription",value:function(t){var e=this.$t("open-channel.steps.".concat(t));return{label:e.label,title:e.title,description:e.description}}},{key:"openChannel",value:function(){var t=tt(a.a.mark((function t(){var e,n,r,o,i=this;return a.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this.token,n=e.address,r=e.decimals,o=d["a"].parse(this.deposit,r),o.eq(u["a"].Zero)?this.steps=[this.getStepDescription("open")]:this.steps=[this.getStepDescription("open"),this.getStepDescription("transfer"),this.getStepDescription("deposit")],this.loading=!0,t.prev=4,t.next=7,this.$raiden.openChannel(n,this.partner,o,(function(t){return i.current=t.current-1}));case 7:this.done=!0,setTimeout((function(){i.loading=!1,i.navigateToSelectTransferTarget(n)}),2e3),t.next=16;break;case 11:t.prev=11,t.t0=t["catch"](4),this.error=t.t0,this.done=!1,this.loading=!1;case 16:case"end":return t.stop()}}),t,this,[[4,11]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"created",value:function(){var t=tt(a.a.mark((function t(){var e,n,r;return a.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.deposit=Object(g["b"])(this.$route.query.deposit),this.doneStep=this.getStepDescription("done"),e=this.$route.params,n=e.token,r=e.partner,b["a"].checkAddressChecksum(n)){t.next=6;break}return this.navigateToHome(),t.abrupt("return");case 6:return t.next=8,this.$raiden.fetchAndUpdateTokenData([n]);case 8:return"number"!==typeof this.token.decimals&&this.navigateToHome(),t.next=11,this.$raiden.monitorToken(n);case 11:if(0===this.token.decimals&&this.deposit.indexOf(".")>-1&&(this.deposit=this.deposit.split(".")[0]),b["a"].checkAddressChecksum(r)){t.next=17;break}return this.navigateToTokenSelect(),t.abrupt("return");case 17:this.partner=r;case 18:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"token",get:function(){var t=this.$route.params.token;return this.getToken(t)||{address:t}}}]),n}(Object(s["c"])(h["a"]));ft=Object(c["a"])([Object(s["a"])({components:{TokenInformation:m["a"],Divider:v["a"],ErrorDialog:y["a"],ActionButton:O["a"],AmountInput:f["a"],AddressDisplay:_["a"],OpenChannelDialog:K},computed:W({},Object(l["c"])({getToken:"token"}))})],ft);var pt=ft,dt=pt,bt=(n("bbb9"),n("47cea")),ht=Object(z["a"])(dt,r,o,!1,null,"63b3efb6",null);e["default"]=ht.exports;F()(ht,{VForm:bt["a"]})},b94b:function(t,e,n){"use strict";n("947d")},bbb9:function(t,e,n){"use strict";n("69b8")},e999:function(t,e,n){},fb6b:function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return c}));var r=n("c00b"),o=n("fc09");function i(t){try{return r["a"].from(t)}catch(e){return}}function a(t){var e="";return t&&"string"===typeof t&&/^\d*[.]?\d*$/.test(t)&&(e=t),e}function c(t){var e="";return t&&"string"===typeof t&&o["a"].isAddress(t)&&o["a"].checkAddressChecksum(t)&&(e=t),e}}}]);