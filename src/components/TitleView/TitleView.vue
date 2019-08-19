<template>
  <div class="title-view">
    <h3>
      <van-icon :name="icon"/>
      {{name}}
    </h3>
  </div>
</template>

<script>
import { Icon } from "vant";

export default {
  name: "titleView",
  components: {
    [Icon.name]: Icon
  },
  props: ["name", "icon"]
};
</script>

<style lang="scss" scoped>
.title-view {
  height: 4.6875rem;
  line-height: 4.6875rem;
  & > h3 {
    font-size: 1.125rem;
    text-align: center;
    font-weight: 900;
  }
}
</style>
