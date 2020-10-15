<template>
  <div class="mystar">
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  async created() {
    let res = await this.$axios.get('/user_star')
    this.list = res.data.data
  },
}
</script>

<style>
</style>