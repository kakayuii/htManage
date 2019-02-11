<template>
  <section>
    <div v-title>用户管理</div>

    <el-card>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-checkbox-group v-model="form.roleIds">
            <el-checkbox v-for="item,index in roleList"  :label="item.id" :key="index" border>{{item.description}}
            </el-checkbox>
          </el-checkbox-group>
            <!--<el-radio-group v-model="roleIds">-->
              <!--<el-radio name="roleIds" v-for="item in userRoleListoptions" :label="item.id" :key="item.id">-->
                <!--{{item.description}}-->
              <!--</el-radio>-->
            <!--</el-radio-group>-->

        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <template>
            <el-radio v-model="form.gender" label="M">男</el-radio>
            <el-radio v-model="form.gender" label="F">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否激活">
          <template>
            <el-select v-model="form.status">
              <el-option
                v-for="item in statusText"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">修改</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>


<script>
  import Component from 'vue-class-component';
  import BaseComponent from '@/BaseComponent';
  import {statusText, genderText} from './const';
  import {validatePhone} from '@/common/el-validate';
  import API from '@/store/api'

  export default {
    data(){
      return {
        /*
         * 表单信息初始化
         * */
        form: {
          id: 0,
          creationTime: '',
          email: '',
          gender: '',
          lastLogin: '',
          mobile: '',
          nickName: '',
          roleIds:[],
          status: ''

        },
        roleList: null,
        statusText: statusText,

        /*
         * 表单验证
         * */
        rules: {
          nickName: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          email: [
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          mobile: [
            {validator: validatePhone, trigger: 'blur'},
            {required: true, message: '请输入名称', trigger: 'blur'}
          ]
        }
      }
    },

    created(){
      this.getDate();
    },
    methods: {
      //保存用户信息
      onSubmit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            let res = await API.user.saveUserInfo(this.form);
            this.$message.success("修改成功");
            this.$router.go(-1)
          }
        });
      },

      //获取详情
      async getDate(){
        let id = this.$route.params.id;
        let {email, mobile, gender, nickName, status, roles} = await API.user.getUserInfo(id);
        this.form = {id, email, gender, mobile, nickName, status};
        this.roleList = [...roles];
        let roleIds=roles.filter(val=>val.checkFlag).map(val=>val.id);
        this.form = {id, email, gender, mobile, nickName, status,roleIds};
      }
    },


  }
</script>

<style lang="scss" scoped>

</style>
