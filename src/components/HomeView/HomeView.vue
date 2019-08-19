<template>
  <div class="home-view">
    <van-swipe :autoplay="3000" indicator-color="white" class="banner-view">
      <van-swipe-item v-for="(item,index) in banner" :key="index">
        <!-- <img :src="item.img" alt=""> -->
        <img v-lazy="item.img">
      </van-swipe-item>
    </van-swipe>

    <CategoryView></CategoryView>

    <TitleView name="單品熱賣" icon="star-o"></TitleView>
    <SellingView></SellingView>

    <TitleView name="精選活動" icon="gift-o"></TitleView>
    <WinnowView :bigImg="winnowBig1" :contents="winnowContents1"></WinnowView>
    <WinnowView :bigImg="winnowBig2" :contents="winnowContents2"></WinnowView>

    <TitleView name="為你推薦" icon="label-o"></TitleView>
    <CommendView></CommendView>

    <transition name="slide-to-left">
      <GoodsDetailView v-if="goodsDetailShow"></GoodsDetailView>
    </transition>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import CategoryView from "../CategoryView/CategoryView.vue";
import TitleView from "../TitleView/TitleView.vue";
import SellingView from "../SellingView/SellingView.vue";
import WinnowView from "../WinnowView/WinnowView.vue";
import CommendView from "../CommendView/CommendView.vue";
import GoodsDetailView from "../GoodsDetailView/GoodsDetailView.vue";

export default {
  name: "homeView",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    CategoryView,
    TitleView,
    SellingView,
    WinnowView,
    CommendView,
    GoodsDetailView
  },
  data() {
    return {
      title: "眼鏡商城",
      navViewShow: true,
      banner: [],
      winnowBig1: "",
      winnowContents1: [],
      winnowBig2: "",
      winnowContents2: []
      // goodsDetailShow: false
    };
  },
  computed: {
    goodsDetailShow() {
      return this.$store.state.goodsDetailShow;
    }
  },
  created() {
    this.$emit("onTitle", this.title);
    this.$emit("onNavShow", this.navViewShow);

    var that = this;

    this.$ajax
      .get("/mock/json/banner.json")
      .then(function(response) {
        that.banner = response.data;
        console.log("banner data", that.banner);
      })
      .catch(function(err) {
        console.log(err);
      });

    this.$ajax
      .get("/mock/json/winnow.json")
      .then(function(response) {
        console.log("response", response);
        ({
          bigImg1: that.winnowBig1,
          bigImg2: that.winnowBig2,
          winnowItems1: that.winnowContents1,
          winnowItems2: that.winnowContents2
        } = response.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style <style lang="scss" scoped>
.home-view {
  padding-top: 2.8125rem;
  padding-bottom: 3.125rem;
}
.banner-view {
  height: 9.875rem;
  & img {
    width: 100%;
    height: 100%;
  }
}
</style>
