(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6126e665"],{"03af":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:{"amount-display--inline":t.inline},on:{mouseover:function(e){t.exactAmount&&(t.displayExactAmount=!0)},mouseleave:function(e){t.exactAmount&&(t.displayExactAmount=!1)}}},[t.displayExactAmount?n("span",[t._v(" "+t._s(t._f("toUnits")(t.amount,t.token.decimals))+" "+t._s(t.token.symbol||"")+" ")]):n("span",[t._v(" "+t._s(t._f("displayFormat")(t.amount,t.token.decimals))+" "+t._s(t.token.symbol||"")+" ")])])},r=[],c=n("e921"),u=n("8509");function i(t){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}function s(t,e){return s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},s(t,e)}function l(t){var e=b();return function(){var n,o=d(t);if(e){var r=d(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return p(this,n)}}function p(t,e){return!e||"object"!==i(e)&&"function"!==typeof e?y(t):e}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function d(t){return d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},d(t)}var v=function(t){f(n,t);var e=l(n);function n(){var t;return a(this,n),t=e.apply(this,arguments),t.displayExactAmount=!1,t}return n}(u["e"]);Object(c["a"])([Object(u["d"])({required:!1,default:!1,type:Boolean})],v.prototype,"exactAmount",void 0),Object(c["a"])([Object(u["d"])({required:!0})],v.prototype,"amount",void 0),Object(c["a"])([Object(u["d"])({required:!0})],v.prototype,"token",void 0),Object(c["a"])([Object(u["d"])({required:!1,default:!1,type:Boolean})],v.prototype,"inline",void 0),v=Object(c["a"])([Object(u["a"])({})],v);var h=v,m=h,O=(n("e83f"),n("22b8")),j=Object(O["a"])(m,o,r,!1,null,"b1b477aa",null);e["a"]=j.exports},"53b9":function(t,e,n){},6779:function(t,e,n){},"6b2d":function(t,e,n){"use strict";var o=n("6779"),r=n.n(o);r.a},e83f:function(t,e,n){"use strict";var o=n("53b9"),r=n.n(o);r.a},eb67:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"select-token flex-grow-1 pt-8"},[n("token-list",{attrs:{header:t.$t("select-token.header"),tokens:t.allTokens},on:{select:t.selectToken}})],1)},r=[],c=n("4bf2"),u=n.n(c),i=n("e921"),a=n("8509"),f=n("2b7f"),s=n("152b"),l=n("77fd"),p=n("e6df");function y(t){return y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function b(t,e,n,o,r,c,u){try{var i=t[c](u),a=i.value}catch(f){return void n(f)}i.done?e(a):Promise.resolve(a).then(o,r)}function d(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var c=t.apply(e,n);function u(t){b(c,o,r,u,i,"next",t)}function i(t){b(c,o,r,u,i,"throw",t)}u(void 0)}))}}function v(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function m(t,e,n){return e&&h(t.prototype,e),n&&h(t,n),t}function O(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&j(t,e)}function j(t,e){return j=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},j(t,e)}function _(t){var e=x();return function(){var n,o=S(t);if(e){var r=S(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return w(this,n)}}function w(t,e){return!e||"object"!==y(e)&&"function"!==typeof e?k(t):e}function k(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function x(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function S(t){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},S(t)}var P=function(t){O(n,t);var e=_(n);function n(){return v(this,n),e.apply(this,arguments)}return m(n,[{key:"mounted",value:function(){var t=d(u.a.mark((function t(){return u.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$raiden.fetchTokenList();case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"selectToken",value:function(t){this.navigateToSelectHub(t.address)}}]),n}(Object(a["c"])(l["a"],s["a"]));P=Object(i["a"])([Object(a["a"])({components:{TokenList:p["a"]},computed:Object(f["c"])(["allTokens"])})],P);var g=P,E=g,R=(n("6b2d"),n("22b8")),T=Object(R["a"])(E,o,r,!1,null,"abd4e502",null);e["default"]=T.exports}}]);