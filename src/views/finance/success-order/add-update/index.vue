<template>
  <div >
    <div class="top">基本信息</div>
     <el-form :model="orderList" ref="orderList" :rules="rules" label-position="right" label-width="130px" style="margin-top:10px">
       <el-form-item label="客户">
        <el-row>
          <el-col :span="18">
            <!-- 可进行远程搜索客户 -->
            <el-select
              v-model="orderList.customerId"
              filterable
              remote
              reserve-keyword
              style="width:200px"
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
        <el-form-item label="联系人" prop="relationId">
          <el-row>
            <el-col span="18">
              <el-select v-model="orderList.relationId" placeholder="请选择联系人" style="width:200px">
                <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id"/>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
     </el-form>
     <div class="top">选择产品</div>
     <el-table
       :data="productList"
       border
       style="width: 100%;margin-top:10px">
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-plus" @click="addOrder(scope.$index)"></el-button>
          <el-button size="small" icon="el-icon-delete" @click="subOrder(scope.$index)"></el-button>
        </template>
          
      </el-table-column>
      <el-table-column label="产品名称" min-width="100px" prop="productName">
        <template slot-scope="scope">
           <el-select
              v-model="scope.row.productId"
              filterable
              remote
              reserve-keyword
              style="width:100%"
              placeholder="请输入关键词"
              :remote-method="remoteMethodProduct"
              :loading="loading"
              @change="changeProduct"
            >
              <el-option
                v-for="item in productOptions"
                :key="item.id"
                :label="item.productName"
                :value="item.id"
              />
            </el-select>
        </template>
        
       </el-table-column>
       <el-table-column label="成本" min-width="50px" prop="cost">
         <template slot-scope="scope">
             <el-input disabled v-model="scope.row.cost"></el-input>
         </template>
       </el-table-column>
       <el-table-column label="销售单价"  min-width="60px" prop="salePrice">
         <template slot-scope="scope">
           <el-input disabled  v-model="scope.row.salePrice"></el-input>
         </template>
       </el-table-column>
       <el-table-column label="成交数量"  min-width="120px" prop="orderNum">
          <template slot-scope="scope">
            <el-input-number style="width:150px" :min="0" @change="changehandle(scope.$index)"  v-model="scope.row.orderNum"  label="描述文字"></el-input-number>
          </template>
       </el-table-column>
       
       <el-table-column label="总价" min-width="60px" prop="total">
         <template slot-scope="scope">
           <el-input disabled v-model="scope.row.orderActualTotal" ></el-input>
         </template>
         
       </el-table-column>
  </el-table>
  <el-form class="demo-form-inline" ref="orderList" :rules="rules" :model="orderList" style="margin-top:10px">
    <el-row>
      <el-col :span="12">
          <el-form-item label="成交总额：" >
            <el-row>
              <el-col :span="7">
                <el-input v-model="orderList.orderTotal" disabled></el-input>  
              </el-col>
              <el-col :span="5">
                 <span>元</span>
              </el-col>
            </el-row>
          </el-form-item>
      </el-col>

      <el-col :span="12">
         <el-form-item label="总成本：">
            <el-row>
              <el-col span="7">
                <el-input v-model="orderList.orderCost" disabled></el-input>
              </el-col>
            </el-row>
          </el-form-item>
      </el-col>
    </el-row>
    
    <el-row>
       <el-col :span="12">
          <el-form-item label="实际成交价：">
            <el-row>
              <el-col span="7">
                <el-input v-model="orderList.orderActualTotal"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="付款方式：">
          <el-row>
            <el-col span="5">
              <el-input v-model="orderList.paymentMethod"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-row>
      <!-- <el-col :span="12">
        <el-form-item label="下单时间：">
          <el-date-picker
                v-model="orderList.orderTimeStr"
                type="datetime"
                placeholder="选择下单时间"/>
        </el-form-item>
      </el-col> -->
      <el-col :span="12">
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="orderList.note"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    
  </el-form>
     <div style="margin-left:500px;margin-top20px;">
       <el-button size="small" @click="cancel">取消</el-button>
       <el-button size="small" type="primary" v-if="editFlag" @click="editOperate('orderList')">修改</el-button>
       <el-button size="small" type="primary" v-else @click="add('orderList')">新建</el-button>
     </div>
  </div>
