<template>
	<div class="selling-view">
		<GoodsItemView v-for='(goods, index) in sellings' :goods='goods' :key='index'></GoodsItemView>
	</div>
</template>

<script>
	import GoodsItemView from '../GoodsItemView/GoodsItemView.vue'
	
	export default{
		name:'sellingView',
		components:{
			GoodsItemView
		},
		data() {
			return {
				sellings: []
			}
		},
		created() {
			var that = this
			this.$ajax.get('/mock/json/selling-list.json')
				.then(function(response){
					// console.log(response.data)
					that.sellings = response.data
				})
				.catch(function(err){
					console.log(err)
				})
		}
	}
</script>

<style lang="scss" scoped>
	.selling-view{
		border-top: 1px solid #bbbbbb;
		border-left: 1px solid #bbbbbb;
		overflow: hidden;
	}
</style>
