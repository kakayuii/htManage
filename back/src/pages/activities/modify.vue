<template>
  <section>
    <div v-title>{{id ? '编辑' : '新增'}}活动管理</div>
    <h3>{{id ? '编辑' : '新增'}}活动管理</h3>
    <el-card>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="类型" prop="tabId">
          <el-select v-model="form.tab_id" placeholder="请选择">
            <el-option
              v-for="item in taboptions"
              :key="item.id"
              :label="item.tabName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="banner展示" prop="pictureId">
          <div style="width:100px;height:100px">
            <upload-img @getUploadImg="getAvatar" :isShow="true" :imgId="form.pictureId"></upload-img>
          </div>
        </el-form-item>
        <el-form-item label="活动时间" prop="datetime">
          <el-date-picker
            :picker-options="pickerOptions"
            :editable="false"
            v-model="form.startTime"
            type="datetime"
            placeholder="选择开始时间">
          </el-date-picker>
          至
          <el-date-picker
            :editable="false"
            :picker-options="pickerOptions1"
            v-model="form.endTime"
            type="datetime"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名上限" prop="activitiesCount">
          <el-input type="number" v-model="form.activitiesCount"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="activitiesAddress">
          <el-input v-model="form.activitiesAddress"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keyWords">
          <el-input v-model="form.keyWords"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="activitieName">
          <el-input v-model="form.activitieName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="活动内容" prop="activitiesContent">
          <editor ref="editor" class="editor" :msg="form.activitiesContent"></editor>
        </el-form-item>
        <el-form-item label="是否开放">
          <template>
            <el-radio v-model="form.releaseFlag" :label="0">开放</el-radio>
            <el-radio v-model="form.releaseFlag" :label="1">不开放</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否置顶">
          <template>
            <el-radio v-model="form.stickFlag" :label="0">置顶</el-radio>
            <el-radio v-model="form.stickFlag" :label="1">不置顶</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="报名编辑表">
          <template>
            <el-checkbox v-model="form.gwRegistrationProperty.name" label="姓名" border :true-label="1" :false-label="0"
                         :checked="form.gwRegistrationProperty.name == 1 ? true :false"></el-checkbox>
            <el-checkbox v-model="form.gwRegistrationProperty.company" label="公司名称" border :true-label="1"
                         :false-label="0"
                         :checked="form.gwRegistrationProperty.company == 1 ? true :false"></el-checkbox>
            <el-checkbox v-model="form.gwRegistrationProperty.mobile" label="手机号" border :true-label="1"
                         :false-label="0"
                         :checked="form.gwRegistrationProperty.mobile == 1 ? true :false"></el-checkbox>
            <el-checkbox v-model="form.gwRegistrationProperty.email" label="邮箱" border :true-label="1" :false-label="0"
                         :checked="form.gwRegistrationProperty.email == 1 ? true :false"></el-checkbox>
            <el-checkbox v-model="form.gwRegistrationProperty.position" label="职位" border :true-label="1"
                         :false-label="0"
                         :checked="form.gwRegistrationProperty.position == 1 ? true :false"></el-checkbox>
            <el-checkbox v-model="form.gwRegistrationProperty.sex" label="性别" border :true-label="1" :false-label="0"
                         :checked="form.gwRegistrationProperty.sex == 1 ? true :false"></el-checkbox>
            <el-checkbox v-model="form.gwRegistrationProperty.age" label="年龄" border :true-label="1" :false-label="0"
                         :checked="form.gwRegistrationProperty.age == 1 ? true :false"></el-checkbox>
          </template>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">{{id ? '保存' : '立即创建'}}</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
  import Component from 'vue-class-component';
  import BaseComponent from '@/BaseComponent';
  import {stickFlag, releaseFlag} from './const';
  import API from '@/store/api';
  import editor from '@/components/editor/editor'
  import {validateDatetimeRange} from '@/common/el-validate';
  import uploadImg from '@/components/uploadImg';

  @Component(
    {
      components: {editor, uploadImg},
      props: {
        id: 0
      }
    }
  )
  export default class ActivitiesModify extends BaseComponent {

    /*
     * 表单信息初始化
     * */
    form = {
      id: 0,
      activitiesContent: '',
      activitieName: '',
      activitiesAddress: '',
      activitiesCount: '',
      pictureId: 0,
      keyWords: '',
      description: '',
      releaseFlag: 0,
      activitiesState: 0,
      tab_id: "",
      startTime: "",
      endTime: "",
      stickFlag: 1,
      gwRegistrationProperty: {
        age: 1,
        company: 1,
        email: 1,
        mobile: 1,
        name: 1,
        position: 1,
        sex: 1,
      }
    }
    taboptions = [];

    pickerOptions = {
      disabledDate(time) {
        return time.getTime() < Date.now() - 8.64e7;
      }
    }
    pickerOptions1 = {
      disabledDate(time) {
        return time.getTime() < Date.now() - 8.64e7;
      }
    }
    /*
     * 表单验证
     * */
    rules = {
      activitieName: [
        {required: true, message: '请输入名称', trigger: 'blur'}
      ],
      tab_id: [
        {required: true, message: '请选择类型', trigger: 'change'}
      ],
      datetime: [
        {validator: this.validateDatetimeRange, trigger: 'blur'}
      ],
      activitiesCount: [
        {required: true, message: '请输入报名上限', trigger: 'change'},
        {
          type: 'number', message: '必须为数字值', transform (value) {
        }
        }
      ],
      activitiesAddress: [
        {required: true, message: '请输入活动地址', trigger: 'change'}
      ]
    }
//    pickerBeginDateBefore = {
//      disabledDate: (time) => {
//        let beginDateVal = this.filters.column.create_end_date;
//        if (beginDateVal) {
//          return time.getTime() > beginDateVal;
//        }
//      }
//    }
//    pickerBeginDateAfter = {
//      disabledDate: (time) => {
//        let beginDateVal = this.form.column.create_start_date;
//        if (beginDateVal) {
//          return time.getTime() < beginDateVal;
//        }
//      }
//    }

    getAvatar(id) {
      this.form.pictureId = id;
    }

    created() {
      this.getOptions()
      if (this.id > 0) {
        this.getDate(this.id);
      }

    }

    //保存数据
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.activitiesContent = this.$refs.editor.getUEContent();
          let res = await API.activities.saveActivities(this.form);
          await this.$message.success("修改成功");
          this.$router.push({name: 'activitieslist'})
        }
      });

    }

    //获取类型选择
    async getOptions() {
      this.taboptions = await API.contentLabel.getList(true)
    }

    //获取详情
    async getDate(id) {
      let res = await
        API.activities.getActivities(id);
      let {
        activitiesContent, activitieName, activitiesAddress, activitiesCount, pictureId, keyWords,
        description, releaseFlag, activitiesState, gwTab, startTime, endTime, stickFlag, tab_id
      } = res.data;
      let {age, email, company, mobile, name, position, sex} = res.data2;
      this.form = {
        id, activitiesContent, activitieName, activitiesAddress, activitiesCount, pictureId, keyWords,
        description, releaseFlag, activitiesState, startTime, endTime, stickFlag,
        tab_id: tab_id,
        gwRegistrationProperty: {age, company, email, mobile, name, position, sex}
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
