(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b99bb93e"],{"5ee4":function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));n("9cc0");var i=n("c134"),r=n("1c38"),o=n("4cab"),a=n("a38b"),l=n("2c5d");const s=Object(a["a"])(i["a"],r["a"],o["a"]).extend({name:"base-item-group",props:{activeClass:{type:String,default:"v-item--active"},mandatory:Boolean,max:{type:[Number,String],default:null},multiple:Boolean,tag:{type:String,default:"div"}},data(){return{internalLazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,items:[]}},computed:{classes(){return{"v-item-group":!0,...this.themeClasses}},selectedIndex(){return this.selectedItem&&this.items.indexOf(this.selectedItem)||-1},selectedItem(){if(!this.multiple)return this.selectedItems[0]},selectedItems(){return this.items.filter((t,e)=>this.toggleMethod(this.getValue(t,e)))},selectedValues(){return null==this.internalValue?[]:Array.isArray(this.internalValue)?this.internalValue:[this.internalValue]},toggleMethod(){if(!this.multiple)return t=>this.valueComparator(this.internalValue,t);const t=this.internalValue;return Array.isArray(t)?e=>t.some(t=>this.valueComparator(t,e)):()=>!1}},watch:{internalValue:"updateItemsState",items:"updateItemsState"},created(){this.multiple&&!Array.isArray(this.internalValue)&&Object(l["c"])("Model must be bound to an array if the multiple property is true.",this)},methods:{genData(){return{class:this.classes}},getValue(t,e){return void 0===t.value?e:t.value},onClick(t){this.updateInternalValue(this.getValue(t,this.items.indexOf(t)))},register(t){const e=this.items.push(t)-1;t.$on("change",()=>this.onClick(t)),this.mandatory&&!this.selectedValues.length&&this.updateMandatory(),this.updateItem(t,e)},unregister(t){if(this._isDestroyed)return;const e=this.items.indexOf(t),n=this.getValue(t,e);this.items.splice(e,1);const i=this.selectedValues.indexOf(n);if(!(i<0)){if(!this.mandatory)return this.updateInternalValue(n);this.multiple&&Array.isArray(this.internalValue)?this.internalValue=this.internalValue.filter(t=>t!==n):this.internalValue=void 0,this.selectedItems.length||this.updateMandatory(!0)}},updateItem(t,e){const n=this.getValue(t,e);t.isActive=this.toggleMethod(n)},updateItemsState(){this.$nextTick(()=>{if(this.mandatory&&!this.selectedItems.length)return this.updateMandatory();this.items.forEach(this.updateItem)})},updateInternalValue(t){this.multiple?this.updateMultiple(t):this.updateSingle(t)},updateMandatory(t){if(!this.items.length)return;const e=this.items.slice();t&&e.reverse();const n=e.find(t=>!t.disabled);if(!n)return;const i=this.items.indexOf(n);this.updateInternalValue(this.getValue(n,i))},updateMultiple(t){const e=Array.isArray(this.internalValue)?this.internalValue:[],n=e.slice(),i=n.findIndex(e=>e===t);this.mandatory&&i>-1&&n.length-1<1||null!=this.max&&i<0&&n.length+1>this.max||(i>-1?n.splice(i,1):n.push(t),this.internalValue=n)},updateSingle(t){const e=t===this.internalValue;this.mandatory&&e||(this.internalValue=e?void 0:t)}},render(t){return t(this.tag,this.genData(),this.$slots.default)}});s.extend({name:"v-item-group",provide(){return{itemGroup:this}}})},"9cc0":function(t,e,n){},be2c:function(t,e,n){},d347:function(t,e,n){},ee0f:function(t,e,n){"use strict";n("be2c")},f634:function(t,e,n){"use strict";n.r(e);var i,r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ethereum-provider-base-dialog",{attrs:{header:t.$t("connection-manager.dialogs.wallet-connect-provider.header"),description:t.$t("connection-manager.dialogs.wallet-connect-provider.description"),"can-link":t.canLink,"linking-in-progress":t.linkingInProgress,"linking-failed":t.linkingFailed,"error-message":t.$t("connection-manager.dialogs.wallet-connect-provider.error-message")},on:{link:t.link,cancel:t.emitCancel}},[n("text-input-with-toggle",{staticClass:"wallet-connect-provider__options__bridge-url",attrs:{name:t.$t("connection-manager.dialogs.wallet-connect-provider.options.bridge-url.name"),details:t.$t("connection-manager.dialogs.wallet-connect-provider.options.bridge-url.details"),placeholder:t.$t("connection-manager.dialogs.wallet-connect-provider.options.bridge-url.placeholder"),optional:""},model:{value:t.bridgeUrl,callback:function(e){t.bridgeUrl=e},expression:"bridgeUrl"}}),n("v-btn-toggle",{attrs:{mandatory:""}},[n("v-btn",{staticClass:"wallet-connect-provider__option-toggle-button",on:{click:t.showInfuraIdOption}},[t._v(" "+t._s(t.$t("connection-manager.dialogs.wallet-connect-provider.options.infura-id.name"))+" ")]),n("v-btn",{staticClass:"wallet-connect-provider__option-toggle-button",on:{click:t.showRpcUrlOption}},[t._v(" "+t._s(t.$t("connection-manager.dialogs.wallet-connect-provider.options.rpc-url.name"))+" ")])],1),t.infuraIdOptionVisible?n("text-input-with-toggle",{staticClass:"wallet-connect-provider__options__infura-id",attrs:{name:t.$t("connection-manager.dialogs.wallet-connect-provider.options.infura-id.name"),details:t.$t("connection-manager.dialogs.wallet-connect-provider.options.infura-id.details"),placeholder:t.$t("connection-manager.dialogs.wallet-connect-provider.options.infura-id.placeholder")},model:{value:t.infuraId,callback:function(e){t.infuraId=e},expression:"infuraId"}}):t._e(),t.rpcUrlOptionVisible?n("text-input-with-toggle",{staticClass:"wallet-connect-provider__options__rpc-url",attrs:{name:t.$t("connection-manager.dialogs.wallet-connect-provider.options.rpc-url.name"),details:t.$t("connection-manager.dialogs.wallet-connect-provider.options.rpc-url.details"),placeholder:t.$t("connection-manager.dialogs.wallet-connect-provider.options.rpc-url.placeholder")},model:{value:t.rpcUrl,callback:function(e){t.rpcUrl=e},expression:"rpcUrl"}}):t._e()],1)},o=[],a=n("6dbe"),l=n("5cf9"),s=n("0ab3"),c=n("0e28"),u=n("15c5"),d=n("87b1");function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function f(t,e,n){return e&&g(t.prototype,e),n&&g(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function m(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(t,"prototype",{value:Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),writable:!1}),e&&b(t,e)}function b(t,e){return b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},b(t,e)}function v(t){var e=I();return function(){var n,i=_(t);if(e){var r=_(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return y(this,n)}}function y(t,e){if(e&&("object"===p(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return w(t)}function w(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function I(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function _(t){return _=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},_(t)}(function(t){t[t["INFURA_ID"]=0]="INFURA_ID",t[t["RPC_URL"]=1]="RPC_URL"})(i||(i={}));var O=function(t){m(n,t);var e=v(n);function n(){var t;return h(this,n),t=e.apply(this,arguments),t.providerFactory=d["c"],t.bridgeUrl="",t.infuraId="",t.rpcUrl="",t.optionToggleState=i.INFURA_ID,t}return f(n,[{key:"infuraIdOptionVisible",get:function(){return this.optionToggleState===i.INFURA_ID}},{key:"rpcUrlOptionVisible",get:function(){return this.optionToggleState===i.RPC_URL}},{key:"canLink",get:function(){return!!this.infuraId||!!this.rpcUrl}},{key:"providerOptions",get:function(){var t;switch(this.optionToggleState){case i.INFURA_ID:t={infuraId:this.infuraId};break;case i.RPC_URL:t={rpcUrl:this.rpcUrl};break}return this.bridgeUrl&&(t.bridgeUrl=this.bridgeUrl),t}},{key:"created",value:function(){this.switchOptionToggleIfNecessary()}},{key:"switchOptionToggleIfNecessary",value:function(){!this.infuraId&&this.rpcUrl&&this.showRpcUrlOption()}},{key:"showInfuraIdOption",value:function(){this.optionToggleState=i.INFURA_ID}},{key:"showRpcUrlOption",value:function(){this.optionToggleState=i.RPC_URL}}]),n}(Object(l["c"])(u["a"]));O=Object(a["f"])([Object(l["a"])({components:{EthereumProviderBaseDialog:s["a"],TextInputWithToggle:c["a"]}})],O);var V=O,k=V,U=(n("ee0f"),n("a6c2")),x=n("411c"),R=n.n(x),C=n("9c46"),S=(n("d347"),n("5ee4")),$=S["a"].extend({name:"button-group",provide(){return{btnToggle:this}},computed:{classes(){return S["a"].options.computed.classes.call(this)}},methods:{genData:S["a"].options.methods.genData}}),j=n("813e"),A=n("a38b"),T=Object(A["a"])($,j["a"]).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes(){return{...$.options.computed.classes.call(this),"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile,...this.themeClasses}}},methods:{genData(){const t=this.setTextColor(this.color,{...$.options.methods.genData.call(this)});return this.group?t:this.setBackgroundColor(this.backgroundColor,t)}}}),D=Object(U["a"])(k,r,o,!1,null,"0d94c887",null);e["default"]=D.exports;R()(D,{VBtn:C["a"],VBtnToggle:T})}}]);