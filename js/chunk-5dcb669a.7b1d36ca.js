(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5dcb669a"],{5876:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("lazy-route",[n("select-hub")],1)},o=[],c=n("9ab4"),u=n("60a3"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-form",{staticClass:"select-hub",attrs:{autocomplete:"off"},on:{submit:function(e){return e.preventDefault(),t.selectHub()}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-row",{attrs:{align:"center",justify:"center","no-gutters":""}},[n("v-col",{attrs:{cols:"10"}},[n("address-input",{attrs:{value:t.partner,exclude:[t.token.address,t.defaultAccount]},model:{value:t.partner,callback:function(e){t.partner=e},expression:"partner"}})],1)],1),n("divider"),n("token-information",{attrs:{token:t.token}}),n("action-button",{attrs:{enabled:t.valid,text:t.$t("select-hub.select-button")}})],1)},a=[],f=n("a34a"),s=n.n(f),l=n("13ea"),p=n.n(l),b=n("2f62"),y=n("6fc3"),h=n("fc09"),d=n("152b"),v=n("01f0"),m=n("8716"),O=n("750b");function w(t){return w="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function j(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?j(Object(n),!0).forEach((function(e){g(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function P(t,e,n,r,o,c,u){try{var i=t[c](u),a=i.value}catch(f){return void n(f)}i.done?e(a):Promise.resolve(a).then(r,o)}function _(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var c=t.apply(e,n);function u(t){P(c,r,o,u,i,"next",t)}function i(t){P(c,r,o,u,i,"throw",t)}u(void 0)}))}}function S(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function x(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function R(t,e,n){return e&&x(t.prototype,e),n&&x(t,n),t}function T(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&D(t,e)}function D(t,e){return D=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},D(t,e)}function E(t){var e=$();return function(){var n,r=A(t);if(e){var o=A(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return C(this,n)}}function C(t,e){return!e||"object"!==w(e)&&"function"!==typeof e?H(t):e}function H(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function $(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function A(t){return A=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},A(t)}var V=function(t){T(n,t);var e=E(n);function n(){var t;return S(this,n),t=e.apply(this,arguments),t.partner="",t.valid=!1,t}return R(n,[{key:"selectHub",value:function(){this.navigateToOpenChannel(this.token.address,this.partner)}},{key:"created",value:function(){var t=_(s.a.mark((function t(){var e,n;return s.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e=this.$route.params.token,h["a"].checkAddressChecksum(e)){t.next=4;break}return this.navigateToHome(),t.abrupt("return");case 4:return t.next=6,this.$raiden.fetchTokenData([e]);case 6:"number"!==typeof this.token.decimals&&this.navigateToHome(),this.isConnectedToHub||"goerli"!==this.network.name||(this.partner=null!==(n="hub.raiden.eth")&&void 0!==n?n:"");case 8:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"token",get:function(){var t=this.$route.params.token;return this.getToken(t)||{address:t}}},{key:"isConnectedToHub",get:function(){var t=this.$route.params.token;return!p()(this.channels[t])}}]),n}(Object(u["c"])(d["a"]));V=Object(c["b"])([Object(u["a"])({components:{TokenInformation:m["a"],Divider:v["a"],AddressInput:y["a"],ActionButton:O["a"]},computed:k(k({},Object(b["c"])(["defaultAccount","channels","network"])),Object(b["b"])({getToken:"token"}))})],V);var z=V,I=z,J=(n("b0de"),n("2877")),B=n("6544"),F=n.n(B),L=n("62ad"),q=n("4bd4"),G=n("0fd9"),K=Object(J["a"])(I,i,a,!1,null,"08009abe",null),M=K.exports;F()(K,{VCol:L["a"],VForm:q["a"],VRow:G["a"]});var N=n("f931");function Q(t){return Q="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Q(t)}function U(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function W(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&X(t,e)}function X(t,e){return X=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},X(t,e)}function Y(t){var e=et();return function(){var n,r=nt(t);if(e){var o=nt(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Z(this,n)}}function Z(t,e){return!e||"object"!==Q(e)&&"function"!==typeof e?tt(t):e}function tt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function et(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function nt(t){return nt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},nt(t)}var rt=function(t){W(n,t);var e=Y(n);function n(){return U(this,n),e.apply(this,arguments)}return n}(u["e"]);rt=Object(c["b"])([Object(u["a"])({components:{LazyRoute:N["a"],SelectHub:M}})],rt);var ot=rt,ct=ot,ut=Object(J["a"])(ct,r,o,!1,null,"f6ffb832",null);e["default"]=ut.exports},b0de:function(t,e,n){"use strict";var r=n("dd47"),o=n.n(r);o.a},dd47:function(t,e,n){}}]);