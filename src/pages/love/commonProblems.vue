<template>
  <div class="commonProblems">
    <h3>常见问题</h3>
    <el-card class="search-box">
      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="search" @keyup.native="searching"></el-input>
      <el-button type="primary" @click="searching">搜索</el-button>
      <el-button type="danger" icon="el-icon-plus" @click="isShow=true">新增</el-button>
    </el-card>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true">
        <el-table-column prop="name" label="标题" width="260"></el-table-column>
        <el-table-column prop="content" label="回答"></el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteById(scope.row.id)">删除</el-button>
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
    <!--编辑框-->
    <div class="edit-box" v-if="isShow">
      <el-card class="content">
        <div slot="header" class="clearfix">
          <span>{{Info.id ? '编辑' : '新增'}}常见问题</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="hide">取消</el-button>
        </div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="标题:">
            <el-input v-model="Info.name"></el-input>
          </el-form-item>
          <el-form-item label="	回答内容:">
            <el-input type="textarea" :autosize="{minRows:4,maxRows:10}" v-model="Info.content"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="submit" @click="saveRemark">保存</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
  import Api from '@/store/api/commonProblems'
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
          name: '',
          content: '',
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
        this.list = this.allList.filter(val => {
          let arr = Object.values(val);
          return arr.some(v => {
            v = v + '';
            return v.includes(this.search)
          })
        })
      },
      async getList(){
        this.loading = true;
        this.list = await Api.getList();
        this.allList = [...this.list]
        this.loading = false;
      },
      hide(){
        this.Info = {
          name: '',
          content: '',
        }
        this.isShow = false;
      },
      edit(obj){
        let {name, content, id} = obj;
        this.Info = {name, content, id}
        this.isShow = true;
      },
      //保存 新增
      saveRemark(){
        let obj = {...this.Info}
        obj.uid=this.$store.state.Login.UserInfo.id;
        Api.saveAndUpdate(obj).then(res => {
          this.hide();
          this.$message.success('保存成功');
          this.getList()
        })
      },
      //删除预约
      deleteById(id){
        this.$confirm('确认删除该问题吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.deleteById(id).then(res => {
            this.$message.success('删除成功');
            this.getList()
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
