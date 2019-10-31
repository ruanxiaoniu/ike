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
       <el-form-item label="成交订单：" prop="orderBaseId">
         <el-row>
           <el-col :span="8">
              <el-select
              v-model="orderName"
              style="width:100%"
              placeholder="请输入关键词"
            >
            </el-select>
           </el-col>
           <el-col :span="6">
             <el-button size="small" @click="editOrder">编辑</el-button>
           </el-col>
         </el-row> 
       </el-form-item>
       <el-form-item label="回款时间：" prop="planDate">
         <el-row>
           <el-col :span="8">
              <el-date-picker
                v-model="returnList.payTimeStr"
                type="datetime"
                placeholder="选择回款时间"/>
           </el-col>
         </el-row>
       </el-form-item>
       <el-form-item label="回款金额：" prop="amount">
         <el-row >
           <el-col :span="8">
             <el-input v-model="returnList.amount"></el-input>
           </el-col>
         </el-row>
       </el-form-item>
       <el-form-item label="付款方式：" prop="paymentType">
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
  <el-dialog :visible.sync="dialogFlag" title="成交订单" width="60%" append-to-body>
    <successOrder :Cid="Cid" @setdialog="dialogFlag=!dialogFlag" @setorder="setOder"></successOrder>
  </el-dialog>
  </div>
</template>
<script>
import {createReturn,returnById,updateReturn} from '@/api/return'
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
       editQuery:{
         id:''
       },
      rules:{
        customerId:[
          {requried:true,message:'请选择客户',trigger:'blur'}
        ],
        // relationId:[
        //   {requried:true,message:'请选择联系人',trigger:'blur'}
        // ],
        orderBaseId:[
          {requried:true,message:'请选择成交订单',trigger:'blur'}
        ],
        planDate:[
          {requried:true,message:'请选择回款时间',trigger:'blur'}
        ],
        amount:[
          {requried:true,message:'请选择回款金额',trigger:'blur'}
        ],
        paymentType:[
          {requried:true,message:'请输入付款方式',trigger:'blur'}
        ],
      },
      loading:false,
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
      if(newVal){
        this.Cid=newVal
        console.log(newVal)
        this.getRelation()
      }
    },
    returnId(newVal){
      console.log("nnnnnnn")
      console.log(newVal)
      this.editQuery={
        id:newVal
      }
      console.log(this.editQuery)
      this.getReturnById()
    },
    edit(newVal){
      this.editFlag=newVal
      console.log("editttttttttttt")
      console.log(this.editFlag)
      this.returnList={
        customerId:'',
         employeeId:'',
         orderBaseId:'',
         payTimeStr:'',
         paymentType:'',
         orderBaseId:'',
         remark:'',
         note:'',
         amount:''
       }
       this.getReturnById()
    }
  },
  created(){
    
    if(this.edit){//若是修改
    console.log("回款修改")
    console.log(this.returnId)
      console.log(this.edit)
      this.editFlag=this.edit
      this.editQuery={
        id:this.returnId
      }
      this.getReturnById()
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
     getReturnById(){
       if(this.edit){
          
          returnById(this.editQuery).then(res=>{
            this.returnList=res.data.list[0]
            console.log("search")
          console.log(this.returnList)
          }).catch(err=>{
          })
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
           console.log('新建')
          /**
           * 添加回款记录
           */
          this.returnList.payTimeStr=moment(this.returnList.payTimeStr).format('YYYY-MM-DD')
          createReturn(this.returnList).then(res=>{
            this.$message.success('添加成功！')
            this.$emit('setdialog')
            this.$emit('seteditflag')
            this.$emit('updatelist')
            this.returnList={
                customerId:'',
                employeeId:'',
                orderBaseId:'',
                payTime:'',
                paymentType:'',
                orderBaseId:'',
                remark:'',
                note:'',
                amount:''
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
            console.log("salllll")
            console.log("xiugai xiuagi a")
            // console.log(product)
            this.returnList.payTimeStr=moment(this.returnList.payTimeStr).format('YYYY-MM-DD')
            updateReturn(this.returnList).then(res=>{
              this.$message.success('修改成功！')
              this.$emit('setdialog')
              this.$emit('seteditflag')
              this.$emit('updatelist')
              this.returnList={
                  customerId:'',
                  employeeId:'',
                  orderBaseId:'',
                  payTime:'',
                  paymentType:'',
                  orderBaseId:'',
                  remark:'',
                  note:'',
                  amount:''
                }
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
      console.log("选择订单")
      console.log(val)
      this.orderName=val.orderName
      this.returnList.orderBaseId=val.orderBaseId
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