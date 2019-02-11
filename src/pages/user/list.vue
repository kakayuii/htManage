<template>
  <section>
    <div v-title>用户管理</div>
    <el-card class="search-box">
      <el-input v-model.trim="search.keywords" placeholder="搜索内容" style="width:280px;display: inline-block;"
                @keyup.enter.native="searching" @keyup.native="keyupInput"></el-input>
      <el-input v-model.trim="search.keywords2" placeholder="角色搜索" style="width:200px;display: inline-block;"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searching">搜索</el-button>
    </el-card>
    <el-card>
      <el-table :data="list" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                size="small"
                :stripe="true" width="100%">
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="rolename" label="角色名称"></el-table-column>
        <el-table-column prop="creationTime" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.creationTime | timeFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="lastLogin" label="最后活跃时间">
          <template slot-scope="scope">
            {{scope.row.lastLogin | timeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button size="mini" @click="gotoModify(scope.row.id)">修改</el-button>
            <el-button size="mini" @click="gotoChgPassword(scope.row.id)">修改密码</el-button>
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

  import API from '@/store/api';

  export default  {
    data(){
      return {
        loading: true,
        list: [],
        allList: [],
        Page: 1,
        PageSize: 10,
        totalCount: 0,
        search: {
          keywords: "",
          keywords2: ""
        }
      }
    },

    created(){
      this.getList()
    },
    methods: {
      keyupInput(){
        if(!this.search.keywords){
            this.Page=1;
            this.getList();
        }
      },
      //获取列表
      async getList(){
        this.loading = true;
        let res = await API.user.UserList({
          page: this.Page,
          rows: this.PageSize,
          ...this.search,
        });
        let {list,totalCount}=res.data;
        this.loading = false;
        this.list = list;
        this.allList =list;

        this.totalCount = totalCount;
      },

      handleSizeChange(val) {
        this.PageSize = val;
        this.getList()

      },

      handleCurrentChange(val) {
        this.Page = val;
        this.getList()
      },

      gotoModify(id){
        this.$router.push({name: 'usersysmodify', params: {id: id}})
      },
      gotoChgPassword(id){
        this.$router.push({name: 'usersyschgpwd', params: {id: id}})
      },
      //搜索
      searching(){
        this.Page = 1;
        this.getList();
//        let filterName = ['mobile', 'nickName', 'rolename']
//        this.list = this.allList.filter(val => {
//          let arr = [];
//          filterName.forEach(v => {
//            arr.push(val[v])
//          })
//          let flag = arr.some(v => {
//            v = v + '';  //全部转化为字符串
//            return v.includes(this.search.keywords)
//          })
//          return flag;
//
//        })
      },
    },
    computed: {
//      showList(){  //当前页显示的列表
//        return this.list.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize)
//      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
