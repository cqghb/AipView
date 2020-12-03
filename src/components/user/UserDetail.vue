<template>
    <div>
        <simple-detail-page :dataArr="dataArr" uri="/queryUserById" :id="id"></simple-detail-page>
    </div>
</template>

<script>
    import SimpleDetailPage from "@/components/common/SimpleDetailPage";
    export default {
        name: "UserDetail",
        components:{
            "simple-detail-page": SimpleDetailPage
        },
        data(){
            return {
                id:"",
                dataArr:[
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

        },
        created: function () {
            let the = this;
            let id = the.$route.params.id;
            the.id = id;
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
