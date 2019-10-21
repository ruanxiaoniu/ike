<template>
  <div>
    <el-table :data="dealList">
      <el-table-column label="成交时间" prop="orderTime" min-width="120px">
          <template slot-scope="scope">
            <span class="link-type">{{ scope.row.orderTime }}</span>
          </template>
      </el-table-column>
      </el-table-column>
      <el-table-column label="成本" prop="orderCost" min-width="100px">
        <template slot-scope="scope">
            <span class="link-type">{{ scope.row.orderCost }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售单价" prop="salePrice" min-width="100px">
        <template slot-scope="scope">
            <span class="link-type">{{ scope.row.salePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成交数量" prop="orderCount" min-width="100px">
         <template slot-scope="scope">
            <span class="link-type">{{ scope.row.orderCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际成交价" prop="orderActualTotal" min-width="100px">
         <template slot-scope="scope">
            <span class="link-type">{{ scope.row.orderActualTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="note" min-width="150px">
         <template slot-scope="scope">
            <span class="link-type">{{ scope.row.note }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getDeal} from '@/api/product'
export default {
  props:['productId'],
  data() {
    return {
      dealList:null,
      params:{
        id:''
      }
    }
  },
  watch:{
    productId(newVal){
      this.params.id=newVal
      this.getDealDetail()
    }
  },
  created(){
    this.params.id=this.productId
    this.getDealDetail()
  },
  methods:{
    getDealDetail(){
      getDeal(this.params).then(res=>{
        this.dealList=res.data.records
        console.log("dealList")
        console.log(this.dealList)
      })
    }
  }
}
</script>