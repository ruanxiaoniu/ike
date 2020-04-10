<template>
  <div>
    <el-table :data="originList" height="350px" ref="singleTable" @select="handleSelection" class="singleTable">
      <el-table-column label="选择" type="selection" width="50px">
      </el-table-column>
      <el-table-column label="来源名" prop="originName" min-width="200px">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.originName"></el-input>
          <span v-else>{{scope.row.originName}}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" min-width="200px">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.edit"
              class="cancel-btn"
              size="small"
              type="warning"
              @click="cancelEdit(scope.row,scope.$index)"
            >
              取消
            </el-button>
            <el-button @click="save(scope.row)" size="small" type="primary"  v-if="scope.row.edit">保存</el-button>
            <el-button size="small" icon="el-icon-edit" v-else @click="scope.row.edit=!scope.row.edit">修改</el-button>
            <el-button size="small" type="danger" @click="deletelist(scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <div class="editBtn">
      <el-button v-if="!addFlag" size="small" type="success" @click="add">添加</el-button>
      
      <!-- <el-button @click="select" size="small" type="primary">选择</el-button> -->
    </div>
    
  </div>
</template>
<script>
import {getCustomerAllOrigin,updateOriginAll,addOrigin,deleteOrigin} from '@/api/customer'
export default {
  data() {
    return {
      originList:null,
      selection:null,
      newVal:null,
      addFlag:false,
    }
  },
  created() {
     this.getOrigin()
  },
  
  methods:{
    setVisible(){
      this.$emit('setvisible')
    },
     getOrigin(){
       getCustomerAllOrigin().then(res=>{
         const items=res.data
         this.originList=items.map(ele=>{
           this.$set(ele,'edit',false)
           ele.originoriginName=ele.originName
           return ele
         })
       }).catch(err=>{
       console.log(err)
     })
    },
    handleSelection(selection,row){
      //先清除所有选择
      this.$refs.singleTable.clearSelection()
      //将此时点击的设为选中
      if(selection.length==0){
        return
      }
      //设置当前行被选中
      this.$refs.singleTable.toggleRowSelection(row,true);
      //存储选中对象
      this.selection=row
    },
    add(){
      const list={
         originName: '',
         edit:true,
      }
      this.originList.push(list)
      this.addFlag=true
    },
    select(){
      if(this.selection==null){
        this.$message.error("未选择客户等级！")
      }else{
         this.$refs.singleTable.toggleRowSelection(this.selection,false);
         //使得选中的值在父组件中的下拉框显示
         this.$emit('setvalue',this.selection)
      }
      
    },
    //保存修改
    save(row){
      if(this.addFlag){//添加请求
          addOrigin(row).then(res=>{
            this.$message.success("添加成功！")
            this.addFlag=false
            row.edit=false
            this.getOrigin()
            this.$emit('updatelist')
          }).catch(err=>{
            this.$message.error("添加失败，请重试！")
          })
      
      }else{//修改请求
        updateOriginAll(row).then(res=>{
            //修改以后续的修改使用
            row.originoriginName=row.originName
            row.edit=false      
            this.$message.success("修改成功！")
            this.$emit('updatelist')
        }).catch(err=>{
            this.$message.error("修改失败，请重试！")
        })
      }
     
    },
    //取消编辑
    cancelEdit(row,index){
      console.log("addFlag")
      console.log(this.addFlag)
      if(this.addFlag){//取消添加
       console.log("h")
        this.originList.pop();
        this.addFlag=false
       
        console.log(this.originList)
      }else{//取消修改
          //还原原来的值
          row.originName=row.originoriginName
          row.edit=false    
      }
    },
    //删除
    deletelist(row){
      const params={
        id:row.id
      }
      this.$confirm(`确定删除【${row.originName}】来源？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
         deleteOrigin(params).then(res=>{
            this.$message.success("删除成功！")
            this.getOrigin()
            this.$emit('updatelist')
       }).catch(err=>{
         console.log(err)
          this.$message.error("修改失败，请重试！")
       })
      }).catch(() =>{
        
      })
      
    }
  },
  
  
}
</script>
<style scoped>

</style>