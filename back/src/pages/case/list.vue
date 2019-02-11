<template>
  <section>
    <div v-title>案例管理</div>
    <h3>案例管理</h3>
    <el-card class="search-box">
      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="search.keyword"
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
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column prop="caseTitle" label="标题"></el-table-column>
        <el-table-column prop="gwTab.tabName" label="标签名称" width="120"></el-table-column>
        <el-table-column prop="releaseFlag" label="是否发布" width="120">
          <template slot-scope="scope">
            {{scope.row.releaseFlag | releaseFlagToText}}
          </template>
        </el-table-column>
        <el-table-column prop="creationTime" label="创建时间" width="150">
          <template slot-scope="scope">
            {{scope.row.creationTime | timeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="gotoModify(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="delDomain(scope.row.id)">删除</el-button>
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

  @Component
  export default class CaseList extends BaseComponent {

    loading = true;
    list = [];
    date = [];
    Page = 1;
    PageSize = 10;
    search = {
      keyword: ""
    }

    created() {
      if (this.getPageCache(this.modPath) != undefined) this.search.keyword = this.getPageCache(this.modPath).keyword;
      this.getList();
    }

    @Watch('search.keyword')
    watchCount(newVal, oldVal) {
      this.search.keyword = newVal;
      this.setPageCache(this.modPath, this.search);
    }

    async getList() {
      this.loading = true;
      let res = await API.case.CaseList();
      this.loading = false;
      this.date = res;
    }

    handleSizeChange(val) {
      this.PageSize = val;
    }

    handleCurrentChange(val) {
      this.Page = val;
    }

    gotoAdd() {
      this.$router.push({name: 'caseadd', params: {}})
    }

    gotoModify(id) {
      this.$router.push({name: 'casemodify', params: {id: id}})
    }

    delDomain(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await API.case.delCase({id: id});
        await this.$message("删除成功");
        this.getList();
      })
    }

    searching() {
      this.Page = 1;
      if (this.date.length > 0 && this.search.keyword != '') {
        this.list = []
        for (let t = 0; t < this.date.length; t++) {
          let item = this.date[t];
          if (search(item.caseTitle, this.search.keyword)) this.list.push(item);
        }
      } else {
        this.list = this.date;
      }
    }

    get showList() {
      this.searching();
      return this.list.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize)
    }
  }
</script>

<style lang="scss" scoped>

</style>
