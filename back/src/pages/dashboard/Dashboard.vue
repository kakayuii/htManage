<template>
    <section>
      <Demo :propMessage="menu">加上“：”表示取变量</Demo>
      <Demo propMessage="felix">否则是固定字符串</Demo>
     <div class="sanjiao"></div>
      <p class="theme">变量颜色{{menu}}</p>
    </section>
</template>

<script>
  import Component from 'vue-class-component';
  import Demo from '@/pages/dashboard/Demo'
  import BaseComponent from '@/BaseComponent'

  @Component({
    components: {
    'Demo': Demo
    }
  })
  export default class Dashboard extends BaseComponent {

    Log(str) {
      console.log("FF");
    }
    //钩子
    mounted() {
      console.log("felix mounted");
      this.Log("VSI");

    }
    get menu () {
      return this.$store.state.Demo.menu
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/css/mixins";
  .sanjiao{
    @include triangle(20px,15px);
    border-bottom-color: #000;
    @include textOver(10);
  }
  .theme{
    color:$textColor;
  }
</style>
