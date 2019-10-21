<template>
  <div>
     <el-form :model="productList" ref="productList" rules="">
       <el-form-item label="产品分类：">
          <el-row>
            <el-col span="8">
               <el-cascader
                 ref="productClass"
                 :props="props"
                  v-model="productClassId"
                  :options="productClass"
                   @active-item-change="handleChange"
                  placeholder="请选择产品类别"
                  style="width:100%"
                  :show-all-levels="false"
                >
               </el-cascader>
            </el-col>
            <el-col span="2"></el-col>
            <el-col span="4">
              <el-button size="small" icon="el-icon-edit">编辑</el-button>
            </el-col>
          </el-row>
       </el-form-item>
       <el-form-item label="产品名称：">
         <span v-if="editFlag">{{productList.productName}}</span>
         <el-input v-else v-model="productList.productName"></el-input>
       </el-form-item>
       <el-form-item label="产品图片：">
         <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
       </el-form-item>
       <el-form-item label="销售单价：">
         <el-input v-model="productList.salePrice" style="width:300px"></el-input>
       </el-form-item>
      <el-form-item label="成本：">
         <el-input v-model="productList.cost"></el-input>
       </el-form-item>
       <el-form-item label="单位：">
          <el-row>
            <el-col span="8">
              <el-select v-model="productList.saleUnitId" placeholder="请选择销售单位" style="width:100%">
                <el-option v-for="(item) in saleUnit" :key="item.id" :label="item.saleUnitName" :value="item.id"></el-option>
              </el-select>
            </el-col>
             <el-col span="4">
              <el-button size="small" icon="el-icon-edit">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="销售状态：" >
          <el-select v-model="productList.onSale" placeholder="请选择销售状态" style="width:300px">
            <el-option label="上架" value="上架"></el-option>
            <el-option label="下架" value="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="介绍："></el-form-item>
     </el-form>
     <div>
       <el-button size="small" @click="cancel">取消</el-button>
       <el-button size="small" type="primary" v-if="editFlag">修改</el-button>
       <el-button size="small" type="primary" v-else>新建</el-button>
     </div>
  </div>
</template>
<script>
import {getClassById,getSaleUnit,getOneProduct} from '@/api/product'
export default {
  props:['edit','productId'],
  data() {
    return {
       productList:{
         productClassId:'',
         productName:'',
         salePrice:'',
         cost:'',
         saleUnitId:'',
         onSale:''
       },
       productClass:[],
       saleUnitId:[],
       editFlag:false,
       editQuery:''
    }
  },
  created(){
    if(this.edit){//若是修改
    console.log("ediiiiii")
      console.log(this.edit)
      this.editFlag=this.edit
      this.editQuery={
        id:this.editQuery
      }
      this.getProductById()
    }
    this.getClass()
    this.getUnit()
  },
  methods:{
     /**
     * 修改，回显某个产品
     */
     getProductById(){
       getOneProduct(this.editQuery).then(res=>{
         this.productList=res.data
       }).catch(err=>{
       })
     },
       /**
     * 获取所有产品类别，用于搜索
     */
    getClass(){
       getAllClass(this.params).then(res=>{
         const product=this.clearChildren(res.data)
        this.productClass=product
      }).catch(err=>{

      })
    },
     /**
     * 获取所有产品单位，用于搜索
     */
    getUnit(){
      getSaleUnit().then(res=>{
        this.saleUnit=res.data
        console.log("salllll")
        console.log(this.saleUnit)
      }).catch(err=>{
      })
    },
    /**
     * 点击取消
     */
    cancel(){
      this.$emit('setdialog')
      this.$emit('seteditflag')
    },
    /**
     * 添加
     */
    add(){

    },
    /**
     * 修改
     */
    editOperate(){

    }
  }
}
</script>