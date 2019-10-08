<template>
  <div class="app-container">
    <div>
      <el-button
            size="small"
            icon="el-icon-search"
            @click="search"
          >
            搜索
      </el-button>
      <el-button  size="small"  icon="el-icon-delete">
            删除
      </el-button>
    </div>
    <p></p>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @cell-click="setStatus"
      @selection-change="handleSelectionChange"
    >
      <el-table-column  type="selection" align="center"  />
      <el-table-column align="center" label="产品名称" min-width="187" >
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.product_name }}</span>
          
        </template>
      </el-table-column>
      <el-table-column label="意向客户数" width="110" >
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.customer_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成交数量" width="100" align="center" >
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.order_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成交总额度" width="100" align="center" >
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.total_price }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="成交次数" width="100" align="center" >
        <template slot-scope="scope">
          <span class="link-type">  {{ scope.row.order_num }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="成交成本总额" width="110" >
        <template slot-scope="scope">
          <span class="link-type">   {{ scope.row.cost }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="成交总利润" width="100" >
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.profit }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="display_time" label="录入时间" min-width="200" >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="录入人" width="100" >
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.create_user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="成交客户数" width="100">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.success_count }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

    <searchdialog v-if="flag"></searchdialog>
    <showdialog v-else></showdialog>
  </div>
</template>

<script>
import {getProductList} from '@/api/product'
import showdialog from './show/index'
import searchdialog from './search/index'
import pagination from '@/components/Pagination'
export default {
  components:{
    showdialog,
    searchdialog,
    pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      multipleSelection: [],
      list: null,
      listLoading: true,
      flag:false,//是否点击搜索
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // console.log(this.listQuery)
      getProductList(this.listQuery).then(response=>{
        console.log(response.data.items)
        this.list = response.data.items

        this.listLoading = false
         this.total = response.data.total
      })
    },
    setStatus(row, column, cell, event){
      
      this.$store.dispatch('product/setRowList',row)
      if(column.label==="产品名称"){//显示改产品详情
        
        this.$store.dispatch('product/setStatus','product_detail')
        this.$store.dispatch('product/setDialogStatus',true)
      }else if(column.label==="成交数量"||column.label==="成交总额度"||column.label==="成交次数"||column.label==="成交成本总额"||column.label==="成交总利润"){
        this.$store.dispatch('product/setStatus','deal_detail')
        this.$store.dispatch('product/setDialogStatus',true)
      }else if(column.label==="意向客户数"||column.label==="成交客户数"){//显示客户详情
         this.$store.dispatch('product/setStatus','customer_detail')
         this.$store.dispatch('product/setDialogStatus',true)
      }else if(column.label==="录入人"){
        this.$store.dispatch('product/setStatus','personal_detail')
        this.$store.dispatch('product/setDialogStatus',true)
      }
      this.flag=false
    },
    search(){
       
       this.$store.dispatch('product/setDialogStatus',true)
       this.flag=true
    },
     handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
  }
}
</script>
