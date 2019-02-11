<template>
  <div class="domain-list">
    <h3>内容标签</h3>
    <el-card style="margin-bottom: 10px;">
      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="search" @keyup.native="searching"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searching">搜索</el-button>
      <el-button type="danger" icon="el-icon-plus" @click="isShow=true">新增</el-button>
    </el-card>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true">
        <el-table-column label="序号"
                         type="index"
                         width="80">
        </el-table-column>
        <el-table-column prop="tabName" label="标签名称"></el-table-column>
        <el-table-column prop="deleteFlag" label="是否启用">
          <template slot-scope="scope">
            <i class="el-icon-error" v-if="scope.row.usedFlag" style="color: red;font-size:18px;"></i>
            <i class="el-icon-success" v-else="" style="color: green;font-size:18px;"></i>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
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
    <div class="edit-box" v-if="isShow">
      <el-card class="content">
        <div slot="header" class="clearfix">
          <span>预约详情</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="hide">取消</el-button>
        </div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="标签名称:">
            <el-input v-model="Info.tabName"></el-input>
          </el-form-item>
          <el-form-item label="是否启用:">
            <el-checkbox v-model="Info.usedFlag"></el-checkbox>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="submit" @click="saveRemark">保存</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
  import {getList, deleteById, saveAndUpdate} from '@/store/api/contentLabel'
  export default{
    data(){
      return {
        search: '',
        loading: true,
        allList: [],
        list: [],
        Page: 1,
        PageSize: 10,
        Info: {
          tabName: '',
          usedFlag: true,
        },
        isShow: false
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
        let filterName = ['标签名称']
        this.list = this.allList.filter(val => {
          let arr = [];
          filterName.forEach(v => {
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
        getList().then(res => {
          this.list = res;
          this.allList = res;
          this.loading = false;
        })
      },

      //删除预约
      deleteById(id){
        this.$confirm('确认删除该标签吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById(id).then(res => {
            this.$message.success('删除成功');
            this.getList()
          })
        })
      },

      hide(){
        this.Info = {
          tabName: '',
          usedFlag: false,
        }
        this.isShow = false;
      },
      edit(obj){
        let {usedFlag, tabName, id} = obj;
        this.Info = {
          usedFlag: usedFlag == 0 ? true : false,
          tabName, id
        }
        this.isShow = true;
      },
      //保存 新增
      saveRemark(){
        let {usedFlag, tabName, id} = this.Info;
        let option = {
          tabName,
          usedFlag: usedFlag ? 0 : 1
        }
        if (id) {
          option.id = id;
        }
        saveAndUpdate(option).then(res => {
          this.hide();
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
</style>
