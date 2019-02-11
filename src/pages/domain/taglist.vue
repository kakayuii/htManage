<template>
  <section>
    <div v-title>门店标签管理</div>
      <h3>门店标签管理</h3>
    <el-card class="search-box">
      <el-input placeholder="请输入搜索内容" style="width:360px;" v-model.trim="search" @keyup.native="searching"></el-input>
      <el-button type="primary" @click="searching">搜索</el-button>
      <el-button type="danger" @click="isAdd=true;" icon="el-icon-plus">新增</el-button>
    </el-card>
    <el-card>
      <el-table :data="showList" border
                v-loading="loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :stripe="true" width="100%">
        <el-table-column label="序号"
                         type="index"
                         width="50">
        </el-table-column>
        <el-table-column prop="tagName" label="名称"></el-table-column>
        <el-table-column prop="id" label="标签id"></el-table-column>
        <el-table-column prop="firstId" label="一级标签"></el-table-column>
        <el-table-column prop="secondId" label="二级标签"></el-table-column>
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

    <transition name="fade">
      <div class="add-box" v-if="isAdd">
        <el-card class="content">
          <div slot="header" class="clearfix">
            <span>新增标签</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="isAdd=false">取消</el-button>
          </div>

          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="上级标签" prop="firstId"
                          :rules="[{ required: true, message: '请选择上级标签', trigger: 'change' }]">
              <el-select v-model="form.firstId" placeholder="请选择" style="width:100%;">

                <el-option
                  v-for="item in getFirstId"
                  :key="item.secondId"
                  :label="item.tagName"
                  :value="item.secondId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签名称" prop="tagName"
                          :rules="[{ required: true, message: '请输入活动名称', trigger: 'blur' }]">
              <el-input v-model="form.tagName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

  </section>
</template>

<script>
  import Component from 'vue-class-component';
  import BaseComponent from '@/BaseComponent';
  import {search} from '@/common/tool';
  import API from '@/store/api';
  export default{
    data(){
      return {
        search: '',
        loading: true,
        allList: [],
        list: [],
        Page: 1,
        PageSize: 10,
        form: {
          tagName: '',
          firstId: ''
        },
        isAdd: false,
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

      //搜索
      searching(){
        this.Page = 1;
        let filterName = ['tagName']
        this.list = this.allList.filter(val => {
          let arr = [];
          filterName.forEach(v => {
            arr.push(val[v])
          })
          return arr.some(v => {
            v = v + '';
            return v.includes(this.search)
          })
        })
      },

      //获取标签列表
      async getList() {
        this.loading = true;
        this.list = await API.domain.TagList();
        this.loading = false;
        this.allList = [...this.list];
      },
      //创建标签
      onSubmit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            let res = await API.domain.postTag(this.form);
            this.$message.success("新增成功");
            this.isAdd = false;
            this.getList();
          }
        });

      }
    },
    computed: {
      showList(){  //当前页显示的列表
        return this.list.slice((this.Page - 1) * this.PageSize, this.Page * this.PageSize)
      },
      getFirstId(){
          return this.list.filter(v=>v.firstId==0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/css/mixins";

  .add-box {
    @include fullScreen;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
    .content {
      @include middle;
      width: 60%;
      max-width: 500px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
