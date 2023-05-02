<template>
	<!-- 产品管理 -->
	<div>
		<bread-crumbs></bread-crumbs>
		<base-form
					:formData="searchData"
					ref="searchSkuForm"
					:formFieldList="searchForm"
					:baseFromModel="searchData"
					:size="formSize"
					:myInline="true"
					:buttonArr="searchHandle"></base-form>
		<!-- 操作按钮 start -->
		<el-row class="row">
		    <el-col :span="24">
		        <el-button v-for="(item, index) in operationButtonList"
		                   :key="index"
		                   :icon="item.icon"
		                   :type="item.type"
		                   @click="item.handle()">
		            {{ item.text }}
		        </el-button>
		    </el-col>
		</el-row>
		<!-- 操作按钮 end -->
		<!-- 商品列表展示区域 start -->
		<!-- 
			展示的商品信息有：
			第一张图片，名称、数量、价格，商品编号
		
		-->
		<!-- 鼠标移动上去的样式案例 -->
		<!-- <div class="a1">
			<div class="abc1">wew</div>
		</div> -->
		
		<el-row :gutter="4">
			<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
				<div class="sku">
					<el-card shadow="hover" :body-style="{ padding: '0px' }">
						<!-- <el-image :src="require('@/assets/logo.png')" class="image"/> -->
						<el-image :src="require('/Users/wangsheng/headPortrai/311CDA7EC75E4893A8AD0F1930B93975.jpg')" class="image"/>
						<div style="padding: 14px;">
							<div>
								<span>商品编号</span>
							</div>
							<div>
								<span>名称</span>
							</div>
							<div>
								<div class="skuPrice">
									<span class="priceIcon">¥</span>
									<strong class="price">69.90</strong>
								</div>
								<div class="skuNumber">数量</div>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
				<div class="sku">
					<el-card shadow="hover" :body-style="{ padding: '0px' }">
						<el-image :src="require('/Users/wangsheng/headPortrai/311CDA7EC75E4893A8AD0F1930B93975.jpg')" class="image"/>
						<div style="padding: 14px;">
							<div>
								<span>商品编号</span>
							</div>
							<div>
								<span>名称</span>
							</div>
							<div>
								<div class="skuPrice">
									<span class="priceIcon">¥</span>
									<strong class="price">69.90</strong>
								</div>
								<div class="skuNumber">数量</div>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
				<div class="sku">
					<el-card shadow="hover" :body-style="{ padding: '0px' }">
						<el-image :src="require('/Users/wangsheng/headPortrai/311CDA7EC75E4893A8AD0F1930B93975.jpg')" class="image"/>
						<div style="padding: 14px;">
							<div>
								<span>商品编号</span>
							</div>
							<div>
								<span>名称</span>
							</div>
							<div>
								<div class="skuPrice">
									<span class="priceIcon">¥</span>
									<strong class="price">69.90</strong>
								</div>
								<div class="skuNumber">数量</div>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
				<div class="sku">
					<el-card shadow="hover" :body-style="{ padding: '0px' }">
						<el-image :src="require('/Users/wangsheng/headPortrai/311CDA7EC75E4893A8AD0F1930B93975.jpg')" class="image"/>
						<div style="padding: 14px;">
							<div>
								<span>商品编号</span>
							</div>
							<div>
								<span>名称</span>
							</div>
							<div>
								<div class="skuPrice">
									<span class="priceIcon">¥</span>
									<strong class="price">69.90</strong>
								</div>
								<div class="skuNumber">数量</div>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="4">
			<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
				<div class="sku">
					<el-card shadow="hover" :body-style="{ padding: '0px' }">
						<!-- <el-image :src="require('@/assets/logo.png')" class="image"/> -->
						<el-image :src="require('/Users/wangsheng/headPortrai/311CDA7EC75E4893A8AD0F1930B93975.jpg')" class="image"/>
						<div style="padding: 14px;">
							<div>
								<span>商品编号</span>
							</div>
							<div>
								<span>名称</span>
							</div>
							<div>
								<div class="skuPrice">
									<span class="priceIcon">¥</span>
									<strong class="price">69.90</strong>
								</div>
								<div class="skuNumber">数量</div>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
				<div class="sku">
					<el-card shadow="hover" :body-style="{ padding: '0px' }">
						<el-image :src="require('/Users/wangsheng/headPortrai/311CDA7EC75E4893A8AD0F1930B93975.jpg')" class="image"/>
						<div style="padding: 14px;">
							<div>
								<span>商品编号</span>
							</div>
							<div>
								<span>名称</span>
							</div>
							<div>
								<div class="skuPrice">
									<span class="priceIcon">¥</span>
									<strong class="price">69.90</strong>
								</div>
								<div class="skuNumber">数量</div>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
				<div class="sku">
					<el-card shadow="hover" :body-style="{ padding: '0px' }">
						<el-image :src="require('/Users/wangsheng/headPortrai/311CDA7EC75E4893A8AD0F1930B93975.jpg')" class="image"/>
						<div style="padding: 14px;">
							<div>
								<span>商品编号</span>
							</div>
							<div>
								<span>名称</span>
							</div>
							<div>
								<div class="skuPrice">
									<span class="priceIcon">¥</span>
									<strong class="price">69.90</strong>
								</div>
								<div class="skuNumber">数量</div>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
				<div class="sku">
					<el-card shadow="hover" :body-style="{ padding: '0px' }">
						<el-image :src="require('/Users/wangsheng/headPortrai/311CDA7EC75E4893A8AD0F1930B93975.jpg')" class="image"/>
						<div style="padding: 14px;">
							<div>
								<span>商品编号</span>
							</div>
							<div>
								<span>名称</span>
							</div>
							<div>
								<div class="skuPrice">
									<span class="priceIcon">¥</span>
									<strong class="price">69.90</strong>
								</div>
								<div class="skuNumber">数量</div>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
		</el-row>
		<!-- 商品列表展示区域 end -->
		<!-- 分页组件 start -->
		<!-- <el-pagination
		        @size-change="handleSizeChange"
		        @current-change="handleCurrentChange"
		        :current-page.sync="page.currentPage"
		        :page-sizes="page.pageSizeArr"
		        :page-size="page.pageSize"
		        layout="total, sizes, prev, pager, next, jumper"
		        :total="page.totalSize">
		</el-pagination> -->
		<!-- 分页组件 end -->
		
		<!-- <base-table :uri="uri"
		            ref="tableSku"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchSkuForm"
					:multiSelect="false"
		            :searchHandle="searchHandle" 
					@searchDelTagOptions="searchDelTagOptions"></base-table> -->
	</div>
