<template>
  <div class="mine-view">
    <div class="user-view">
      <div class="content-wrapper">
        <div class="user-msg">
          <img src="mock/img/atom.png" alt>
          <p>王大明</p>
        </div>

        <van-row>
          <van-col span="6">
            <dl>
              <dt>3</dt>
              <dd>收藏</dd>
            </dl>
          </van-col>
          <van-col span="6">
            <dl>
              <dt>2</dt>
              <dd>訂閱</dd>
            </dl>
          </van-col>
          <van-col span="6">
            <dl>
              <dt>22</dt>
              <dd>紀錄</dd>
            </dl>
          </van-col>
          <van-col span="6">
            <dl style="border: 0;">
              <dt>33</dt>
              <dd>心得</dd>
            </dl>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="item-wrapper">
      <div class="title-wrapper">
        <h4>我的訂單</h4>
        <a href="#" @click="onOrderView(0)">
          查看全部
          <van-icon name="arrow"/>
        </a>
      </div>

      <van-row>
        <van-col span="6">
          <MineItemView @onOrderItemClick="onOrderView" type="1" icon="shop" name="待付款"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView @onOrderItemClick="onOrderView" type="2" icon="shop-collect" name="待發貨"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView @onOrderItemClick="onOrderView" type="3" icon="underway" name="待收貨"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView @onOrderItemClick="onOrderView" type="4" icon="alipay" name="還款退貨"></MineItemView>
        </van-col>
      </van-row>
    </div>

    <div class="item-wrapper">
      <div class="title-wrapper">
        <h4>我的服務</h4>
        <a href="#">
          查看全部
          <van-icon name="arrow"/>
        </a>
      </div>

      <van-row style="border-bottom: 0.0625rem solid #dedede;">
        <van-col span="6">
          <MineItemView icon="youzan-shield" name="邀請好友" other="現賺30元"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="bell" name="簽到送禮包" other="10金幣"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="printer" name="優惠券" other="3張"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="audio" name="限時購"></MineItemView>
        </van-col>
      </van-row>

      <van-row style="border-bottom: 0.0625rem solid #dedede;">
        <van-col span="6">
          <MineItemView icon="comment" name="我的收藏" other="10個"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="gift" name="收貨地址" other="2個"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="question" name="客戶中心"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="todo-list" name="充值中心"></MineItemView>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="6">
          <MineItemView icon="manager" name="我的回答"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="label" name="領券中心"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="service" name="驗光單" other="3張"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="chat" name="試用中心" other="1元試用"></MineItemView>
        </van-col>
      </van-row>
    </div>

    <div class="logout">
      <a href="#">退出</a>
    </div>

    <transition name="slide-to-left">
      <OrderView v-if="orderViewShow" @onBack="onOrderViewHide" :orderType="orderType"></OrderView>
    </transition>
  </div>
</template>

<script>
import { Row, Col, Icon } from "vant";
import MineItemView from "../MineItemView/MineItemView.vue";
import OrderView from "../OrderView/OrderView.vue";

export default {
  name: "mineView",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    MineItemView,
    [Icon.name]: Icon,
    OrderView
  },
  data() {
    return {
      title: "我的",
      navViewShow: false,
      orderViewShow: false,
      orderType: -1
    };
  },
  created() {
    this.$emit("onTitle", this.title);
    this.$emit("onNavShow", this.navViewShow);
  },
  methods: {
    onOrderView: function(type) {
      this.orderViewShow = true;
      this.orderType = parseInt(type);
    },
    onOrderViewHide: function() {
      this.orderViewShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.mine-view {
  overflow: auto;
  padding-bottom: 3.125rem;
}

.user-view {
  width: 100%;
  height: 10rem;
  background: red;
  margin-bottom: 3.125rem;
  padding: 5rem 2rem 0;
  box-sizing: border-box;
}
.content-wrapper {
  height: 7.6875rem;
  background: white;
  border-radius: 0.625rem;
  position: relative;
  & dl {
    text-align: center;
    border-right: 0.0625rem solid #dbdbdb;
    height: 2.625rem;
    & dt {
      margin-bottom: 0.625rem;
      font-size: 0.6875rem;
      color: #7e7e7e;
    }
    & dd {
      font-size: 0.75rem;
      color: #dbdbdb;
    }
  }
}
.user-msg {
  height: 3.4375rem;
  line-height: 3.4375rem;
  margin-bottom: 0.625rem;
  & > img {
    width: 4.1875rem;
    height: 4.1875rem;
    border-radius: 50%;
    position: absolute;
    left: 1.25rem;
    top: -1.25rem;
  }
  & > p {
    font-size: 0.9375rem;
    text-align: center;
  }
}

.item-wrapper {
  padding: 0 0.625rem;
  margin-bottom: 0.625rem;
  background: white;
}
.title-wrapper {
  border-bottom: 0.0625rem solid #dbdbdb;
  height: 3.125rem;
  font-size: 0.875rem;
  line-height: 3.125rem;
  & > h4 {
    font-weight: 800;
    float: left;
  }
  & > a {
    float: right;
    color: #dbdbdb;
    vertical-align: middle;
  }
}

.logout {
  width: 100%;
  padding: 0 0.625rem 0.625rem 0.625rem;
  box-sizing: border-box;
  & > a {
    display: block;
    border: 0.0625rem solid #dbdbdb;
    text-align: center;
    height: 2.5625rem;
    line-height: 2.5625rem;
    background: white;
    color: black;
  }
}
</style>
