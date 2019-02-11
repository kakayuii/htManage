<template>
  <section>
    <div v-title>爱记忆提问管理</div>

    <el-card class="search-box">
      <el-select v-model="type" :clearable="true" placeholder="选择类型" @change="searching">
        <el-option
          v-for="item in typeoptions"
          :key="item.typeId"
          :label="item.typeName"
          :value="item.typeId">
        </el-option>
      </el-select>
      <el-select v-model="replyState" :clearable="true" placeholder="选择回复状态" @change="searching">
        <el-option
          v-for="item in replyStateoptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="search"
                @keyup.native="searching"></el-input>
      <el-button type="primary" @click="searching()">搜索</el-button>
    </el-card>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true" width="100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="toUserName" label="提问者"></el-table-column>
        <el-table-column prop="typeName" label="类型"></el-table-column>
        <el-table-column prop="firstContent" label="提问内容" min-width="200">
          <template slot-scope="scope">
            {{scope.row.firstContent | stringSlice(100)}}
          </template>
        </el-table-column>
        <el-table-column prop="replyStateName" label="回复状态">
          <template slot-scope="scope">
            {{typeName[scope.row.replyState]}}
          </template>
        </el-table-column>
        <el-table-column prop="creationTime" label="新增时间">
          <template slot-scope="scope">
            {{scope.row.creationTime | timeFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最后信息时间">
          <template slot-scope="scope">
            {{scope.row.updateTime | timeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <el-button size="mini" @click="undeleteLoveQuestion(scope.row.id)" v-if="scope.row.deleteFlag==1">移出回收桶
            </el-button>
            <el-button size="mini" @click="gotoFetch(scope.row.id)" v-else>处理</el-button>

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
  import API from '@/store/api';
  export default {
    data(){
      return {
        loading: true,
        deletelist: [],  //删除的数据
        list: [],
        allList: [],
        Page: 1,
        PageSize: 10,
        typeoptions: [{typeName: '全部', typeId: ''}],
        replyStateoptions: [{name: '全部', id: ""}, {id: 1, name: "新提问"},
          {id: 2, name: "交付第三方"},
          {id: 3, name: "已回复"},
          {id: 4, name: "完成"},
          {name: '回收桶', id: '-1'}],
        typeName: {1: "新提问", 2: "交付第三方", 3: "已回复", 4: "完成"},
        type: "",
        replyState: "",
        search: ""

      }
    },

    created(){
      this.getList();
    },
    methods: {
      //获取列表
      async getList(){
        this.loading = true;
        let res = await API.loveQuestion.QuestionList();
        this.list = res;
        this.allList = [...res];
        this.searching()
        this.loading = false;
        let flag = {};

        this.list.forEach(val => {
          let {typeName, typeId, replyState, replyStateName} = val;
          if (!flag[typeName]) {
            flag[typeName] = true;
            this.typeoptions.push({typeName, typeId})
          }
        })
      },

      handleSizeChange(val) {
        this.PageSize = val;
      },

      handleCurrentChange(val) {
        this.Page = val;
      },
      //搜索
      searching(){
        this.Page = 1;
        let filterName = ['toUserName', 'firstContent', 'typeName'];


        this.list = this.allList.filter(val => {
          //搜索
          let arr = [];
          filterName.forEach(v => {
            arr.push(val[v])
          })
          let flag = arr.some(v => {
            v = v + '';  //全部转化为字符串
            return v.includes(this.search)
          })

          //筛选
          let flag2 = true;
          let flag1 = true;
          if (this.type) {
            flag2 = val.typeId == this.type;
          }
          if (this.replyState) {
            if (this.replyState == -1) { //已删除的
              flag1 = val.deleteFlag == 1
            } else {
              flag1 = val.replyState == this.replyState;
            }
          }
          return flag && flag2 && flag1;
        })
        let type = this.replyState == -1 ? 1 : 0;
        this.list = this.list.filter(val => val.deleteFlag == type);

      },

      gotoFetch(id){
        this.$router.push({name: 'lovequestioncommit', params: {id: id}})
      },
      undeleteLoveQuestion(questionId){
        API.loveQuestion.unDeleteLoveQuestion(questionId).then(res => {
          this.replyState = '';
          this.$message.success("移出成功");
          this.getList();
        });
      }
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
