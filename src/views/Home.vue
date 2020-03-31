<template>
  <div class="home">
    <el-button type="danger"
               plain
               @click="logout">危险按钮</el-button>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    logout () {
      // 清除token
      window.sessionStorage.clear()
      // 跳转到登录页面
      this.$router.push('/login')
    }
  }
}
</script>
