<template>
  <div>
    <div>
    </div>
    <div>
      <el-table :data="unitList">
        <el-table-column>
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.saleUnitName"></el-input>
            <span v-else>{{scope.row.saleUnitName}}</span>
           
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
           <el-button
              v-if="scope.row.edit"
              class="cancel-btn"
              size="small"
              type="warning"
              @click="cancelEdit(scope.row,index)"
            >
              取消
            </el-button>
            <el-button @click="save(scope.row)" size="small" type="primary"  v-if="scope.row.edit">保存</el-button>
            <el-button size="small" icon="el-icon-edit" v-else @click="scope.row.edit=!scope.row.edit">修改</el-button>
            <el-button size="small" type="danger" @click="deletelist(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:100px">
         <el-button v-if="!addFlag" size="small" type="success" @click="add">添加</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {getSaleUnit,updateUnit,createUnit,deleteUnit} from '@/api/product'
export default {
  data() {
    return {
      unitList:[],
      editFlag:false,
      orignList:null,
      addFlag:false,
      params:{
        id:0
      }
    }
  },
  created(){
     console.log("类别修改")
     this.getUnit()
  },
  methods:{
    /**
     * 请求各个级别的类别
     */
    getUnit(){
      
      getSaleUnit().then(res=>{
          const items=res.data
          console.log(this.unitList)
          this.unitList=items.map(ele=>{
              this.$set(ele,'edit',false)
              ele.originsaleUnitName=ele.saleUnitName
              return ele
           })
      }).catch(err=>{
        console.log(err)
      })
         
    },
     /**
      * 取消编辑，恢复原来的值
     */
    cancelEdit(row,index){
      console.log("addFlag")
      console.log(this.addFlag)
      if(this.addFlag){//取消添加
       console.log("h")
        this.unitList.pop();
        this.addFlag=false
       
        console.log(this.unitList)
      }else{//取消修改
          //还原原来的值
          row.saleUnitName=row.originsaleUnitName
          row.edit=false    
      }
    },
    /**
     * 删除
     */
    deletelist(row){
       this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /**
           * 删除请求
           */
           const query={
              id:row.id
            }
            console.log("delete")
            deleteUnit(query).then(res=>{
                  this.$message.success("删除成功！")
                  this.getUnit()
                  this.$emit('updateunitlist')
            }).catch(err=>{
              console.log(err)
                this.$message.error("删除失败，请重试！")
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    },
    /**
     * 添加
     */
     add(){
      const list={
         saleUnitName: '',
         edit:true,
      }
      this.unitList.push(list)
      this.addFlag=true
    },
    //保存修改
    save(row){
      if(this.addFlag){
        /**
         * 添加请求
         */
          let query={
            saleUnitName:row.saleUnitName,
          }
          createUnit(query).then(res=>{
            this.$message.success("添加成功！")
            this.addFlag=false
            row.edit=false
            this.getUnit()
            this.$emit('updateunitlist')
          }).catch(err=>{
            this.$message.error("添加失败，请重试！")
          })
      
      }else{
        /**
         * 修改请求
         */
        console.log(row)
        updateUnit(row).then(res=>{
            //修改以后续的修改使用
            row.originsaleUnitName=row.saleUnitName
            row.edit=false      
            this.$message.success("修改成功！")
            this.$emit('updateunitlist')
        }).catch(err=>{
            this.$message.error("修改失败，请重试！")
        })
      }
     
    },
  }
}
</script>