<template>
  <div v-if="dialogVisivle">
    <el-dialog title="客户投诉详情" :visible.sync="dialogVisivle">
        <el-form ref="complaintVo" :model="complaintVo" label-position="left" label-width="180px" style="width: 400px; margin-left:50px;">
      <el-form-item label="编号" prop="id">
        <span>{{complaintVo.id}}</span>
      </el-form-item>
      <el-form-item label="客户" prop="customerName">
        <span>{{complaintVo.customerName}}</span>
      </el-form-item>
      <el-form-item label="客户联系人" prop="relationName">
        <span>{{complaintVo.relationName}}</span>
      </el-form-item>
      <el-form-item label="投诉时间" prop="complaintTime">
          <span>{{complaintVo.complaintTime | formatDate }}</span>
      </el-form-item>
      <el-form-item label="投诉标题" prop="complaintTheme">
        <span>{{complaintVo.complaintTheme}}</span>
      </el-form-item>
      <el-form-item label="投诉内容" prop="complaintContent">
        <span>{{complaintVo.complaintContent}}</span>
      </el-form-item>
      <el-form-item label="投诉方式" prop="complaintMethod">
        <span>{{complaintVo.complaintMethod}}</span>
      </el-form-item>
      <el-form-item label="紧急程度" prop="urgencyLevel">
        <span>{{complaintVo.urgencyLevel}}</span>
      </el-form-item>
      <el-form-item label="录入时间" prop="createTime">
        <span>{{complaintVo.createTime  | formatDate}}</span>
      </el-form-item>
      <el-form-item label="录入人" prop="creatorName">
        <span>{{complaintVo.creatorName}}</span>
      </el-form-item>
      <el-form-item label="修改时间" prop="modifyTime">
        <span>{{complaintVo.modifyTime  | formatDate}}</span>
      </el-form-item>
      <el-form-item label="修改人" prop="modifierName">
        <span>{{complaintVo.modifierName}}</span>
      </el-form-item>
    </el-form>
    </el-dialog>
  
  </div>

</template>
<script>

  import moment from 'moment'
  import { getComplaintById } from '@/api/complaint'
  import {parseTime} from '@/utils/formateDate'

  export default {
    props: ['type'],
    data() {
      return {
        // complaintId: '',
        complaintVo: {
          modifierName: '',
          modifyTime: '',
          creatorName: '',
          createTime: '',
          urgencyLevel: '',
          complaintMethod: '',
          complaintContent: '',
          complaintTheme: '',
          complaintTime: '',
          relationName: '',
          customerName: '',
          id: ''
        },
        dialogVisivle: false
      }
    },
    filters: {
      formatDate(time) {
        return parseTime(time)
      }
    },
    methods: {
      show(id) {
        if(id){
          this.clearData()
          this.setComplaint(id)
          this.dialogVisivle = true
        }
      },
      clearData(){
        this.complaintVo = {
          modifierName: '',
          modifyTime: '',
          creatorName: '',
          createTime: '',
          urgencyLevel: '',
          complaintMethod: '',
          complaintContent: '',
          complaintTheme: '',
          complaintTime: '',
          relationName: '',
          customerName: '',
          id: ''
        }
      },
      setComplaint(id) {
        getComplaintById(id).then(response => {
          this.complaintVo = response.data
        })
      },
      // setComplaintHandle(complaintId) {

      // }
    }
  }
</script>
<style scoped>
</style>
