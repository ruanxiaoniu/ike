<template>
  <div>
      <el-form  ref="searchQuery" :rules="rules" :model="searchQuery" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
       <el-form-item label="客户">
        <el-row>
          <el-col :span="18">
            <!-- 可进行远程搜索客户 -->
            <el-input v-model="searchQuery.customerName"></el-input>
          </el-col>
        </el-row>
       </el-form-item>
        <el-form-item label="联系人" prop="relationId">
          <el-row>
            <el-col span="18">
             <el-input v-model="searchQuery.relationName"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="回款时间" prop="planDate">
           <el-date-picker
            v-model="returnTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="回款金额"> 
          <el-row>
            <el-col span="11">
              <el-input v-model="searchQuery.amountMin"></el-input>
            </el-col>
            <el-col span="2">
              <span>&nbsp;&nbsp;至</span>
            </el-col>
            <el-col span="11">
              <el-input v-model="searchQuery.amountMax"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
       <div style="margin-left:600px;margin-top:50px">
        <el-button  size="small" type="primary" @click="search()">确认</el-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      returnTime:'',
      searchQuery:{
        customerName:'',
        relationName:'',
        payTimeMin:'',
        payTimeMax:'',
        amountMin:'',
        amountMax:''
      },
    }
  },
  methods: {
    /**
     * 点击确定，验证并提交表单，触发父组件方法
     * method:cancel()
     */
    search(){
      //处理搜索数据
      if(this.returnTime){
          this.searchQuery.payTimeMin=moment(this.returnTime[0]).format('YYYY-MM-DD')
          this.searchQuery.payTimeMax=moment(this.returnTime[1]).format('YYYY-MM-DD')
      }
      //返回搜索数据给数据
      this.$emit('updatelist',this.searchQuery)
      this.searchQuery={
         employeeId:'',
        customerName:'',
        relationName:'',
        payTimeMin:'',
        payTimeMax:'',
      },
      this.returnTime=''
    }
  },
}
</script>