<template>
  <div class="goods-item-view" @click="goodsItemClick(goods.id)">
    <img class="img" v-lazy="goods.img">
    <p class="title">{{goods.title}}</p>
    <p class="desc">{{goods.desc}}</p>
    <p class="other">
      <span class="now-price">$ {{goods.nowPrice}}</span>
      <span class="old-price">$ {{goods.oldPrice}}</span>
      <span class="rebate">{{goods.rebate}}折</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "goodsItemView",
  props: ["goods"],
  methods: {
    goodsItemClick: function(goodsId) {
      this.$store.commit("changeGoodsDetailShow");
      console.log("props", this.currentProduct);
      this.$store.commit("changeGoodsItemId", goodsId);
      this.$store.commit("changeCurrentProduct", this.getProductTempData(this.currentProduct));
    },
    getProductTempData(product) {
      let { desc, ...rest } = product;
      let productTemp = {
        id: rest.id,
        img: rest.img,
        name: rest.title,
        nowPrice: rest.nowPrice,
        oldPrice: rest.oldPrice,
        number: 0
      };
      return productTemp;
    }
  },
  computed: {
    currentProduct() {
      console.log("computed", this.goods);
      return this.goods;
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-item-view {
  width: 50%;
  height: 13.875rem;
  border-right: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
  float: left;
  box-sizing: border-box;
  background: white;
  text-align: center;
  & > img {
    width: 9.0625rem;
    height: 7.5rem;
    margin: .625rem;
  }
  & > p {
    text-align: center;
  }
}

.title {
  font-size: .75rem;
  color: black;
  margin-bottom: .625rem;
}

.desc {
  font-size: .75rem;
  color: #b4b4b4;
  margin-bottom: .8125rem;
}

.now-price {
  color: red;
  font-size: .875rem;
  font-weight: 800;
  margin-right: .5rem;
}

.old-price {
  font-size: .75rem;
  color: #b4b4b4;
  margin-right: .5rem;
  text-decoration: line-through;
}

.rebate {
  font-size: .75rem;
  color: white;
  background: red;
  border-radius: .1875rem;
  width: 2.0625rem;
  height: .75rem;
  line-height: .75rem;
  display: inline-block;
}
</style>
