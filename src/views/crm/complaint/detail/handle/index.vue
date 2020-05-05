<template>
  <div>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column type="selection" align="center"/>
      <el-table-column v-loading="loading" align="center" label="处理详情" min-width="150px"
                       element-loading-text="请给我点时间！" prop="handleDetail">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.handleDetail}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center" label="处理结果" prop="handleResult">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.handleResult === 0 ? '未处理' : '已处理'}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center" label="处理人" prop="handlerName">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.handlerName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" align="center" label="处理时间" prop="handleTime">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.handleTime}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>

  import moment from 'moment'
  import pagination from '@/components/Pagination'
  import { getHandlesById } from '@/api/complaint'
import {parseTime} from '@/utils/formateDate'

  export default {
    components:{
      pagination,
      moment
    },
    props: ['type'],
    data() {
      return {
        complaintId: '',
        list: null
      }
    },
    created() {
      this.complaintId = this.$store.getters.complaintRowList.id
      this.getHandleListById(this.complaintId)
    },
    filters: {
      formatDate(time) {
        return parseTime(time)
      }
    },
    methods: {
      getHandleListById(id) {
        getHandlesById(id).then(response => {
          this.list = response.data
        })
      }
    }
  }
</script>
<style scoped>
</style>
