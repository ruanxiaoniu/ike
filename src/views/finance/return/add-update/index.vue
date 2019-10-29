<template>
  <div>
    <div class="top">基本信息</div>
     <el-form :model="returnList" ref="returnList" :rules="rules" label-position="right" label-width="130px" style="margin-top:20px">
       <el-form-item label="负责人：">
          <el-row>
            <el-col :span="8">
              <!-- 可进行远程搜索负责人 -->
              <el-select
                v-model="returnList.employeeId"
                filterable
                remote
                reserve-keyword
                style="width:100%"
                placeholder="请输入关键词"
                :remote-method="remoteMethodEmployee"
                :loading="loading">
                <el-option
                  v-for="item in employeeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row> 
       </el-form-item>
       <el-form-item label="客户：">
        <el-row>
          <el-col :span="8">
            <!-- 可进行远程搜索客户 -->
            <el-select
              v-model="returnList.customerId"
              filterable
              remote
              reserve-keyword
              style="width:100%"
              placeholder="请输入关键词"
              :remote-method="remoteMethodCustomer"
              :loading="loading"
            >
              <el-option
                v-for="item in customerOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
        </el-row>
       </el-form-item>
        <el-form-item label="联系人：" prop="relationId">
          <el-row>
            <el-col span="8">
              <el-select v-model="returnList.relationId" placeholder="请选择联系人" style="width:100%">
                <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id"/>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
     </el-form>
     <div class="top">回款信息</div>
     <el-form label-position="right" label-width="130px" style="margin-top:20px">
       <el-form-item label="成交订单：">
         <el-row>
           <el-col :span="8">
              <el-select
              v-model="orderName"
              style="width:100%"
              placeholder="请输入关键词"
              @change="changeorder"
            >
              <!-- <el-option
                v-for="item in orderList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              /> -->
            </el-select>
           </el-col>
           <el-col :span="6">
             <el-button size="small" @click="editOrder">编辑</el-button>
           </el-col>
         </el-row> 
       </el-form-item>
       <el-form-item label="回款时间：">
         <el-row>
           <el-col :span="8">
              <el-date-picker
                v-model="returnList.planDate"
                type="datetime"
                placeholder="选择回款时间"/>
           </el-col>
         </el-row>
       </el-form-item>
       <el-form-item label="回款金额：">
         <el-row >
           <el-col :span="8">
             <el-input v-model="returnList.amount"></el-input>
           </el-col>
         </el-row>
       </el-form-item>
       <el-form-item label="付款方式：">
         <el-row>
           <el-col :span="8">
             <el-input v-model="returnList.paymentType"></el-input>
           </el-col>
         </el-row>
       </el-form-item>
       <el-form-item label="备注：">
         <el-row>
           <el-col :span="8">
             <el-input type="textarea" v-model="returnList.remark"></el-input>
           </el-col>
         </el-row>
       </el-form-item>
     </el-form>
  <div style="margin-left:500px">
    <el-button size="small" @click="cancel">取消</el-button>
    <el-button size="small" type="primary" v-if="editFlag" @click="editOperate('returnList')">修改</el-button>
    <el-button size="small" type="primary" v-else @click="add('returnList')">新建</el-button>
  </div>
  <el-dialog :visible.sync="dialogFlag" width="60%">
    <successOrder :Cid="Cid" @setdialog="dialogFlag=!dialogFlag" @setorder="setOder"></successOrder>
  </el-dialog>
  </div>
