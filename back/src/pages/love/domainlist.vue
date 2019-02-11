<template>
  <section>
    <div v-title>爱记忆门店管理</div>
    <h3>爱记忆门店管理</h3>
    <el-card class="search-box">
      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="keyword"
                @keyup.native="searching()"></el-input>
      <el-button type="primary" @click="searching()">搜索</el-button>
      <el-button type="danger" icon="el-icon-plus" @click="gotoAdd()">新增</el-button>
    </el-card>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true" width="100%">
        <el-table-column label="序号"
                         type="index"
                         width="80">
        </el-table-column>
        <el-table-column prop="domainName" label="名称" min-width="160"></el-table-column>
        <el-table-column prop="typeName" label="类型"></el-table-column>
        <el-table-column prop="tagName" label="地址"></el-table-column>
        <el-table-column prop="telephone" label="电话"></el-table-column>
        <el-table-column prop="website" label="网站"></el-table-column>
        <el-table-column prop="createTime" label="新增时间"></el-table-column>
        <el-table-column prop="tagName" label="标签"></el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="gotoModify(scope.row.id)">编辑</el-button>
            <el-button size="mini" icon="el-icon-delete" @click="delDomain(scope.row.id)" type="danger">删除</el-button>
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
  import Component from 'vue-class-component';
  import BaseComponent from '@/BaseComponent';
  import {search} from '@/common/tool';
  import API from '@/store/api';

  export default  {
    data(){
      return {
        loading: true,
        allList: [],
        list: [],
        Page: 1,
        PageSize: 10,
        keyword: "",
      }
    },


    created(){
      this.getList();
    },
    methods: {
      async getList(){
        this.loading = true;
        this.list = await API.love.DomainList();
        this.allList = [...this.list]
        this.loading = false;
      },

      handleSizeChange(val) {
        this.PageSize = val;
      },

      handleCurrentChange(val) {
        this.Page = val;
      },

      gotoAdd(){
        this.$router.push({name: 'lovedomainadd', params: {}})
      },
      gotoModify(id){
        this.$router.push({name: 'lovedomainmodify', params: {id: id}})
      },

      delDomain(id){
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await API.love.delDomain({id: id});
          await this.$message("删除成功");
          this.getList();
        })
      },
      //搜索
      searching(){
        this.Page = 1;
        this.list = this.allList.filter(val => {
          let checkArr = ['domainName','tagName'];
          let arr = Object.values(val);
          return arr.some(v => {
            v = v + '';
            return v.includes(this.keyword)
          })
        })
      },
    },
    computed: {
      showList(){  //当前页显示的列表
        return this.list.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize)
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
