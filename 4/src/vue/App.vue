<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>