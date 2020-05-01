<template>
  <div v-if="dialogVisible">
    <el-dialog title="新建投诉" :visible.sync="dialogVisible">
      <el-form ref="complaint" :rules="rules" :model="complaint" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="负责人" prop="chargeId">
          <el-row>
            <el-col :span="18">
              <employeeSelect v-model="complaint.chargeId" />
            </el-col>
          </el-row>
        </el-form-item>
         <el-form-item label="客户" prop="customerId">
          <el-row>
            <el-col :span="18">
              <customerSelect v-model="complaint.customerId" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="联系人" prop="relationId">
          <el-row>
            <el-col :span="18">
              <el-select v-model="relation" placeholder="请选择联系人" value-key="id" @change="changeRelation">
                <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button size="small" icon="el-icon-edit" @click="editRealtion">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
         <el-form-item label="客户联系方式" prop="complaintPhone">
          <el-input v-model="complaint.complaintPhone" :disabled="true"/>
        </el-form-item>
        <el-form-item label="投诉时间" prop="complaintTime">
          <el-row>
            <el-col :span="18">
               <el-date-picker
                v-model="complaint.complaintTime"
                type="datetime"
                placeholder="选择客户投诉时间"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投诉类型" prop="complaintType">
          <el-row>
            <el-col :span="18">
              <el-select placeholder="选择投诉类型" v-model="complaint.complaintType">
                <el-option value="服务投诉" label="服务投诉"></el-option>
                 <el-option value="产品投诉" label="产品投诉"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投诉方式" prop="complaintMethod">
          <el-row>
            <el-col :span="18">
              <el-select placeholder="选择投诉方式" v-model="complaint.complaintMethod">
                <el-option value="电话" label="电话"></el-option>
                <el-option value="短信" label="短信"></el-option>
                <el-option value="上门投诉" label="上门投诉"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投诉标题" prop="complaintTheme">
          <el-row>
            <el-col :span="18">
              <el-input v-model="complaint.complaintTheme" />
            </el-col>
          </el-row>
        </el-form-item>
        
        <el-form-item label="投诉内容" prop="complaintContent">
          <el-row>
            <el-col :span="18">
              <el-input v-model="complaint.complaintContent" type="textarea" />
            </el-col>
          </el-row>
        </el-form-item>
         <el-form-item label="紧急程度" prop="complaintTheme">
          <el-row>
            <el-col :span="18">
               <el-select placeholder="选择紧急程度" v-model="complaint.urgencyLevel">
                <el-option value="一般" label="一般"></el-option>
                <el-option value="紧急" label="紧急"></el-option>
                <el-option value="非常紧急" label="非常紧急"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div style="margin-left:500px">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button v-if="planId" size="small" type="primary" @click="editPlan('followPlan')">保存</el-button>
        <el-button v-else size="small" type="success" @click="add">添加</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog :title="textMap[title]" :visible.sync="dialogFlag" append-to-body>
      <level v-if="title=='level'" />
      <stage v-else-if="title=='stage'" />
      <origin v-else />
    </el-dialog> -->
  </div>
</template>
<script>
// import level from '../../../public/customer/level'
// import stage from '../../../public/customer/stage'
// import origin from '../../../public/customer/origin'
import customerSelect from '../../../public/customer/customerSelect/customerSelect'
import employeeSelect from '../../../public/employeeSelect/employeeSelectNotAll'
import { getOneRelation } from '@/api/customer'
import { addComplaint } from '@/api/complaint'
export default {
  components: {
    // level,
    // stage,
    // origin,
    employeeSelect,
    customerSelect
  },
  data() {
    return {
      title: '',
      relation: {
        id: '',
        relationPhone: '',
      },
      relationList: null,
      Cid: '',
      dialogVisible: false,
      dialogFlag: false,
      complaint: {
        complaintContent: '',
        complaintTheme: '',
        complaintPhone: '',
        complaintType: '',
        complaintTime: '',
        customerId: '',
        relationId:'',
        chargeId: '',
        complaintMethod: ''
      }
    }
  },
  watch: {
    'complaint.customerId': function(newVal) {
      this.Cid = newVal
      if (newVal !== '') {
        this.getRelation()
      }
    }
  },
  methods: {
    handle(type) {
      this.title = type
      this.dialogFlag = true
    },
    show() {
      this.dialogVisible = true
    },
      /**
      获取所有客户联系人信息
      */
    getRelation() {
      const params = {
        Cid: this.Cid
      }
      getOneRelation(params).then(res => {
        this.relationList = res.data
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {

      })
    },
    changeRelation(val) {
      console.log('lainxiren');
      console.log(val);
      
      this.complaint.complaintPhone = val.relationPhone
    },
    add(){
      this.complaint.relationId = this.relation.id
      console.log('complaint');
      console.log(this.complaint);
      
      addComplaint(this.complaint).then(res => {
        this.$emit('updatelist')
        this.$message.success('新增成功！')
        this.dialogVisible = false
      }).catch(err => {
        this.$message.error('新增失败，请重试！')
      })
    }
  }
}
</script>
