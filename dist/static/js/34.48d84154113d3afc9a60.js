webpackJsonp([34],{Pj22:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=t("Gu7T"),o=t.n(a),n=t("Xxa5"),i=t.n(n),l=t("exGp"),s=t.n(l),m=(t("c+8m"),t("1Sv2"),[{id:0,name:"激活"},{id:1,name:"未激活"}]),u=t("o8GX"),c=t("J4ec"),f={data:function(){return{form:{id:0,creationTime:"",email:"",gender:"",lastLogin:"",mobile:"",nickName:"",roleIds:[],status:""},roleList:null,statusText:m,rules:{nickName:[{required:!0,message:"请输入名称",trigger:"blur"}],gender:[{required:!0,message:"请选择性别",trigger:"change"}],email:[{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],mobile:[{validator:u.a,trigger:"blur"},{required:!0,message:"请输入名称",trigger:"blur"}]}}},created:function(){this.getDate()},methods:{onSubmit:function(){var e,r=this;this.$refs.form.validate((e=s()(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=6;break}return e.next=3,c.default.user.saveUserInfo(r.form);case 3:e.sent,r.$message.success("修改成功"),r.$router.go(-1);case 6:case"end":return e.stop()}},e,r)})),function(r){return e.apply(this,arguments)}))},getDate:function(){var e=this;return s()(i.a.mark(function r(){var t,a,n,l,s,m,u,f,d;return i.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t=e.$route.params.id,r.next=3,c.default.user.getUserInfo(t);case 3:a=r.sent,n=a.email,l=a.mobile,s=a.gender,m=a.nickName,u=a.status,f=a.roles,e.form={id:t,email:n,gender:s,mobile:l,nickName:m,status:u},e.roleList=[].concat(o()(f)),d=f.filter(function(e){return e.checkFlag}).map(function(e){return e.id}),e.form={id:t,email:n,gender:s,mobile:l,nickName:m,status:u,roleIds:d};case 14:case"end":return r.stop()}},r,e)}))()}}},d=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("section",[t("div",{directives:[{name:"title",rawName:"v-title"}]},[e._v("用户管理")]),e._v(" "),t("el-card",[t("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[t("el-input",{model:{value:e.form.mobile,callback:function(r){e.$set(e.form,"mobile",r)},expression:"form.mobile"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"用户角色"}},[t("el-checkbox-group",{model:{value:e.form.roleIds,callback:function(r){e.$set(e.form,"roleIds",r)},expression:"form.roleIds"}},e._l(e.roleList,function(r,a){return t("el-checkbox",{key:a,attrs:{label:r.id,border:""}},[e._v(e._s(r.description)+"\n          ")])}))],1),e._v(" "),t("el-form-item",{attrs:{label:"昵称",prop:"nickName"}},[t("el-input",{model:{value:e.form.nickName,callback:function(r){e.$set(e.form,"nickName",r)},expression:"form.nickName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{model:{value:e.form.email,callback:function(r){e.$set(e.form,"email",r)},expression:"form.email"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"性别",prop:"gender"}},[[t("el-radio",{attrs:{label:"M"},model:{value:e.form.gender,callback:function(r){e.$set(e.form,"gender",r)},expression:"form.gender"}},[e._v("男")]),e._v(" "),t("el-radio",{attrs:{label:"F"},model:{value:e.form.gender,callback:function(r){e.$set(e.form,"gender",r)},expression:"form.gender"}},[e._v("女")])]],2),e._v(" "),t("el-form-item",{attrs:{label:"是否激活"}},[[t("el-select",{model:{value:e.form.status,callback:function(r){e.$set(e.form,"status",r)},expression:"form.status"}},e._l(e.statusText,function(e){return t("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))]],2),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){e.onSubmit("form")}}},[e._v("修改")]),e._v(" "),t("el-button",{on:{click:function(r){e.$router.go(-1)}}},[e._v("取消")])],1)],1)],1)],1)};d._withStripped=!0;var p={render:d,staticRenderFns:[]},v=p;var b=!1;var g=t("VU/8")(f,v,!1,function(e){b||t("hxmx")},"data-v-37777daa",null);g.options.__file="src/pages/user/modify.vue";r.default=g.exports},fznV:function(e,r,t){(e.exports=t("FZ+f")(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"modify.vue",sourceRoot:""}])},hxmx:function(e,r,t){var a=t("fznV");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("3f3dba93",a,!1,{})}});