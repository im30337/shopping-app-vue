<template>
	<div class="winnow-view">
		<img :src="bigImg" alt="" class="big-img">
		
		<div class="hidden-view">
			<div class="winnow-box" ref='itemsView'>
				<WinnowItemView v-for='(item, index) in contents' :item='item' :key='index'></WinnowItemView>
			</div>
		</div>
	</div>
</template>

<script>
	import WinnowItemView from '../WinnowItemView/WinnowItemView.vue'
	
	export default{
		name: 'winnowView',
		props: ['bigImg', 'contents'],
		components: {
			WinnowItemView
		},
		created(){
		},
		beforeUpdate(){
			var temp = this.contents.length * ((100 + 10) / 16)
			this.$refs.itemsView.style.width = temp + 'rem'
	
		}
		
	}
</script>

<style lang="scss" scoped>
	.big-img{
		width: 100%;
	}
	.hidden-view{
		width: 100%;
		overflow: auto;
	}
	.winnow-box{
		background: white;
		overflow: hidden;
		padding-left: .625rem;
	}
</style>

