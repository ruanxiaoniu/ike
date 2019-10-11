<template>
  <div>
     <div style="margin-top:20px">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          @mouseover.native="enter(index)"
          @mouseout.native="leave(index)"
          icon="people"
          timestamp="跟进结果">
             <!-- <span>{{index}}</span> -->
             <span class="detail" @click="show('employee')">录入人</span> <span @click="show('followDetail')" class="detail">跟进时间</span>
              <p></p>
              <div>
                <span>跟进方式:</span>
                <span class="detail" @click="show('relation')">联系方式</span>
                <span class="detail" @click="show('customer')">[客户名称]</span>
              </div>
              <div  style="float:right" >
                  <el-button size="small" icon="el-icon-delete">删除</el-button>
                  <el-button size="small" icon="el-icon-edit">修改</el-button>
                  <el-button size="small" icon="el-icon-document" @click="show('followDetail')">详情</el-button>
              </div>
              
        </el-timeline-item>
      </el-timeline>

      <el-dialog :title="textMap[type]" :visible.sync="dialogFlag" append-to-body="true" width="60%">
        <followDetail v-if="type=='followDetail'"></followDetail>
        <relation v-else-if="type=='relation'"></relation>
        <customer v-else-if="type=='customer'"></customer>
        <employee v-else-if="type=='employee'"></employee>
      </el-dialog>
     
  </div>
  </div>
</template>
<script>
import followDetail from '../../crm/contact-follow/detail/index'
import relation from '../../public/customer/relation'
import customer from '../../public/customer/all-detail/index'
import employee from '../../public/employee/index'
export default {
  components:{
    followDetail,
    relation,
    customer,
    employee,
  },
  data() {
    return {
      textMap:{
        followDetail:'跟进详情',
        relation:'联系人详情',
        customer:'客户详情',
        employee:'成员详情'
      },
      dialogFlag:false,
      reverse: true,
      btnFlag:['false'],
      type:'',
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }],
    }
  },
  methods:{
    show(type){
      this.dialogFlag=true
      this.type=type
    },
    enter(index){
      this.btnFlag[index]='true'
      // console.log(index,this.btnFlag)
      this.text(this.btnFlag[index])
    },
    
    leave(index){
      this.btnFlag[index]='false'
      // console.log(index,this.btnFlag)
      this.text(this.btnFlag[index])
    },
    text(v){
      console.log(this.btnFlag)
      console.log(v=="true")
    }
  }
}
</script>
<style scoped>
.detail:hover{
  cursor: pointer;
  color: blue
}
</style>