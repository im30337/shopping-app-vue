<template>
  <div class="search-item-view">
    <div class="img">
      <img :src="goods.img" alt>
      <span></span>
    </div>

    <div class="content">
      <p class="name">{{goods.name}}</p>
      <p class="keywords">{{goods.keywords}}</p>
      <p class="price">
        <span>$ {{goods.price}}</span>
        <span>單價$ {{goods.unitPrice}}</span>
      </p>
      <p class="other">
        <span class="sale" v-if="goods.sale">特價</span>
        <span class="appraise">{{goods.appraiseNum}}條評價</span>
        <span class="rate">{{goods.rateScore}}%</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchItemView",
  props: ["goods"]
};
</script>

<style lang="scss" scoped>
.search-item-view {
  width: 22.1875rem;
  height: 8rem;
  margin: 0.625rem;
  background: white;
  box-shadow: 0 0 0.25rem 0 gray;
  border-radius: 0.3125rem;
}

.img {
  /* 105 */
  width: 6.5625rem;
  float: left;
  height: 100%;
  text-align: center;
  & > img {
    width: 5rem;
    vertical-align: middle;
  }
  & > span {
    width: 0;
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
}

.content {
  width: 15.625rem;
  float: left;
  height: 100%;
  padding-top: 0.8125rem;
  padding-right: 1.0625rem;
  box-sizing: border-box;
}
.name {
  font-size: 0.8125rem;
  line-height: 1.0625rem;
  font-weight: 600;
}
.keywords {
  font-size: 0.8125rem;
  line-height: 1.4375rem;
  color: #ababab;
}
.price {
  line-height: 1.875rem;
  & > span:nth-of-type(1) {
    color: red;
    font-size: 0.8125rem;
    margin-right: 1.3125rem;
  }
  & > span:nth-of-type(2) {
    font-size: 0.6875rem;
    color: #ababab;
  }
}

.other {
  line-height: 1.0625rem;
}
.sale {
  width: 1.875rem;
  height: 1.0625rem;
  font-size: 0.6875rem;
  color: white;
  background: red;
  border-radius: 0.3125rem;
  text-align: center;
  display: inline-block;
  margin-right: 0.6875rem;
}
.appraise {
  margin-right: 0.6875rem;
}
.appraise,
.rate {
  color: #ababab;
  font-size: 0.6875rem;
}
</style>
