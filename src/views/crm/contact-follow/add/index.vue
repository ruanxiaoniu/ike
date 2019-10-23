<template>
  <div>
    <el-form ref="customer" :rules="rules" :model="customer" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
      <el-form-item label="客户：" prop="customerId">
        <el-row>
          <el-col span="18">
            <!-- 可进行远程搜索 -->
            <el-select
              v-model="customer.customerId"
              filterable
              remote
              reserve-keyword
              style="width:100%"
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
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
          <el-col span="18">
            <el-select v-model="customer.relationId" placeholder="请选择联系人">
              <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id"/>
            </el-select>
          </el-col>
          <el-col span="4">
            <el-button size="small" icon="el-icon-edit" @click="editRealtion">编辑</el-button>
          </el-col>
        </el-row>
       
      </el-form-item>
      <el-form-item label="跟进时间：" prop="followTime">
        <el-row>
          <el-col span="18">
            <el-date-picker
              v-model="customer.followTime"
              type="datetime"
              placeholder="选择跟进时间"/>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="跟进方式" prop="followWay">
        <el-row>
          <el-col span="18">
            <el-input v-model="customer.followWay" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="跟进细节" prop="followDetail">
        <el-input v-model="customer.followDetail" type="textarea" />
      </el-form-item>
      <el-form-item label="跟进结果" prop="followResult">
        <el-row>
          <el-col span="18">
            <el-input v-model="customer.followResult" />
          </el-col>
        </el-row> 
      </el-form-item>
    </el-form>
    <div style="margin-left:500px">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="add('customer')">确认</el-button>
    </div>
    <el-dialog title="联系人管理" :visible.sync="dialogFlag" append-to-body>
      <relation :Cid="Cid" :updaterelation="updateRelation"></relation>
    </el-dialog>
  </div>
</template>
<script>
import relation from '../../../public/relation/relation'
import { getCustomerInfo,getOneRelation} from '@/api/customer'
import {addFollow} from '@/api/follow'
import { format } from 'path'
export default {
  components:{
  
     relation,
  },
  data() {
    return {
      customerFilter:null,
      customerOptions:null,
      relationList:null,
      Cid:'',
      dialogFlag:false,
      customer:{
       followResult:'',
       followDetail:'',
       followWay:'',
       followTime:'',
       relationId:'',
       customerId:''
      },
      rules:{
        followResult:[
          { required:true,message:'请输入跟进结果',trigger:'blur'}
        ],
        followTime:[
          { required:true,message:'请选择跟进时间',trigger:'blur'}
        ],
        relationId:[
          {required:true,message:'请选择联系人',trigger:'blur'}
        ],
        customerId:[
          {required:true,message:'请选择客户',trigger:'blur'}
        ]
      }
    }
  },
  watch: {
    "customer.customerId":function (newVal) {
      this.Cid=newVal
   
      if(newVal!=''){
        console.log("新建跟进那你")
        console.log(newVal)
        this.getRelation()
      }
      
    }
  },
  
  created() {
    this.getCustomer()
  },
  methods:{
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
    handle(type){
      this.title=type
      this.dialogFlag=true
    },
    //远程搜索客户
    remoteMethod(query){
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
    * 取消添加
    */
    cancel(){
      this.$emit('setdialog')
    },
    /**
    * 提交添加
    */
    add(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          /**
          * 添加请求
          */
         console.log("custoemer.....")
         console.log(this.customer)
          addFollow(this.customer).then(res=>{
            this.$message.success('添加成功！')
            
            this.$emit('updatelist')
             this.customer={
              followResult:'',
              followDetail:'',
              followWay:'',
              followTime:'',
              relationId:'',
              customerId:''
              }
          }).catch(err=>{
            this.$message.error('添加失败！')
          })
        }else{
          return false
        }
      })
    },
    /**
     * 更新联系人列表
     */
    updateRelation(){
      this.getRelation()
      // this.dialogFlag=false
    },
    /**
     * 编辑联系人
     */
    editRealtion(){
      if(this.Cid){
        this.dialogFlag=true
        this.getRelation()
      }else{
        this.$message.error('请选择客户！')
      }
    }
  },
 
}
</script>