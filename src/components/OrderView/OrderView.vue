<template>
  <div class="order-view">
    <van-nav-bar title="訂單詳情" left-arrow @click-left="onClickLeft"/>

    <van-tabs class="reset-van" v-model="active">
      <van-tab title="全部">
        <OrderItemView v-for="(order, index) in orderList" :order="order" :key="index"></OrderItemView>
      </van-tab>
      <van-tab title="待付款">
        <OrderItemView v-for="(order, index) in orderList1" :order="order" :key="index"></OrderItemView>
      </van-tab>
      <van-tab title="待發貨">
        <OrderItemView v-for="(order, index) in orderList2" :order="order" :key="index"></OrderItemView>
      </van-tab>
      <van-tab title="待收貨">
        <OrderItemView v-for="(order, index) in orderList3" :order="order" :key="index"></OrderItemView>
      </van-tab>
      <van-tab title="交易成功">
        <OrderItemView v-for="(order, index) in orderList4" :order="order" :key="index"></OrderItemView>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from "vant";
import OrderItemView from "../OrderItemView/OrderItemView.vue";
import { constants } from "fs";
export default {
  name: "orderView",
  props: ["orderType"],
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    OrderItemView
  },
  //   created() {
  //     this.active = this.orderType;

  //     var that = this;
  //     this.$ajax
  //       .get("/mock/json/order.json")
  //       .then(function(response) {
  //         console.log("created", response.data);
  //         that.orderList = response.data;

  //         for (var i = 0; i < that.orderList.length; i++) {
  //           var order = that.orderList[i];
  //           if (order.type == 1) {
  //           } else if (order.type == 2) {
  //             that.orderList2.push(order);
  //           } else if (order.type == 3) {
  //             that.orderList3.push(order);
  //           } else if (order.type == 4) {
  //             that.orderList4.push(order);
  //           }
  //         }
  //       })
  //       .catch(function(err) {
  //         console.log(err);
  //       });
  //   },
  mounted() {
    this.active = this.orderType;
    var that = this;
    this.$ajax
      .get("/mock/json/order.json")
      .then(function(response) {
        console.log("json", response.data);
        that.orderList = response.data;

        for (var i = 0; i < that.orderList.length; i++) {
          var order = that.orderList[i];
          if (order.type == 1) {
          } else if (order.type == 2) {
            that.orderList2.push(order);
          } else if (order.type == 3) {
            that.orderList3.push(order);
          } else if (order.type == 4) {
            that.orderList4.push(order);
          }
        }
        that.orderList1 = that.orderList1.concat(
          that.$store.state.pendingForPaymentList
        );
        that.orderList = that.orderList.concat(
          that.$store.state.pendingForPaymentList
        );
        console.log("mounted", that.orderList);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  data() {
    return {
      active: 1,
      orderList: [], // 全部
      orderList1: [], // 待付款
      orderList2: [], // 待發貨
      orderList3: [], // 待收貨
      orderList4: [] // 交易成功
    };
  },
  methods: {
    onClickLeft: function() {
      this.$emit("onBack");
    }
  }
};
</script>

<style lang="scss">
.reset-van {
  & .van-tabs__content {
    position: fixed;
    width: 100%;
    height: 100%;
    padding-bottom: 6.1875rem;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>

<style lang="scss" scoped>
.order-view {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #f2f2f2;
  z-index: 99;
}
</style>