</template>

<script>
	import BreadCrumbs from "@/components/common/BreadCrumbs";
	import BaseForm from "@/components/common/BaseForm";
	// import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as businessConstant from '@/components/constant/businessConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	import util from "@/components/utils/util";
	
	
	export default {
		name: "Specification",
		components: {
			// "base-table": BaseTable,
			"bread-crumbs": BreadCrumbs,
			"base-form": BaseForm,
		},
		data() {
			return {
				testImage: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
				page:{
					currentPage: 1,
					pageSizeArr: 1,
					pageSize: 1,
					totalSize: 1,
				},
				uri: SystemConstant.consSkuManage.FIND_PAGE,
				searchData:{
					id: "",// 产品主键
					code: "",// 产品编码
					name: "",// 产品名称
					delTag: businessConstant.NO,// 删除标记
					typeId: "",// 货品类型
					brandId: "",// 货品品牌
				},
				searchForm:{
					id: {
						type: "Input",
						label: "货品ID",
						prop: "id",
						width: "180px",
						placeholder: "请输入货品ID...",
						size:""
					},
					code: {
						type: "Input",
						label: "货品CODE",
						prop: "code",
						width: "180px",
						placeholder: "请输入货品CODE...",
						size:""
					},
					name: {
						type: "Input",
						label: "产品名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入规格名称...",
						size:""
					},
					typeId: {
						type: "Select",
						label: "货品类型",
						prop: "typeId",
						width: "180px",
						options: [],
						change: function(v){
							console.log("当前值",v);
						}
					},
					brandId: {
						type: "Select",
						label: "货品品牌",
						prop: "brandId",
						width: "180px",
						options: [],
						change: function(v){
							console.log("当前值",v);
						}
					},
					delTag: {
						type: "Select",
						label: "删除标志",
						prop: "delTag",
						width: "180px",
						options: [],
						change: function(v){
							console.log("当前值",v);
						}
					}
					
				},
				searchHandle:[
					{
						label:"查询",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.loading = true;
							_this.$refs.tableSku.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.tableSku.$refs.searchSkuForm.$refs.defaultMyForm.resetFields();
						}
					}
				],
				formSize: "",
				operationButtonList:[
					{
						type: "",
						icon: "el-icon-more",
						text: "详情",
						handle:()=>{
							let _this = this;
							_this.detail();
						}
					},
					{
						type: "primary",
						icon: "el-icon-plus",
						text: "新增",
						handle:()=>{
							let _this = this;
							_this.add();
						}
					},
					{
						type: "warning",
						icon: "el-icon-edit",
						text: "修改",
						handle:()=>{
							let _this = this;
							_this.update();
						}
					},
					{
						type: "danger",
						icon: "el-icon-delet",
						text: "删除",
						handle:()=>{
							let _this = this;
							util.confirm("", "", "", "", "",function () {// 确认
								_this.delete();
							}, null);
							
						}
					},
				],
				tableColumnList:[
					{ prop: "id", label: "ID", width: 180 },
					{ prop: "skuCodeName", label: "产品名称", width: 180 },
					{ prop: "price", label: "产品价格", width: 180 },
					{ prop: "skuNumber", label: "产品数量", width: 180 },
					{ prop: "spuCodeName", label: "所属货品", width: 180 },
					{ prop: "spuTypeCodeName", label: "货品类型", width: 180 },
					{ prop: "brandCodeName", label: "所属品牌", width: 180 },
					// { prop: "speIdName", label: "产品规格", width: 180 },
					{ prop: "delTag", label: "删除标记", width: 80 },
					{ prop: "remark", label: "备注"},
					// { prop: "createUser", label: "创建人", width: 120 },
					// { prop: "createTime", label: "创建时间", width: 160, type:SystemConstant.dataType.DATE, formatDate: SystemConstant.common.FORMAT_DATE },
					// { prop: "updateUser", label: "修改人", width: 120 },
					// { prop: "updateTime", label: "修改时间", width: 160, type:SystemConstant.dataType.DATE, formatDate:SystemConstant.common.FORMAT_DATE }
				],
				selectedData: false
			};
		},
		methods: {
			handleCurrentChange(val){// 分页组件当前页发生变化触发事件
			    let the = this;
			    // the.loading = true;
			    // the.currentPage = val;
			    // the.queryList();
			},
			handleSizeChange(val){// 分页组件每页数据条数改变触发事件
			    let the = this;
			    // the.loading = true;
			    // the.page.pageSize = val;
			    // the.queryList();
			},
			searchDelTagOptions(codeType){/* 获取删除标志的数据源 */
				let _this = this;
				CommInterface.getCodeType(
				    codeType,
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
			searchSpuType(){/* 查询货品类型 */
				let _this = this;
				CommInterface.searchSPUTypeCode(
					{delTag: businessConstant.NO},
				    function (data) {
						_this.searchForm.typeId.options = data;
				    }
				);
			},
			searchSpuBrand(){/* 查询货品品牌 */
				let _this = this;
				CommInterface.searchSpuBrand(
					{delTag: businessConstant.NO},
				    function (data) {
						_this.searchForm.brandId.options = data;
				    }
				);
			},
			add(){/* 新增 */
				let _this = this;
				CommInterface.goToPage(SystemConstant.consComponentPath.ADD_SKU, SystemConstant.consComponentName.ADD_SKU, {});
				// _this.$refs.tableSku.toPage(SystemConstant.consComponentPath.ADD_SKU, SystemConstant.consComponentName.ADD_SKU, {});
			},
			update(){/* 维护 */
				let _this = this;
				_this.$refs.tableSku.selectOneDataToPage(SystemConstant.consComponentPath.UPDATE_SKU, SystemConstant.consComponentName.UPDATE_SKU);
			},
			delete(){/* 删除 删除之后只是不让再配置到商品规格中去 */
				let _this = this;
				_this.$refs.tableSku.updateDelTag(SystemConstant.consSpuManage.UPDATE_DEL_TAG);
			},
			detail(){/* 详情 */
				let _this = this;
				_this.$refs.tableSku.selectOneDataToPage(SystemConstant.consComponentPath.DETAIL_SKU, SystemConstant.consComponentName.DETAIL_SKU);
			},
			
		},
		created() {
			let _this = this;
		},
		mounted() {
			let _this = this;
			_this.searchSpuType();
			_this.searchSpuBrand();
			_this.searchDelTagOptions(businessConstant.CODE_TYPE.YES_OR_NO);
		}
	}
</script>

<style scoped="scoped">
	.skuPrice {
		float: left;
	}
	.skuNumber {
		float: right;
	}
	.priceIcon {
		color: #F40;
	}
	.price {
		color: #F40;
		font-weight:700;
	}
	/* .a1{width:100px; height:100px; margin:200px auto;}
	.abc1{width:100px; height:100px;background:#f00;position:relative; transition:.5s}
	.abc1:hover{width:120px;background:#f00; height:120px;margin:-10px 0 0 -10px} */
	.sku {
		position:relative; 
		transition:.5s
	}
	.sku:hover {
		margin:-10px 0 0 -10px;
	}
</style>
