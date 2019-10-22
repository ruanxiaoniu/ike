<template>
<div>
   <div>
      <el-select 
        size="small" 
        v-model="selection" 
        placeholder="请选择" 
        filterable
        remote
        reserve-keyword
        :remote-method="remoteMethod"
      >
        <el-option-group>
          <el-option label="所有成员" value="所有成员"></el-option>
        </el-option-group>
        <el-option-group label="指定成员">
          <el-option v-for="(item) in employeeOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>

        </el-option-group>
     </el-select>
      <el-button size="small" icon="el-icon-search" @click="handle('search')">
            搜索
      </el-button>
       <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="handle('add')" >
        新建
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-upload" @click="handleDownload">
        导入
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-document" @click="handleDownload">
        导出
      </el-button>
    </div>
    <p></p>
  <baseData></baseData>
  <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
  <el-dialog title="搜索" :visible.sync="showDialogFlag" v-if="operation_type=='search'">
    <search></search>
  </el-dialog>
  <el-dialog v-else title="新建跟进" :visible.sync="showDialogFlag">
    <add></add>
  </el-dialog>

</div>
  
</template>

<script>
import {getEmployeeAll} from '@/api/employee'
import pagination from '@/components/Pagination'
import baseData from '../../../public/follow/base'
import search from '../search/index'
import add from '../add/index'

export default {
  components:{
    pagination,
    baseData,
    search,
    add
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      employeeOptions:null,
      employeeFilter:null,
      operation_type:'search',//判断是修改还是其他操作,update为修改
      selection:'所有成员',
      list: null,
      total:0,
      title:'',
      showDialogFlag:false,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      loading: false,
      textMap:{
        search:'搜索',
        add:'新增客户',
      },
      
    }
  },
  created() {    
    this.getEmployee()
  },
  methods: {
    
    
  }
}
</script>

