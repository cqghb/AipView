<template>
	<div>
		<el-button @click="haha">默认按钮</el-button>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as businessConstant from '@/components/constant/businessConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	import util from "@/components/utils/util";
	
	export default{
		name: "SpecificationGroupList",
		components:{
			"base-table": BaseTable,
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchDelTagOptions(){//学历查询
				let _this = this;
				CommInterface.getCodeType(
				    businessConstant.CODE_TYPE.YES_OR_NO,
					[],
				    function (res) {
						let retCode = res.code;
						let retMsg = res.msg;
				        if(SystemConstant.common.RET_CODE == retCode){
				            _this.searchForm.delTag.options = res.data;
				        } else {
				            util.showMsg("删除标记备选项查询失败", ComponentConstant.MessageProperties.ERROR);
				        }
				    }
				);
			},
			haha(){
				let _this = this;					
				// 父组件 没有这个方法会报错
				_this.$emit("setSpuType", "1", "的看法");
				
				
			},
			
		},
		created() {
			
		},
		mounted() {
			let _this = this;
		}
	}
</script>

<style>
</style>
