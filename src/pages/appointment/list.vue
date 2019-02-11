<template>
  <div class="domain-list">
    <div class="top">
      <b>预约管理</b>
    </div>
    <el-card style="margin-bottom: 10px;">
      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="search" @keyup.native="searching"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searching">搜索</el-button>
      <el-button type="danger">导出excel</el-button>
    </el-card>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true">
        <el-table-column prop="appointmentName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="appointmentTel" label="手机号" width="110"></el-table-column>
        <el-table-column prop="appointmentEmail" label="邮箱" width="170"></el-table-column>
        <el-table-column prop="appointmentIdentity" label="身份"></el-table-column>
        <el-table-column prop="appointmentSource" label="预约来源" width="120"></el-table-column>
        <el-table-column prop="remark" label="随笔记录" min-width="100"></el-table-column>
        <el-table-column prop="creationTime" label="创建时间" width="100">
          <template slot-scope="scope">
            {{scope.row.creationTime | timeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button size="mini" type="info" icon="el-icon-view" @click="activeInfo=scope.row">查看</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteById(scope.row.id)">删除</el-button>
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
    <!--编辑框-->
    <transition name="fade">
      <div class="edit-box" v-if="activeInfo">
        <el-card class="content">
          <div slot="header" class="clearfix">
            <span>预约详情</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="activeInfo=null">取消</el-button>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="activeInfo.appointmentName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="activeInfo.appointmentTel" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="activeInfo.appointmentEmail" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="身份">
              <el-input v-model="activeInfo.appointmentIdentity" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input :value="activeInfo.creationTime | timeFilter" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="留言内容">
              <el-input :value="activeInfo.appointmentName " :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="随笔记录">
              <el-input type="textarea" placeholder="请填写随笔记录" v-model="activeInfo.remark"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="submit" @click="saveRemark">保存</el-button>
        </el-card>
      </div>
    </transition>

  </div>
</template>
<script>
  import Api from '@/store/api/appointment'
  export default{
    data(){
      return {
        search: '',
        loading: true,
        allList: [],
        list: [],
        Page: 1,
        PageSize: 10,
        activeInfo: null,
      }
    },
    created(){
      this.getList()
    },
    methods: {
      handleSizeChange(val) {
        this.PageSize = val;
      },
      handleCurrentChange(val) {
        this.Page = val;
      },
      //搜索
      searching(){
        this.Page = 1;
        let filterName=['appointmentName','appointmentTel','appointmentEmail','remark']
        this.list = this.allList.filter(val => {
          let arr = [];
          filterName.forEach(v=>{
            arr.push(val[v])
          })
          let flag = arr.some(v => {
            v = v + '';  //全部转化为字符串
            return v.includes(this.search)
          })
          return flag;
        })
      },

      //获取预约列表
      getList(){
        this.loading = true;
        Api.getList().then(res => {
          this.list = res;
          this.allList = res;
          this.loading = false;
        })
      },

      //删除预约
      deleteById(id){
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.DeleteById(id).then(res => {
            this.$message.success('删除成功');
            this.getList()
          })
        })
      },

      //保存随笔记录
      saveRemark(){
        let {id, remark} = this.activeInfo;
        Api.saveRemark({id, remark}).then(res => {
          this.activeInfo = null;
          this.$message.success('保存成功');
          this.getList()
        })
      }
    },
    computed: {
      showList(){  //当前页显示的列表
        return this.list.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize)
      },
    }
  }
</script>
<style lang="scss" scoped="">
  @import "../../common/css/mixins";

  .top {
    display: flex;
    line-height: 40px;
    margin-bottom: 10px;
    button {
      margin-left: 50px;
    }
  }

  .block {
    margin-top: 10px;
  }

  .edit-box {
    @include fullScreen;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    .content {
      @include middle;
      width: 60%;
      max-width: 600px;
      .submit {
        display: block;
        margin: 20px auto 0;
        width: 200px;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
