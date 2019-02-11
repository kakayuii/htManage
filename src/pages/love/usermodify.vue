<template>
  <section>
    <div v-title>爱记忆用户</div>
    <el-card>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="昵称" prop="nickName" ref="nickName">
          <el-input v-model="form.nickName" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthDate">
          <el-date-picker
            v-model="form.birthDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <template>
            <el-radio v-model="form.gender" label="M">男</el-radio>
            <el-radio v-model="form.gender" label="F">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="头像" prop="pictureId">
          <div style="width:100px;height:100px">
            <upload-img @getUploadImg="getAvatar" :isShow="true" :imgId="gwPictureId" :url="upLoadUrl" keyName="content" :showURL="showURL"></upload-img>
          </div>
        </el-form-item>
        <el-form-item label="文化程度" prop="qualification">
          <el-select v-model="form.qualification" placeholder="请选择">
            <el-option
              v-for="item in qualificationoptions"
              :key="'qualification'+item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          {{mobile}}
        </el-form-item>
        <el-form-item label="微信号" prop="wx">
          <el-input v-model="form.wx" maxlength="20" ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="loveRole">
          <el-select v-model="form.loveRole" placeholder="请选择">
            <el-option
              v-for="item in loveRoleoptions"
              :key="'loveRole'+item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">修改</el-button>
          <el-button @click="onBack()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>


<script>
  import Component from 'vue-class-component';
  import BaseComponent from '@/BaseComponent';
  import {loveRole, qualification} from './const';
  import API from '@/store/api';
  import editor from '@/components/editor/editor'
  import {validateSpace} from '@/common/el-validate';
  import uploadImg from '@/components/uploadImg';
  import {
    ijyURL
  } from '@/config/env'


  @Component(
    {
      components:{editor,uploadImg},
      props: {
        id: 0
      }
    }
  )
  export default class LoveUserList extends BaseComponent {

    /*
     * 表单信息初始化
     * */
    form = {
      userId: 0,
      qualification: '',
      loveRole: '',
      pictureId: 0,
      nickName: '',
      gender: '',
      birthDate: 0,
      wx: ''
    }
    mobile = null;
    gwPictureId = 0;
    upLoadUrl = '/'+ijyURL+'/api/binaryFile/saveBinaryFile?user_id='+this.id;
    showURL = '/'+ijyURL+'/api/binaryFile/';

    loveRoleoptions = loveRole;
    qualificationoptions = qualification;

    pickerOptions = {
      disabledDate: (time) => {
        return time.getTime() > Date.now();
      }
    }
    /*
     * 表单验证
     * */
    rules = {
      nickName: [
        {validator: validateSpace, message: '请输入名称', trigger: 'blur'},
        {required: true, message: '请输入名称', trigger: 'blur'}
      ]
    }

    created() {
      this.getDate(this.id);
    }

    getAvatar(id) {
      this.gwPictureId = id;
    }


    validateSpace = (value, callback)=> {
      if (value !=undefined && value.length > 0) {
        var regular = /\s+/g;

        if (regular.test(value)) {
          callback(new Error());
        }
      }
      callback();
    }

    convertUTCTimeToLocalTime = function (UTCDateString) {
      if(!UTCDateString){
        return '-';
      }
      function formatFunc(str) {    //格式化显示
        return str > 9 ? str : '0' + str
      }
      var date2 = new Date(UTCDateString);     //这步是关键
      var year = date2.getFullYear();
      var mon = formatFunc(date2.getMonth() + 1);
      var day = formatFunc(date2.getDate());
      var hour = date2.getHours();
      var noon = hour >= 12 ? 'PM' : 'AM';
      hour = hour>=12?hour-12:hour;
      hour = formatFunc(hour);
      var min = formatFunc(date2.getMinutes());
      var dateStr = year+'-'+mon+'-'+day;
      return dateStr;
    }

    onSubmit(formName) {
      /*
      let flag = true;
      this.validateSpace(this.form.nickName ,function(res){
        if(res) {
          flag = false;
        }else{
          //flag = true;
        }
      })
      */
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = this.form;
          data.birthDate = this.convertUTCTimeToLocalTime(data.birthDate) || '';
          let res = await API.love.putUserInfo(data);
          await this.$message.success("编辑成功");
          this.$router.push({name: 'loveuserlist', params: {}})
        } else {
          return false;
        }
      });

    }

    onBack() {
      this.$router.push({name: 'loveuserlist', params: {}})
    }

    async getDate(id){
      let res = await API.love.getUserInfo(id);
      this.form = {
        userId: res.id,
        qualification: res.qualification,
        loveRole: res.loveRole,
        pictureId: res.pictureId,
        nickName: res.nickName,
        gender:res.gender,
        birthDate: res.birthDate || '',
        wx: res.wx || ''
      }
      this.gwPictureId = res.gwPictureId;
      this.mobile = res.mobile;
    }
  }
</script>

<style lang="scss" scoped>

  /*图片上传*/
  .upload-box {
    width: 200px;
    height: 200px;
    line-height: 200px;
    position: relative;
    border: 1px dashed #ccc;
    font-size: 50px;
    text-align: center;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    input {
      position: absolute;
      top: -10%;
      left: 0;
      width: 200%;
      height: 200%;
      font-size: 0;
      cursor: pointer;
      opacity: 0;
    }
  }

  /*.editor{*/
  /*height:400px;*/
  /*}*/

</style>
