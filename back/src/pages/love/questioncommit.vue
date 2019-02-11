<template>
  <section>
    <div v-title>爱记忆提问管理</div>


    <el-form ref="form1" :model="form1" :rules="rules1"  label-width="80px">
      <el-card>
        <el-form-item label="类型" prop="replyState">
          <el-select v-model="form1.replyState" placeholder="请选择">
            <el-option
              v-for="item in replyStateoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

          <el-button type="primary" @click="changeQuestion('form1')">修改</el-button>
        </el-form-item>

      </el-card>
    </el-form>
    <el-form ref="form2" :model="form2" :rules="rules2"  label-width="80px">
      <el-card>
          <el-form-item label="回复内容" prop="replyContent">
            <el-input type="textarea" v-model="form2.replyContent"></el-input>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form2')">发送</el-button>
          <el-button @click="onBack()">取消</el-button>
        </el-form-item>
      </el-card>
      <el-card>
        <el-table :data="commintList" border
                  size="small"
                  :stripe="true" width="100%">
          <el-table-column prop="nickName" label="提问者" ></el-table-column>
          <el-table-column prop="creationTime" label="提交时间" >
            <template slot-scope="scope">
              {{scope.row.creationTime | timeFilter}}
            </template>
          </el-table-column>
          <el-table-column prop="content" label="提问内容" ></el-table-column>

          <el-table-column label="操作" width="190">
            <template  slot-scope="scope">
              <el-button size="mini" @click="onDel(scope.row.id)"  v-if="scope.row.delFlag">删除</el-button>
              <span v-else="">问题不允许删除</span>
            </template>
          </el-table-column>
        </el-table>

      </el-card>
    </el-form>
  </section>
</template>





<script>
  import Component from 'vue-class-component';
  import BaseComponent from '@/BaseComponent';
  import {replyState} from './const';
  import API from '@/store/api'

  @Component({
    props: {
      id: String
    }
  })
  export default class LoveDomainModify extends BaseComponent {

    commintList = [];
    /*
     * 表单信息初始化
     * */
    form1 =  {
      questionId:0,
      replyState: ''

    }

    form2 = {
      replyContent:"",
      replyId:0,
    }
    replyStateoptions = replyState;

    /*
     * 表单验证
     * */
    rules1 =  {
      replyState: [
        { required: true, message: '请输入名称', trigger: 'blur' }
      ]
    }
    rules2 =  {
      replyContent: [
        { required: true, message: '请输入内容', trigger: 'blur' }
      ]
    }

    changeQuestion(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await API.loveQuestion.changeQuestionState(this.form1);
          await this.$message("状态变更成功");
          //this.$router.push({name: 'lovedomainlist', params: {}})
          this.getDate(this.id);
        } else {
          return false;
        }
      });
    }

    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await API.loveQuestion.sendLoveQuestion(this.form2);
          await this.$message("发送成功");
          //this.$router.push({name: 'lovedomainlist', params: {}})
          this.getDate(this.id);
        } else {
          return false;
        }
      });
    }

    onBack() {
      this.$router.push({name: 'lovequestionlist', params: {}})
    }

    onDel(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await API.loveQuestion.delReply({id:id, questionId:this.id});
        await this.$message("删除成功");
        this.getDate(this.id);
      })
    }

    created(){
      this.getDate(this.id);
    }

    async getDate(id){
      let res = await API.loveQuestion.getQuestion(id);

      this.form1.questionId = res.data.id;
      this.form1.replyState = res.data.replyState;
      this.form2.replyId = res.data.id;
      this.form2.replyContent = "";

      let temp = {};
      this.commintList = [];
      temp.nickName  = res.data.questionUserName;
      temp.creationTime  = res.data.creationTime;
      temp.content  = res.data.firstContent;
      temp.id  = res.data.id;
      temp.delFlag  = false;
      this.commintList.push(temp);
      if(res.data2!= undefined &&res.data2.length >0) {
        for (var i in res.data2) {
          let temp = {};
          temp.nickName  = res.data2[i].toUserName;
          temp.creationTime  = res.data2[i].creationTime;
          temp.content  = res.data2[i].replyContent;
          temp.id  = res.data2[i].id;
          temp.delFlag  = true;

          this.commintList.push(temp);
        }
      }
    }
    /*
    get commintList(){


      return this.list
    }
    */

  }
</script>

<style lang="scss" scoped>

</style>
