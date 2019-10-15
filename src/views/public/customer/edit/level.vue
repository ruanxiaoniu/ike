<template>
  <div>
    <el-table :data="levelList" height="350px" ref="singleTable" @select="handleSelection" class="singleTable">
      <el-table-column label="选择" type="selection" width="50px">
      </el-table-column>
      <el-table-column label="等级名" prop="levelName" min-width="120px">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.levelName"></el-input>
          <span v-else>{{scope.row.levelName}}</span>
        </template>
      </el-table-column>
       <el-table-column label="等级说明" min-width="180px">
         <template slot-scope="scope">
          <el-input v-if="scope.row.edit"  v-model="scope.row.levelExplain"></el-input>
          <span v-else>{{scope.row.levelExplain}}</span>
        </template>
      </el-table-column>
       <el-table-column label="等级条件" min-width="180px">
         <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.levelCriteria"></el-input>
          <span v-else>{{scope.row.levelCriteria}}</span>
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
      
      <el-button @click="select" size="small" type="primary">选择</el-button>
    </div>
    
  </div>
</template>
<script>
import {getCustomerAllLevel,updateLevelAll,addLevel,deleteLevel} from '@/api/customer'
export default {
  data() {
    return {
      levelList:null,
      selection:null,
      newVal:null,
      addFlag:false,
      originalLevel:[
        {
        levelCriteria:'',
        levelExplain:'',
        levelName:'',
        edit:false,
        
      },
      ]
    }
  },
  created() {
     this.getLevel()
  },
  
  methods:{
    setVisible(){
      this.$emit('setvisible')
    },
     getLevel(){
       getCustomerAllLevel().then(res=>{
         const items=res.data
         this.levelList=items.map(ele=>{
           this.$set(ele,'edit',false)
           ele.originlevelName=ele.levelName
           ele.originlevelExplain=ele.levelExplain
           ele.originlevelCriteria=ele.levelCriteria
           return ele
         })
         
        //  this.originalLevel[0]=this.levelList[0]
        //  console.log(this.levelList)
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
         levelName: '',
         levelExplain: '',
         levelCriteria: '',
         edit:true,
      }
      this.levelList.push(list)
      this.addFlag=true
    },
    select(){
      // console.log("selection")
      // console.log(this.selection)
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
          addLevel(row).then(res=>{
            this.$message.success("添加成功！")
            this.addFlag=false
            row.edit=false
            this.getLevel()
            this.$emit('updatelist')
          }).catch(err=>{
            this.$message.error("添加失败，请重试！")
          })
      
      }else{//修改请求
        updateLevelAll(row).then(res=>{
            //修改以后续的修改使用
            row.originlevelCriteria=row.levelCriteria
            row.originlevelExplain=row.levelExplain
            row.originlevelName=row.levelName
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
        this.levelList.pop();
        this.addFlag=false
       
        console.log(this.levelList)
      }else{//取消修改
          //还原原来的值
          row.levelCriteria=row.originlevelCriteria
          row.levelExplain=row.originlevelExplain
          row.levelName=row.originlevelName
          row.edit=false    
      }
    },
    //删除
    deletelist(row){
      const params={
        id:row.id
      }
      console.log("delete")
       deleteLevel(params).then(res=>{
            this.$message.success("删除成功！")
            this.getLevel()
            this.$emit('updatelist')
       }).catch(err=>{
         console.log(err)
          this.$message.error("修改失败，请重试！")
       })
    }
  },
  
  
}
</script>
<style scoped>

</style>