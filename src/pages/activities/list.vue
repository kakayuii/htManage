<template>
  <section>
    <div v-title>活动管理</div>
    <h3>活动管理</h3>
    <el-card class="search-box">
      <el-select v-model="search.status" placeholder="选择状态" @change="getList">
        <el-option
          v-for="item in activitiesState"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="search.keyword"
                @keyup.native="searching"></el-input>
      <el-button type="primary" @click="searching">搜索</el-button>
      <el-button type="danger" icon="el-icon-plus" @click="gotoModify(0)">新增</el-button>
    </el-card>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true" width="100%">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column prop="activitieName" label="标题"></el-table-column>
        <el-table-column prop="applyNumber" label="报名人数"></el-table-column>
        <el-table-column prop="activitiesState" label="状态">
          <template slot-scope="scope">
            {{scope.row.activitiesState | stateToText}}
          </template>
        </el-table-column>
        <el-table-column prop="releaseFlag" label="是否发布">
          <template slot-scope="scope">
            {{scope.row.releaseFlag | releaseFlagToText}}
          </template>
        </el-table-column>
        <el-table-column prop="creationTime" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.creationTime | timeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="gotoModify(scope.row.id)">编辑</el-button>
            <el-button size="mini" icon="el-icon-delete" @click="delDomain(scope.row.id)" type="danger">删除</el-button>
            <el-button size="mini" @click="gotoEnroll(scope.row.id)">查看报名详情</el-button>
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
  import {activitiesState} from './const';
  import API from '@/store/api';

  export default {
    data(){
      return {
        loading: true,
        list: [],
        allList: [],
        Page: 1,
        PageSize: 10,
        search: {
          keyword: "",
          status: 0
        },
        activitiesState: activitiesState,
      }
    },
    created() {
      this.getList();
    },
    methods: {
      //搜索
      searching(){
        this.Page = 1;
        let filterName = ['activitieName']
        this.list = this.allList.filter(val => {
          let arr = [];
          filterName.forEach(v => {
            arr.push(val[v])
          })
          let flag = arr.some(v => {
            v = v + '';  //全部转化为字符串
            return v.includes(this.search.keyword)
          })
          return flag;

        })
      },

      async getList() {
        this.Page = 1;
        this.loading = true;
        let res = await API.activities.ActivitiesList(this.search.status);
        this.list = res;
        this.allList = res;
        this.loading = false;
      },
      handleSizeChange(val) {
        this.PageSize = val;
      },

      handleCurrentChange(val) {
        this.Page = val;
      },

      gotoModify(id) {
        this.$router.push({name: 'activitiesmodify', params: {id: id}})
      },

      gotoEnroll(id) {
        this.$router.push({name: 'activitiesenrolllist', params: {id: id}})
      },

      delDomain(id) {
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await API.activities.delActivities(id);
          await this.$message.success("删除成功");
          this.getList();
        })
      },

    },
    computed: {
      showList() {
        return this.list.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
