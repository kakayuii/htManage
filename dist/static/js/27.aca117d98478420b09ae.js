webpackJsonp([27],{"1nNb":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),r=a("Gu7T"),s=a.n(r),o=a("exGp"),l=a.n(o),d=(a("c+8m"),a("1Sv2"),a("8pDE"),a("J4ec")),c={data:function(){return{search:"",loading:!0,allList:[],list:[],Page:1,PageSize:10,form:{tagName:"",firstId:""},isAdd:!1}},created:function(){this.getList()},methods:{handleSizeChange:function(t){this.PageSize=t},handleCurrentChange:function(t){this.Page=t},searching:function(){var t=this;this.Page=1;var e=["tagName"];this.list=this.allList.filter(function(a){var n=[];return e.forEach(function(t){n.push(a[t])}),n.some(function(e){return(e+="").includes(t.search)})})},getList:function(){var t=this;return l()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,d.default.domain.TagList();case 3:t.list=e.sent,t.loading=!1,t.allList=[].concat(s()(t.list));case 6:case"end":return e.stop()}},e,t)}))()},onSubmit:function(){var t,e=this;this.$refs.form.validate((t=l()(i.a.mark(function t(a){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=7;break}return t.next=3,d.default.domain.postTag(e.form);case 3:t.sent,e.$message.success("新增成功"),e.isAdd=!1,e.getList();case 7:case"end":return t.stop()}},t,e)})),function(e){return t.apply(this,arguments)}))}},computed:{showList:function(){return this.list.slice((this.Page-1)*this.PageSize,this.Page*this.PageSize)},getFirstId:function(){return this.list.filter(function(t){return 0==t.firstId})}}},f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("div",{directives:[{name:"title",rawName:"v-title"}]},[t._v("门店标签管理")]),t._v(" "),a("h3",[t._v("门店标签管理")]),t._v(" "),a("el-card",{staticClass:"search-box"},[a("el-input",{staticStyle:{width:"360px"},attrs:{placeholder:"请输入搜索内容"},nativeOn:{keyup:function(e){return t.searching(e)}},model:{value:t.search,callback:function(e){t.search="string"==typeof e?e.trim():e},expression:"search"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.searching}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"danger",icon:"el-icon-plus"},on:{click:function(e){t.isAdd=!0}}},[t._v("新增")])],1),t._v(" "),a("el-card",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.showList,border:"","element-loading-text":"加载中...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",stripe:!0,width:"100%"}},[a("el-table-column",{attrs:{label:"序号",type:"index",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tagName",label:"名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"id",label:"标签id"}}),t._v(" "),a("el-table-column",{attrs:{prop:"firstId",label:"一级标签"}}),t._v(" "),a("el-table-column",{attrs:{prop:"secondId",label:"二级标签"}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{"margin-top":"10px"}},[a("el-pagination",{attrs:{"current-page":t.Page,"page-sizes":[10,30,50,100],"page-size":t.PageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.list.length},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("transition",{attrs:{name:"fade"}},[t.isAdd?a("div",{staticClass:"add-box"},[a("el-card",{staticClass:"content"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("新增标签")]),t._v(" "),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:function(e){t.isAdd=!1}}},[t._v("取消")])],1),t._v(" "),a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"上级标签",prop:"firstId",rules:[{required:!0,message:"请选择上级标签",trigger:"change"}]}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:t.form.firstId,callback:function(e){t.$set(t.form,"firstId",e)},expression:"form.firstId"}},t._l(t.getFirstId,function(t){return a("el-option",{key:t.secondId,attrs:{label:t.tagName,value:t.secondId}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"标签名称",prop:"tagName",rules:[{required:!0,message:"请输入活动名称",trigger:"blur"}]}},[a("el-input",{model:{value:t.form.tagName,callback:function(e){t.$set(t.form,"tagName",e)},expression:"form.tagName"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("立即创建")])],1)],1)],1)],1):t._e()])],1)};f._withStripped=!0;var u={render:f,staticRenderFns:[]},p=u;var g=!1;var m=a("VU/8")(c,p,!1,function(t){g||a("LE64")},"data-v-5a2ff41e",null);m.options.__file="src/pages/domain/taglist.vue";e.default=m.exports},LE64:function(t,e,a){var n=a("XF2T");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("0a880dbb",n,!1,{})},XF2T:function(t,e,a){(t.exports=a("FZ+f")(!0)).push([t.i,"\n.add-box[data-v-5a2ff41e] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 1;\n}\n.add-box .content[data-v-5a2ff41e] {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 60%;\n    max-width: 500px;\n}\n.fade-enter-active[data-v-5a2ff41e], .fade-leave-active[data-v-5a2ff41e] {\n  -webkit-transition: all .3s;\n  transition: all .3s;\n}\n.fade-enter[data-v-5a2ff41e], .fade-leave-to[data-v-5a2ff41e] {\n  opacity: 0;\n}\n","",{version:3,sources:["D:/git/vue-manage/src/pages/domain/taglist.vue"],names:[],mappings:";AACA;EACE,gBAAgB;EAChB,OAAO;EACP,QAAQ;EACR,SAAS;EACT,UAAU;EACV,UAAU;EACV,+BAA+B;EAC/B,WAAW;CACZ;AACD;IACI,mBAAmB;IACnB,UAAU;IACV,SAAS;IACT,yCAAyC;YACjC,iCAAiC;IACzC,WAAW;IACX,iBAAiB;CACpB;AACD;EACE,4BAA4B;EAC5B,oBAAoB;CACrB;AACD;EACE,WAAW;CACZ",file:"taglist.vue",sourcesContent:["\n.add-box[data-v-5a2ff41e] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 1;\n}\n.add-box .content[data-v-5a2ff41e] {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 60%;\n    max-width: 500px;\n}\n.fade-enter-active[data-v-5a2ff41e], .fade-leave-active[data-v-5a2ff41e] {\n  -webkit-transition: all .3s;\n  transition: all .3s;\n}\n.fade-enter[data-v-5a2ff41e], .fade-leave-to[data-v-5a2ff41e] {\n  opacity: 0;\n}\n"],sourceRoot:""}])}});