</template>
<script>
import {orderById,updateOrder,createOrder} from '@/api/order'
import {getProductList,getProductDetail} from '@/api/product'
import {getEmployeeAll} from '@/api/employee'
import { getCustomerInfo,getOneRelation} from '@/api/customer'
import moment from 'moment'
export default {
  props:['edit','Oid'],
  components:{
  },
  data() {
    return {
      productId:0,
      productList:[
        {
          cost:'',
          salePrice:'',
          orderNum:0,
          orderActualTotal:'',
          productId:'',
          productName:''
        }
      ],
      loading:false,
      Cid:'',
       orderList:{
         id:'',
         employeeId:'',
         relationId:'',
         productClassId:'',
         note:'',
         orderTotal:0,
         orderActualTotal:'',
         orderCost:0,
         orderState:'',
         orderTimeStr:'',
         paymentMethod:'',
         orderProductVoList:[]
       },
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
      rules:{
        customerId:[
          {requried:true,message:'请选择客户',trigger:'blur'}
        ],
        relationId:[
          {requried:true,message:'请选择联系人',trigger:'blur'}
        ],
        orderActualTotal:[
          {requried:true,message:'请输入实际成交价',trigger:'blur'}
        ],
        paymentMethod:[
          {requried:true,message:'请输入付款方式',trigger:'blur'}
        ],
      },
      employeeOptions:null,//员工选项
      employeeFilter:null,//用于远程搜索
      customerFilter:null,//客户搜索
      customerOptions:null,
      productFilter:null,//客户搜索
      productOptions:null,
      relationList:null,
      currentIndex:0
    }
  },
  watch:{
    Oid(newVal){
      console.log("nnnnnnn")
      console.log(newVal)
      this.editQuery={
        orderBaseId:newVal
      }
      console.log(this.editQuery)
      this.getOrderById()
    },
    edit(newVal){
      this.editFlag=newVal
      console.log("editttttttttttt")
      console.log(this.editFlag)
      this.orderList={
         productClassId:'',
         productName:'',
         salePrice:'',
         cost:'',
         saleUnitId:'',
         onSale:'',
         introduction:''
       }
       this.getOrderById()
    },
    'orderList.customerId':function (newVal) {
      this.Cid=newVal
      if(newVal!=''){
        console.log(newVal)
        this.getRelation()
      }
    },
    watchProduct:{
      deep:true,
      handler:function(val){
        let TotalCost=0
        let TotalPrice=0
        // console.log("计算啦1")
        this.productList.forEach((item,index)=>{
          this.orderList.orderTotal=parseInt(this.orderList.orderTotal)+parseInt(item.orderActualTotal) 
          this.orderList.orderCost=parseInt(this.orderList.orderCost)+parseInt(item.cost) 
          // console.log("计算啦2")
          console.log(this.orderList.orderTotal)
        })
        // this.orderList.orderTotal=totalPrice
        // this.orderList.orderCost=TotalCost
      }
    }
  },
  computed: {
    watchProduct(){
      return this.productList
    },
    getTotal:{
      
      get(){
        let sum=0
       console.log("计算啦1")
          this.productList.forEach((item,index)=>{
            console.log("计算啦2")
            sum=sum+item.orderActualTotal
          })
          return sum
      },
      set(){
        let sum=0
         this.productList.forEach((item,index)=>{
            console.log("计算啦2")
            sum=sum+item.orderActualTotal
          })
          return sum
      }
    },
    getTotalCost(){
      let sum=0
       console.log("计算啦1")
      this.productList.forEach((item,index)=>{
        sum=sum+item.cost
      })
      return sum
    }
  },
  created(){
    
    if(this.edit){//若是修改
      console.log("产品修改")
      console.log(this.Oid)
        console.log(this.edit)
        this.editFlag=this.edit
        this.editQuery={
          orderBaseId:this.Oid
        }
        this.getOrderById()
    }
    this.getEmployee()
    this.getCustomer()
    this.getProduct()
  },
  methods:{
     /**
     * 修改，回显某个订单
     */
     getOrderById(){
       if(this.edit){
          this.productList=[]
          console.log("search")
          console.log(this.editQuery)
          orderById(this.editQuery).then(res=>{
            this.orderList.relationId=res.data.relationId
            this.orderList.orderActualTotal=res.data.orderActualTotal
            this.orderList.note=res.data.note
            this.orderList.customerId=res.data.customerId
            this.orderList.orderTimeStr=res.data.orderTime
            this.orderList.id=res.data.id
            res.data.orderProductVoList.forEach((item,index)=>{
              let product={
                            cost:item.saleCost,
                            salePrice:item.salePrice,
                            orderNum:item.orderCount,
                            orderActualTotal:item.totalPrice,
                            productName:item.productName,
                            productId:item.productId,
                          }
              this.productList.push(product)
            })
            console.log("product")
            console.log(res.data.orderProductVoList)
            console.log(this.orderList)
            console.log(this.productList)
          }).catch(err=>{
          })
       }
      
     },
       /**
     * 获取所有产品名
     */
    getProduct(){
        
       getProductList().then(res=>{
           console.log("uuuuuuu")
        this.productOptions=res.data.records
         console.log("pppppp")
         console.log(this.productOptions)
      }).catch(err=>{
      
        console.log(err)
      })
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
      获取所有客户联系人信息
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
      * 获取某个产品信息
      */
     getPDetail(id){
       console.log("id")
       console.log(id)
       let query={
         id:id
       }
       getProductDetail(query).then(res=>{
         let p={
             cost:res.data.productExtVO.cost,
             salePrice:res.data.productExtVO.salePrice,
             orderNum:res.data.productVO.orderNum,
             orderActualTotal:res.data.productExtVO.salePrice*res.data.productVO.orderNum,
             productId:id
           }
           this.productList[this.currentIndex]=p
         console.log("product")
         console.log(this.productList)
       }).catch(err=>{

       })
     },
    /**
     * 点击取消
     */
    cancel(){
      this.orderList={
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
          this.productList.forEach((item,index)=>{
            let ele={
              productId:item.productId,
              orderCount:item.orderNum
            }
            this.orderList.orderProductVoList.push(ele)
          })
          console.log("prrpprprp")
          console.log(this.orderList)
          /**
           * 添加订单请求
           */
          createOrder(this.orderList).then(res=>{
            this.$message.success('添加成功！')
            this.$emit('setdialog')
            this.$emit('seteditflag')
            this.$emit('updatelist')
            this.orderList={
              employeeId:'',
              relationId:'',
              productClassId:'',
              note:'',
              orderTotal:0,
              orderActualTotal:'',
              orderCost:0,
              orderState:'',
              paymentMethod:'',
              orderProductVoList:[]
            }
            this.productList=[
                {
                cost:'',
                salePrice:'',
                orderNum:0,
                orderActualTotal:'',
                productId:'',
                }
            ]
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
             this.productList.forEach((item,index)=>{
             let ele={
              productId:item.productId,
              orderCount:item.orderNum
             }
             this.orderList.orderProductVoList.push(ele)
            })
            this.orderList.orderTimeStr=moment(this.orderList.orderTimeStr).format('YYYY-MM-DD')
            console.log("prrpprprp")
            console.log(this.orderList)
            updateOrder(this.orderList).then(res=>{
                this.$message.success('修改成功！')
                this.$emit('setdialog')
                this.$emit('seteditflag')
                this.$emit('updatelist')
                this.orderList={
                  employeeId:'',
                  relationId:'',
                  productClassId:'',
                  note:'',
                  orderTotal:0,
                  orderActualTotal:'',
                  orderCost:0,
                  orderState:'',
                  paymentMethod:'',
                  orderProductVoList:[]
                }
                this.productList=[
                    {
                    cost:'',
                    salePrice:'',
                    orderNum:0,
                    orderActualTotal:'',
                    productId:'',
                    }
                ]
                }).catch(err=>{
                  console.log("出错了")
                  console.log(err)
                  this.$message.error('修改失败，请重试！')
                })
         }else{
           return false
         }
       })
     
    },
    
    /**
     * 产品选中值发生变化时
     */
    changeProduct(id){
      console.log("产品")
      console.log(id)      
      this.getPDetail(id)
    },
    /**
     * 数量框发生变化
     */
    changehandle(index){
      console.log("下标")
      
      this.productList[index].orderActualTotal=this.productList[index].orderNum*this.productList[index].salePrice 
        this.productList.forEach((item,index)=>{
          console.log("计算啦1")
           this.orderList.orderTotal=parseInt(this.orderList.orderTotal) +parseInt(item.orderActualTotal)
          this.orderList.orderCost=parseInt(this.orderList.orderCost)+parseInt(item.cost)
          console.log("计算啦2")
          console.log(this.orderList.orderTotal)   
        })
    },
    /**
     * 添加产品
     */
    addOrder(index){
      this.productList.push( {
          cost:'',
          salePrice:'',
          orderNum:0,
          orderActualTotal:'',
          productId:'',
        })
    },
    /**
     * 删除产品
     */
    subOrder(index){
      this.productList.splice(index,1)
    }
  }
}
</script>
<style scoped>
.span{
  padding-top: 10px;
}
</style>