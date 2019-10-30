<template>
  <div>
    <div>
      <el-button  size="small"  icon="el-icon-delete">
            删除
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="handle('add')" >
        新建
      </el-button>
    </div>
    <p></p>
     <el-table :data="list" border fit highlight-current-row style="width: 100%"  >
       <el-table-column  type="selection" align="center" width="50" />
          <el-table-column
            align="center"
            label="姓名"
            min-width="90px"
            element-loading-text="请给我点时间！"
            prop="relationName"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.relationName }}</span>
            </template>
          </el-table-column>
           <el-table-column
            align="center"
            label="性别"
            min-width="80px"
            element-loading-text="请给我点时间！"
            prop="relationSex"
          >
            <template slot-scope="scope">
              <span class="link-type" v-if="scope.row.relationSex">男</span>
              <span class="link-type" v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="职务"
            min-width="90px"
            prop="relationPosition"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.relationPosition }}</span>
            </template>
          </el-table-column>
           <el-table-column
            align="center"
            label="称呼"
            min-width="90px"
            prop="relationCall"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.relationCall }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="手机号"
            min-width="100px"
            prop="relationPhone"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.relationPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="邮箱"
            min-width="150px"
            prop="relationEmail"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.relationEmail }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否主联系人"
            min-width="110px"
            prop="relationPrimary"
          >
            <template slot-scope="scope">
              <span class="link-type" v-if="scope.row.relationPrimary==0">否</span>
              <span class="link-type" v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="座机号"
            min-width="100px"
            prop="landlineNumber"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.landlineNumber }}</span>
            </template>
          </el-table-column>
     </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    
  </div>
</template>
<script>
import pagination from '@/components/Pagination'
import {getOneRelation} from '@/api/customer'
export default {
  props:['Cid'],
  components:{
    pagination,
  },
  data() {
    return {
      total:10,
      list: null,
      rowList:null,
      params:{
        Cid:''
      },
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
    }
  },
  created() {
    this.rowList=this.$store.getters.customerRowList
    console.log("raltionlaal")
    if(this.Cid){
      this.params.Cid=this.Cid
    }else{
      this.params.Cid=this.rowList.id
    }
    
    this.getRelation()
  },
  watch:{
     watchCid:{
       deep:true,
       handler:function(val){
          this.params.Cid=val
          console.log("relation啦啦啦")
          console.log(this.params)
          this.getRelation()
       }
     },
     Cid(newVal){
       this.params.Cid=newVal
        console.log("relation啦啦啦")
        console.log(this.params)
        this.getRelation()
     }
  },
  computed: {
    watchCid(){
      return this.$store.getters.customerRowList.id
    }
  },
  methods:{
    getRelation(){
      console.log("RRRR")
      console.log(this.params)
      getOneRelation(this.params).then(res=>{
        this.list=res.data
      })
    }
  }
}
</script>