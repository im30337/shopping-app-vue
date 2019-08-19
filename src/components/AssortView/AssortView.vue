<template>
  <div class="assort-view" ref="listSection">
    <div class="side-view">
      <div
        class="item"
        v-for="(item, index) in assortList"
        :key="index"
        @click="onNavClick(index)"
        ref="sideItem"
      >{{item.text}}</div>
    </div>

    <div class="main-view">
      <div class="main-wrapper">
        <div
          class="goods-wrapper"
          v-for="(item, index) in goodsList"
          :key="index"
          @click="test(item)"
        >
          <div class="img">
            <img :src="item.img" alt>
            <!-- 垂直至中參考 -->
            <span></span>
          </div>

          <div class="content">
            <p class="name">{{item.name}}</p>
            <p class="old-price">原價: $ {{item.oldPrice}}</p>
            <p class="price">折扣價: $ {{item.price}}</p>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-to-left">
      <GoodsDetailView v-if="goodsDetailShow"></GoodsDetailView>
    </transition>
  </div>
</template>

<script>
import GoodsDetailView from "../GoodsDetailView/GoodsDetailView";
export default {
  name: "assortView",
  data() {
    return {
      title: "分類",
      navViewShow: true,
      assortList: null,
      activeIndex: 0,
      selectItem: null,
      goodsList: null
    };
  },
  components: { GoodsDetailView },
  computed: {
    goodsDetailShow() {
      return this.$store.state.goodsDetailShow;
    }
  },
  methods: {
    onNavClick: function(index) {
      this.activeIndex = index;
      this.goodsList = this.assortList[index].children;

      this.selectItem.className = "item";
      this.selectItem = this.$refs.sideItem[this.activeIndex];
      this.selectItem.className += " active";
    },
    test(item) {
      //console.log('event',this.getProductTempData(item));
      this.$store.commit("changeGoodsDetailShow");
      this.$store.commit("changeCurrentProduct", this.getProductTempData(item));
    },
    getProductTempData(product) {
      let { id: id, ...rest } = product;
      let productTemp = {
        id: id,
        img: rest.img,
        name: rest.name,
        nowPrice: rest.price,
        oldPrice: rest.oldPrice,
        number: 0
      };
      console.log(productTemp);
      return productTemp;
    }
  },
  created() {
    this.$emit("onTitle", this.title);
    this.$emit("onNavShow", this.navViewShow);

    var that = this;
    this.$ajax
      .get("/mock/json/assort.json")
      .then(function(response) {
        // console.log(response.data)
        that.assortList = response.data;

        that.$nextTick(function() {
          that.goodsList = that.assortList[that.activeIndex].children;
          that.selectItem = that.$refs.sideItem[that.activeIndex];
          that.selectItem.className = "item active";
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  beforeUpdate() {
    this.goodsDetailShow
      ? (this.$refs.listSection.style.position = "unset")
      : (this.$refs.listSection.style.position = "fixed");
  }
};
</script>

<style lang="scss" scoped>
.assort-view {
  background: #f2f2f2;
  padding-top: 2.8125rem;
  padding-bottom: 3.125rem;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.side-view {
  height: 85.375rem;
  background: white;
  width: 5.9375rem;
  /* background: red; */
  float: left;
  padding: 0.9375rem;
  box-sizing: border-box;
}

.item {
  color: black;
  font-size: 0.75rem;
  height: 1.625rem;
  line-height: 1.625rem;
  border-radius: 0.75rem;
  text-align: center;
  margin-bottom: 0.9375rem;
}

.active {
  background: black;
  color: white;
}

.main-view {
  width: 16.25rem;
  height: 100%;
  float: left;
  padding: 0.625rem;
  overflow: auto;
}
.main-wrapper {
  width: 100%;
  padding-bottom: 0.625rem;
}

.goods-wrapper {
  background: white;
  height: 6.25rem;
  margin-bottom: 0.625rem;
  box-sizing: border-box;
  border-radius: 0.3125rem;
}
.img {
  width: 5.625rem;
  float: left;
  height: 100%;
  & > img {
    width: 100%;
    vertical-align: middle;
    display: inline-block;
  }
  & > span {
    vertical-align: middle;
    display: inline-block;
    height: 100%;
    width: 0;
  }
}

.content {
  width: 9.6875rem;
  float: left;
  margin-top: 0.8125rem;
}

.name {
  font-size: 0.75rem;
  line-height: 1.0625rem;
}
.old-price {
  font-size: 0.75rem;
  line-height: 2.0625rem;
  text-decoration: line-through;
  color: #bbbbbb;
}
.price {
  font-size: 0.6875rem;
  color: red;
}
</style>

