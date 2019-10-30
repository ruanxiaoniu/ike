<template>
  <div>
    <el-table :data="orderList" border fit highlight-current-row style="width: 100%">
   <el-table-column  type="selection" align="center"  />

    <el-table-column label="下单时间" min-width="120px" prop="orderTime" align="center">
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'orderDetail')">{{ scope.row.orderTime }}</span>
      </template>
    </el-table-column>

    <el-table-column label="负责人" min-width="70px" prop="employeeName" align="center">
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'employee')">{{ scope.row.employeeName }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="客户联系人" prop="relationName" >
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'relation')">{{ scope.row.relationName}}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="80px" label="成交总额" prop="orderActualTotal" align="center">
       <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ scope.row.orderActualTotal }}</span>
      </template>
    </el-table-column>

   <el-table-column align="center" label="总成本" width="90px" prop="orderCost" >
      <template slot-scope="scope">
        <span class="link-type" @click="operation(scope.row,'orderProduct')">{{ scope.row.orderCost }}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="创建时间" min-width="120px" prop="createTime" align="center">
      <template slot-scope="scope">
        <span class="link-type">{{ scope.row.createTime }}</span>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button size="small" type="success" @click="chose(scope.row.id,scope.$index)">选择</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getOrder" />
  </div>
</template>
<script>
import {searchOrder,deleteOrder} from '@/api/order'
import pagination from '@/components/Pagination'
export default {
  props:['Cid'],
  components:{
    pagination
  },
  data() {
    return {
      orderList:null,
      loading:false,
       listQuery:{
        total:0,
        page:1,//跳转页码
        size:10,//每页显示的数据条数
      },
      params:{}
    }
  },
  watch:{
    Cid(newval){
      if(newval){
        this.getOrder()
      }
    }

  },
  created() {
    console.log("成交订单？？？")
    this.getOrder()
  },
  methods: {
      /**
     * 获取所有订单信息
     */
    getOrder(){
      //检查tab
      this.$set(this.params,'pageNum',this.listQuery.page)
      this.$set(this.params,'pageSize',this.listQuery.size)
      this.$set(this.params,'customerId',this.Cid)
      searchOrder(this.params).then(res=>{
        this.listLoading = false
        this.orderList = res.data.list
        this.listQuery.total=res.data.total
        console.log("成交了嘛")
        console.log(this.orderList)
      })
    },
    /**
     * 点击了选择
     */
    chose(id,index){
      let query={
        orderName:`选择了第${index+1}个订单`,
        orderBaseId:id
      }
     
      this.$emit('setorder',query)
      this.$emit('setdialog')
    }
  },
}
</script>