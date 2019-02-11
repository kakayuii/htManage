<template>
  <div class="domain-list">
    <h3>标签管理</h3>
    <el-card style="margin-bottom: 10px;">
      <el-button type="danger" icon="el-icon-plus" @click="isShow=true">新增</el-button>
    </el-card>
    <tag-list ref="yiliao"></tag-list>
    <tag-list  ref="zhaohu" :type="2" title="照护相关"></tag-list>
    <!--编辑框-->
    <div class="edit-box" v-if="isShow">
      <el-card class="content">
        <div slot="header" class="clearfix">
          <span>新增标签</span>

        </div>
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="标签名称:" prop="tagName" :rules="[{ required: true, message: '请输入标签名称', trigger: 'blur' }]">
            <el-input v-model="form.tagName"></el-input>
          </el-form-item>
          <el-form-item label="类型:"  :prop="type" :rules="[{ required: true, message: '请选择类型', trigger: 'blur' }]">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in tagTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row class="submit">
            <el-button type="primary" @click="saveRemark">新增</el-button>
            <el-button  @click="hide">取消</el-button>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
  import tagList from './components/tagList.vue';
  import {saveLoveTag} from '@/store/api/loveQuestion'
  export default{
    components:{
      tagList
    },
    data(){
      return {
        isShow: false,
        form: {
          tagName: '',
          type: 1
        },
        tagTypes: [{name: '医疗', id: 1}, {name: '照护', id: 2}]
      }
    },
    methods:{
      hide(){
        this.form = {
          tagName: '',
          type: 1,
        }
        this.isShow = false;
      },

      //保存 新增
      saveRemark(){
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            let {tagName, type} = this.form;
            let option = {
              tagName,type
            }
            let userId=this.$store.state.Login.UserInfo.id;

            saveLoveTag(option,userId).then(res => {
              this.hide();
              this.$message.success('保存成功');
              let typeUpdate=type==1?'yiliao':'zhaohu';
              this.$refs[typeUpdate].getList()
            })
          }
        });
      },
    }
  }
</script>
<style lang="scss" scoped="">
  @import "../../common/css/mixins";

  .edit-box {
    @include fullScreen;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    .content {
      @include middle;
      width: 60%;
      max-width: 600px;
      .submit {
        /*display: block;*/
        margin: 20px auto 0;
        width: 200px;
      }
    }
  }
</style>
