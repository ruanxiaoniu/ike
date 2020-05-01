<template>
  <div v-if="dialogVisible">
    <el-dialog title="联系人详情" :visible.sync="dialogVisible">
       <el-form label-position="right" :model="relationList" label-width="110px">
      <el-form-item label="姓名：">
        <span>{{relationList.relationName}}</span>
      </el-form-item>
      <el-form-item label="性别：">
        <span v-if="relationList.relationSex == false">女</span>
        <span v-else>男</span>
      </el-form-item>
      <el-form-item label="职务：">
        <span>{{relationList.relationPosition}}</span>
      </el-form-item>
       <el-form-item label="称呼：">
        <span>{{relationList.relationCall}}</span>
      </el-form-item>
       <el-form-item label="手机号：">
        <span>{{relationList.relationPhone}}</span>
      </el-form-item>
       <el-form-item label="邮箱：">
        <span>{{relationList.relationEmail}}</span>
      </el-form-item>
       <el-form-item label="是否主联系人：">
          <span v-if="relationList.relationPrimary==0">否</span>
          <span v-else>是</span>
      </el-form-item>
      <el-form-item label="座机号：">
        <span>{{relationList.landlineNumber}}</span>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {getRelationDetail} from '@/api/customer'
export default {
  // props:['Rid'],
  data() {
    return {
      relationList:{
        landlineNumber: '',
        relationPrimary: '',
        relationEmail: '',
        relationPhone: '',
        relationCall: '',
        relationPosition: '',
        relationSex: '',
        relationName: ''
      },
      params:{
        id:'',
      },
      dialogVisible: false,
    }
  },
  // created() {
  //   if(this.Rid){
  //     this.params.id=this.Rid
  //   }
  //   this.getRelation()
  // },
  // watch:{
  //   Rid(newVal){
  //     this.params.id=newVal
  //      this.getRelation()
  //   }
  // },
  methods:{
    show(id){
      if(id){
        this.params.id = id
        this.getRelation()
        this.dialogVisible = true
      }
    },
    clearData(){
      this.relationList = {
        landlineNumber: '',
        relationPrimary: '',
        relationEmail: '',
        relationPhone: '',
        relationCall: '',
        relationPosition: '',
        relationSex: '',
        relationName: ''
      }
    },
    getRelation(){
      getRelationDetail(this.params).then((res) => {
        this.relationList=res.data
      }).catch((err) => {
        
      });
    }
  }
}
</script>