<template>
  <div id="app">

    <van-nav-bar :title="title" fixed v-show="navViewShow"/>


    <router-view @onTitle="getTitle" @onNavShow="getShow"></router-view>


    <van-tabbar v-model="active" active-color="red" @change="onClickTabbarItem">
      <van-tabbar-item icon="home-o" to="/home">首頁</van-tabbar-item>
      <van-tabbar-item icon="filter-o" to="/assort">分類</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜尋</van-tabbar-item>
      <van-tabbar-item
        icon="cart-o"
        to="/cart"
        :info="cartItemNumber"
        ref="cartTabber"
      >購物車</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem } from "vant";

export default {
  name: "app",
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      title: "",
      navViewShow: true,
      active: 0,
      isUpdated: false
    };
  },
  computed: {
    cartItemNumber() {
      return this.$store.state.cart.length;
    },
    cartTabberNotify() {
      console.log("changeInApp");
      return this.$store.state.cartTabberNotify
    }
  },
  methods: {
    getTitle: function(title) {
      this.title = title;
    },
    getShow: function(temp) {
      this.navViewShow = temp;
    },
    onClickTabbarItem: function() {
      
      window.localStorage.setItem("itemIndex", this.active);
    }
  },
  created() {

    var itemIndex = parseInt(window.localStorage.getItem("itemIndex"));
    if (!isNaN(itemIndex)) {

      this.active = itemIndex;
      var toPath = this.$router.options.routes[itemIndex + 1].path;
      this.$router.push({ path: toPath });
    }
  },
  beforeUpdate() {
    if(this.cartTabberNotify) {
      this.$refs.cartTabber.$el.click();
      this.$store.commit('cartTabberSwitch');
    }
  }
};
</script>

<style lang="scss">
body {
  background: #f2f2f2;
}

#app {
  background: #f2f2f2;
}

.van-nav-bar {
  height: 2.8125rem;
  background: red;
  font-size: 1rem;
  font-weight: 700;
  line-height: 2.8125rem;
  text-align: center;
}
.van-nav-bar__title {
  color: white;
}

.van-nav-bar .van-icon {
  color: white;
  font-size: 1rem;
}

/* transition name='xxxx' 
	* xxx-enter (進入)過度開始狀態
	* xxx-enter-to (進入過渡結束的狀態
	* xxx-enter-active (進入)過渡時間、延遲、曲線
	* xxx-leave (離開)過度開始狀態
	* xxx-leave-to (離開過渡結束的狀態
	* xxx-leave-active (離開)過渡時間、延遲、曲線
	*/
.slide-to-left-enter-active,
.slide-to-left-leave-active {
  transition: all 1s;
}

.slide-to-left-enter,
.slide-to-left-leave-to {
  transform: translateX(100%);
}

.slide-to-top-enter-active,
.slide-to-top-leave-active {
  transition: all 2s;
}

.slide-to-top-enter,
.slide-to-top-leave-to {
  transform: translateY(100%);
}
</style>
