<template>
  <div class="goods-detail-view" v-if="goodsDetail">
    <van-nav-bar fixed title="商品詳情" left-arrow @click-left="onBack"/>

    <van-swipe :autoplay="3000" class="banner">
      <van-swipe-item v-for="(item, index) in goodsDetail.banners" :key="index">
        <img v-lazy="item.img">
      </van-swipe-item>
    </van-swipe>

    <div class="content-view">
      <div class="price-view">
        <p class="new-price">$ {{currentProduct.nowPrice}}</p>
        <p class="old-price">原價$ {{currentProduct.oldPrice}}</p>
        <span class="sale-item" v-if="goodsDetail.sale">特價</span>
      </div>

      <div class="standard-view">
        <div class="items">
          <div v-for="(item,index) in goodsDetail.standardImages" :key="index">
            <img :src="item.img" :alt="item.color">
          </div>
        </div>

        <div class="side">
          <select name="eyes">
            <option value="左眼">左眼</option>
            <option value="右眼">右眼</option>
          </select>

          <select name="degree">
            <option v-for="(item,index) in goodsDetail.degree" :value="item" :key="index">{{item}}</option>
          </select>
        </div>

        <van-stepper class="reset-van" v-model="number"/>
      </div>

      <div class="desc-view">
        <div class="title">
          <span>自營</span>
          <p>{{currentProduct.name}}</p>
        </div>
        <p class="desc">{{goodsDetail.desc}}</p>
      </div>

      <div class="explain-view">
        <span>說明</span>
        <p>{{goodsDetail.explain}}</p>
        <van-icon name="arrow" class="icon"/>
      </div>
    </div>

    <div class="appraise-view">
      <div class="appraise-title">
        <span class="title">商品評價({{goodsDetail.appraise.num}})</span>
        <span class="rate-score">
          好評{{goodsDetail.appraise.rateScore}}%
          <van-icon class="icon" name="arrow"></van-icon>
        </span>
      </div>

      <div class="appraise-content">
        <div class="box" ref="scollView">
          <UserAppraiseView
            ref="userAppraise"
            v-for="(item, index) in goodsDetail.appraise.list"
            :key="index"
            :appraise="item"
          ></UserAppraiseView>
        </div>
      </div>
    </div>

    <div class="product-view">
      <h3>圖文詳情</h3>
      <h4>產品訊息</h4>
      <table>
        <tr v-for="(item, index) in goodsDetail.productMessage" :key="index">
          <td>{{item.key}}</td>
          <td>{{item.value}}</td>
        </tr>
      </table>
    </div>

    <div class="product-view">
      <h3>產品印花</h3>
      <div class="product-border" v-for="(item, index) in goodsDetail.productStamp" :key="index">
        <h4>{{item.stamp}}</h4>
        <p>{{item.text}}</p>
        <img :src="item.img" alt>
      </div>
    </div>

    <van-goods-action>
      <van-goods-action-mini-btn icon="like-o" text="收藏" @click="onCollect"/>
      <van-goods-action-mini-btn icon="cart" text="購物車" @click="onCart"/>
      <van-goods-action-big-btn text="加入購物車" @click="onAddCart"/>
      <van-goods-action-big-btn primary text="立即購買" @click="onBuy"/>
    </van-goods-action>
  </div>
</template>

<script>
import {
  NavBar,
  Swipe,
  SwipeItem,
  Stepper,
  Icon,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Toast
} from "vant";
import UserAppraiseView from "../UserAppraiseView/UserAppraiseView.vue";
import { constants } from "fs";

