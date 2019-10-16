<template>
  <div>
    <el-table :data="stageList" height="350px" ref="singleTable" @select="handleSelection" class="singleTable">
      <el-table-column label="选择" type="selection" width="50px">
      </el-table-column>
      <el-table-column label="阶段名" prop="stageName" min-width="120px">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.stageName"></el-input>
          <span v-else>{{scope.row.stageName}}</span>
        </template>
      </el-table-column>
       <el-table-column label="阶段说明" min-width="180px">
         <template slot-scope="scope">
          <el-input v-if="scope.row.edit"  v-model="scope.row.stageExplain"></el-input>
          <span v-else>{{scope.row.stageExplain}}</span>
        </template>
      </el-table-column>
       <el-table-column label="阶段条件" min-width="180px">
         <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.stageCriteria"></el-input>
          <span v-else>{{scope.row.stageCriteria}}</span>
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
import {getCustomerAllStage,updateStageAll,addStage,deleteStage} from '@/api/customer'
export default {
  data() {
    return {
      stageList:null,
      selection:null,
      newVal:null,
      addFlag:false,
      originalStage:[
        {
        stageCriteria:'',
        stageExplain:'',
        stageName:'',
        edit:false,
        
      },
      ]
    }
  },
  created() {
     this.getStage()
  },
  
  methods:{
    setVisible(){
      this.$emit('setvisible')
    },
     getStage(){
       getCustomerAllStage().then(res=>{
         const items=res.data
         this.stageList=items.map(ele=>{
           this.$set(ele,'edit',false)
           ele.originstageName=ele.stageName
           ele.originstageExplain=ele.stageExplain
           ele.originstageCriteria=ele.stageCriteria
           return ele
         })
         
        //  this.originalStage[0]=this.stageList[0]
        //  console.log(this.stageList)
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
         stageName: '',
         stageExplain: '',
         stageCriteria: '',
         edit:true,
      }
      this.stageList.push(list)
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
          addStage(row).then(res=>{
            this.$message.success("添加成功！")
            this.addFlag=false
            row.edit=false
            this.getStage()
            this.$emit('updatelist')
          }).catch(err=>{
            this.$message.error("添加失败，请重试！")
          })
      
      }else{//修改请求
        updateStageAll(row).then(res=>{
            //修改以后续的修改使用
            row.originstageCriteria=row.stageCriteria
            row.originstageExplain=row.stageExplain
            row.originstageName=row.stageName
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
        this.stageList.pop();
        this.addFlag=false
       
        console.log(this.stageList)
      }else{//取消修改
          //还原原来的值
          row.stageCriteria=row.originstageCriteria
          row.stageExplain=row.originstageExplain
          row.stageName=row.originstageName
          row.edit=false    
      }
    },
    //删除
    deletelist(row){
      const params={
        id:row.id
      }
      console.log("delete")
       deleteStage(params).then(res=>{
            this.$message.success("删除成功！")
            this.getStage()
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