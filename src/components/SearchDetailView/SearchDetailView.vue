<template>
  <div class="search-detail-view">
    <van-nav-bar fixed title="搜尋詳情" left-arrow @click-left="onBack"/>
    <SearchItemView v-for="(goods, index) in searchDataList" :key="index" :goods="goods"></SearchItemView>
    <ul class="search-false" v-show="!searchDataList.length">
      <li>沒有找到相符的資料</li>
    </ul>
  </div>
</template>

<script>
import { NavBar } from "vant";
import SearchItemView from "../SearchItemView/SearchItemView.vue";

export default {
  name: "searchDetailView",
  props: ["searchDataList"],
  components: {
    [NavBar.name]: NavBar,
    SearchItemView
  },
  methods: {
    onBack: function() {
      this.$emit("onBack");
    }
  }
};
</script>

<style lang="scss" scoped>
.search-detail-view {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background: #f2f2f2;
  z-index: 999;
  padding-top: 2.8125rem;
  overflow: auto;
}
.search-false {
  line-height: 1.9375rem;
  padding-left: .625rem;
  background: #fff;
  color: #666;
  font-size: 1rem;
  text-align: center;
}
</style>

