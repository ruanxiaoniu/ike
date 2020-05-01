<template>
  <div>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="负责人">
        <el-select v-model="employee" value-key="id" placeholder="请选择负责人">
          <el-option v-for="item in employeeOption" :label="item.employeeName" :value="item" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <br>
    <div style="text-align:center">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确认</el-button>
    </div>
  </div>
</template>
<script>
import { updateEmployee } from '@/api/customer'
import { getEmployeeAll } from '@/api/employee'
export default {
  props: ['value'],
  data(){
    return {
      employeeOption: [],
      beforeEid: '',
      Cid: '',
      employee: {
        id: '',
        employeeName: ''
      }
    }
  },
  watch: {
    'value': {
      immediate: true,
      handler: function() {        
        this.employee.id = this.value.employeeId
        this.employee.employeeName = this.value.employeeName
        this.beforeEid = this.value.employeeId
        this.Cid = this.value.id
        this.getEmployee()
      }
    }
  },
  methods: {
    getEmployee(){
      let params = this.employee
      getEmployeeAll().then(res => {
        console.log('res');
        console.log(res.data);
        const data = res.data
        data.forEach(item => {
          let ele = {
            id: item.id,
            employeeName: item.name
          }
          this.employeeOption.push(ele)
        })
      }).catch(err => {
      })
    },
    cancel(){
      this.$emit('hide')
    },
    submit(){
      let params = {
          Cid: this.Cid,
          beforeEid: this.beforeEid,
          afterEid: this.employee.id
      }      
      updateEmployee(params).then(res => {
        this.$emit('update')
        this.$message.success('修改成功！')
        this.$emit('hide')
      }).catch(() => {
      })
    }
  }
}
</script>
