webpackJsonp([17],{"7gbe":function(t,e,a){var n=a("hAQD");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("3a54e7d6",n,!1,{})},O03g:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),s=a("Gu7T"),o=a.n(s),r=a("exGp"),l=a.n(r),c=a("gRE1"),u=a.n(c),d=a("J4ec"),p={data:function(){return{search:"",loading:!0,allList:[],list:[],Page:1,PageSize:10}},created:function(){this.getList()},methods:{handleSizeChange:function(t){this.PageSize=t},handleCurrentChange:function(t){this.Page=t},searching:function(){var t=this;this.Page=1,this.list=this.allList.filter(function(e){return u()(e).some(function(e){return(e+="").includes(t.search)})})},getList:function(){var t=this;return l()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,d.default.domain.getDomainList();case 3:t.list=e.sent,t.allList=[].concat(o()(t.list)),t.loading=!1;case 6:case"end":return e.stop()}},e,t)}))()},deleteDoMain:function(t){var e=this,a=0==t.domainStatus?"禁用":"启用";this.$confirm("确认"+a+"该门店吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n={domainStatus:0==t.domainStatus?1:0,domainId:t.id};d.default.domain.deleteDomain(n).then(function(t){e.$message.success(a+"成功!"),e.getList()})})},goView:function(t){this.$router.push({path:"/domain/addDomain",query:{type:t?"edit":"add",id:t}})}},computed:{showList:function(){return this.list.slice((this.Page-1)*this.PageSize,this.Page*this.PageSize)}}},g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"domain-list"},[a("h3",[t._v("门店管理")]),t._v(" "),a("el-card",{staticClass:"search-box"},[a("el-input",{staticStyle:{width:"360px"},attrs:{placeholder:"请输入搜索内容"},nativeOn:{keyup:function(e){return t.searching(e)}},model:{value:t.search,callback:function(e){t.search="string"==typeof e?e.trim():e},expression:"search"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.searching}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"danger",icon:"el-icon-plus"},on:{click:function(e){t.goView(0)}}},[t._v("新增门店")])],1),t._v(" "),a("el-card",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.showList,border:"","element-loading-text":"加载中...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",stripe:!0}},[a("el-table-column",{attrs:{prop:"domainCode",label:"编号",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"proviceName",label:"省",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"city",label:"市",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"displayName",label:"门店名称","min-width":"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"typeName",label:"门店类型",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"isTop",label:"是否置顶",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"isTop",label:"是否启用",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.domainStatus?a("el-tag",{attrs:{type:"success"}},[t._v("已启用")]):a("el-tag",{attrs:{type:"danger"}},[t._v("已禁用")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"190"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(a){t.goView(e.row.id)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:0==e.row.domainStatus?"danger":"primary"},on:{click:function(a){t.deleteDoMain(e.row)}}},[t._v("\n            "+t._s(0==e.row.domainStatus?"禁用":"启用")+"\n          ")])]}}])})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{"margin-top":"10px"}},[a("el-pagination",{attrs:{"current-page":t.Page,"page-sizes":[10,30,50,100],"page-size":t.PageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.list.length},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)};g._withStripped=!0;var h={render:g,staticRenderFns:[]},m=h;var f=!1;var v=a("VU/8")(p,m,!1,function(t){f||a("7gbe")},"data-v-c4aab896",null);v.options.__file="src/pages/domain/list.vue";e.default=v.exports},hAQD:function(t,e,a){(t.exports=a("FZ+f")(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"list.vue",sourceRoot:""}])}});