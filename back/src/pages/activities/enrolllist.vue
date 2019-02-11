<template>
  <section>
    <div v-title>活动报名管理</div>
    <el-card class="option-box">
      <el-button type="primary" @click="onBack()">返回</el-button>
    </el-card>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                size="small"
                :stripe="true" width="100%">
        <el-table-column prop="id" label="" width="100"></el-table-column>
        <el-table-column prop="enrollName" label="姓名" ></el-table-column>
        <el-table-column prop="enrollTel" label="手机号" ></el-table-column>
        <el-table-column prop="enrollEmail" label="邮箱" ></el-table-column>
        <el-table-column prop="company" label="公司" ></el-table-column>
        <el-table-column prop="enrollSex" label="性别" ></el-table-column>
        <el-table-column prop="messageNumber" label="发送信息的数量" ></el-table-column>
        <el-table-column prop="status" label="状态" >
          <template slot-scope="scope">
            {{scope.row.status | enrollStatusToText}}
          </template>
        </el-table-column>
        <el-table-column prop="creationTime" label="创建时间" >
          <template slot-scope="scope">
            {{scope.row.creationTime | timeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button size="mini" @click="changeEnrollStatus(scope.$index,scope.row.id,1)" v-if="scope.row.status == 0">通过</el-button>
            <el-button size="mini" @click="changeEnrollStatus(scope.$index,scope.row.id,0)" type="danger" v-if="scope.row.status == 1">不通过</el-button>
            <el-button size="mini" @click="sendMsg(scope.row.id)">发送消息提醒</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Page"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.length">
        </el-pagination>
      </div>
    </el-card>
  </section>
</template>

<script>
  import {Component, Watch} from 'vue-property-decorator'
  import BaseComponent from '@/BaseComponent';
  import {search} from '@/common/tool';
  import API from '@/store/api';

  @Component(
    {
      props: {
        id: 0
      }
    }
  )
  export default class EnrollList extends BaseComponent {

    loading =  true;
    list =  [];
    date =  [];
    Page =  1;
    PageSize =  10;

    created(){

      this.getList();
    }



    async getList(){
      this.loading = true;
      let res = await API.activities.getEnrollList(this.id);
      this.loading = false;
      this.list = res.data;
    }

    handleSizeChange(val) {
      this.PageSize = val;
    }

    handleCurrentChange(val) {
      this.Page = val;
    }

    gotoAdd(){
      this.$router.push({name: 'activitiesadd', params: {}})
    }

    gotoModify(id){
      this.$router.push({name: 'activitiesmodify', params: {id:id}})
    }

    gotoView(id){
      this.$router.push({name: 'activitiesview', params: {id:id}})
    }

    async changeEnrollStatus(key,id,status){
      //console.log(key);
      this.loading = true;
      let res = await API.activities.changeEnrollStatus({id:id,status:status});
      await this.$message("设置成功");
      this.getList();
    }

    async sendMsg(id){
      let res = await API.activities.sendMessage({id:id});
      await this.$message("发送成功");
      this.getList();
    }

    get showList(){
      return this.list.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize)
    }

    onBack() {
      this.$router.push({name: 'activitieslist', params: {}})
    }
  }
</script>

<style lang="scss" scoped>

</style>
