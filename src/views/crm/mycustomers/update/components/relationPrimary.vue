<template>
  <div>
   <el-form label-width="130px" label-position="left" :rules="rules" :model="form" ref="form">
      <el-form-item label="主联系人手机号" prop="relationPhone">
         <el-input style="width:150px" v-model="form.relationPhone"></el-input>
      </el-form-item>
      
    </el-form>
    <br>
    <div style="text-align:center">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="updatePhone('form')">确认</el-button>
    </div>
  </div>
</template>
<script>
import { updatePrimary} from '@/api/customer'

export default {
  data() {
    return {
      
      rowList:null,
      message:'',
      form:{
        relationId:'',
        relationPhone:'',
      },
      rules:{
        relationPhone:[
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { min: 11, max:11,message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
     this.rowList=this.$store.getters.customerRowList
     this.form.relationId=this.$store.getters.customerRowList.relationId
     this.form.relationPhone=this.$store.getters.customerRowList.relationPhone
    //  this.updatePhone()
  },
  methods:{
    updatePhone(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){//验证通过
            const params={
              Rid:this.form.relationId,
              phone:this.form.relationPhone
            }
            updatePrimary(params).then(res=>{
              this.rowList.relationPhone=this.form.relationPhone;
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