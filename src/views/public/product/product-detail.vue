<template>
  <div>
    <div style="margin-bottom:30px">
      <el-button icon="el-icon-back" type="success" size="small" @click="goBack">返回</el-button>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="addProduct('add')">新建</el-button>
      <el-button icon="el-icon-edit" size="small" @click="editProduct">修改</el-button>
    </div>
      <div class="top">基本信息:</div>
      <el-form :model="base" label-width="150px" label-position="right">
          <el-form-item label="录入人：">
              <span>{{base.createUserName}}</span>
          </el-form-item>
          <el-form-item label="录入时间：">
              <span>{{base.createTime}}</span>
          </el-form-item>
          <el-form-item label="成交次数：">
            <span  class="link-type" @click="orderDetail('dealProduct')">{{base.orderTimes}}</span>
          </el-form-item>
            <el-form-item label="成交数量：">
            <span @click="orderDetail('dealProduct')">{{base.orderNum}}</span>
          </el-form-item>
          <el-form-item label="实际成交总额：">
            <span @click="orderDetail('dealProduct')">{{base.orderCount}}</span>
          </el-form-item>
          <el-form-item label="总成本：">
            <span @click="orderDetail('dealProduct')">{{base.orderCost}}</span>
          </el-form-item>
          <el-form-item label="总利润：">
            <span @click="orderDetail('dealProduct')">{{base.orderProfit}}</span>
          </el-form-item>
      </el-form>
       <div class="top">产品信息:</div>   
       <el-form :model="productDetail" ref="productDetail" :rules="rules" style="margin-top:20px" label-width="150px" label-position="right">
          <el-form-item label="产品分类：" prop="productClassName">
            <el-row>
              <el-col span="5">
                <el-cascader
                  ref="productClass"
                  v-model="text"
                  :options="productClass"
                  :props="pro"
                  placeholder="请选择产品类别"
                  style="width:50%"
                  :show-all-levels="false"
                  v-if="editFlag"
                  >
                </el-cascader>
                <span v-else>{{productDetail.productClassName}}</span>
              </el-col>
              <!-- <el-col span="4">
                <el-button size="small" icon="el-icon-edit" @click="clickEdit('classedit')" v-if="editFlag">编辑</el-button>
              </el-col> -->
            </el-row>
            
          </el-form-item>
          <el-form-item label="产品名称：" prop="productName">
            <el-row>
              <el-col span="5">
                <el-input v-model="productDetail.productName" v-if="editFlag"></el-input>
                <span v-else>{{productDetail.productName}}</span>
              </el-col>
            </el-row>            
          </el-form-item>
          <el-form-item label="产品图片：" prop="url">
             <el-upload
              class="upload-demo"
              :action="UploadUrlPic()"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-change="changeHandle"
              multiple
              :file-list="productFile"
              v-if="editFlag">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <div>
              <img  v-for="(item) in productFile" :src="item.url" style="width: 50px; margin-right:5px">
            </div>
            
          </el-form-item>
          <el-form-item label="销售单价：">
            <el-row>
              <el-col span="5">
                <el-input v-if="editFlag" v-model="productDetail.salePrice"></el-input>
                <span v-else>{{productDetail.salePrice}}</span>
              </el-col>
            </el-row> 
          </el-form-item>
          <el-form-item label="销售单位：">
            <el-row>
              <el-col span="5">
                <el-select v-if="editFlag" v-model="productDetail.saleUnitId" placeholder="请选择销售单位" style="width:100%">
                    <el-option v-for="(item) in saleUnit" :key="item.id" :label="item.saleUnitName" :value="item.id"></el-option>
                </el-select>
                <span v-else>{{productDetail.saleUnitName}}</span>
              </el-col>
            </el-row> 
          </el-form-item>
          <el-form-item label="成本：">
            <el-row>
              <el-col span="5">
                <el-input v-if="editFlag" v-model="productDetail.saleUnicosttName"></el-input>
                <span v-else>{{productDetail.cost}}</span>
              </el-col>
            </el-row> 
          </el-form-item>
          <el-form-item label="销售状态：">
            <el-row>
              <el-col span="5">
                <el-select v-model="productDetail.onSale" v-if="editFlag" style="width:100%">
                  <el-option label="上架" value="1"></el-option>
                  <el-option label="下架" value="0"></el-option>
                </el-select>
                <span v-else>
                  <span class="link-type" v-if="productDetail.onSale==0">下架</span>
                  <span class="link-type" v-else>上架</span>
                </span> 
              </el-col>
            </el-row> 
          </el-form-item>
          <el-form-item label="上市时间：">
            <el-row>
              <el-col span="5">
                <el-date-picker
                v-model="productDetail.ttm"
                type="datetime"
                placeholder="选择上市时间"
                v-if="editFlag"
                style="width:100%" />
                <span v-else>{{productDetail.ttm}}</span>
              </el-col>
            </el-row> 
          </el-form-item>
          <el-form-item label="产品介绍：">
            <el-row>
              <el-col span="5">
                <el-input v-if="editFlag" type="textarea" v-model="productDetail.introduction"></el-input>
                <span v-else>{{productDetail.introduction}}</span>
              </el-col>
            </el-row> 
          </el-form-item>
       </el-form>
     
       <div slot="footer" class="dialog-footer">
         <el-button v-if="editFlag" type="success" @click="cancelEdit">
          取消
        </el-button>
         <el-button v-if="editFlag" type="primary" @click="saveEdit">
            保存
          </el-button>
      </div>

      <el-dialog :title="textMap[title]" :visible.sync="dialogFlag" append-to-body>
        <dealProduct v-if="title=='dealProduct'" :productId="PId"></dealProduct>
        <addProduct v-else-if="title=='add'" @setdialog="dialogFlag=!dialogFlag"></addProduct>
      </el-dialog>
  </div>
