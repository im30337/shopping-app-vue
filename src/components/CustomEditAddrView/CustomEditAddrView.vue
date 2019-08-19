<template>
  <div class="edit-addr-view">
    <van-cell-group>
      <van-field v-model="username" clearable label="姓名" :placeholder="this.editValue.name"/>
      <van-field v-model="userTel" label="電話" :placeholder="this.editValue.tel"/>
      <van-field v-model="userAddr" label="詳細地址" :placeholder="this.editValue.address"/>
      <div class="button-section">
        <van-button type="danger" @click="saveEdit">保存</van-button>
        <van-button plain type="danger" @click="cancelEdit">取消</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import { Field, Button, Cell, CellGroup } from "vant";

export default {
  name: "customEditAddrView",
  props: ["editValue", "isEdit"],
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      searchResult: [],
      username: "",
      userTel: "",
      userAddr: "",
      propsUserData: this.editValue
    };
  },
  methods: {
    cancelEdit() {
      this.$emit("onCancelEdit");
    },
    saveEdit() {
      let new_addr = {
        id: this.editValue.id,
        name: this.username === "" ? this.propsUserData.name : this.username,
        tel: this.userTel === "" ? this.propsUserData.tel : this.userTel,
        address:
          this.userAddr === "" ? this.propsUserData.address : this.userAddr
      };
      this.$emit("onSaveEdit", new_addr);
    }
  },
  watch: {
    isEdit: function() {
      if (this.isEdit) {
        this.username = "";
        this.userTel = "";
        this.userAddr = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.button-section {
  display: flex;
  flex-direction: column;
}
</style>

