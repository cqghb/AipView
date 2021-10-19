<template>
	<!-- 数据操作详情 -->
	<div>
		<simple-detail-page v-if="toRender" :fieldList="fieldList" :info="info"></simple-detail-page>
	</div>
</template>

<script>
	import SimpleDetailPage from "@/components/common/SimpleDetailPage"
	import * as CommInterface from '@/components/utils/commInterface'
	import * as SystemConstant from '@/components/constant/systemConstant'
	import * as BusinessConstant from '@/components/constant/businessConstant'
	
	export default {
		name:"DopDetail",
		components:{
			"simple-detail-page": SimpleDetailPage
		},
		data() {
			return {
				fieldList:[
					{ name: "id", fieldName: "ID", type: "text", fieldValue: "" },
					{ name: "name", fieldName: "菜单名称", type: "text", fieldValue: "" },
					{ name: "operateAddr", fieldName: "菜单图标", type: "text", fieldValue: "" },
					{ name: "subgroup", fieldName: "所属分组", type: "text", fieldValue: "", transformation: BusinessConstant.CODE_TYPE.DATA_OPERATE_SUBGROUP },
					{ name: "remark", fieldName: "父节点ID", type: "text", fieldValue: "" },
					{ name: "delTag", fieldName: "是否删除", type: "text", fieldValue: "", transformation: BusinessConstant.CODE_TYPE.DEL_TAG },
					{ name: "createUser", fieldName: "创建人", type: "text", fieldValue: "" },
					{ name: "createTime", fieldName: "创建时间", type: SystemConstant.dataType.DATE, fieldValue: "", formatDate:SystemConstant.common.FORMAT_DATE },
					{ name: "updateUser", fieldName: "修改人", type: "text", fieldValue: "" },
					{ name: "updateTime", fieldName: "修改时间", type: SystemConstant.dataType.DATE, fieldValue: "", formatDate:SystemConstant.common.FORMAT_DATE }
				],
				info:{},
				toRender: false
			};
		},
		methods:{
			queryInfo(id){
			    let the = this;
			    CommInterface.sendPost(
			        SystemConstant.consDopManage.QUERY_BY_ID,
			        {
			            id: id
			        },
			        the.dealRes
			    );
			},
			dealRes(res){
			    let the = this;
			    the.info = res;
				the.toRender = true;
			}
		},
		created() {
			
		},
		mounted() {
			let the = this;
			let id = the.$route.params.id;
			the.queryInfo(id);
		}
	}
</script>

<style>
</style>