</template>
<script>
import {orderById,updateOrder,createOrder,getProductList} from '@/api/order'
import { getCustomerInfo,getOneRelation} from '@/api/customer'
import {getEmployeeAll} from '@/api/employee'
import successOrder from '../../../public/finance/return/success-order'
import moment from 'moment'
export default {
  props:['edit','returnId'],
  components:{
    successOrder
  },
  data() {
    return {
      orderName:'',
       returnList:{
         customerId:'',
         employeeId:'',
         orderBaseId:'',
         payTime:'',
         paymentType:'',
         orderBaseId:'',
         remark:'',
         note:'',
         amount:''
       },
       editFlag:false,
       editDialog:false,
       dialogFlag:false,
       title:'',
       textMap:{
         classedit:'产品类别管理',
         unit:'销售单位管理'
       },
       editQuery:{
         id:''
       },
      rules:{
        productName:[
          {requried:true,message:'请输入产品名称',trigger:'blur'}
        ],
        onSale:[
          {requried:true,message:'请选择销售状态',trigger:'blur'}
        ]
      },
      employeeOptions:null,//员工选项
      employeeFilter:null,//用于远程搜索
      customerFilter:null,//客户搜索
      customerOptions:null,
      relationList:null,
      Cid:'',
      oderQuery:null//成交订单页面传过来的值
    }
  },
  watch:{
     "returnList.customerId":function (newVal) {
      this.Cid=newVal
      if(newVal!=''){
        console.log(newVal)
        this.getRelation()
      }
    },
    Oid(newVal){
      console.log("nnnnnnn")
      console.log(newVal)
      this.editQuery={
        id:newVal
      }
      console.log(this.editQuery)
      this.getOrderById()
    },
    edit(newVal){
      this.editFlag=newVal
      console.log("editttttttttttt")
      console.log(this.editFlag)
      this.returnList={
         productClassId:'',
         productName:'',
         salePrice:'',
         cost:'',
         saleUnitId:'',
         onSale:'',
         introduction:''
       }
       this.getOrderById()
    }
  },
  created(){
    
    if(this.edit){//若是修改
    console.log("产品修改")
    console.log(this.Oid)
      console.log(this.edit)
      this.editFlag=this.edit
      this.editQuery={
        id:this.Oid
      }
      this.getOrderById()
    }
    this.getEmployee()
    this.getCustomer()
  },
  methods:{
     /**
     * 获取所有成员，用于搜索
     * method:getEmployee()
     */
    getEmployee(){
      getEmployeeAll().then(res=>{
        this.employeeOptions=res.data
        this.employeeFilter=res.data
        // console.log("employee")
        // console.log(this.employeeOptions)
      }).catch(err=>{
        console.log(err)
      })
    },
    /**
     * 远程搜索负责人
     */
    remoteMethodEmployee(query){
       if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.employeeOptions = this.employeeFilter.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 100);
        }else{
          this.employeeOptions=this.employeeFilter
        }
    },
      /**
    获取所有客户信息
     */
     getCustomer(){
       console.log("kehu xinxi ")
       getCustomerInfo().then(res=>{
         this.customerOptions=res.data
         this.customerFilter=res.data
       }).catch(err=>{

       })
     },
     /**
    * 远程搜索客户
    */
    remoteMethodCustomer(query){
       if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.customerOptions = this.customerFilter.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 100);
        }else{
          this.customerOptions=this.customerFilter
          
        }
    },
    /**
      获取某个客户联系人信息
    */
     getRelation(){
       let params={
         Cid:this.Cid
       }
       console.log("Ciiiiiiiii")
       console.log(this.Cid)
       getOneRelation(params).then(res=>{
         this.relationList=res.data
       }).catch(err=>{
         
       })
     },
     /**
     * 修改，回显某个产品
     */
     getOrderById(){
       if(this.edit){
          this.Parr=[]
          console.log("search")
          console.log(this.editQuery)
          orderById(this.editQuery).then(res=>{
            this.returnList=res.data.productExtVO
            this.Parr.push(res.data.productExtVO.productClassId)
            // this.returnList.productClassId=res.data.productExtVO.productClassName
            this.fileList=res.data.productPicFile
            this.TextFile=res.data.productTextFile
            console.log("edddddd")
            console.log(this.Parr)
          }).catch(err=>{
          })
       }
      
     },
    /**
     * 远程搜索负责人
     */
    remoteMethodEmployee(query){
       if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.employeeOptions = this.employeeFilter.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 100);
        }else{
          this.employeeOptions=this.employeeFilter
        }
    },
   
    /**
     * 点击取消
     */
    cancel(){
      this.returnList={
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
          let l=this.returnList.productClassId.length-1
          if(this.returnList.productClassId.length>0){
            this.returnList.productClassId=this.returnList.productClassId[l]
          }
          console.log("prrpprprp")
          console.log(this.returnList.productClassId)
          /**
           * 添加产品请求
           */
          createOrder(this.returnList).then(res=>{
            this.$message.success('添加成功！')
            this.$emit('setdialog')
            this.$emit('seteditflag')
            this.$emit('updatelist')
            this.returnList={
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
            // let l=this.returnList.productClassId.length-1
            if(l>0){
              this.returnList.productClassId=this.Parr[l-1]
            } 
            console.log("salllll")
            console.log(this.returnList.productClassId)  
            this.$set(this.returnList,'Piclists',this.fileList)
            this.$set(this.returnList,'Textlists',this.TextFile)
            // let product={
            //   product:this.returnList,
            // }
            console.log("xiugai xiuagi a")
            // console.log(product)
            updateOrder(this.returnList).then(res=>{
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
    * 远程搜索客户
    */
    remoteMethodCustomer(query){
       if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.customerOptions = this.customerFilter.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 100);
        }else{
          this.customerOptions=this.customerFilter
          
        }
    },
    /**
    * 远程搜索产品
    */
    remoteMethodProduct(query){
       if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.productOptions = this.productFilter.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 100);
        }else{
          this.customerOptions=this.customerFilter
          
        }
    },
    /**
     * 产品选中值发生变化时
     */
    changeProduct(){

    },
    /**
     * 成交订单框
     */
    setOder(val){
      this.orderName=val.orderName
      this.returnList.orderById=val.orderById
    },
    /**
     * 点击编辑
     */
    editOrder(){
      if(this.returnList.customerId){
        this.dialogFlag=true
      }else{
        this.$message.error('请选择客户！')
      }
    }
  }
}
</script>