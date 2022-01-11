<template>
	<div>
		<!-- 详情 -->
		<simple-detail-page v-if="toRender" 
			:fieldList="fieldList" 
			:info="info"></simple-detail-page>
	</div>
</template>

<script>
	import SimpleDetailPage from "@/components/common/SimpleDetailPage"
	import * as CommInterface from '@/components/utils/commInterface'
	import * as SystemConstant from '@/components/constant/systemConstant'
	import * as BusinessConstant from '@/components/constant/businessConstant'
	
	export default {
		name: "",
		components: {
			"simple-detail-page": SimpleDetailPage
		},
		data() {
			return {
				fieldList:[
					{ name: "id", fieldName: "ID", type: "text", fieldValue: "" },
					{ name: "name", fieldName: "产品规格名称", type: "text", fieldValue: "" },
					{ name: "groupIdName", fieldName: "产品所属规格组", type: "text", fieldValue: "" },
					{ name: "typeIdName", fieldName: "产品所属货品类型", type: "text", fieldValue: "", transformation: BusinessConstant.CODE_TYPE.DATA_OPERATE_SUBGROUP },
					{ name: "addr", fieldName: "显示位置", type: "text", fieldValue: "" },
					{ name: "remark", fieldName: "备注", type: "text", fieldValue: "" },
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
		methods: {
			queryInfo(id){
			    let _this = this;
			    CommInterface.sendPost(
			        SystemConstant.consSpecificationManage.QUERY_DETAIL,
			        {
			            id: id
			        },
			        _this.dealRes
			    );
			},
			dealRes(res){
			    let _this = this;
			    _this.info = res;
				  _this.toRender = true;
			}
		},
		created() {
			let _this = this;
		},
		mounted() {
			let _this = this;
			let id = _this.$route.params.id;
			_this.queryInfo(id);
		}
	}
</script>

<style scoped="scoped">
</style>
