webpackJsonp([6],{NSgx:function(e,t,a){"use strict"},QSgX:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,'\n@charset "UTF-8";\n/*图片上传*/\n.upload-box[data-v-618fed26] {\n  width: 200px;\n  height: 200px;\n  line-height: 200px;\n  position: relative;\n  border: 1px dashed #ccc;\n  font-size: 50px;\n  text-align: center;\n  overflow: hidden;\n}\n.upload-box img[data-v-618fed26] {\n    width: 100%;\n    height: 100%;\n}\n.upload-box input[data-v-618fed26] {\n    position: absolute;\n    top: -10%;\n    left: 0;\n    width: 200%;\n    height: 200%;\n    font-size: 0;\n    cursor: pointer;\n    opacity: 0;\n}\n/*.editor{*/\n/*height:400px;*/\n/*}*/\n',"",{version:3,sources:["D:/git/vue-manage/src/pages/topic/add.vue"],names:[],mappings:";AACA,iBAAiB;AACjB,QAAQ;AACR;EACE,aAAa;EACb,cAAc;EACd,mBAAmB;EACnB,mBAAmB;EACnB,wBAAwB;EACxB,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;CAClB;AACD;IACI,YAAY;IACZ,aAAa;CAChB;AACD;IACI,mBAAmB;IACnB,UAAU;IACV,QAAQ;IACR,YAAY;IACZ,aAAa;IACb,aAAa;IACb,gBAAgB;IAChB,WAAW;CACd;AACD,YAAY;AACZ,iBAAiB;AACjB,KAAK",file:"add.vue",sourcesContent:['\n@charset "UTF-8";\n/*图片上传*/\n.upload-box[data-v-618fed26] {\n  width: 200px;\n  height: 200px;\n  line-height: 200px;\n  position: relative;\n  border: 1px dashed #ccc;\n  font-size: 50px;\n  text-align: center;\n  overflow: hidden;\n}\n.upload-box img[data-v-618fed26] {\n    width: 100%;\n    height: 100%;\n}\n.upload-box input[data-v-618fed26] {\n    position: absolute;\n    top: -10%;\n    left: 0;\n    width: 200%;\n    height: 200%;\n    font-size: 0;\n    cursor: pointer;\n    opacity: 0;\n}\n/*.editor{*/\n/*height:400px;*/\n/*}*/\n'],sourceRoot:""}])},"T/Zt":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r=a("Xxa5"),n=a.n(r),i=a("exGp"),l=a.n(i),s=a("Zx67"),c=a.n(s),d=a("Zrlr"),p=a.n(d),u=a("wxAW"),f=a.n(u),m=a("zwoO"),A=a.n(m),v=a("Pf15"),g=a.n(v),h=a("c+8m"),b=a.n(h),x=a("1Sv2"),C=(a("NSgx"),a("J4ec")),k=a("NfLi"),B=a("2UfB"),_=b()({components:{editor:k.a,uploadImg:B.a}})(o=function(e){function t(){var e,a,o,r;p()(this,t);for(var n=arguments.length,i=Array(n),l=0;l<n;l++)i[l]=arguments[l];return a=o=A()(this,(e=t.__proto__||c()(t)).call.apply(e,[this].concat(i))),o.form={id:0,topicContent:"",topicTitle:"",pictureId:0,keyWords:"",brief:"",releaseFlag:0,stickFlag:0,tabId:"",moduleId:""},o.taboptions=[],o.moduleoptions=[],o.rules={topicTitle:[{required:!0,message:"请输入名称",trigger:"blur"}],tabId:[{required:!0,message:"请选择类型",trigger:"change"}],moduleId:[{required:!0,message:"请选择类型",trigger:"change"}]},r=a,A()(o,r)}return g()(t,e),f()(t,[{key:"created",value:function(){this.getDate()}},{key:"getDate",value:function(){var e=l()(n.a.mark(function e(){var t;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.default.topic.getDefaultFormData();case 2:t=e.sent,this.taboptions=t.data,this.moduleoptions=t.data2;case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getAvatar",value:function(e){this.form.pictureId=e}},{key:"onSubmit",value:function(e){var t,a=this;this.$refs[e].validate((t=l()(n.a.mark(function e(t){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=10;break}return a.form.topicContent=a.$refs.editor.getUEContent(),e.next=4,C.default.topic.saveTopic(a.form);case 4:return e.sent,e.next=7,a.$message("新增成功");case 7:a.$router.push({name:"topiclist",params:{}}),e.next=11;break;case 10:return e.abrupt("return",!1);case 11:case"end":return e.stop()}},e,a)})),function(e){return t.apply(this,arguments)}))}},{key:"onBack",value:function(){this.$router.push({name:"topiclist",params:{}})}}]),t}(x.a))||o,I=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("div",{directives:[{name:"title",rawName:"v-title"}]},[e._v("话题管理")]),e._v(" "),a("el-card",[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"模块",prop:"moduleId"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.moduleId,callback:function(t){e.$set(e.form,"moduleId",t)},expression:"form.moduleId"}},e._l(e.moduleoptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.moduleName,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"类型",prop:"tabId"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.tabId,callback:function(t){e.$set(e.form,"tabId",t)},expression:"form.tabId"}},e._l(e.taboptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.tabName,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"banner展示",prop:"pictureId"}},[a("div",{staticStyle:{width:"100px",height:"100px"}},[a("upload-img",{attrs:{isShow:!0,imgId:e.form.pictureId},on:{getUploadImg:e.getAvatar}})],1)]),e._v(" "),a("el-form-item",{attrs:{label:"话题内容",prop:"topicContent"}},[a("editor",{ref:"editor",staticClass:"editor"})],1),e._v(" "),a("el-form-item",{attrs:{label:"关键字",prop:"keyWords"}},[a("el-input",{model:{value:e.form.keyWords,callback:function(t){e.$set(e.form,"keyWords",t)},expression:"form.keyWords"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"标题",prop:"topicTitle"}},[a("el-input",{model:{value:e.form.topicTitle,callback:function(t){e.$set(e.form,"topicTitle",t)},expression:"form.topicTitle"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"简短说明",prop:"brief"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.brief,callback:function(t){e.$set(e.form,"brief",t)},expression:"form.brief"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否开放"}},[[a("el-radio",{attrs:{label:0},model:{value:e.form.releaseFlag,callback:function(t){e.$set(e.form,"releaseFlag",t)},expression:"form.releaseFlag"}},[e._v("开放")]),e._v(" "),a("el-radio",{attrs:{label:1},model:{value:e.form.releaseFlag,callback:function(t){e.$set(e.form,"releaseFlag",t)},expression:"form.releaseFlag"}},[e._v("不开放")])]],2),e._v(" "),a("el-form-item",{attrs:{label:"是否置顶"}},[[a("el-radio",{attrs:{label:0},model:{value:e.form.stickFlag,callback:function(t){e.$set(e.form,"stickFlag",t)},expression:"form.stickFlag"}},[e._v("置顶")]),e._v(" "),a("el-radio",{attrs:{label:1},model:{value:e.form.stickFlag,callback:function(t){e.$set(e.form,"stickFlag",t)},expression:"form.stickFlag"}},[e._v("不置顶")])]],2),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onSubmit("form")}}},[e._v("立即创建")]),e._v(" "),a("el-button",{on:{click:function(t){e.onBack()}}},[e._v("取消")])],1)],1)],1)],1)};I._withStripped=!0;var y={render:I,staticRenderFns:[]},w=y;var F=!1;var $=a("VU/8")(_,w,!1,function(e){F||a("wN0y")},"data-v-618fed26",null);$.options.__file="src/pages/topic/add.vue";t.default=$.exports},wN0y:function(e,t,a){var o=a("QSgX");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a("rjj0")("336e6530",o,!1,{})}});