<template>
    <div>
        <!-- 当info数据拿到之后再渲染子组件 -->
        <simple-detail-page v-if="toRender" :fieldList="fieldList" :info="info"></simple-detail-page>
    </div>
</template>

<script>
    import SimpleDetailPage from "@/components/common/SimpleDetailPage";
    import * as CommInterface from '@/components/utils/commInterface';
    import * as SystemConstant from '@/components/constant/systemConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant'

    export default {
        name: "UserDetail",
        components:{
            "simple-detail-page": SimpleDetailPage
        },
        data(){
            return {
                fieldList:[
                    { name: "id", fieldName: "ID", type: "text", fieldValue: "" },
                    { name: "name", fieldName: "姓名", type: "text", fieldValue: "" },
                    // { name: "pass", fieldName: "密码", fieldValue: "" }, // 密码不让看了
                    { name: "age", fieldName: "年龄", type: "text", fieldValue: "" },
                    { name: "likes", fieldName: "爱好", type: "array", fieldValue: [], transformation: BusinessConstant.CODE_TYPE.LIKES },
                    { name: "sex", fieldName: "性别", type: "text", fieldValue: "", transformation: BusinessConstant.CODE_TYPE.SEX },
                    { name: "birthday", fieldName: "生日", type: SystemConstant.dataType.DATE, fieldValue: "", format: SystemConstant.common.YYYY_MM_DD, formatDate:SystemConstant.common.FORMAT_DATE },
                    { name: "qq", fieldName: "qq号", type: "text", fieldValue: "" },
                    { name: "weChat", fieldName: "微信号", type: "text", fieldValue: "" },
                    { name: "email", fieldName: "邮箱", type: "text", fieldValue: "" },
                    { name: "education", fieldName: "学历", type: "text", fieldValue: "", transformation: BusinessConstant.CODE_TYPE.EDUCATION},
                    { name: "headPortraitUrl", fieldName: "头像", type: "image", fieldValue: "" },
                    { name: "createUser", fieldName: "创建人", type: "text", fieldValue: "" },
                    { name: "createTime", fieldName: "创建时间", type: SystemConstant.dataType.DATE, fieldValue: "", formatDate:SystemConstant.common.FORMAT_DATE},
                    { name: "updateUser", fieldName: "修改人", type: "text", fieldValue: "" },
                    { name: "updateTime", fieldName: "修改时间", type: SystemConstant.dataType.DATE, fieldValue: "", formatDate:SystemConstant.common.FORMAT_DATE}
                ],
                info:{},
                toRender: false
            };
        },
        methods:{
            queryInfo(id){
                let the = this;
                CommInterface.sendPost(
                    SystemConstant.consUserManage.QUERY_USER_BY_ID,
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
        created: function () {
            let the = this;
            let id = the.$route.params.id;
			console.log("the.$route",the.$route);
            the.queryInfo(id);
        },
        mounted() {
            let the = this;
            // let id = the.$route.query.id;
            // the.id = id;
            // the.queryUserInfo(id);
        }
    }
</script>

<style scoped>

</style>
