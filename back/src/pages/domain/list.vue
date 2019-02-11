<template>
  <div class="domain-list">
    <h3>门店管理</h3>
    <el-card class="search-box">
      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="search" @keyup.native="searching"></el-input>
      <el-button type="primary" @click="searching">搜索</el-button>
      <el-button type="danger" icon="el-icon-plus" @click="goView(0)">新增门店</el-button>
    </el-card>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true">
        <el-table-column prop="domainCode" label="编号" width="130"></el-table-column>
        <el-table-column prop="proviceName" label="省" width="110">
        </el-table-column>
        <el-table-column prop="city" label="市" width="120"></el-table-column>
        <el-table-column prop="displayName" label="门店名称" min-width="90"></el-table-column>
        <el-table-column prop="typeName" label="门店类型" width="120"></el-table-column>
        <el-table-column prop="isTop" label="是否置顶" width="100"></el-table-column>
        <el-table-column prop="isTop" label="是否启用" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.domainStatus == 0">已启用</el-tag>
            <el-tag type="danger" v-else="">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button size="mini" @click="goView(scope.row.id)" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" :type="scope.row.domainStatus == 0?'danger':'primary'"
                       @click="deleteDoMain(scope.row)">
              {{scope.row.domainStatus == 0 ? '禁用' : '启用'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top: 10px;">
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

  </div>
</template>
<script>
  import Api from '@/store/api'
  export default{
    data(){
      return {
        search: '',
        loading: true,
        allList: [],
        list: [],
        Page: 1,
        PageSize: 10,
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
        this.list = this.allList.filter(val => {
          let arr = Object.values(val);
          return arr.some(v => {
            v = v + '';
            return v.includes(this.search)
          })
        })
      },
      //获取门店列表
      async getList(){
        this.loading = true;
        this.list = await Api.domain.getDomainList();
        this.allList = [...this.list]
        this.loading = false;
      },
      //启用和禁用门店
      deleteDoMain(obj){
        let msg = obj.domainStatus == 0 ? '禁用' : '启用';
        this.$confirm(`确认${msg}该门店吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let option = {
            domainStatus: obj.domainStatus == 0 ? 1 : 0,
            domainId: obj.id
          }
          Api.domain.deleteDomain(option).then(res => {
            this.$message.success(`${msg}成功!`);
            this.getList()
          })
        })
      },

      goView(id){
        this.$router.push({path: '/domain/addDomain', query: {type: id ? 'edit' : 'add', id}})
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

</style>
