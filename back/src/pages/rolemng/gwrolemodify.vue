<template>
  <section>
    <div v-title>菜单角色管理</div>
    <el-card>
      <h3>权限选择</h3>
      <el-form ref="form" :model="form" label-width="120px">
        <template v-for="(item,index) in MenuList" :keys="index">
          <h4>{{item.name}}</h4>
          <el-form-item :label="childrenitem.name" v-for="(childrenitem , childrenindex) in item.child"
                        :key="childrenindex">
            <div>
              <el-checkbox-group v-model="Menus">
                <el-checkbox v-for="(menu,i) in childrenitem.child" :label="menu.menuId" :key="i" border>{{menu.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">修改</el-button>
          <el-button @click="onBack()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>


<script>
  import Component from 'vue-class-component';
  import BaseComponent from '@/BaseComponent';
  import API from '@/store/api'

  @Component({
    props: {
      id: 0
    }
  })
  export default class GWRoleModify extends BaseComponent {
    /*
     * 表单信息初始化
     * */
    form = {
      roleId: 0,
      menuids: [],
    }
    Menus = [];
    MenuList = {};


    async onSubmit(formName) {
      //this.form.menuids = this.Menus.join(',');
      //this.form.menuids = JSON.stringify(this.Menus);
      this.form.menuids = this.Menus;
      let res = await API.role.saveMenu(this.form);
      this.$message.success("新增成功");
      this.$router.push({name: 'gwrolelist', params: {}})
    }

    onBack() {
      this.$router.push({name: 'gwrolelist', params: {}})
    }

    created() {
      this.getDate(this.id);
    }


//    buildTree(list){
//      let temp = {};
//      let tree = {};
//
//      for(let i in list){
//        temp[list[i].menuId] = list[i];
//        if(list[i].menuNameId==1)this.Menus.push(list[i].menuId);
//      }
//      for(let i in temp){
//        if(temp[i].parentId) {
//          if(!temp[temp[i].parentId].children) {
//            temp[temp[i].parentId].children = new Object();
//          }
//          temp[temp[i].parentId].children[temp[i].menuId] = temp[i];
//        } else {
//          tree[temp[i].menuId] =  temp[i];
//        }
//      }
//      return tree;
//    }

    buildTree(list) {
      let frist = list.filter(val => val.parentId == 0);
      frist.forEach(val => {
        val.child = list.filter(v => val.menuId == v.parentId);
        val.child.forEach(vv => {
          vv.child = list.filter(v => vv.menuId == v.parentId);
          //找出选中的菜单
          vv.child.forEach(v => {
            if (v.menuNameId == 1) {
              this.Menus.push(v.menuId)
            }
          })
        })
      })
      return frist;
    }


    async getDate(id) {
      let res = await API.role.getMenuByRole(id);
      this.MenuList = this.buildTree(res);
      this.form.roleId = id;
    }

  }
</script>

<style lang="scss" scoped>

</style>
