<template>
  <div class="view">
    <h3 class="page-title">
      反馈详情
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </h3>
    <el-card>

      <ul class="info-box">
        <li><b>反馈状态：</b>{{info.status | feedbackStateToText}}</li>
        <li><b>反馈类型：</b>{{info.type | feedbackTypeToText}}<span v-if="info.type==0">{{info.equipType==0?'i Care':'i Bed'}}</span></li>
        <li><b>用户昵称：</b>{{info.nickName}}</li>
        <li><b>手机号：</b>{{info.userPhone}}</li>

        <template v-if="info.type==4">
          <li><b>事件发生时间：</b>
            <div>{{info.occurTime}}</div>
          </li>
          <li><b>门店名称：</b>
            <div>{{info.displayName}}</div>
          </li>
        </template>

        <li><b>事件描述：</b>
          <div>{{info.feedbackContent}}</div>
        </li>
        <li><b>创建时间：</b>{{info.creationTime}}</li>
        <!--图片-->
        <li>
          <b>反馈图片:</b>
          <div class="img-box-list" v-if="info.pictureIds">
            <div class="img-item" v-for="(item,index) in info.pictureIds.split(',')"
                 @click="activeImg=`${HttpHost}iweb/api/feedBack/${item}?flag=1`">
              <img :src="`${HttpHost}iweb/api/feedBack/${item}?flag=1`" alt="">
            </div>
          </div>
          <span v-else="">暂无</span>
        </li>
        <li v-if="info.gwFeedbackEvaluations.length">
          <b>用户评价内容:</b>
          <div class="content">
            <div v-for="(item,index) in info.gwFeedbackEvaluations" :key="index">
              <div><span>满意度：</span>{{types[item.status]}}</div>
              <div v-if="item.status==2"><span>不满意原因：</span>{{why[item.discontentReason]}}</div>
              <div><span>评价内容：</span>{{item.content}}</div>
            </div>
          </div>
        </li>
        <li style="margin-top: 10px;" v-if="info.status!=4">
          <b>备注信息：</b>
          <div>
            <el-input v-model="remark" type="textarea"
                      :autosize="{minRows:3,maxRows:10}"
                      placeholder="请填写备注信息(非必填)"
                      style="width:600px;"></el-input>
          </div>
        </li>
        <!--投诉模块多余内容-->
        <template v-if="info.type==4">
          <li style="margin-top: 20px;" v-if="info.status!=4">
            <b>操作：</b>
            <el-button type="primary" @click="changeStatus(1,true)" v-if="info.status==0">第一次回访确认</el-button>
            <el-button type="primary" @click="changeStatus(2)" v-if="info.status==1">线下处理确认</el-button>
            <el-button type="primary" @click="changeStatus(3,true)" v-if="info.status==2">第二次回访确认</el-button>
            <el-button type="primary" @click="isShow=true">关闭</el-button>
          </li>
          <!--线下评价-->
          <li v-if="info.status==3" style="margin-top: 10px;">
            <b>线下评价图上传</b>
            <div>
              <div class="upload-box" style="margin-bottom: 10px;">
                <img :src="`${HttpHost}iweb/api/feedBack/evaluation/${imgId}?flag=1`" alt="">
                <i class="el-icon-plus"></i>
                <input type="file" ref="upload" @change="upload">
              </div>
              <el-button type="primary" @click="changeStatus(4)">上传线下评价单</el-button>
            </div>
          </li>
        </template>
        <li v-else="" style="margin-top: 20px;">
          <b>操作：</b>
          <el-button type="primary" @click="changeStatus(4,true)">{{info.smsFlag?'再次发送':'发'}}短信</el-button>
        </li>
        <li v-if="info.evaluationPicId">
          <b>评价图片</b>
          <div class="img-box"
               @click="activeImg=`${HttpHost}api/feedBack/evaluation/${info.evaluationPicId}?flag=1`">
            <img :src="`${HttpHost}api/feedBack/evaluation/${info.evaluationPicId}?flag=1`"
                 alt="">
          </div>
        </li>
      </ul>


    </el-card>

    <!--历史操作记录-->
    <el-card v-if="info.gwFeedbackFlowHistories.length">
      <h3>历史操作查看</h3>
      <ul class="history-list">
        <li v-for="(item,index) in info.gwFeedbackFlowHistories">
           <span>{{index + 1}},
             操作人：{{item.nickName}},<br>
             操作时间：{{item.creationTime}},<br>
             操作动作： {{item.handleStatus | feedbackStateToText}} ---> {{item.toStatus | feedbackStateToText}} <br>
             <span v-if="item.remark!=','&&item.remark">
                 备注信息：{{item.remark}}
             </span>
           </span>
        </li>
      </ul>
    </el-card>


    <div class="show-img-box" v-if="activeImg" @click="activeImg=''">
      <img :src="activeImg" alt="">
    </div>

    <div class="close-box" v-if="isShow">
      <div class="content">
        <el-input type="textarea"
                  :autosize="{minRows: 4, maxRows: 10}"
                  placeholder="请输入关闭原因" v-model="remark"></el-input>
        <div class="btn">
          <el-button @click="isShow=false;">取消</el-button>
          <el-button type="danger" @click="close">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getFeedbackById, changeStatus} from '@/store/api/feedback'
  import {HttpHost} from '@/store/api/Ajax'
  export default{
    data(){
      return {
        info: {}, //反馈详情
        typeName: {0: '服务投诉', 1: '优化建议', 2: '新用户心愿', 3: '智能设备反馈', 4: '其他',},
        imgId: '',
        types: {0: '非常满意', 1: '满意', 2: '不满意'},
        why: {0: '反馈态度不好', 1: '处理时间过长', 2: '问题没有有效解决', 3: '其他'},
        activeImg: '', //展示图片
        isShow: false,
        remark: '',
        HttpHost: HttpHost,
      }
    },
    created(){
      this.getFeedbackById()
    },
    methods: {
      //获取反馈详情
      async getFeedbackById(){
        this.info = await getFeedbackById(this.$route.params.id);
      },
      hide(){
        this.isShow = false;
        this.remark = '';
      },
      //关闭
      close(){
        if (!this.remark) {
          return this.$message.error('请填写关闭原因')
        }
        this.changeStatus(5, true)
      },
      //改变状态
      async changeStatus(toStatus, isSMS = false){
        let option = {
          feedbackId: this.info.id,
          status: toStatus,
          userId: this.$store.state.Login.UserInfo.id,
          smsRequired: isSMS, //是否需要发送短信
          pictrueId: this.imgId,
          remark: this.remark
        }
        let result = await changeStatus(option);
        this.remark='';
        this.isShow=false;
        this.$message.success('提交成功')
        this.getFeedbackById()
      },

      //上传评价图片
      upload(){
        let image = new FormData();
        image.append('uploadFile', this.$refs.upload.files[0]);
        this.http.post('iweb/api/feedBack/uploadEvaluationPicture', image, false).then(res => {
          this.imgId = res.data.id;
          this.$message.success('图片上传成功')
        }).catch(res => {
          this.$message.error('图片上传失败')
        })
      },
    },
  }

