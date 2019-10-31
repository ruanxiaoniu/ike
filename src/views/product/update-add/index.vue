<template>
  <div>
     <el-form :model="productList" ref="productList" :rules="rules" label-position="right" label-width="130px">
       <el-form-item label="产品分类：">
          <el-row>
            <el-col span="8">
               <el-cascader
                 ref="productClass"
                 :props="props"
                  v-model="Parr"
                  :options="productClass"
                   @active-item-change="handleChange"
                  placeholder="请选择产品类别"
                  style="width:100%"
                  :show-all-levels="false"
                  v-if="edit"
                >
               </el-cascader>
               <el-cascader
                 ref="productClass"
                 :props="props"
                  v-model="productList.productClassId"
                  :options="productClass"
                   @active-item-change="handleChange"
                  placeholder="请选择产品类别"
                  style="width:100%"
                  :show-all-levels="false"
                  v-else
                >
               </el-cascader>
            </el-col>
            <el-col span="2"></el-col>
            <el-col span="4">
              <el-button size="small" icon="el-icon-edit" @click="clickEdit('classedit')">编辑</el-button>
            </el-col>
          </el-row>
       </el-form-item>
       <el-form-item label="产品名称：" >
         <el-row>
           <el-col span="8">
              <!-- <span v-if="!editFlag">{{productList.productName}}</span> -->
              <el-input v-model="productList.productName"></el-input>
           </el-col>
         </el-row>
        
       </el-form-item>
       <el-form-item label="产品图片：">
         <el-upload
            class="upload-demo"
            :action="UploadUrlPic()"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-change="changeHandle"
            multiple
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
       </el-form-item>
        <el-form-item label="产品相关文档：">
         <el-upload
            class="upload-demo"
            :action="UploadUrlText()"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-change="changeHandle"
            multiple
            :file-list="TextFile">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
       </el-form-item>
       <el-form-item label="销售单价：">
         <el-row>
           <el-col span="8">
              <!-- <span v-if="!editFlag">{{productList.salePrice}}</span> -->
              <el-input  v-model="productList.salePrice" ></el-input>
           </el-col>
         </el-row>
         
       </el-form-item>
      <el-form-item label="成本：">
        <el-row>
          <el-col span="8">
            <!-- <span v-if="!editFlag">{{productList.cost}}</span> -->
            <el-input v-model="productList.cost" ></el-input>
          </el-col>
        </el-row>
       </el-form-item>
       <el-form-item label="单位：">
          <el-row>
            <el-col span="8">
              <el-select v-model="productList.saleUnitId" placeholder="请选择销售单位" style="width:100%">
                <el-option v-for="(item) in saleUnit" :key="item.id" :label="item.saleUnitName" :value="item.id"></el-option>
              </el-select>
            </el-col>
             <el-col span="4">
              <el-button size="small" icon="el-icon-edit" @click="clickEdit('unit')">编辑</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="销售状态：" >
          <el-row>
            <el-col span="8">
              <el-select v-model="productList.onSale" placeholder="请选择销售状态" >
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="0"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
         <el-form-item label="上市时间：">
            <el-row>
              <el-col span="8">
                <el-date-picker
                v-model="productList.ttm"
                type="datetime"
                placeholder="选择上市时间"
                style="width:100%" />
              </el-col>
            </el-row> 
          </el-form-item>
        <el-form-item label="介绍：">
          <el-row>
            <el-col span="8">
               <!-- <span v-if="editFlag">{{productList.introduction}}</span> -->
               <el-input type="textarea"  v-model="productList.introduction"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
     </el-form>
     <div style="margin-left:500px">
       <el-button size="small" @click="cancel">取消</el-button>
       <el-button size="small" type="primary" v-if="editFlag" @click="editOperate('productList')">修改</el-button>
       <el-button size="small" type="primary" v-else @click="add('productList')">新建</el-button>
     </div>
     <el-dialog :visible.sync="editDialog" :title="textMap[title]" append-to-body>
        <editClass v-if="title=='classedit'" @updateclasslist="updateClassList"></editClass>
        <editUnit v-else-if="title=='unit'" @updateunitlist="updateUnitList"></editUnit>
     </el-dialog>
  </div>
