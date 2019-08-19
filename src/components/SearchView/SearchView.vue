<template>
  <div class="search-view">
    <van-search
      v-model="searchKey"
      placeholder="請輸入搜尋關鍵字"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜尋</div>
    </van-search>

    <div class="history-view">
      <div class="history-title">
        <h4>最近搜尋</h4>
        <span @click="onClear">清空紀錄</span>
      </div>

      <van-tag
        @click="onHistoryItem(item)"
        round
        v-for="(item, index) in historyList"
        :key="index"
      >{{item}}</van-tag>
    </div>

    <SearchDetailView
      v-if="searchDetailShow"
      @onBack="onDetailHide"
      :searchDataList="searchDataList"
    ></SearchDetailView>
  </div>
</template>

<script>
import { Search, Tag, Toast } from "vant";
import SearchDetailView from "../SearchDetailView/SearchDetailView.vue";

export default {
  name: "searchView",
  components: {
    [Search.name]: Search,
    [Tag.name]: Tag,
    SearchDetailView,
    [Toast.name]: Toast
  },
  data() {
    return {
      title: "搜索",
      navViewShow: false,
      searchKey: "",
      historyList: ["5片", "茵洛", "安瞳"],
      searchDetailShow: false,
      searchDataList: null
    };
  },
  created() {
    this.$emit("onTitle", this.title);
    this.$emit("onNavShow", this.navViewShow);
  },
  methods: {
    onSearch: function() {
      if (this.searchKey) {
        this.searchDetail();
        this.historyList.push(this.searchKey);
      }
    },
    onClear: function() {
      this.historyList = [];
    },
    onHistoryItem: function(item) {
      this.searchKey = item;
      this.searchDetail();
    },
    onDetailHide: function() {
      this.searchDetailShow = false;
    },

    closeLoding: function() {
      this.searchDetailShow = true;
    },
    searchDetail: function() {
      Toast.loading({
        mask: true,
        message: "加載中...",
        duration: 0,
        onClose: this.closeLoding
      });

      console.log("搜尋關鍵字: " + this.searchKey);
      var that = this;
      this.$ajax
        .get("/mock/json/search-detail.json")
        .then(function(response) {
		  that.searchDataList = [];
		  response.data.list.forEach(function (item) {
			  item.name.indexOf(that.searchKey) > -1 ? that.searchDataList.push(item) : false;
		  })
		  console.log(that.searchDataList);
          Toast.clear();
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.search-view {
  /* 	position: fixed;
	left: 0;
	top: 0;
	bottom: 0; */
  width: 100%;
  background: #f2f2f2;
}

.history-view {
  padding: 0 1.25rem;
}
.history-title {
  margin: 1.125rem 0 1.25rem;
  overflow: hidden;
  & > h4 {
    float: left;
    font-size: 1rem;
    font-weight: 800;
  }
  & > span {
    color: red;
    font-size: 1rem;
    float: right;
  }
}
.van-tag {
  margin: 0 0.625rem;
}
</style>

