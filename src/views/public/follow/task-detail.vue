<template>
  <div>
    <div>
      <el-form ref="arrange" :model="arrange" label-position="right" label-width="180px" style="width: 400px; margin-left:50px;">
          <el-form-item label="安排人名称：" prop="arrangeName">
            <span>{{arrange.arrangeName}}</span>
          </el-form-item>
          <el-form-item label="任务创建时间" prop="createTime">
            <span>{{arrange.createTime}}</span>
          </el-form-item>
          <el-form-item label="客户：">
            <span class="link-type" @click="handle(arrange.customerId,'customer')">[{{arrange.customerName}}]</span>
          </el-form-item>
          <el-form-item label="客户联系人：" prop="relationName">
            <span class="link-type" @click="handle(arrange.relationId,'relation')">{{arrange.relationName}}</span>
          </el-form-item>
          <el-form-item label="任务内容：" prop="arrangeContent">
            <span>{{arrange.arrangeContent}}</span>
          </el-form-item>
          <el-form-item label="负责人名称：" prop="chargeName">
            <span>{{arrange.chargeName}}</span>
          </el-form-item>
          <el-form-item label="任务执行时间：" prop="executeTime">
            <span>{{arrange.executeTime}}</span>
          </el-form-item>
          <el-form-item label="已读状态：" prop="isread">
            <span v-if="arrange.isread==null">未读</span>
            <span v-if="arrange.isread==0">已读</span>
          </el-form-item>
          <el-form-item label="任务完成状态：" prop="iscomplete" v-if="arrange.iscomplete != null">
            <span v-if="arrange.iscomplete==0">完成</span>
            <span v-if="arrange.iscomplete==1">失败</span>
          </el-form-item>
          <el-form-item label="是否完成：" prop="iscomplete" v-if="arrange.iscomplete==null">
            <span >
              <el-radio v-model="arrange.iscomplete" :label="0">完成</el-radio>
              <el-radio v-model="arrange.iscomplete" :label="1">失败</el-radio>
            </span>
          </el-form-item>  
        </el-form>
        <div v-if="iscomplete!=arrange.iscomplete" style="margin-left:300px;margin-top:50px;margin-bottom:50px">
          <el-button size="small" type="warning" @click="cancel">取消修改</el-button>
          <el-button size="small" type="success" @click="save">保存修改</el-button>
        </div>
        <el-form v-if="iscomplete!=arrange.iscomplete&&arrange.iscomplete==0" :model="arrange" res="arrange" :rules="rules" label-position="right" label-width="180px" style="width: 400px; margin-left:50px;">
          <el-form-item label="跟进时间：" prop="followTime">
            <el-row>
              <el-col span="8">
                <el-date-picker
                v-model="arrange.followTime"
                type="datetime"
                placeholder="选择跟进时间"
                 />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="跟进方式：" prop="followWay">
            <el-row>
              <el-col span="24">
                <el-input v-model="arrange.followWay"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="跟进过程：" prop="followDetail">
            <el-row>
              <el-col span="24">
                <el-input v-model="arrange.followDetail" type="textarea"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="跟进结果：" prop="followResult">
            <el-row>
              <el-col span="24">
                <el-input v-model="arrange.followResult"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <el-dialog title="联系人详情：" :visible.sync="dialogFlag" append-to-body="">
          <relationDetail :Rid="Rid"></relationDetail>
        </el-dialog>
    </div>
  </div>
</template>
<script>
import {arrangeFail,arrangeComplete,arrangeDetail} from '@/api/arrange'
import relationDetail from '../relation/relationById'
export default {
  props:['type','Aid'],
  components:{
    relationDetail
  },
  data() {
    return {
      arrange:null,
      iscomplete:0,//保存原始计划完成状态
      Rid:'',
      Cid:'',
      dialogFlag:false,
      rules:{
        followDetail:[
          {required:true,message:'请描述跟进过程',trigger:'blur'}
        ],
        followResult:[
          {required:true,message:'请输入跟进结果',trigger:'blur'}
        ],
        followTime:[
          {required:true,message:'请选择跟进时间',trigger:'blur'}
        ],
        followWay:[
          {required:true,message:'请输入跟进方式',trigger:'blur'}
        ]
      }
    }
  },

  watch: {
    Aid(newVal){
      if(newVal){
        this.getDetail()
      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    /**
     * 获取改计划的详情
     */
    getDetail(){
      const params={
        id:this.Aid
      }
      arrangeDetail(params).then(res=>{
        this.arrange=res.data
        this.iscomplete=res.data.iscomplete
      }).catch(err=>{

      })
    },
    /**
     * 保存完成状态修改后的记录
     */
    save(){

      /***
       * 新增字段
       */
      
      this.$refs['arrange'].validate(valid=>{
        if(valid){
          console.log("验证通过")
          console.log(this.arrange)
          console.log(this.arrange.iscomplete)
            if(this.arrange.iscomplete==1){//更新计划为失败
                  /**
                  * 请求计划失败接口
                  */
                arrangeFail(this.arrange).then(res=>{
                  this.$message.success('已更改任务状态为失败！')
                  //更新列表
                  this.getDetail()
                  this.$emit('updatelist')
                }).catch(err=>{

                })
            }else{
                /**
                 * 请求计划更改为完成接口
                 */
                console.log(this.arrange)
                arrangeComplete(this.arrange).then(res=>{
                  this.$message.success('已更改任务状态为完成！')
                  this.getDetail()
                  this.$emit('updatelist')
                }).catch(err=>{
                  
                })
            }
        }else{
          return false
        }
      })
      console.log("complete......")
      console.log(this.arrange.iscomplete,this.iscomplete)
     
    },
    /**
     * 查看联系人详情和客户详情
     */
    handle(id,type){
      if(type=='customer'){
        this.$router.push({name:'CustomerDetail',query:{customerId:id}})
      }else{
        this.Rid=id
        this.dialogFlag=true
      }
    },
    /**
     * 取消修改
     */
    cancel(){
      this.arrange.iscomplete=this.iscomplete
    }
  },



}
</script>
<style scoped>
</style>