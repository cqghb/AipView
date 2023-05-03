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
		<ul :loading="loading" class="infinite-list" style="overflow:auto;list-style: none;">
			<li :key="index" v-for="(item, index) in skuDataList" class="infinite-list-item">
				<div class="sku">
					<el-card shadow="hover" :body-style="{ padding: '0px' }">
						<el-image :src="require('@/assets/logo.png')" class="image"/>
						<!-- <el-image :src="require('/Users/wangsheng/headPortrai/'+item.skuImageName+'.jpg')" class="image"/> -->
						<!-- <el-image :src="item.skuImagePath" class="image"/> -->
						<div style="padding: 14px;">
							<div>
								<span>{{ item.no }}</span>
							</div>
							<div>
								<span>{{ item.name }}</span>
							</div>
							<div>
								<div class="skuPrice">
									<span class="priceIcon">¥</span>
									<strong class="price">{{ item.price }}</strong>
								</div>
								<div class="skuNumber">{{ item.number }}</div>
							</div>
						</div>
					</el-card>
				</div>
			</li>
		</ul>
		<el-empty v-if="skuDataList.length==0" description="无数据"></el-empty>
		
		<!-- <el-row :gutter="4">
			<el-col :key="index" v-for="(item, index) in skuDataList" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
				<div class="sku">
					<el-card shadow="hover" :body-style="{ padding: '0px' }">
						<el-image :src="item.skuImagePath" class="image"/>
						<div style="padding: 14px;">
							<div>
								<span>{{ item.no }}</span>
							</div>
							<div>
								<span>{{ item.name }}</span>
							</div>
							<div>
								<div class="skuPrice">
									<span class="priceIcon">¥</span>
									<strong class="price">{{ item.price }}</strong>
								</div>
								<div class="skuNumber">{{ item.number }}</div>
							</div>
						</div>
					</el-card>
				</div>
			</el-col>
		</el-row> -->
		<!-- <el-row :gutter="4">
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
						<el-image :src="require('@/assets/logo.png')" class="image"/>
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
		</el-row> -->
		<!-- 商品列表展示区域 end -->
		<!-- 分页组件 start -->
		<el-pagination
		        @size-change="handleSizeChange"
		        @current-change="handleCurrentChange"
		        :current-page.sync="page.currentPage"
		        :page-sizes="page.pageSizeArr"
		        :page-size="page.pageSize"
		        layout="total, sizes, prev, pager, next, jumper"
		        :total="page.totalSize">
		</el-pagination>
		<!-- 分页组件 end -->
	</div>
</template>

<script>
	import BreadCrumbs from "@/components/common/BreadCrumbs";
	import BaseForm from "@/components/common/BaseForm";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as businessConstant from '@/components/constant/businessConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	import util from "@/components/utils/util";
	
	
	export default {
		name: "Specification",
		components: {
			"bread-crumbs": BreadCrumbs,
			"base-form": BaseForm,
		},
		data() {
			return {
				loading: true,/* 加载中 */
				skuDataList: [],
				testImage: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
				page:{// 分页参数
				    currentPage: 1,// 当前页
				    pageSizeArr:[5, 10, 20, 30, 40],// 可选每页显示数据条数
				    pageSize: 5,// 当前每页显示条数
				    totalSize: 1// 总页数
				},
				uri: SystemConstant.consSkuManage.FIND_PAGE,
				searchData:{
					no: "",// 产品编号
					name: "",// 产品名称
					spuNo: "",// 货品编号
					spuName: "",// 货品名称
					spuTypeCode: "",// 货品类型代码
					brandCode: "",// 货品品牌代码
					brandName: "",/* 品牌名称 */
					delTag: businessConstant.NO,/* 删除标记 */
				},
				searchForm:{
					no: {
						type: "Input",
						label: "产品编号",
						prop: "no",
						width: "180px",
						placeholder: "请输入产品编号...",
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
					spuNo: {
						type: "Input",
						label: "货品编号",
						prop: "spuNo",
						width: "180px",
						placeholder: "请输入货品编号...",
						size:""
					},
					spuName: {
						type: "Input",
						label: "货品名称",
						prop: "spuName",
						width: "180px",
						placeholder: "请输入货品名称...",
						size:""
					},
					spuTypeCode: {
						type: "Select",
						label: "货品类型代码",
						prop: "spuTypeCode",
						width: "180px",
						options: [],
						change: function(v){
							console.log("当前值",v);
						}
					},
					brandCode: {
						type: "Select",
						label: "货品品牌代码",
						prop: "brandCode",
						width: "180px",
						options: [],
						change: function(v){
							console.log("当前值",v);
						}
					},
					brandName: {
						type: "Input",
						label: "货品品牌名称",
						prop: "brandName",
						width: "180px",
						placeholder: "请输入货品品牌名称...",
						size:""
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
							_this.queryList();
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.searchSkuForm.$refs.defaultMyForm.resetFields();
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
			};
		},
		methods: {
			queryList(){// 查询商品列表数据
			    let _this = this;
			    let uri = _this.uri;
			    console.log("searchData",_this.searchData);
			    console.log("page",_this.page);
			    _this.$http.post(uri,{
			        currentPage: _this.page.currentPage,
			        pageSize: _this.page.pageSize,
			        params: _this.searchData
			    }).then(function (res) {
			        _this.skuDataList = res.data.content;
			        _this.page.totalSize = res.data.totalSize;
			        _this.page.currentPage = res.data.currentPage;
			        _this.loading = false;
					
			    });
			},
			handleCurrentChange(val){// 分页组件当前页发生变化触发事件
			    let _this = this;
			    _this.loading = true;
			    _this.currentPage = val;
			    _this.queryList();
			},
			handleSizeChange(val){// 分页组件每页数据条数改变触发事件
			    let _this = this;
			    _this.loading = true;
			    _this.page.pageSize = val;
			    _this.queryList();
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
						_this.searchForm.spuTypeCode.options = data;
				    }
				);
			},
			searchSpuBrand(){/* 查询货品品牌 */
				let _this = this;
				CommInterface.searchSpuBrand(
					{delTag: businessConstant.NO},
				    function (data) {
						_this.searchForm.brandCode.options = data;
				    }
				);
			},
			add(){/* 新增 */
				let _this = this;
				CommInterface.goToPage(SystemConstant.consComponentPath.ADD_SKU, SystemConstant.consComponentName.ADD_SKU, {});
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
			_this.queryList();
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
	.infinite-list {
		padding-left: 16px;
		padding-top: 10px;
		/* background-color: red; */
	}
	.infinite-list-item {
		float: left;
		width: 24%;
		margin-right: 10px;
		height: 320px;
	}
</style>
