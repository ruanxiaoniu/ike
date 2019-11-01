<template>
  <div>
    <div>
      <el-button  size="small"  icon="el-icon-delete" @click="deleteRelation">
            删除
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-plus" @click="handle('add')" >
        新建
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="handle('edit')" >
        修改
      </el-button>
    </div>
    <p></p>
     <el-table :data="list" border fit highlight-current-row style="width: 100%"  @selection-change="handleSelectionChange">
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
              <span class="link-type" v-if="scope.row.relationPrimary==1">否</span>
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
    <el-dialog :title="textMap[title]" :visible.sync="adddialogFlag" width="30%">
      <addUpdate :Rid="Rid" :editFlag="editFlag" :Cid="Cid" @setdialog="adddialogFlag=!adddialogFlag" @seteditflag="editFlag=!editFlag" @updatelist="getRelation"></addUpdate>
    </el-dialog>
  </div>
</template>
<script>
import pagination from '@/components/Pagination'
import addUpdate from './add/index'
import {getOneRelation} from '@/api/customer'
import {deleteRelation} from '@/api/relation'
export default {
  props:['Cid'],
  components:{
    pagination,
    addUpdate
  },
  data() {
    return {
      total:10,
      list: null,
      rowList:null,
      title:'',
      Rid:'',
      editFlag:false,
      adddialogFlag:false,
      multipleSelection:[],
      params:{
        Cid:''
      },
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      textMap:{
        add:'新建联系人',
        edit:'修改联系人'
      }
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
    },
     /**
     * 存储表格选择
     */
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log("数组大小")
      console.log(this.multipleSelection)
    },
    /**
     * 批量删除
     */
    deleteRelation(){
         this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids=[]

          this.multipleSelection.forEach(item=>{
            ids.push(item.id)
          })
          deleteRelation(ids).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getRelation()
          }).catch(err=>{
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    /**
     * 添加联系人
     */
    handle(type){
      this.title=type
      if(type=='edit'){
        if(this.multipleSelection.length<=0){
          this.$message.error('请选择需要修改计划！')
        }else if(this.multipleSelection.length>1){
          this.$message.error('只能选择一项进行修改！')
        }else{
          this.editFlag=true
          this.Rid=this.multipleSelection[0].id
          this.adddialogFlag=true
        }
      }else{
        this.editFlag=false
        this.adddialogFlag=true
      }
      
    }
  }
}
</script>