<template>
  <div>
    <div>
      <el-button type="primary" size="small" v-if="params.id>0" @click="preClass">上一级</el-button>
    </div>
    <div>
      <el-table :data="classList">
        <el-table-column>
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.className"></el-input>
            <span v-else>{{scope.row.className}}</span>
           
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
            <el-button size="small" icon="el-icon-edit" v-else-if="!scope.row.edit" @click="scope.row.edit=!scope.row.edit">修改当前级</el-button>
            <el-button size="small" icon="el-icon-edit"   @click="nextClass(scope.row)">修改下一级</el-button>
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
import {getClassById,updateClass,createClass,deleteClass} from '@/api/product'
export default {
  data() {
    return {
      classList:[],
      editFlag:false,
      orignList:null,
      addFlag:false,
      preId:0,
      params:{
        id:0
      }
    }
  },
  created(){
     console.log("类别修改")
     this.getProductPre()
  },
  methods:{
    /**
     * 请求各个级别的类别
     */
    getProductPre(){
      
      getClassById(this.params).then(res=>{
          const items=res.data
          console.log(this.classList)
          this.classList=items.map(ele=>{
              this.$set(ele,'edit',false)
              ele.originclassName=ele.className
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
        this.classList.pop();
        this.addFlag=false
       
        console.log(this.classList)
      }else{//取消修改
          //还原原来的值
          row.className=row.originclassName
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
            deleteClass(query).then(res=>{
                  this.$message.success("删除成功！")
                  this.getProductPre()
                  this.$emit('updateclasslist')
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
         className: '',
         edit:true,
      }
      this.classList.push(list)
      this.addFlag=true
    },
    //保存修改
    save(row){
      if(this.addFlag){
        /**
         * 添加请求
         */
          let query={
            className:row.className,
            previousClassId:this.params.id
          }
          createClass(query).then(res=>{
            this.$message.success("添加成功！")
            this.addFlag=false
            row.edit=false
            this.getProductPre()
            this.$emit('updateclasslist')
          }).catch(err=>{
            this.$message.error("添加失败，请重试！")
          })
      
      }else{
        /**
         * 修改请求
         */
        console.log("修改class")
        console.log(row)
        updateClass(row).then(res=>{
            //修改以后续的修改使用
            row.originclassName=row.className
            row.edit=false      
            this.$message.success("修改成功！")
            this.$emit('updateclasslist')
        }).catch(err=>{
            this.$message.error("修改失败，请重试！")
        })
      }
     
    },
    /**
     * 点击上一级
     */
    preClass(){
      this.params.id=this.preId
      this.getProductPre()
    },
    /**
     * 点击下一级
     */
    nextClass(row){
      this.preId=row.previousClassId
      this.params.id=row.id
      this.getProductPre()
    }
  }
}
</script>