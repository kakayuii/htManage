<template>
  <section>
    <div v-title>爱记忆用户管理</div>
    <h3>用户管理</h3>
    <el-card class="search-box">
      <el-tag v-for="(key,item) in TagData"
              :class="{'info':item != search.roleType}"
              :key="'roleTag'+item"
              @click.native="changeLoveRole(item)"
      >{{item |loveRoleFlagToText}}({{TagData[item]}})</el-tag>
      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="search.keyword"
                @keyup.native="searching(true)"></el-input>
      <el-button type="primary" @click="searching(true)">搜索</el-button>
    </el-card>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true" width="100%">
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="loveRole" label="角色名称">
          <template slot-scope="scope">
            {{scope.row.loveRole |loveRoleFlagToText}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="gotoModify(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="delUser(scope.row.id)">删除</el-button>
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
  import {baseSearch} from '@/common/tool';
  import API from '@/store/api';
  import {loveRole, qualification} from './const';

  @Component
  export default class LoveUserList extends BaseComponent {

    loading = true;
    list = [];
    date = [];
    Page = 1;
    PageSize = 10;
    search = {
      keyword: "",
      roleType:4,
      flag:false
    }
    TagData = {4:0};
    Cache = {'search':{},'Page':1};


    created() {
      this.getList();
    }

    async getList() {
      this.loading = true;
      let res = await API.love.UserList({
        page: 1,
        rows: 100000000,
        ...this.search,
      });

      this.date = res.data.list;

      this.TagData = {4:0};
      loveRole.forEach(val => {
        this.TagData[val.id] = 0;
      });
      this.date.forEach(val => {
        if(this.TagData[val.loveRole] == undefined)this.TagData[val.loveRole] = 0;
        this.TagData[val.loveRole]++;
        this.TagData[4]++;
      });

      if (this.getPageCache(this.modPath) != undefined) {
        this.Cache = this.getPageCache(this.modPath);

        this.search.keyword   =  this.Cache.search.keyword;
        this.search.roleType  =  this.Cache.search.roleType;
        this.search.flag       =  this.Cache.search.flag;
        this.Page               =  this.Cache.Page;
      }else{
        this.Cache.search = this.search;
        this.Cache.Page = this.Page;
      }

      this.searching(false);

    }

    handleSizeChange(val) {
      this.PageSize = val;
    }

    handleCurrentChange(val) {
      this.Page = val;
      this.Cache.Page = this.Page;
      this.setPageCache(this.modPath, this.Cache);
    }

    gotoModify(id) {
      this.$router.push({name: 'loveusermodify', params: {id: id}})
    }

    delUser(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await API.love.delUser({userId: id});
        await this.$message.error("删除成功");
        this.getList();
      })
    }
    changeLoveRole(key) {
        this.search.roleType = key;
        this.searching(true);
    }
    searching(flag) {
      if (flag) {
        this.Page = 1;
        this.search.flag = true;
        this.Cache.search = this.search;
        this.setPageCache(this.modPath, this.Cache);
      }

      if(this.search.flag) {
        if(this.search.roleType == 4) {
          this.list = baseSearch(['nickName','mobile','phone'],this.date,this.search.keyword);
        }else{
          this.list = baseSearch(['nickName','mobile','phone'],this.date,this.search.keyword,{'loveRole':this.search.roleType});
        }
      }else{
        this.list = this.date;
      }
      this.loading = false;

    }

    get showList() {
      return this.list.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize)
    }
  }
</script>

<style lang="scss" scoped>
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
</style>
