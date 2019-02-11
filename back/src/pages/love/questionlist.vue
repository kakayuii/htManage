<template>
  <section>
    <div v-title>爱记忆提问管理</div>

    <el-card class="search-box">
      <el-select v-model="type" :clearable="true" placeholder="选择类型" @change="changeSelect">
        <el-option
          v-for="item in typeoptions"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-select v-model="replyState"  :clearable="true"  placeholder="选择回复状态" @change="changeSelect">
        <el-option
          v-for="item in replyStateoptions"
          :key="item.id"
          :label="item.name"
          :value="item.name">
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
        <el-table-column prop="replyStateName" label="回复状态"></el-table-column>
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
            <el-button size="mini" @click="gotoFetch(scope.row.id)">处理</el-button>
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
        list: [],
        allList: [],
        Page: 1,
        PageSize: 10,
        typeoptions: {},
        replyStateoptions: {},
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
        this.list = await API.loveQuestion.QuestionList();
        this.allList = [...this.list];
        this.loading = false;
        for (let t = 0; t < this.list.length; t++) {
          let item = this.list[t];
          this.typeoptions[item.typeId] = {name: item.typeName, id: item.typeId};
          this.replyStateoptions[item.replyState] = {name: item.replyStateName, id: item.replyState};
        }
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
        let filterName = ['toUserName', 'firstContent', 'typeName']
        this.list = this.allList.filter(val => {
          let arr = [];
          filterName.forEach(v => {
            arr.push(val[v])
          })
          let flag = arr.some(v => {
            v = v + '';  //全部转化为字符串
            return v.includes(this.search)
          })
          return flag;
        })
      },
      //筛选框change事件
      changeSelect(){
        this.Page = 1;
        this.list = this.allList.filter(val => {
          let flag = true;
          let flag1 = true;
          if(this.type){
            flag = val.typeName == this.type;
          }
          if(this.replyState){
            flag1 = val.replyStateName == this.replyState;
          }
          return flag&&flag1;
        })
      },
      gotoFetch(id){
        this.$router.push({name: 'lovequestioncommit', params: {id: id}})
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
