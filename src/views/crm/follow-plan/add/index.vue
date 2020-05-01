<template>
  <div v-if="dialogVisible">
    <el-dialog title="新建跟进计划" :visible.sync="dialogVisible">
      <el-form ref="followPlan" :rules="rules" :model="followPlan" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户" prop="customerId">
          <el-row>
            <el-col :span="18">
              <customerSelect v-model="followPlan.customerId" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="联系人" prop="relationId">
          <el-row>
            <el-col :span="18">
              <el-select v-model="followPlan.relationId" placeholder="请选择联系人" :clearable="true">
                <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button size="small" icon="el-icon-edit" @click="editRealtion">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="跟进计划时间" prop="planDate">
          <el-row>
            <el-col :span="18">
              <el-date-picker
                v-model="followPlan.planDate"
                type="datetime"
                placeholder="选择跟进计划时间"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="跟进计划内容" prop="planContent">
          <el-row>
            <el-col :span="18">
              <el-input v-model="followPlan.planContent" type="textarea" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div style="margin-left:500px">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button v-if="planId" size="small" type="primary" @click="editPlan('followPlan')">保存</el-button>
        <el-button v-else size="small" type="success" @click="add('followPlan')">添加</el-button>
      </div>
    </el-dialog>

    <el-dialog title="联系人管理" :visible.sync="dialogFlag" append-to-body width="80%">
      <relation :cid="Cid" :updaterelation="updateRelation" />
    </el-dialog>
  </div>
</template>
<script>
import { updatePlan, planDetail, addPlan } from '@/api/follow'
import { getOneRelation } from '@/api/customer'
import relation from '../../../public/relation/relation'
import customerSelect from '../../../public/customer/customerSelect/customerSelect'
export default {
  components: {
    customerSelect,
    relation
  },
  data() {
    return {
      dialogFlag: false,
      dialogVisible: false,
      followPlan: {
        planDate: '',
        planContent: '',
        relationId: '',
        customerId: ''
      },
      relationList: null,
      relation: {
        relationId: '',
        relationName: ''
      },
      Cid: '',
      originRelationId: '', // 原始联系人Id
      loading: false,
      rules: {
        customerId: [
          { required: true, message: '请选择客户', trigger: 'blur' }
        ],
        relationId: [
          { required: true, message: '请选择联系人', trigger: 'blur' }
        ],
        planDate: [
          { required: true, message: '请输入计划时间', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'followPlan.customerId': function(newVal) {
      this.Cid = newVal
      if (newVal !== '') {
        console.log(newVal)
        this.getRelation()
      }
    }
  },
  methods: {
    show(item) {
      this.clearData()
      if (item && item.id) {
        this.planId = item.id
        this.getPlan()
      }
      this.dialogVisible = true
    },
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
    getPlan() {
      const params = {
        id: this.planId
      }
      planDetail(params).then(res => {
        this.followPlan = res.data
        this.originRelationId = res.data.relationId
        this.followPlan.relationId = res.data.relationName
        this.Cid = res.data.customerId
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {

      })
    },
    clearData() {
      this.followPlan = {
        planDate: '',
        planContent: '',
        relationId: '',
        customerId: ''
      }
    },
    editPlan(formName) {
      if (this.planId) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (typeof this.followPlan.relationId === 'string') {
              this.followPlan.relationId = this.originRelationId
            }
            updatePlan(this.followPlan).then(res => {
              this.$message.success('修改成功！')
              this.$emit('updatelist')
              this.dialogVisible = false
              this.clearData()
            }).catch(err => {
              console.log(err)
            })
          } else {
            return false
          }
        })
      }
    },
    /**
      * 添加计划信息
      */
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addPlan(this.followPlan).then(res => {
            this.$message.success('添加成功！')
            this.$emit('updatelist')
            this.dialogVisible = false
            this.clearData()
          // eslint-disable-next-line handle-callback-err
          }).catch(err => {
            this.$message.error('添加失败，请重试')
          })
        } else {
          return false
        }
      })
    },
    cancel() {
      this.dialogVisible = false
      this.clearData()
    },
    /**
     * 编辑联系人
     */
    editRealtion() {
      if (this.Cid) {
        this.dialogFlag = true
      } else {
        this.$message.error('请选择客户！')
      }
    },
    /**
     * 更新联系人列表
     */
    updateRelation() {
      this.getRelation()
    }
  }
}
</script>