</template>
<script>
import {getProductDetail,getSaleUnit,getAllClass,updateProduct} from '@/api/product'
import dealProduct from './dealProduct'
import addProduct from '../../product/update-add/index'
import {getEmployeeAll} from '@/api/employee'
import moment from 'moment'
export default {
  props:['productId'],
  components:{
    dealProduct,
    addProduct,
     
  },
  data() {
    return {
      textMap:{//动态修改弹出框的标题
        dealProduct:"成交产品订单详情",
        add:"新建产品",
        deal_detail:"成交产品详情",
        personal_detail:"个人信息",
      },
      title:'',
      text:[],
      //产品详情
      base:null,
      productDetail:null,
      originproductDetail:null,//用于取消修改
      productFile:null,
      params:{
        id:''
      },
      pro:{
        label:'label',
        value:'value',
        children:'children'
      },
      rules:{
        productName:[
          {requried:true,message:'请输入产品名称',trigger:'blur'}
        ],
        onSale:[
          {requried:true,message:'请选择销售状态',trigger:'blur'}
        ]
      },
      PId:'',
      dialogFlag:false,
      editFlag:false,
      productClass:[],
      employeeOptions:null,
      employeeFilter:null,
      saleUnit:null
    }
  },
  watch:{
    productId(newVal){
      this.params.id=newVal
      this.getDetail()
    },
    editFlag(newVal){
      if(newVal){
        this.text.push(this.productDetail.productClassId)
        console.log("product")
        console.log(this.text)
        this.getClass()
        this.getUnit()
      }
    }
  },
  created() {
    this.params.id=this.productId
    console.log("prodyct....")
    console.log(this.productId)
    this.getDetail()
  },
  methods:{
    /**
     * 根据id获取产品详情
     * method:getDetail
     */
    getDetail(){
      getProductDetail(this.params).then(res=>{
        this.base=res.data.productVO
        this.productDetail=res.data.productExtVO
        this.originproductDetail=res.data.productExtVO
        this.productFile=res.data.productFile
      }).catch(err=>{

      })
    },
    /**
     * 查看成交产品详情
     */
    orderDetail(title){
      this.PId=this.productId
      this.dialogFlag=true
      this.title=title
    },
    /**
   * 获取所有产品类别，用于搜索
   */
    getClass(){
        
       getAllClass().then(res=>{
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
        console.log("salllll")
        console.log(this.saleUnit)
      }).catch(err=>{
      })
    },
     /**
     * 获取所有成员，用于搜索
     * method:getEmployee()
     */
    getEmployee(){
      getEmployeeAll().then(res=>{
        this.employeeOptions=res.data
        this.employeeFilter=res.data
      }).catch(err=>{
        console.log(err)
      })
    },
      /**
     * 远程搜索负责人
     * method:remoteMethod()
     */
    remoteMethod(query){
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.employeeOptions = this.employeeFilter.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 50);
      }else{
        this.employeeOptions=this.employeeFilter
      }
    },
    /**
     * 点击返回
     */
    goBack(){
      this.$router.go(-1)
    },
    /**
     * 新建产品
     */
    addProduct(title){
      this.title=title
      this.dialogFlag=true
    },
    /**
     * 点击修改
     */
    editProduct(){
      this.editFlag=true
    },
     /**
     * 图片上传
     */
    UploadUrlPic(){
      return 'http://5.64.2.44:5051/product/createPicture'
    },
     /**
     * 文档上传
     */
    // UploadUrlText(){
    //   return 'http://5.64.2.44:5051/product/createText'
    // },
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
    },
    /**
     * 保存修改
     */
    saveEdit(){
      this.$refs['productDetail'].validate(valid=>{
        if(valid){
          /**
           * 修改请求
           */
          updateProduct(this.productDetail).then(res=>{
            this.$message.success('修改成功！')
            this.productDetail.ttm=moment(this.productDetail.ttm).format('YYYY-MM-DD HH:MM:SS')
            this.editFlag=false
          }).catch(err=>{
            this.$message.error('修改失败，请重试！')
          })
        }
      })
    },
    /**
     * 取消保存
     */
    cancelEdit(){
      this.productDetail=this.originproductDetail
      this.editFlag=false
    }
  }
}
</script>