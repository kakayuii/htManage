webpackJsonp([15],{"3xVW":function(t,e,n){var a=n("O8cu");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("d5c95968",a,!1,{})},O8cu:function(t,e,n){(t.exports=n("FZ+f")(!0)).push([t.i,"\n.edit-box[data-v-cf852d44] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 2;\n}\n.edit-box .content[data-v-cf852d44] {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 60%;\n    max-width: 600px;\n}\n.edit-box .content .submit[data-v-cf852d44] {\n      display: block;\n      margin: 20px auto 0;\n      width: 200px;\n}\n","",{version:3,sources:["D:/git/vue-manage/src/pages/contentLabel/list.vue"],names:[],mappings:";AACA;EACE,gBAAgB;EAChB,OAAO;EACP,QAAQ;EACR,SAAS;EACT,UAAU;EACV,UAAU;EACV,+BAA+B;EAC/B,WAAW;CACZ;AACD;IACI,mBAAmB;IACnB,UAAU;IACV,SAAS;IACT,yCAAyC;YACjC,iCAAiC;IACzC,WAAW;IACX,iBAAiB;CACpB;AACD;MACM,eAAe;MACf,oBAAoB;MACpB,aAAa;CAClB",file:"list.vue",sourcesContent:["\n.edit-box[data-v-cf852d44] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 2;\n}\n.edit-box .content[data-v-cf852d44] {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    width: 60%;\n    max-width: 600px;\n}\n.edit-box .content .submit[data-v-cf852d44] {\n      display: block;\n      margin: 20px auto 0;\n      width: 200px;\n}\n"],sourceRoot:""}])},U31n:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("IbsG"),i={data:function(){return{search:"",loading:!0,allList:[],list:[],Page:1,PageSize:10,Info:{tabName:"",usedFlag:!0},isShow:!1}},created:function(){this.getList()},methods:{handleSizeChange:function(t){this.PageSize=t},handleCurrentChange:function(t){this.Page=t},searching:function(){var t=this;this.Page=1;var e=["标签名称"];this.list=this.allList.filter(function(n){var a=[];return e.forEach(function(t){a.push(n[t])}),a.some(function(e){return(e+="").includes(t.search)})})},getList:function(){var t=this;this.loading=!0,Object(a.getList)().then(function(e){t.list=e,t.allList=e,t.loading=!1})},deleteById:function(t){var e=this;this.$confirm("确认删除该标签吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a.deleteById)(t).then(function(t){e.$message.success("删除成功"),e.getList()})})},hide:function(){this.Info={tabName:"",usedFlag:!1},this.isShow=!1},edit:function(t){var e=t.usedFlag,n=t.tabName,a=t.id;this.Info={usedFlag:0==e,tabName:n,id:a},this.isShow=!0},saveRemark:function(){var t=this,e=this.Info,n=e.usedFlag,i=e.tabName,s=e.id,o={tabName:i,usedFlag:n?0:1};s&&(o.id=s),Object(a.saveAndUpdate)(o).then(function(e){t.hide(),t.$message.success("保存成功"),t.getList()})}},computed:{showList:function(){return this.list.slice((this.Page-1)*this.PageSize,this.Page*this.PageSize)}}},s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"domain-list"},[n("h3",[t._v("内容标签")]),t._v(" "),n("el-card",{staticStyle:{"margin-bottom":"10px"}},[n("el-input",{staticStyle:{width:"360px"},attrs:{placeholder:"请输入搜索内容"},nativeOn:{keyup:function(e){return t.searching(e)}},model:{value:t.search,callback:function(e){t.search="string"==typeof e?e.trim():e},expression:"search"}}),t._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searching}},[t._v("搜索")]),t._v(" "),n("el-button",{attrs:{type:"danger",icon:"el-icon-plus"},on:{click:function(e){t.isShow=!0}}},[t._v("新增")])],1),t._v(" "),n("el-card",[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.showList,border:"","element-loading-text":"加载中...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",stripe:!0}},[n("el-table-column",{attrs:{label:"序号",type:"index",width:"80"}}),t._v(" "),n("el-table-column",{attrs:{prop:"tabName",label:"标签名称"}}),t._v(" "),n("el-table-column",{attrs:{prop:"deleteFlag",label:"是否启用"},scopedSlots:t._u([{key:"default",fn:function(t){return[t.row.usedFlag?n("i",{staticClass:"el-icon-error",staticStyle:{color:"red","font-size":"18px"}}):n("i",{staticClass:"el-icon-success",staticStyle:{color:"green","font-size":"18px"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(n){t.edit(e.row)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(n){t.deleteById(e.row.id)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":t.Page,"page-sizes":[10,30,50,100],"page-size":t.PageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.list.length},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),t.isShow?n("div",{staticClass:"edit-box"},[n("el-card",{staticClass:"content"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v("预约详情")]),t._v(" "),n("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:t.hide}},[t._v("取消")])],1),t._v(" "),n("el-form",{ref:"form",attrs:{"label-width":"80px"}},[n("el-form-item",{attrs:{label:"标签名称:"}},[n("el-input",{model:{value:t.Info.tabName,callback:function(e){t.$set(t.Info,"tabName",e)},expression:"Info.tabName"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"是否启用:"}},[n("el-checkbox",{model:{value:t.Info.usedFlag,callback:function(e){t.$set(t.Info,"usedFlag",e)},expression:"Info.usedFlag"}})],1)],1),t._v(" "),n("el-button",{staticClass:"submit",attrs:{type:"primary"},on:{click:t.saveRemark}},[t._v("保存")])],1)],1):t._e()],1)};s._withStripped=!0;var o={render:s,staticRenderFns:[]},l=o;var r=!1;var c=n("VU/8")(i,l,!1,function(t){r||n("3xVW")},"data-v-cf852d44",null);c.options.__file="src/pages/contentLabel/list.vue";e.default=c.exports}});