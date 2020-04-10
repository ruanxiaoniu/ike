<template>
  <el-select
    :value="value"
    filterable
    remote
    reserve-keyword
    style="width:100%"
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="change"
    :clearable="true"
    >
      <el-option
        v-for="item in customerOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
</template>
<script>
import { getCustomerInfo, getOneRelation } from '@/api/customer'
export default {
  props: ['value'],
  model: {
    value: 'value',
    event: 'change'
  },
  data() {
    return {
      customerOptions: [],
      customerFilter: [],
      loading: false,
    }
  },
  created(){
    this.getCustomer()
  },
  methods: {
     getCustomer() {
      console.log('kehu xinxi ')
      getCustomerInfo().then(res => {
        this.customerOptions = res.data
        this.customerFilter = res.data
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {

      })
    },
     remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.customerOptions = this.customerFilter.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 100)
      } else {
        this.customerOptions = this.customerFilter
      }
    },
    change(val){
      this.$emit('change', val)
    }
  }
}
</script>