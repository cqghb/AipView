<template>
    <div>
        <simple-detail-page :infoArr="infoArr"></simple-detail-page>
    </div>
</template>

<script>
    import SimpleDetailPage from "@/components/common/SimpleDetailPage";
    import * as CommInterface from '@/components/utils/commInterface';
    import * as SystemConstant from '@/components/constant/systemConstant';

    export default {
        name: "UserDetail",
        components:{
            "simple-detail-page": SimpleDetailPage
        },
        data(){
            return {
                infoArr:[
                    { name: "id", fieldName: "ID", fieldValue: "" },
                    { name: "name", fieldName: "姓名", fieldValue: "" },
                    { name: "pass", fieldName: "密码", fieldValue: "" },
                    { name: "createUser", fieldName: "创建人", fieldValue: "" },
                    { name: "createTime", fieldName: "创建时间", fieldValue: "" },
                    { name: "updateUser", fieldName: "修改人", fieldValue: "" },
                    { name: "updateTime", fieldName: "修改时间", fieldValue: "" }

                ]
            };
        },
        methods:{
            queryInfo(id){
                let the = this;
                CommInterface.getUserById(
                    SystemConstant.consUserManage.QUERY_USER_BY_ID,
                    {
                        id: id
                    },
                    the.infoArr
                );
            },
        },
        created: function () {
            let the = this;
            let id = the.$route.params.id;
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
