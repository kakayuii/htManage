<template>
  <section>
    <div v-title>用户管理</div>

    <el-card>
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input ref="checkPass" type="password" v-model="form.checkPass" auto-complete="off"></el-input>
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
  import md5 from 'js-md5';
  import Component from 'vue-class-component';
  import BaseComponent from '@/BaseComponent';
  import API from '@/store/api'

  @Component({
    props: {
      id: 0
    }
  })
  export default class UserChangePWD extends BaseComponent {
    /*
     * 表单信息初始化
     * */
    form =  {
      id:0,
      pass: '',
      checkPass: '',
      oldPass:""
    }

    /*
     * 表单验证
     * */

    validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.$refs.checkPass.value) {

        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    rules =  {
      oldPass: [
        { required: true, message: '请输入旧密码', trigger: 'blur' }
      ],
      pass: [
        { validator: this.validatePass, trigger: 'blur' }
      ],
      checkPass: [
        { validator: this.validatePass2, trigger: 'blur' }
      ]
    }

    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await API.user.changePWD({
            id:this.form.id,
            pwd:md5(this.form.pass)
          });
          await this.$message("修改成功");
          this.$router.push({name: 'usersyslist', params: {}})
        } else {
          return false;
        }
      });

    }

    onBack() {
      this.$router.push({name: 'usersyslist', params: {}})
    }

    created(){
      this.getDate(this.id);

    }

    async getDate(id){
      let res = await API.user.getUserInfo(id);

      this.form = res;

    }

  }
</script>

<style lang="scss" scoped>

</style>
