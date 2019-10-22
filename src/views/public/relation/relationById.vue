<template>
  <div>
    <el-form label-position="right" :model="relationList" label-width="110px">
      <el-form-item label="姓名：">
        <span>{{relationList.relationName}}</span>
      </el-form-item>
      <el-form-item label="性别：">
        <span>{{relationList.relationSex}}</span>
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
  </div>
</template>
<script>
import {getRelationDetail} from '@/api/customer'
export default {
  props:['Rid'],
  data() {
    return {
      relationList:null,
      params:{
        id:'',
      }
    }
  },
  created() {
    if(this.Rid){
      this.params.id=this.Rid
    }
    this.getRelation()
  },
  watch:{
    Rid(newVal){
      this.params.id=newVal
       this.getRelation()
    }
  },
  methods:{
    getRelation(){
      getRelationDetail(this.params).then((res) => {
        this.relationList=res.data
      }).catch((err) => {
        
      });
    }
  }
}
</script>