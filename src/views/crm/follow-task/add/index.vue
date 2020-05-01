<template>
  <div v-if="dialogVisible">
    <el-dialog :title="type === 'add' ? '新建跟进任务' : '编辑跟进任务'" :visible.sync="dialogVisible">
      <el-form ref="followArrange" :rules="rules" :model="followArrange" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户" prop="customerId">
          <el-row>
            <el-col :span="18">
              <customerSelect v-model="followArrange.customerId" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="联系人" prop="relationId">
          <el-row>
            <el-col :span="18">
              <el-select v-model="followArrange.relationId" placeholder="请选择联系人">
                <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button size="small" icon="el-icon-edit" @click="editRealtion">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="followArrange.arrangeName != null" label="安排人" prop="arrangeName">
          <el-row>
            <el-col :span="18">
              <el-input v-model="followArrange.arrangeName" readonly="readonly" type="text">{{ followArrange.arrangeName }}</el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="负责人" prop="chargeId">
          <el-row>
            <el-col :span="18">
              <employeeSelect v-model="followArrange.chargeId" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="跟进任务内容" prop="arrangeContent">
          <el-row>
            <el-col :span="18">
              <el-input v-model="followArrange.arrangeContent" type="textarea" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div style="margin-left:500px">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button v-if="type == 'edit'" size="small" type="primary" @click="editPlan('followArrange')">保存</el-button>
        <el-button v-else size="small" type="success" @click="add('followArrange')">添加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="联系人管理" :visible.sync="dialogFlag" append-to-body width="80%">
      <relation :cid="Cid" :updaterelation="updateRelation" />
    </el-dialog>
  </div>
</template>
<script>
import employeeSelect from '../../../public/employeeSelect/employeeSelect'
import customerSelect from '../../../public/customer/customerSelect/customerSelect'
import { arrangeDetail, updateArrange, addArrange } from '@/api/arrange'
import { getOneRelation } from '@/api/customer'
import { getEmployeeAll } from '@/api/employee'
import relation from '../../../public/relation/relation'
export default {
  components: {
    customerSelect,
    employeeSelect,
    relation
  },
  data() {
    return {
      dialogFlag: false,
      type: '',
      dialogVisible: false,
      followArrange: {
        arrangeContent: '',
        arrangeId: '',
        chargeId: '',
        relationId: ''
      },
      relationList: null,
      Cid: '',
      originRelationId: '', // 原始联系人Id
      loading: false,
      arrangeLoading: false,
      chargeLoading: false,
      rules: {
        customerId: [
          { required: true, message: '请选择客户', trigger: 'blur' }
        ],
        relationId: [
          { required: true, message: '请选择联系人', trigger: 'blur' }
        ],
        arrangeContent: [
          { required: true, message: '请输入任务内容', trigger: 'blur' }
        ]

      }
    }
  },
  watch: {
    'followArrange.customerId': function(newVal) {
      this.Cid = newVal
      if (newVal !== '') {
        this.getRelation()
      }
    }
  },
  methods: {
    show(item) {
      this.clearData()
      if (item && item.id) {
        this.type = 'edit'
        this.Aid = item.id
        this.Cid = item.customerId
        this.getArrange()
        this.getRelation()
      } else {
        this.type = 'add'
      }
      this.dialogVisible = true
    },
    getEmployee() {
      getEmployeeAll().then(res => {
        this.chargeOptions = res.data
        this.chargeFilter = res.data
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {

      })
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
    /**
      * 获取某条任务信息
      */
    getArrange() {
      if (this.type === 'edit') {
        const params = {
          id: this.Aid
        }
        arrangeDetail(params).then(res => {
          this.followArrange = res.data
          this.originRelationId = res.data.relationId
          this.followArrange.relationId = res.data.relationName
          if (this.type === 'edit') {
            this.Cid = res.data.customerId
          }
        // eslint-disable-next-line handle-callback-err
        }).catch(err => {

        })
      }
    },

    /**
      * 修改信息
      */
    editPlan(formName) {
      if (this.type === 'edit') {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (typeof this.followArrange.relationId === 'string') {
              // 没有选择其他的联系人 说明选的是默认的联系人
              this.followArrange.relationId = this.originRelationId
            }
            updateArrange(this.followArrange).then(res => {
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
          addArrange(this.followArrange).then(res => {
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

    /**
      * 点击取消
    */
    clearData() {
      this.followArrange = {
        arrangeId: '',
        chargeId: '',
        arrangeContent: '',
        relationId: '',
        customerId: ''
      }
    },
    cancel() {
      this.dialogVisible = false
      this.clearData()
    },
    editRealtion() {
      if (this.Cid) {
        this.dialogFlag = true
      } else {
        this.$message.error('请选择客户！')
      }
    },
    updateRelation() {
      this.getRelation()
    }
  }
}
</script>
