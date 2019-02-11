<template>
  <section>
    <div>
      <input v-model="msg">
      <p>prop: {{propMessage}}</p>
      <p>msg: {{msg}}</p>
      <p>helloMsg: {{helloMsg}}</p>
      <p>computed msg: {{computedMsg}}</p>
      <p>computed2 msg: {{computedMsg2}}</p>
      <button @click="greet">Greet</button>
    </div>
  </section>
</template>

<script>

  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    props: {
      propMessage: String
    }
  })
  export default class Demo extends Vue {
    // initial data
    msg = 123

    // use prop values for initial data
    helloMsg = 'Hello, ' + this.propMessage

    // lifecycle hook
    mounted () {
      this.greet()
    }

    //get XX 相当于 在 computed 中写
    get computedMsg () {
      return 'computed ' + this.msg
    }

    get computedMsg2 () {
      return 'computed ' + this.propMessage
    }


    //相当于 在 method 中写
    greet () {
      console.log(this);
    }
  }

</script>

<style lang="scss" scoped>

</style>
