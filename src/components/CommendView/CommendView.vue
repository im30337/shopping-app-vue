<template>
  <div class="commend-view">
    <van-panel v-for="(item,index) in commendList" :key="index">
      <div class="commend-wrapper">
        <div class="img-view">
          <img :src="item.img" alt>
        </div>
        <div class="detail-view">
          <h4 class="title">{{item.title}}</h4>
          <p class="desc">{{item.desc}}</p>
          <div class="keyword">
            <span>{{item.keyword1}}</span>
            |
            <span>{{item.keyword2}}</span>
          </div>
          <p class="price">$ {{item.price}}</p>
        </div>
      </div>
      <div slot="footer" class="footer">
        <span class="brand">{{item.brand}}</span>
        <span class="standard">{{item.standard}}</span>
        <button class="similar">找相似</button>
      </div>
    </van-panel>
  </div>
</template>

<script>
import { Panel, Button } from "vant";

export default {
  name: "commendView",
  components: {
    [Panel.name]: Panel,
    [Button.name]: Button
  },
  data() {
    return {
      commendList: []
    };
  },
  created() {
    var that = this;
    this.$ajax
      .get("/mock/json/commend-list.json")
      .then(function(response) {
        // console.log(response.data)
        that.commendList = response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>

.van-cell-group {
  margin-bottom: 0.625rem;
}

.van-panel__header {
  padding: 0;
}

.commend-wrapper {
  height: 11.25rem;
}

.img-view {
  /*  165px */
  width: 10.3125rem;
  float: left;
  text-align: center;
  & img {
  width: 7.5rem;
  margin-top: 1.5625rem;
  }
}

.detail-view {
  /* 375px - 165px = 210px */
  width: 13.125rem;
  float: left;
  margin-top: 0.5625rem;
  padding-right: 1rem;
  box-sizing: border-box;
}

.title {
  font-size: 1rem;
  font-weight: 900;
  line-height: 1.4375rem;
  margin-bottom: 0.625rem;
}

.desc {
  font-size: 0.8125rem;
  line-height: 1.125rem;
  color: #737373;
}

.keyword {
  width: 7.25rem;
  height: 1.25rem;
  line-height: 1.25rem;
  margin: 0.625rem 0;
  font-size: 0.8125rem;
  color: #d5b085;
  text-align: center;
  background: #f2f2f2;
  margin-bottom: 0.75rem;
}

.price {
  color: red;
  font-weight: 800;
  font-size: 0.875rem;
}

.footer {
  height: 2.625rem;
  line-height: 2.625rem;
  font-size: 0.75rem;
  color: #808080;
}

.brand {
  margin-right: 6.375rem;
}

.similar {
  margin-top: 11px;
  border: 0.0625rem solid #808080;
  float: right;
  width: 3.5625rem;
  height: 1.25rem;
  line-height: 1.25rem;
  text-align: center;
  border-radius: 0.625rem;
  background: white;
}
</style>