</script>
<style lang="scss" scoped="">
  @import "../../common/css/mixins";

  .view {
    width: calc(100vw - 280px);
  }

  .page-title {
    line-height: 40px;
    .el-button {
      vertical-align: top;
      margin-left: 10px;
    }
  }

  .el-card {
    margin-bottom: 10px;
  }

  .info-box {
    padding-left: 0;
    li {
      display: flex;
      flex-direction: row;
      line-height: 36px;
      .content {
        margin-top: 10px;
        min-width: 300px;
        border: 1px solid #ccc;
        padding: 10px;
        line-height: 24px;
      }
      & > div {
        flex: 1;
      }

    }
    b {
      display: inline-block;
      width: 150px;
      text-align: right;
      margin-right: 10px;
    }

  }

  .img-box-list {
    display: flex;
    flex-direction: row;
    .img-item {
      width: 120px;
      height: 120px;
      position: relative;
      border: 1px solid #ccc;
      margin-right: 10px;
      cursor: pointer;
      img {
        max-height: 100%;
        max-width: 100%;
        @include middle;
      }
    }
  }

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

  .history-list {
    li {
      line-height: 30px;
      margin-bottom: 10px;
    }
  }

  .show-img-box {
    @include fullScreen;
    background: rgba(0, 0, 0, 0.6);
    img {
      @include middle;
      max-width: 80%;
      max-height: 90%;
    }
  }

  .close-box {
    @include fullScreen;
    background: rgba(0, 0, 0, 0.6);
    .content {
      width: 460px;
      background: #fff;
      @include middle;
      padding: 30px;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .btn {
      padding-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

  }
</style>
