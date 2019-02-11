<template>
  <div class="tag-list">
    <el-card>
      <h3>{{title}}</h3>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true">
        <el-table-column prop="id" label="序号">
        </el-table-column>
        <el-table-column prop="tagName" label="标签名称"></el-table-column>
        <el-table-column prop="useFrequency" label="使用次数"></el-table-column>
        <el-table-column prop="creationUser" label="创建者">
          <template slot-scope="scope">
            {{user[scope.row.creationUser]}}
          </template>
        </el-table-column>
        <el-table-column prop="creationTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteLoveTag(scope.row.id,1)">删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="可选择" width="100">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isSee" :checked="scope.row.isSee"
                         @change="handleCheckedTagsChange(scope.row.id)"></el-checkbox>
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
  </div>
</template>
<script>
  import {listLoveTag, unSeeLoveTag, deleteLoveTag} from '@/store/api/loveQuestion'
  export default{
    props: {
      title: {
        type: String,
        default: "医疗相关"
      },
      type: {
        type: Number,
        default: 1
      }
    },
    data(){
      return {
        loading: true,
        list: [],
        Page: 1,
        PageSize: 10,
        user:['用户','管理员','运营','医生/专业机构']
      }
    },
    created(){
      this.getList();
    },
    methods: {
      handleSizeChange(val) {
        this.PageSize = val;
      },
      handleCurrentChange(val) {
        this.Page = val;
      },

      //获取预约列表
      async getList(){
        this.loading = true;
        this.list = await listLoveTag(this.type)
        this.loading = false;

      },

//      删除标签
      deleteLoveTag(id, type){
        this.$confirm('确认删除该标签吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteLoveTag(id).then(res => {
            this.$message.success('删除成功');
            this.getList(type)
          })
        })
      },


      //复选框勾选  取消勾选
      handleCheckedTagsChange(id){
        let flag = this.list.filter(val => val.id == id)[0].isSee;
        unSeeLoveTag([id], Number(flag)).then(res => {
          this.$message.success('操作成功');
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

</style>
