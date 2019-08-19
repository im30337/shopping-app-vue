<template>
  <div class="cart-view">
    <CartItemView
      v-for="(cart, index) in currentCartList"
      :key="cart.id"
      :cart="cart"
      :isChecked="selectList[index]"
      @onChangeChecked="onItemCheckedChange"
      :index="index"
      ref="cartItemView"
    ></CartItemView>

    <van-popup v-model="isSubmit" position="bottom" @closed="sendPopupClosed">
      <SelectAddrView
        :addList="addList"
        :finalCartList="finalCartList"
        @onEditAddr="onEditAddr"
        @sendPopupClosed="sendPopupClosed"
      ></SelectAddrView>
    </van-popup>

    <van-popup v-model="isEdit" position="bottom">
      <!-- <EditAddrView :editValue="editValue" @onSaveAddr="onSaveAddr"></EditAddrView> -->
      <CustomEditAddrView
        :isEdit="isEdit"
        :editValue="editValue"
        @onCancelEdit="onCancelEdit"
        @onSaveEdit="onSaveEdit"
      ></CustomEditAddrView>
    </van-popup>

    <van-submit-bar
      :price="totalPrice"
      button-text="送出訂單"
      @submit="onSubmit"
      label="合計："
      currency="$"
      :disabled="submitBarDisable"
    >
      <van-checkbox
        v-model="isAll"
        class="all-checkbox"
        checked-color="red"
        @change="onAllSelect"
        :disabled="checkboxDisable"
      >全選</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import CartItemView from "../CartItemView/CartItemView.vue";
import { SubmitBar, Checkbox, Popup } from "vant";
import SelectAddrView from "../SelectAddrView/SelectAddrView.vue";
// import EditAddrView from "../EditAddrView/EditAddrView.vue";
import GoodsDetailView from "../GoodsDetailView/GoodsDetailView";
import CustomEditAddrView from "../CustomEditAddrView/CustomEditAddrView";

export default {
  name: "cartView",
  components: {
    CartItemView,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    SelectAddrView,
    [Popup.name]: Popup,
    // EditAddrView,
    GoodsDetailView,
    CustomEditAddrView
  },
  data() {
    return {
      title: "購物車",
      navViewShow: true,
      carts: null,
      isAll: true,
      selectList: [],
      isSubmit: false,
      addList: [],
      isEdit: false,
      editValue: {},
      editIndex: -1,
      value: "",
      finalCartList: [],
      submitBarDisable: false,
      checkboxDisable: false
    };
  },
  methods: {
    onSubmit: function() {
      let that = this;
      this.selectList.forEach(function(item, index) {
        item ? that.finalCartList.push(that.currentCartList[index]) : false;
      });
      // console.log(
      //   "送出訂單",
      //   this.selectList,
      //   this.currentCartList,
      //   "送出的單",
      //   this.finalCartList
      // );
      this.isSubmit = true;
    },
    onItemCheckedChange: function(isChecked, index) {
      this.$set(this.selectList, index, isChecked);
    },
    onAllSelect: function() {
      for (var i = 0; i < this.selectList.length; i++) {
        this.$set(this.selectList, i, this.isAll);
        this.$refs.cartItemView[i].onItemViewChange(this.isAll);
      }
    },
    onEditAddr: function(index) {
      this.isEdit = true;
      this.editValue = this.addList[index];
      this.editIndex = index;
    },
    onSaveAddr: function(addr) {
      this.$set(this.addList, this.editIndex, addr);
      this.isEdit = false;
    },
    onCancelEdit: function() {
      this.isEdit = false;
    },
    onSaveEdit: function(addr) {
      this.$set(this.addList, this.editIndex, addr);
      this.isEdit = false;
    },
    sendPopupClosed() {
      this.isSubmit = false;
      this.finalCartList = [];
    }
  },
  created() {
    this.$emit("onTitle", this.title);
    this.$emit("onNavShow", this.navViewShow);

    var that = this;

    // this.$ajax.get('/json/cart.json')
    // 	.then(function(response){
    // 		// console.log(response.data)
    // 		that.carts = response.data

    // 		for(var i=0; i<that.carts.length; i++){
    // 			that.selectList.push(true)
    // 		}
    // 		console.log('select',that.selectList);
    // 	})
    // 	.catch(function(err){
    // 		console.log(err)
    // 	})
    for (var i = 0; i < that.currentCartList.length; i++) {
      that.selectList.push(true);
    }
    this.$ajax
      .get("/mock/json/user-addr.json")
      .then(function(response) {
        // console.log(response.data)
        that.addList = response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  beforeUpdate() {
    if (this.currentCartList.length === 0) {
      this.submitBarDisable = true;
      this.checkboxDisable = true;
    }
  },
  computed: {
    totalPrice: function() {
      var total = 0;
      for (var i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i] && this.currentCartList[i]) {
          // 选中
          var price = this.currentCartList[i].price;
          var num = this.currentCartList[i].num;
          total += price * num;
        }
      }
      return total * 10 * 10;
    },
    currentCartList() {
      return this.$store.state.cart;
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-view {
  padding-top: 2.8125rem;
  padding-bottom: 6.25rem;
  box-sizing: border-box;
}
.van-submit-bar {
  bottom: 3.125rem;
}
.cart-view .all-checkbox {
  margin-left: 0.9375rem;
}
</style>