export default {
  name: "goodsDetailView",
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon,
    UserAppraiseView,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Toast.name]: Toast
  },
  data() {
    return {
      goodsDetail: null,
      number: 0
    };
  },
  computed: {
    currentProduct() {
      return this.$store.state.currentProduct;
    }
  },
  methods: {
    onBack: function() {
      this.$store.commit("changeGoodsDetailShow");
    },
    onCollect: function() {
      console.log("收藏");
    },
    onCart: function() {
      this.$store.commit("changeGoodsDetailShow");
      this.$store.commit("cartTabberSwitch");
      this.$router.push("/cart");
    },
    onAddCart: function() {
      let {
        id: id,
        name: name,
        img: img,
        nowPrice: price
      } = this.$store.state.currentProduct;
      let cartItem = {
        id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
        name: name,
        img: img,
        price: price,
        num: this.number
      };
      this.$store.commit("addCart", cartItem);
      Toast({
        message: "商品已加入購物車",
        duration: 1500
      });
    },
    onBuy: function() {
      console.log("立即購買");
    }
  },
  beforeUpdate() {
    this.$nextTick(function() {
      var userAppraise = this.$refs.userAppraise[0].$el;
      var width = userAppraise.offsetWidth + 1;
      var computedStyle = getComputedStyle(userAppraise, null);
      var marginR = parseFloat(computedStyle.marginRight);
      console.log(this.$refs, width);

      var temp =
        this.goodsDetail.appraise.list.length * (width + marginR * 2) + "px";
      this.$refs.scollView.style.width = temp;
    });
  },
  created() {
    console.log(this.$store.state.goodsItemId);

    var that = this;
    this.$ajax
      .get("/mock/json/goods-detail.json")
      .then(function(response) {
        that.goodsDetail = response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
.reset-van {
  & .van-stepper__minus,
  & .van-stepper__plus {
    background: white;
    border: 0.0625rem solid #bbbbbb;
    border-radius: 0.3125rem;
  }
  & .van-stepper__input {
    width: 3.75rem;
    border: 0.0625rem solid #bbbbbb;
    background: white;
    box-sizing: border-box;
  }
}
</style>

<style lang="scss" scoped>
.goods-detail-view {
  background: blue;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 99;
  background: #f2f2f2;
  overflow: auto;
  padding-top: 2.8125rem;
  padding-bottom: 3.125rem;
}

.banner img {
  width: 100%;
  & img[lazy="loading"] {
  }
  & img[lazy="loaded"] {
    animation: fade 0.5s;
  }
}
.content-view {
  background: white;
  border: 0.0625rem #bbbbbb solid;
  border-left: 0;
  border-right: 0;
  margin-bottom: 0.625rem;
}
.price-view {
  height: 2.8125rem;
  line-height: 2.8125rem;
}
.new-price {
  float: left;
  font-size: 1.3125rem;
  font-weight: 900;
  margin-right: 1.25rem;
  margin-left: 1.25rem;
  color: red;
}
.old-price {
  font-size: 0.75rem;
  color: #7c7c7c;
  float: left;
  margin-right: 1.25rem;
  text-decoration: line-through;
}
.sale-item {
  display: inline-block;
  font-size: 0.75rem;
  color: white;
  background: red;
  width: 1.875rem;
  height: 1.125rem;
  line-height: 1.125rem;
  text-align: center;
}

.standard-view {
  overflow: hidden;
}
.items {
  margin-left: 0.9375rem;
  float: left;
  overflow: hidden;
  width: 14.0625rem;
  & img {
    width: 3.875rem;
    height: 3.875rem;
    float: left;
    margin-right: 0.625rem;
    border: 0.0625rem solid black;
  }
}
.side {
  overflow: hidden;
  margin-bottom: 1.3125rem;
  & select {
    background: white;
    color: black;
    float: left;
    border-radius: 0.3125rem;
    margin-right: 0.625rem;
  }
}

.desc-view {
  margin-top: 0.9375rem;
  padding: 0 1.25rem;
  & > .title {
    overflow: hidden;
    margin-bottom: 0.9375rem;
    & > span {
      background: white;
      border: 0.0625rem solid red;
      color: red;
      float: left;
      margin-right: 0.8125rem;
      font-size: 0.75rem;
    }
    & > p {
      float: left;
    }
  }
}

.desc {
  font-size: 0.75rem;
  line-height: 1.0625rem;
  color: #7c7c7c;
  border-bottom: 0.0625rem solid #e8e8e8;
  padding-bottom: 0.625rem;
}

.explain-view {
  padding: 0 1.75rem 0 1.4375rem;
  height: 2.5rem;
  line-height: 2.5rem;
  overflow: hidden;
  font-size: 0.75rem;
  & > span {
    color: black;
    font-weight: 800;
    margin-right: 1.4375rem;
    float: left;
  }
  & > p {
    color: #7c7c7c;
    float: left;
  }
  & > .icon {
    float: right;
    color: #7c7c7c;
    height: 2.5rem;
    line-height: 2.5rem;
  }
}

.appraise-view {
  background: white;
  margin-bottom: 0.625rem;
}
.appraise-title {
  padding: 0.8125rem 1.5625rem 0.8125rem 1.25rem;
  & > .title {
    font-size: 0.875rem;
    font-weight: 800;
  }
}

.rate-score {
  color: red;
  font-size: 0.875rem;
  float: right;
  vertical-align: middle;
  & > .icon {
    color: #7c7c7c;
    vertical-align: middle;
  }
}

.appraise-content {
  overflow: auto;
  padding-left: 0.9375rem;
  padding-bottom: 0.625rem;
  margin-bottom: 0.625rem;
}

.box {
  overflow: hidden;
}

.product-view {
  padding: 0.9375rem 0.625rem;
  background: white;
  margin-bottom: 0.625rem;
  & > h3 {
    background: black;
    color: white;
    border-radius: 0.3125rem;
    text-align: center;
    height: 1.875rem;
    line-height: 1.875rem;
    font-size: 0.875rem;
  }
  & h4 {
    line-height: 4.125rem;
    font-size: 1rem;
    font-weight: 900;
  }
  & > table {
    border: 0.0625rem solid #bbbbbb;
    border-collapse: collapse;
    font-size: 0.75rem;
    width: 100%;
    & td {
      border: 0.0625rem solid #bbbbbb;
      height: 2.375rem;
      padding-left: 1.0625rem;
      line-height: 2.375rem;
    }
    & td:nth-of-type(1) {
      width: 5.4375rem;
      color: #707070;
    }
  }
}

.product-border {
  border-bottom: 0.0625rem solid #bbbbbb;
  & > p {
    font-size: 0.8125rem;
    line-height: 1.0625rem;
  }
  & > img {
    width: 100%;
  }
}

.van-button--warning {
  background: black;
  border-color: black;
}
.van-button--danger {
  background: red;
}
</style>