<template>
  <div class="select-addr-view">
    <van-address-list
      v-model="chosenAddressId"
      :list="addList"
      @add="onNext"
      @edit="onEdit"
      add-button-text="確認送出訂單"
    />
  </div>
</template>

<script>
import { AddressList, Toast } from "vant";
import { Promise } from "q";

export default {
  name: "selectAddrView",
  components: {
    [AddressList.name]: AddressList,
    [Toast.name]: Toast
  },
  props: ["addList", "finalCartList"],
  data() {
    return {
      chosenAddressId: "1"
    };
  },

  methods: {
    onNext() {
      // console.log(
      //   this.addList[this.chosenAddressId],
      //   this.finalCartList
      // );
      // let that = this;
      // let doGetCartTemp = new Promise(function(resolve, reject) {
      //   let cartTemp = that.getCartTemp();
      //   if (cartTemp) {
      //     resolve(cartTemp);
      //   } else {
      //     reject("err");
      //   }
      // });
      // doGetCartTemp
      //   .then(function(cartTemp) {
      //     console.log(cartTemp);
      //     that.$store.commit("addPendingForPaymentList", cartTemp);
      //     that.$store.commit("clearCart");
      //     that.sendPopupClosed();
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      if (this.finalCartList.length === 0) {
        return Toast({
          message: "請選擇至少一樣商品",
          duration: 1500
        });
      }
      this.$store.commit("addPendingForPaymentList", this.getCartTemp());
      this.$store.commit("clearCart");
      Toast({
        message: "已送出,待付款列表已更新",
        duration: 2000
      });
      this.sendPopupClosed();
    },
    getCartTemp() {
      let today = new Date();
      let orderTime =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let that = this;
      let cartTemp = [];
      this.finalCartList.forEach(function(item, index) {
        let { id, ...rest } = that.finalCartList[index];
        cartTemp[index] = {
          orderId: id,
          orderTime: orderTime,
          price: rest.price,
          type: 1,
          desc: rest.name,
          img: rest.img,
          num: rest.num
        };
      });
      return cartTemp;
    },
    onEdit(item, index) {
      this.$emit("onEditAddr", index);
    },
    sendPopupClosed() {
      this.$emit("sendPopupClosed");
    }
  }
};
</script>

<style>
</style>
