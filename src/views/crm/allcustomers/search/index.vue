<template>
  <div>
    <div class="top">客户信息</div><p></p>
      <el-form  ref="searchQuery" :rules="rules" :model="searchQuery" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="客户名称" prop="customerName"> 
          <el-input v-model="searchQuery.customerName"></el-input>
        </el-form-item>
        <el-form-item label="客户阶段" prop="customerStageId">
          <el-select v-model="searchQuery.customerStageId" @change="changeStage" style="width:100%" placeholder="请选择客户阶段">
            <el-option v-for="(item) in stageList" :key="item.id" :label="item.stageName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户等级" prop="customerLevelId">
          <el-select v-model="searchQuery.customerLevelId" @change="changeStage" style="width:100%" placeholder="请选择客户等级">
            <el-option v-for="(item) in levelList" :key="item.id" :label="item.levelName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户状态" prop="customerState">
           <el-select v-model="searchQuery.customerState" style="width:100%" placeholder="请选择客户状态">
                <el-option label="冷却" value="冷却"></el-option>
                <el-option label="潜在" value="潜在"></el-option>
                <el-option label="意向" value="意向"></el-option>
                <el-option label="成交" value="成交"></el-option>
                <el-option label="失败" value="失败"></el-option>
                <el-option label="流失" value="流失"></el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="客户来源" prop="customerOriginId">
            <el-select v-model="searchQuery.customerOriginId" @change="changeStage" style="width:100%" placeholder="请选择客户来源">
                <el-option v-for="(item) in originList" :key="item.id" :label="item.originName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="客户地址" prop="customerAddress">
            <el-input v-model="searchQuery.customerAddress"></el-input>
        </el-form-item>
        <el-form-item label="客户创建时间" >
             <el-date-picker
                v-model="creatRang"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
        </el-form-item>
      <div class="top">跟进信息</div><p></p>
        <el-form-item label="跟进次数" prop="followMinCount">
           <el-row>
            <el-col span="11">
            <el-input v-model="searchQuery.followMinCount"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchQuery.followMaxCount"></el-input>
          </el-col>
          </el-row>
        </el-form-item> 
         <el-form-item label="多少天未跟进">
          <el-input v-model="searchQuery.differFollow"></el-input>
        </el-form-item>
       <div class="top">订单信息</div><p></p>
        <el-form-item label="成交次数" > 
            <el-row>
            <el-col span="11">
            <el-input v-model="searchQuery.orderMinCount"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchQuery.orderMaxCount"></el-input>
          </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="成交总额">
           <el-row>
            <el-col span="11">
            <el-input v-model="searchQuery.orderMinSum"></el-input>
          </el-col>
          <el-col span="2">
            <span>&nbsp;&nbsp;至</span>
          </el-col>
           <el-col span="11">
            <el-input v-model="searchQuery.orderMaxSum"></el-input>
          </el-col>
          </el-row>
        </el-form-item> 
      <div class="top">投诉信息</div><p></p>
        <el-form-item label="投诉次数" > 
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.complainMinCount"></el-input>
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.complainMaxCount"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <p></p>
      <div style="text-align:right">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="search">确认</el-button>
      </div>
  </div>
</template>
<script>
import {getCustomerAllOrigin,getCustomerAllStage,getCustomerAllLevel,getCustomerAll} from '@/api/customer'
import {parseTime} from '@/utils/formateDate'
import moment from 'moment'
import { format } from 'path'
export default {
  props:['selection','sortName','sortType'],
  data() {
    return {
      creatRang:'',
      stageList:null,
      originList:null,
      levelList:null,
      searchQuery:{
        customerName:'',
        employeeId:'',
        customerStageId:'',
        customerState:'',
        customerIntroduce:'',
        customerAddress:'',
        customerLevelId:'',
        customerOriginId:'',
        createMin:'',
        createMax:'',
        isToday:'',
        orderMinSum:'',
        orderMaxSum:'',
        orderMinCount:'',
        orderMaxCount:'',
        complainMinCount:'',
        complainMaxCount:'',
        differMin:'',
        differMax:'',
        isFollowed:'',
        followMinCount:'',
        followMaxCount:'',
        employIds:'',
        sortName:'',
        sortType:'',
        pageNum:1,
        pageSize:10
      },
      
    }
  },

  filters:{
    
  },
  created() {
    this.getStage()
    this.getLevel()
    this.getOrigin()
  },
  methods:{
     //获取表中的阶段信息
    getStage(){
      getCustomerAllStage().then(res=>{
       this.stageList=res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取表中的来源信息
     getOrigin(){
       getCustomerAllOrigin().then(res=>{
         this.originList=res.data
       }).catch(err=>{
       console.log(err)
     })
    },
    //获取表中的等级信息
    getLevel(){
       getCustomerAllLevel().then(res=>{
         this.levelList=res.data
       }).catch(err=>{
       console.log(err)
     })
    },
    cancel(){
      this.$emit('setdialog')
    },
    search(){
      console.log("searchlllll")
      if(this.$route.query.tab==='today_add'){//今天新增
            this.searchQuery.isToday="true"
         }else if(this.$route.query.tab==='today_follow'){//今天跟进
            this.searchQuery.differFollow=0
         }else if(this.$route.query.tab==='never'){//从未跟进
            this.searchQuery.isFollowed="true"
         }else if(this.$route.query.tab==='thirty'){//30天未跟进
            this.searchQuery.differFollow=30
         }
         if(this.selection=="所有成员"){
           this.searchQuery.employeeIds=""
         }else{
           this.searchQuery.employeeIds=this.selection
         }
         if(this.sortName!=''){
           this.searchQuery.sortName=this.sortName
         }
         if(this.sortType!=''){
           this.searchQuery.sortType=this.sortType
         }
         console.log(this.creatRang)
         if(this.creatRang){
              this.searchQuery.createMin=this.formatDate(this.creatRang[0]);
              this.searchQuery.createMax=this.formatDate(this.creatRang[1]);
         }
         console.log(this.formatDate(this.creatRang[0]))
         console.log(this.formatDate(this.creatRang[1]))
          getCustomerAll(this.searchQuery).then(res=>{
            console.log("搜索成功")
            console.log(res.data.records)
            this.$message.success("搜索成功")
            this.$store.dispatch('customer/setCustomerTableList',res.data.records)
            this.$emit('setdialog')
            
          }).catch(err=>{
              this.$message.error("搜索失败，请重试")
          })
         
    },
    //格式化时间
    formatDate(time){
       return moment(time).format('YYYY-MM-DD')
    }
  }
}
</script>