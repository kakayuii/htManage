<template>
  <section class="feedback">
    <div v-title>反馈列表</div>
    <h3>反馈列表</h3>
    <el-card class="search-box">
      <div class="searching">
        <label for="">开始时间
          <el-date-picker v-model="beginTime "
                          size="large"
                          type="date"
                          placeholder="选择开始时间"
                          format="yyyy-MM-dd">
          </el-date-picker>
        </label>
        <label for="">结束时间
          <el-date-picker v-model="endTime " size="large"
                          type="date"
                          placeholder="选择结束时间"
                          format="yyyy-MM-dd">
          </el-date-picker>
        </label>
        <label for="">
          反馈类型
          <el-select v-model="classId" placeholder="选择类型" @change="selectChange">
            <el-option
              v-for="(item,index) in typeName"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </label>
        <label for="">
          门店
          <el-select v-model="domainId" clearable filterable placeholder="请选择门店" @change="selectChange">
            <el-option
              v-for="item in doMainList"
              :key="item.id"
              :label="item.displayName"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <label for="">
          状态
          <el-select v-model="status" placeholder="请选择状态" @change="selectChange">
            <el-option
              v-for="item in statusType"
              :key="item.val"
              :label="item.name"
              :value="item.val">
            </el-option>
          </el-select>
        </label>
        <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="list" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                size="small"
                :stripe="true">
        <el-table-column prop="nickName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="userPhone" label="手机号" width="110">
        </el-table-column>
        <el-table-column prop="occurTime" label="事件发生时间" width="120">
          <template slot-scope="scope">
            {{scope.row.type == 4 ? scope.row.occurTime : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="displayName" label="发生门店名称" min-width="90"></el-table-column>
        <el-table-column prop="feedbackContent" label="事件描述" min-width="150">
          <template slot-scope="scope">
            {{scope.row.feedbackContent | stringSlice(100)}}
          </template>
        </el-table-column>
        <!--<el-table-column prop="OldPrice" label="备注信息" width="100"></el-table-column>-->
        <el-table-column label="反馈状态" width="120">
          <template slot-scope="scope">
            <el-tag :type="tagType[scope.row.status]">{{scope.row.status | feedbackStateToText}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="反馈类型" width="146">
          <template slot-scope="scope">
            <el-tag  :type="tagType[scope.row.type]">
              {{scope.row.type | feedbackTypeToText}}
              <span v-if="scope.row.type==0">{{scope.row.equipType == 0 ? 'i Care' : 'i Bed'}}</span>
            </el-tag>

          </template>
        </el-table-column>
        <el-table-column prop="lastModified" label="创建时间" width="120"></el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-view" type="info" @click="goView(scope.row.id)">查看、处理</el-button>
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
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </section>
</template>

<script>
  import {GetFeedbackList, getDoMainList} from '@/store/api/feedback'
  export default {
    name: "Feedback",
    data() {
      return {
        tagType: {
            0:'danger',
            1:'warning',
            2:'info',
            3:'',
            4:'success'
        },
        status:-1,
        statusType:[
          {name:'全部',val:-1},
          {name:'已投诉待确认',val:0},
          {name:'已确认待处理',val:1},
          {name:'已处理',val:2},
          {name:'待评价',val:3},
          {name:'完成',val:4},
          {name:'已关闭',val:5},
        ],
        doMainList: [],
        loading: true,
        list: [], //存放分页列表所有数据
        beginTime: '',
        endTime: '',
        Page: 1,
        PageSize: 10,
        nameFilter: '',
        classId: 0,
        total: 0,
        domainId: '',
        typeName: ['全部', '智能设备反馈', '新用户心愿', '优化建议', '其他', '服务投诉']
      }
    },
    created(){
      this.getList();
      this.getDoMainList();
    },
    methods: {
      selectChange(){
        this.Page = 1;
        this.getList()
      },
      //格式化时间
      formatDate(date) {
        const y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m;
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        let mm = date.getMinutes();
        h = h < 10 ? ('0' + h) : h;
        mm = mm < 10 ? ('0' + mm) : mm;
        return `${y}-${m}-${d}`;
      },
      handleSizeChange(val) {
        this.PageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.Page = val;
        this.getList();
      },
      //获取所有门店列表
      async getDoMainList(){
        this.doMainList = await getDoMainList();
      },
      //获取列表
      async getList(){
        this.loading = true;
        let {data, count} = await GetFeedbackList(
          {
            beginTime: this.beginTime ? this.formatDate(this.beginTime) : '',
            endTime: this.endTime ? this.formatDate(this.endTime) : '',
            type: this.classId == 0 ? '' : this.classId - 1,
            page: this.Page,
            count: this.PageSize,
            domainId: this.domainId,
            status:this.status
          }
        );
        this.loading = false;
        this.list = data;
        this.total = count;
      },

      //前往详情页
      goView(id){
        this.$router.push({name: 'feedbackView', params: {id: id}})
      }
    },

    beforeRouteEnter(to, from, next){
      //详情也进入时 重新请求数据
      next(vm => {
        if (from.name == "feedbackView") {
          vm.getList()
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .feedback {
    width: calc(100vw - 280px);
  }

  .search-box {
    margin-bottom: 10px;
    .searching{
      display: flex;
      flex-direction: row;
      label{
        flex: 1;
      }
    }
  }

  .block {
    margin-top: 10px;
  }
</style>
