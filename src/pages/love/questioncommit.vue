<template>
  <section>
    <div v-title>爱记忆提问管理</div>
    <el-row :gutter="20">
      <el-col :span="16">
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
              <el-button type="danger" @click="deleteQuestion('form1')">删除</el-button>
            </el-form-item>
            <el-form-item label="提问标签" prop="tagName">

                <span v-for="item in tagName"
                      :label="item"
                      :value="item" class="tag-txt">{{item}}</span>

            </el-form-item>
            <el-form-item label="其他疾病" prop="otherDisease">
              <span>{{otherDisease?otherDisease:'无'}}</span>
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
        </el-form>
      </el-col>

      <el-col :span="8" >
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="align-center">
              <img :src="upLoadUrl" class="head-img"/>
              <div>{{userInfo.nickName?userInfo.nickName:'尚未设定昵称'}}</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="align-right">年龄</div>
            <div class="align-right">性别</div>
            <div class="align-right">文化程度</div>
            <div class="align-right">脑功能测评结果</div>
            <div class="align-right">深度脑功能结果</div>
            <div class="align-right">情绪测试结果</div>
          </el-col>
          <el-col :span="12">
            <div class="align-left">{{age}}</div>
            <div class="align-left" v-if="userInfo.gender=='M'">男</div>
            <div class="align-left" v-else-if="userInfo.gender=='F'">女</div>
            <div class="align-left" v-else="userInfo.gender=='未设定'">女</div>
            <div class="align-left" v-if="userInfo.qualification">{{qualificationList[userInfo.qualification]}}</div>
            <div class="align-left" v-else>未设定</div>
            <div class="align-left" v-for="item in arr"
                 :label="item"
                 :value="item">{{item.conclusion?item.conclusion:item.isStart}}</div>
          </el-col>
        </el-row>

      </el-col>
    </el-row>

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
            <el-button size="mini" @click="onDel(scope.row.id)"  v-if="scope.row.delete_state!=1">删除</el-button>
            <span v-else="">问题不允许删除</span>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
  </section>
</template>





<script>
  import Component from 'vue-class-component';
  import BaseComponent from '@/BaseComponent';
  import {replyState} from './const';
  import API from '@/store/api';
  import uploadImg from '@/components/uploadImg';
  import {
    HttpHost
  } from '@/config/env'


  @Component({
    components:{uploadImg},
    props: {
      id: 0
    }
  })
  export default class LoveDomainModify extends BaseComponent {

    commintList = [];
    gwPictureId = 0;
    upLoadUrl ='../../../static/img/men.png';
//    userInfo=this.$store.state.Login.UserInfo;
    userInfo={};
    qualificationList=['初中及以下','高中','专科','本科','硕士','博士'];
    tagName=['无'];
    otherDisease='';
    arr = [{
      isStart: '未进行',
    },
    {
      isStart: '未进行',
    },
    {
      isStart: '未进行',
    }];
    age='未设定';
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
      nickName:'',
      birthDate:'',
      gender:'',
      qualification:0
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

    getAvatar(id) {
      this.gwPictureId = id;
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

    deleteQuestion(formName) {

      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await API.loveQuestion.deleteQuestionState(this.form1);
        await this.$message.success("删除成功");
        this.$router.go(-1);

      })

    }

    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await API.loveQuestion.sendLoveQuestion(this.form2);
          await this.$message.success("发送成功");
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
        API.loveQuestion.delReply({id:id, questionId:this.id}).then(res=>{
          this.$message.success("删除成功");
          this.getDate(this.id);
        }).catch(res=>{
          let msg=res.msg?res.msg:'服务器错误';
          this.$message.error(msg);
        })

      })
    }

    created(){
      this.getDate(this.id);
    }

    async getDate(id){
      let res = await API.loveQuestion.getQuestion(id);
      this.form1.questionId = res.data.id;
      this.form1.replyState = res.data.replyState;

      this.form2={
        replyId:res.data.id,
        replyContent :""
      }

      this.commintList = [{
        nickName:res.data.questionUserName,
        creationTime: res.data.creationTime,
        content:res.data.firstContent,
        id:res.data.id,
        delete_state:1,  //0 可以删除 、 1不可以删除

      }];

      if(res.data2!= undefined &&res.data2.length >0) {
        res.data2.forEach (val=> {
          this.commintList.push({
            nickName:val.toUserName,
            creationTime: val.creationTime,
            content:val.replyContent,
            id:val.id,
            delete_state:val.delete_state,
          });
        })
      }

      this.userInfo= res.data.user;
      this.age=this.userAge(res.data.user.birthDate);
      console.log(this.userAge(res.data.user.birthDate));
      this.otherDisease=res.data.otherDisease;
      if(res.data.user.gwPictureId) {
        this.upLoadUrl = HttpHost+'ijy/api/binaryFile/' + res.data.user.gwPictureId;
      }else{
        this.upLoadUrl = '../../../static/img/men.png';
      }
      let parm={
        uid:res.data.user.id
      }
      let ret = await API.loveQuestion.questionNaire(parm);
      ret.forEach(val => {
        this.arr[val.type - 1] = {
          ...this.arr[val.type - 1],
          ...val
        }
      })

      if(res.data.tagName.length!=0){
        this.tagName=res.data.tagName;
      }
    }


   userAge(str) {
      let birthYear = str.substring(0, 4);
      let returnAge;
      let d = new Date();
      let nowYear = d.getFullYear();

      if (nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁
      } else {
        let ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          returnAge = ageDiff;
        } else {
          returnAge = 0;//返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge;
    }

  }
</script>

<style lang="scss" scoped>
  .align-center{
    text-align: center;
    margin: 20px 0 10px;
  }
  .align-right{
    text-align:right;
    margin-bottom: 10px;
  }
  .align-left{
    text-align: left;
    margin-bottom: 10px;
  }

  .head-img{
    width:100px;
    height:100px;
    border-radius:50%;
    margin-bottom: 10px;
  }

  .tag-txt{
    margin-right:10px;
  }
</style>
