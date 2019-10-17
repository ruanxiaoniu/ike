<template>
  <div>
   <el-form label-width="130px" label-position="left" :rules="rules" :model="form" ref="form">
      <el-form-item label="主联系人手机号" prop="landLinePhone">
         <el-input style="width:150px" v-model="form.landLinePhone"></el-input>
      </el-form-item>
      
    </el-form>
    <br>
    <div style="text-align:center">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="updateNumber('form')">确认</el-button>
    </div>
  </div>
</template>
<script>
import { updateNumber} from '@/api/customer'

export default {
  data() {
    return {
      
      rowList:null,
      message:'',
      form:{
        relationId:'',
        landLinePhone:'',
      },
      rules:{
        landLinePhone:[
          { required: true, message: '请输入联系方式', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
     this.rowList=this.$store.getters.customerRowList
     this.form.relationId=this.$store.getters.customerRowList.relationId
     this.form.landLinePhone=this.$store.getters.customerRowList.landLinePhone
    //  this.updatePhone()
  },
  methods:{
    updateNumber(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){//验证通过
            const params={
              Rid:this.form.relationId,
              number:this.form.landLinePhone
            }
            updateNumber(params).then(res=>{
              this.rowList.landLinePhone=this.form.landLinePhone;
              this.$store.dispatch('customer/setcustomerRowList',this.rowList)
              this.$store.dispatch('customer/setupdateDialogVisible',false)
              this.$message.success("修改成功！")
            }).catch(err=>{
              this.$message.error("修改失败，请重试！")
            })
        }else{
          return false
        }
      })
     
    },
    cancel(){
      this.$store.dispatch('customer/setupdateDialogVisible',false)
    },
    //表格验证
  }
}
</script>