</template>
<script>
import {getClassById,getSaleUnit,getOneProduct,getAllClass,createProduct,updateProduct} from '@/api/product'
import editClass from '../../public/product/productClass'
import editUnit from '../../public/product/saleUnit'
import moment from 'moment'
export default {
  props:['edit','pid'],
  components:{
    editClass,
    editUnit
  },
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
       editDialog:false,
       title:'',
       textMap:{
         classedit:'产品类别管理',
         unit:'销售单位管理'
       },
       editQuery:{
         id:''
       },
       params:{
        id:0
      },
      Parr:[],//绑定级联回显
      fileList:[],
      TextFile:[],
      rules:{
        productName:[
          {requried:true,message:'请输入产品名称',trigger:'blur'}
        ],
        onSale:[
          {requried:true,message:'请选择销售状态',trigger:'blur'}
        ]
      }
    }
  },
  watch:{
    pid(newVal){
      console.log("nnnnnnn")
      console.log(newVal)
      this.editQuery={
        id:newVal
      }
      console.log(this.editQuery)
      this.getProductById()
    },
    edit(newVal){
      this.editFlag=newVal
      console.log("editttttttttttt")
      console.log(this.editFlag)
      this.productList={
         productClassId:'',
         productName:'',
         salePrice:'',
         cost:'',
         saleUnitId:'',
         onSale:'',
         introduction:''
       }
       this.getProductById()
    }
  },
  created(){
    
    if(this.edit){//若是修改
    console.log("产品修改")
    console.log(this.pid)
      console.log(this.edit)
      this.editFlag=this.edit
      this.editQuery={
        id:this.pid
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
       if(this.edit){
          this.Parr=[]
          console.log("search")
          console.log(this.editQuery)
          getOneProduct(this.editQuery).then(res=>{
            this.productList=res.data.productExtVO
            this.Parr.push(res.data.productExtVO.productClassId)
            // this.productList.productClassId=res.data.productExtVO.productClassName
            this.fileList=res.data.productPicFile
            this.TextFile=res.data.productTextFile
            console.log("edddddd")
            console.log(this.Parr)
          }).catch(err=>{
          })
       }
      
     },
       /**
     * 获取所有产品类别，用于搜索
     */
    getClass(){
        
       getAllClass(this.params).then(res=>{
           console.log("uuuuuuu")
         const product=this.clearChildren(res.data)
        this.productClass=product
         console.log("pppppp")
         console.log(this.productClass)
      }).catch(err=>{
      
        console.log(err)
      })
    },
      /**
     * 清除级联中出现[]的情况
     */
    clearChildren(arr){
      for(let i=0;i<arr.length;i++){
        if(!arr[i].children.length){
          arr[i].children=null
        }else{
          this.clearChildren(arr[i].children);
        }
      }
      return arr
    },
     /**
     * 获取所有产品单位，用于搜索
     */
    getUnit(){
      getSaleUnit().then(res=>{
        this.saleUnit=res.data
       
      }).catch(err=>{
      })
    },
   
    /**
     * 点击取消
     */
    cancel(){
      this.productList={
         productClassId:'',
         productName:'',
         salePrice:'',
         cost:'',
         saleUnitId:'',
         onSale:''
       },
      this.$emit('setdialog')
      this.$emit('seteditflag')
    },
    /**
     * 添加
     */
    add(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          let l=this.productList.productClassId.length-1
          if(this.productList.productClassId.length>0){
            this.productList.productClassId=this.productList.productClassId[l]
          }
          console.log("prrpprprp")
          console.log(this.productList.productClassId)
          /**
           * 添加产品请求
           */
          createProduct(this.productList).then(res=>{
            this.$message.success('添加成功！')
            this.$emit('setdialog')
            this.$emit('seteditflag')
            this.$emit('updatelist')
            this.productList={
                productClassId:'',
                productName:'',
                salePrice:'',
                cost:'',
                saleUnitId:'',
                onSale:''
              }
          }).catch(err=>{
            this.$message.error('添加失败，请重试！')
          })
        }else{
          return false
        }
      })
    },
    /**
     * 修改
     */
    editOperate(formName){
      /**
       * 修改请求
       */
       this.$refs[formName].validate(valid=>{
         if(valid){
            let l=this.Parr.length
            // let l=this.productList.productClassId.length-1
            if(l>0){
              this.productList.productClassId=this.Parr[l-1]
            } 
            console.log("salllll")
            console.log(this.productList.productClassId)  
            this.$set(this.productList,'Piclists',this.fileList)
            this.$set(this.productList,'Textlists',this.TextFile)
            // let product={
            //   product:this.productList,
            // }
            console.log("xiugai xiuagi a")
            // console.log(product)
            updateProduct(this.productList).then(res=>{
              this.$message.success('修改成功！')
              this.$emit('setdialog')
              this.$emit('seteditflag')
              this.$emit('updatelist')
            }).catch(err=>{
              this.$message.error('修改失败，请重试！')
            })
         }else{
           return false
         }
       })
     
    },
    /**
     * 图片上传
     */
    UploadUrlPic(){
      return 'http://10.64.2.44:8081/product/createPicture'
    },
     /**
     * 文档上传
     */
    UploadUrlText(){
      return 'http://10.64.2.44:8081/product/createText'
    },
    /**
     * 点击编辑
     */
    clickEdit(title){
      this.title=title
      this.editDialog=true
    },
    /**
     * 由编辑子组件更新类别选项
     */
    updateClassList(){
      this.getClass()
      // this.editDialog=false
    },
     /**
     * 由编辑子组件更新单位选项
     */
    updateUnitList(){
      this.getUnit()
      // this.editDialog=false
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove(file, fileList) {
      console.log("file,fileLisy")
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log("file,fileLisy")
      console.log(file);
    },
    changeHandle(file,fileList){
      console.log("file,fileLisy")
       console.log(file,fileList)
    }
  }
}
</script>