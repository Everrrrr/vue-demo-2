<template>
  <div>
    <hm-header>栏目管理</hm-header>
    <div class="tab-edit">
      <!-- 头部 -->
      <!-- 删除 -->
      <div class="title">点击删除一下频道</div>
      <div class="list">
        <div class="item" v-for="item in activeTabs" :key="item.id">
          <div @click="del(item.id)">{{ item.name }}</div>
        </div>
      </div>
      <!-- 添加 -->
      <div class="title">点击添加一下频道</div>
      <div class="list">
        <div class="item" v-for="item in deactiveTabs" :key="item.id">
          <div @click="add(item.id)">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTabs: [],
      deactiveTabs: [],
    }
  },
  watch: {
    activeTabs(newVal) {
      localStorage.setItem('activeTabs', JSON.stringify(newVal))
      localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
    },
  },
  async created() {
    let activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    let deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
    if (activeTabs && deactiveTabs) {
      this.activeTabs = activeTabs
      this.deactiveTabs = deactiveTabs
      return
    }

    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode == 200) {
      this.activeTabs = data
    }
  },
  methods: {
    del(id) {
      if (this.activeTabs.length <= 3) {
        this.$toast('至少保留3个')
        return
      }
      let tag = this.activeTabs.find(v => v.id == id)
      this.deactiveTabs.push(tag)
      this.activeTabs = this.activeTabs.filter(v => v.id !== id)
    },
    add(id) {
      let tag = this.deactiveTabs.find(v => v.id == id)
      this.activeTabs.push(tag)
      this.deactiveTabs = this.deactiveTabs.filter(v => v.id !== id)
    },
  },
}
</script>

<style scoped lang="less">
.tab-edit {
  padding: 20px;
  .title {
    height: 30px;
    height: 30px;
    color: #000;
    font-weight: 700;
    font-size: 18px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 20%;
      height: 40px;
      display: flex;
      justify-content: start;
      align-items: center;
      div {
        background-color: #cccccc;
        width: 80%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
