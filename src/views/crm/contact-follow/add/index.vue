<template>
  <div v-if="dialogVisible">
    <el-dialog title="新建" :visible.sync="dialogVisible">
      <el-form ref="customer" :rules="rules" :model="customer" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户：" prop="customerId">
          <el-row>
            <el-col :span="18">
              <customerSelect v-model="customer.customerId" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="联系人：" prop="relationId">
          <el-row>
            <el-col :span="18">
              <el-select v-model="customer.relationId" placeholder="请选择联系人" :clearable="true">
                <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button size="small" icon="el-icon-edit" @click="editRealtion">编辑</el-button>
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item label="跟进时间：" prop="followTime">
          <el-row>
            <el-col :span="18">
              <el-date-picker
                v-model="customer.followTime"
                type="datetime"
                placeholder="选择跟进时间"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="跟进方式" prop="followWay">
          <el-row>
            <el-col :span="18">
              <el-input v-model="customer.followWay" :clearable="true" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="跟进细节" prop="followDetail">
          <el-input v-model="customer.followDetail" type="textarea" :clearable="true" />
        </el-form-item>
        <el-form-item label="跟进结果" prop="followResult">
          <el-row>
            <el-col :span="18">
              <el-input v-model="customer.followResult" :clearable="true" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div style="margin-left:500px">
        <el-button size="small" @click="dialogVisible = !dialogVisible">取消</el-button>
        <el-button size="small" type="primary" @click="add('customer')">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog title="联系人管理" :visible.sync="dialogFlag" append-to-body width="80%">
      <relation :cid="Cid" :updaterelation="updateRelation" />
    </el-dialog>
  </div>
</template>
<script>
import relation from '../../../public/relation/relation'
import { getOneRelation } from '@/api/customer'
import customerSelect from '../../../public/customer/customerSelect/customerSelect'
import { addFollow } from '@/api/follow'
export default {
  components: {
    relation,
    customerSelect
  },
  data() {
    return {
      dialogVisible: false,
      relationList: null,
      Cid: '',
      dialogFlag: false,
      customer: {
        followResult: '',
        followDetail: '',
        followWay: '',
        followTime: '',
        relationId: '',
        customerId: ''
      },
      rules: {
        followResult: [
          { required: true, message: '请输入跟进结果', trigger: 'blur' }
        ],
        followTime: [
          { required: true, message: '请选择跟进时间', trigger: 'blur' }
        ],
        relationId: [
          { required: true, message: '请选择联系人', trigger: 'blur' }
        ],
        customerId: [
          { required: true, message: '请选择客户', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'customer.customerId': function(newVal) {
      this.Cid = newVal
      this.relationList = []
      if (newVal) {
        this.getRelation()
      }
    }
  },
  methods: {
    show() {
      this.cleaData()
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
    handle(type) {
      this.title = type
      this.dialogFlag = true
    },
    cleaData() {
      this.customer = {
        followResult: '',
        followDetail: '',
        followWay: '',
        followTime: '',
        relationId: '',
        customerId: ''
      }
    },
    /**
    * 提交添加
    */
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addFollow(this.customer).then(res => {
            this.$message.success('添加成功！')
            this.$emit('updatelist')
            this.dialogVisible = false
            this.cleaData()
          // eslint-disable-next-line handle-callback-err
          }).catch(err => {
            this.$message.error('添加失败！')
          })
        } else {
          return false
        }
      })
    },
    /**
     * 更新联系人列表
     */
    updateRelation() {
      this.getRelation()
      // this.dialogFlag=false
    },
    /**
     * 编辑联系人
     */
    editRealtion() {
      if (this.Cid) {
        this.dialogFlag = true
        // this.getRelation()
      } else {
        this.$message.error('请选择客户！')
      }
    }
  }

}
</script>
