<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
	/*每个页面公共css */
	page {
		background-color: #eeeeee;
		font-size: 30rpx;
	}
	
	.info-cell {
		width: 80%;
		background-color: white;
		/* height: 500px; /* for demo */ 
		margin: 40rpx auto;
		border-radius: 2%;
		box-shadow: 5rpx 0rpx 20rpx #dddddd;
		padding: 20rpx;
	}
	
	/* cell选中后的效果 */
	.cell-hover-class {
		background-color: rgb(235, 237, 238);
	}
		
	.btn-area {
		width: 80%;
		margin: 40px auto;
	}
	
	/* picker的确认按钮的颜色 */
	.uni-picker-action-confirm {
		color: $theme-color!important;
	}
	

</style>
