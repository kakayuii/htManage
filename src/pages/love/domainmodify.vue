<template>
  <section>
    <div v-title>爱记忆门店管理</div>

    <el-card>
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px">

        <el-form-item label="名称" prop="domainName">
          <el-input v-model="form.domainName"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in typeoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-switch
            v-model="recommend"
            active-text="推荐"
            inactive-text="不推荐">
          </el-switch>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="addressX">
          <el-input v-model="form.addressX"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="addressY">
          <el-input v-model="form.addressY"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item label="网站" prop="website">
          <el-input v-model="form.website"></el-input>
        </el-form-item>
        <el-form-item label="标签一" prop="tagOne">
          <el-input v-model="form.tagOne"></el-input>
        </el-form-item>
        <el-form-item label="标签二" prop="tagTwo">
          <el-input v-model="form.tagTwo"></el-input>
        </el-form-item>
        <el-form-item label="标签三" prop="tagThree">
          <el-input v-model="form.tagThree"></el-input>
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
  import {loveType} from './const';
  import {validateX,validateY,validateSpace,validatePhone} from '@/common/el-validate';
  import API from '@/store/api'

  @Component({
    props: {
      id: Number
    }
  })
  export default class LoveDomainModify extends BaseComponent {
    /*
     * 表单信息初始化
     * */
    form =  {
      id:0,
      name: '',
      type: '',
      recommend: 0,
      address: '',
      addressX: '',
      addressY: '',
      telephone: '',
      website: '',
      tagOne: '',
      tagTwo: '',
      tagThree: '',
    }
    recommend = false;
    typeoptions = loveType;

    /*
     * 表单验证
     * */
    rules =  {
      name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
      ],
      type: [
        { required: true, message: '请选择类型', trigger: 'change' }
      ],
      addressX: [
        { validator: validateX , message: '经度整数部分为0-180,小数部分为0到6位!', trigger: 'blur' }
      ],
      addressY: [
        { validator: validateY , message: '纬度整数部分为0-90,小数部分为0到6位', trigger: 'blur' }
      ],
      telephone: [
        { validator: validatePhone, trigger: 'blur' }
      ],
      tagOne: [
        { validator: validateSpace, message: '标签不能输入空格', trigger: 'blur' }
      ],
      tagTwo: [
        { validator: validateSpace, message: '标签不能输入空格', trigger: 'blur' }
      ],
      tagThree: [
        { validator: validateSpace, message: '标签不能输入空格', trigger: 'blur' }
      ]
    }

    onSubmit(formName) {
      console.log("recommend onSubmit",this.recommend);
      this.form.recommend = this.recommend == true? 1:0;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await API.love.saveDomain(this.form);
          await this.$message("编辑成功");
          this.$router.push({name: 'lovedomainlist', params: {}})
        } else {
          return false;
        }
      });

    }

    onBack() {
      this.$router.push({name: 'lovedomainlist', params: {}})
    }

    created(){
      this.getDate(this.id);
    }

    async getDate(id){
      let res = await API.love.getDomain(id);
      this.form = res;
      this.recommend = res.recommend == 1? true:false;


    }

  }
</script>

<style lang="scss" scoped>

</style>
