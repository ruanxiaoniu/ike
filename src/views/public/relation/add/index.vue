<template>
  <div v-if="dialogVisible">
    <el-dialog :title="type == 'edit' ? '修改联系人': '新建联系人'" :visible.sync="dialogVisible" :append-to-body="true">
       <el-form :model="relation" :rules="rules" ref="relation" label-position="right" label-width="130px">
      <el-form-item label="姓名：" prop="relationName">
        <el-input v-model="relation.relationName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="relationSex">
        <el-radio v-model="relation.relationSex" :label="female">男</el-radio>
        <el-radio v-model="relation.relationSex" :label="male">女</el-radio>
      </el-form-item>
      <el-form-item label="职务：" prop="relationPosition">
        <el-input v-model="relation.relationPosition" size="small"></el-input>
      </el-form-item>
      <el-form-item label="称呼：" prop="relationCall">
        <el-input v-model="relation.relationCall" size="small"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="relationPhone">
        <el-input v-model="relation.relationPhone" size="small"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="relationEmail">
        <el-input v-model="relation.relationEmail" type="email"></el-input>
      </el-form-item>
      <el-form-item label="座机号：" prop="landlineNumber">
        <el-input v-model="relation.landlineNumber" size="small"></el-input>
      </el-form-item>
      <el-form-item label="是否主联系人：" prop="relationPrimary">
        <el-radio v-model="relation.relationPrimary" :label="primary">是</el-radio>
        <el-radio v-model="relation.relationPrimary" :label="notprimary">否</el-radio>
      </el-form-item>
    </el-form>
    <div style="margin-left:300px;">
      <el-button size="small" @click="dialogVisible = !dialogVisible">取消</el-button>
      <el-button v-if="type == 'edit'" size="small" type="primary" @click="handle('relation')">保存修改</el-button>
       <el-button v-else size="small"  type="primary" @click="handle('relation')">新建</el-button>
    </div>
    </el-dialog>
   
  </div>
</template>
<script>
import {createRelation,updateRelation,getRelationDetail} from '@/api/relation'
export default {
  props:['Cid'],
  data() {
    return {
      dialogVisible: false,
      params:{
        id:''
      },
      relation:{
        relationName:'',
        relationSex:'',
        relationPosition:'',
        relationCall:'',
        relationPhone:'',
        relationEmail:'',
        relationPrimary:'',
        landlineNumber:'',
        customerId:''
      },
      rules:{
        relationEmail:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
          {type:'email',message:'请输入正确的邮箱',trigger:'blur'}
        ],
        relationName:[
          {required:true,message:'请输入姓名',trigger:'blur'},
        ],
        relationSex:[
          {required:true,message:'请选择性别',trigger:'blur'},
        ],
        relationPhone:[
          {required:true,message:'请输入手机号',trigger:'blur'},
          {min:11,max:11,message:'请输入正确的手机号',trigger:'blur'},
        ],
        relationPrimary:[
          {required:true,message:'请选择是否主联系人',trigger:'blur'},
        ]
        
      },
      female:true,
      male:false,
      primary:0,
      notprimary:1,
      type: ''
    }
  },
  watch: {
  },
  methods: {
    show(id){
      this.clearData()
      if(id){
        this.$nextTick(() => {
          this.type = 'edit'
          this.params.id = id
          this.getOneRelation()
        })
       
      }else{
        this.type = 'add'
      }
      this.dialogVisible = true
    },
    /**
     * 获取某个联系人信息
     */
    getOneRelation(){
      getRelationDetail(this.params).then(res=>{
        this.relation=res.data
      }).catch(err=>{

      })
    },
    cancel(){
      this.$emit('setdialog')
    },
    clearData(){
      this.relation={
        relationName:'',
        relationSex:'',
        relationPosition:'',
        relationCall:'',
        relationPhone:'',
        relationEmail:'',
        relationPrimary:'',
        landlineNumber:'',
        customerId:''
      }
    },
    handle(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          if(this.relation.id){//修改
             updateRelation(this.relation).then(res=>{
               this.$message.success('修改成功！')
               this.$emit('updatelist')
               this.clearData()
               this.dialogVisible  = false
             }).catch(err=>{
               this.$message.error('修改失败，请重试！')
             })
          }else{//添加
             this.relation.customerId=this.Cid
             createRelation(this.relation).then(res=>{
              this.$message.success('新建成功！')
              this.dialogVisible = false
              this.$emit('updatelist')
              this.clearData()
             }).catch(err=>{

             })
          }
        }else{
          return false
        }
      })
      
    }
  },
}
</script>