<template>
  <div class="home">
    <Row class="header" type="flex" align="middle">
      <div class="logo">
        <img src="../assets/img/logo2.png" height="30" alt="">
        <span></span>基于区块链的数字藏品版权保护系统<Tag></Tag>
      </div>
      <!-- <VmMsgPush style="margin-left:20px" :data="msgPushData"></VmMsgPush> -->
      <Dropdown class="login-info" placement="bottom-end">
        <Button type="ghost">
            <img src="../assets/img/photo.jpg" height="30" alt="">JR
            <Icon type="arrow-down-b"></Icon>
        </Button> 
        <Dropdown-menu slot="list">
            <Dropdown-item divided><i class="fa fa-key"></i>退出登录</Dropdown-item>
            <Dropdown-item divided><i class="fa fa-cog"></i>用户信息</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </Row>   
    <div class="sidebar">
      <Menu theme="dark" width="100%" class="menu" :active-name="activeName" :accordion="true">
          <!-- <Menu-item name="Dashboard">
              <router-link to="/">
                <i class="fa fa-dashboard"></i>
                仪表盘  
              </router-link>
          </Menu-item> -->
          <!-- <Menu-item name="Widget">
              <router-link to="/widget">
                <i class="fa fa-cogs"></i>
                我的  
              </router-link>
          </Menu-item> -->
          <!-- <Menu-item name="Login">
              <router-link to="/login">
                <i class="fa fa-laptop"></i>
                登录  
              </router-link>
          </Menu-item> -->
          <Menu-item name="Panels">
              <router-link to="/panels">
                <i class="fa fa-database"></i>
                上传版权信息
              </router-link>
          </Menu-item>
          <!-- <Menu-item name="Editor">
              <router-link to="/editor">
                <i class="fa fa-pencil"></i>
                Editor
              </router-link>
          </Menu-item> -->
          <Menu-item name="ImageList">
              <router-link to="/imagelist">
                <i class="fa fa-shopping-bag"></i>
                数字藏品交易市场  
              </router-link>
          </Menu-item>
          <!-- <Menu-item name="Charts">
              <router-link to="/charts">
                <i class="fa fa-bar-chart"></i>
                Charts  
              </router-link>
          </Menu-item> -->
        <Menu-item name="BasicTable">
              <router-link to="/basic-table">
                <i class="fa fa-id-card"></i>
                我的数字藏品  
              </router-link>
          </Menu-item>

          <Menu-item name="EditableTable">
              <router-link to="/editable-table">
                <i class="fa fa-id-card"></i>
                审核版权信息  
              </router-link>
          </Menu-item>
          <!-- <Submenu name="DataTable">
              <template slot="title">
                  <i class="fa fa-id-card"></i>
                  我的
              </template>
              <Menu-item name="BasicTable">
                <router-link to="/basic-table">
                  我的数字藏品 
                </router-link>
              </Menu-item>
              <Menu-item name="EditableTable">
                <router-link to="/editable-table">
                  数字藏品信息  
                </router-link>
              </Menu-item>
          </Submenu> -->
          
          <!-- <Submenu name="Pages">
              <template slot="title">
                  <i class="fa fa-file"></i>
                  登录
              </template>
              <Menu-item name="Login">
                <router-link to="/login">
                  钱包登录 
                </router-link>
              </Menu-item> -->
              <!-- <Menu-item name="Lockscreen">
                <router-link to="/lockscreen">
                  Lockscreen 
                </router-link>
              </Menu-item>
              <Menu-item name="Loading">
                <router-link to="/loading">
                  Loading
                </router-link>
              </Menu-item> -->
          <!-- </Submenu> -->
      </Menu>
    </div>
    <div class="main-content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <p class="vm-author"><a href="https://github.com/luosijie" target="_blank"></a></p> 
    </div>
  </div>
</template>
<script>
import VmMsgPush from '@/components/vm-msg-push.vue'
export default {
  name: 'home',
  components: {
    VmMsgPush
  },
  mounted: function () {
    this.activeName = this.$route.name
  },
  data () {
    return {
      activeName: 'Dashboard',
      msgPushData: [
        {
          image: require('@/assets/img/photo.jpg'),
          from: 'JesseLuo',
          time: '2017-1-8',
          message: 'I like your website very much!'
        },
        {
          image: require('@/assets/img/photo.jpg'),
          from: 'JesseLuo',
          time: '2017-1-8',
          message: 'I like your website very much!'
        },
        {
          image: require('@/assets/img/photo.jpg'),
          from: 'JesseLuo',
          time: '2017-1-8',
          message: 'I like your website very much!'
        },
        {
          image: require('@/assets/img/photo.jpg'),
          from: 'JesseLuo',
          time: '2017-1-8',
          message: 'I like your website very much!'
        },
        {
          image: require('@/assets/img/photo.jpg'),
          from: 'JesseLuo',
          time: '2017-1-8',
          message: 'I like your website very much!'
        }
      ]
    }
  }
}
</script>
