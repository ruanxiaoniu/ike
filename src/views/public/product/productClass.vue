<template>
  <div>
    <div>
      <el-button type="primary" size="small">上一级</el-button>
      <el-button type="primary" size="small">下一级</el-button>
    </div>
    <div>
      <ul>
        <li v-for="(item,index) in classList">
          <span>{{item.productClassName}}</span>
          <el-input v-model="item.edit"></el-input>
          <el-link type="primary" @click="updateCurrent(item,true)">修改当前级</el-link>
           <el-button
              v-if="scope.row.edit"
              class="cancel-btn"
              size="small"
              type="warning"
              @click="cancelEdit(item,index)"
            >
              取消
            </el-button>
            <el-button @click="save(item)" size="small" type="primary"  v-if="item.edit">保存</el-button>
            <el-button size="small" icon="el-icon-edit" v-else @click="item.edit=!item.edit">修改</el-button>
            <el-button size="small" type="danger" @click="deletelist(item)">删除</el-button>
        </li>
      </ul>
      <div>
         <el-button v-if="!addFlag" size="small" type="success" @click="add">添加</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {getClassById} from '@/api/product'
export default {
  data() {
    return {
      classList:null,
      editFlag:false,
      orignList:null,
      addFlag:false,
      params:{
        id:0
      }
    }
  },
  methods:{
    /**
     * 请求各个级别的类别
     */
    getProductPre(){
      getClassById(this.params).then(res=>{
          this.classList=res.data
          this.classList=items.map(ele=>{
           this.$set(ele,'edit',false)
           ele.originp=ele.levelName
           ele.originproductClassName=ele.productClassName
           return ele
         }).catch(err=>{
            console.log(err)
          })
         
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
          row.productClassName=row.originproductClassName
          row.edit=false    
      }
    },
    /**
     * 删除
     */
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
    },
    /**
     * 添加
     */
     add(){
      const list={
         productClassName: '',
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
          addLevel(row).then(res=>{
            this.$message.success("添加成功！")
            this.addFlag=false
            row.edit=false
            this.getProductPre()
            this.$emit('updatelist')
          }).catch(err=>{
            this.$message.error("添加失败，请重试！")
          })
      
      }else{
        /**
         * 修改请求
         */
        updateLevelAll(row).then(res=>{
            //修改以后续的修改使用
            row.originproductClassName=row.productClassName
            row.edit=false      
            this.$message.success("修改成功！")
            this.$emit('updateclasslist')
        }).catch(err=>{
            this.$message.error("修改失败，请重试！")
        })
      }
     
    },
  }
}
</script>