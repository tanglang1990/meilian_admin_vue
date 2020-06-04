<template>
  <a-layout id="main">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="title">
        <img
          src="../assets/heima.png"
          alt=""
        >
        <span v-show="!collapsed">媒恋CMS</span>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['1']"
      >
        <a-sub-menu key="1">
          <span slot="title">
            <a-icon type="user" /><span>用户管理</span></span>
          <a-menu-item key="2">
            <a-icon type="appstore" />
            用户列表
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-button @click="logout()">退出</a-button>
      </a-layout-header>
      <a-layout-content class="content">
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less">
#main {
  height: 100%;
}
#main .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#main .trigger:hover {
  color: #1890ff;
}

#main .title {
  height: 32px;
  color: #fff;
  margin: 16px;
  text-align: center;
  > img {
    height: 32px;
  }
  > span {
    margin-left: 5px;
    height: 32px;
  }
}

.header {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  background: #fff !important ;
  padding: 0px 10px !important;
}

.content {
  margin: 10px;
  padding: 10px;
  background: #fff;
  min-height: 280px !important ;
}
</style>
