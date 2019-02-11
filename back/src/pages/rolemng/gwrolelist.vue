<template>
  <section>
    <div v-title>菜单角色管理</div>
    <h3>菜单角色管理</h3>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true" width="100%">
        <el-table-column prop="sortId" label="" width="100"></el-table-column>
        <el-table-column prop="category" label="分类" ></el-table-column>
        <el-table-column prop="name" label="名称" ></el-table-column>
        <el-table-column prop="description" label="描述" ></el-table-column>
        <el-table-column prop="creationTime" label="创建时间" >
          <template slot-scope="scope">
            {{scope.row.creationTime | timeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="gotoSetting(scope.row.id)">设置权限</el-button>
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
          :total="totalCount">
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

  @Component
  export default class GWRoleList extends BaseComponent {

    loading =  true;
    list =  [];
    Page =  1;
    PageSize =  10;
    totalCount = 0;

    created(){
      this.getList(this.Page,this.PageSize);
    }

    async getList(Page,PageSize){
      this.loading = true;
      let res = await API.role.UserRoleList({
        page:Page,
        rows:PageSize
      });
      this.loading = false;
      this.list = res.data.list;
      this.totalCount = res.data.totalCount;
    }

    handleSizeChange(val) {
      this.PageSize = val;
      this.getList(this.Page,this.PageSize);
    }

    handleCurrentChange(val) {
      this.Page = val;
      this.getList(this.Page,this.PageSize);
    }

    gotoSetting(id){
      this.$router.push({name: 'gwrolemodify', params: {id:id}})
    }


    get showList(){
      return this.list;
    }
  }
</script>

<style lang="scss" scoped>

</style>
