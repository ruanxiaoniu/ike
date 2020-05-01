<template>
    <el-select 
      @change="change" 
      :value="value" 
      size="small" 
      filterable
      remote
      reserve-keyword
      :remote-method="remoteMethod"
      placeholder="请选择负责人"
      :clearable="true">
        <el-option
          v-for="item in employeeOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
    </el-select>
</template>
<script>
import { getEmployeeAll } from '@/api/employee'
export default {
  props: ['value'],
  model: {
    value: 'value',
    event: 'change'
  },
  data() {
    return {
      employeeOptions: [],
      employeeFilter: [],
    }
  },
  created(){
    this.getEmployee()
  },
  methods: {
     getEmployee() {
      getEmployeeAll().then(res => {
        this.employeeOptions = res.data
        this.employeeFilter = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.employeeOptions = this.employeeFilter.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 100)
      } else {
        this.employeeOptions = this.employeeFilter
      }
    },
    change(val){
      this.$emit('change', val)
    }
  }
}
</script>