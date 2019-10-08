<template>
  <div>
     <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible:false,//是否显示弹出框
      dialogStatus: '',//修改的类型
      textMap:{//动态修改弹出框的标题
        product_name:"修改产品名称",
        customer_num:""
      }
    }
  },
}
</script>