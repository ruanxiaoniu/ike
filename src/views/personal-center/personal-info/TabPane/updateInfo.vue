<template>
<div>
  <el-form :model="personalList" :ref="personalList" :rules="rules" label-position="right" label-width="130px">
    <el-form-item label="用户名：" prop="username">
     <el-row>
       <el-col :span="8">
         <el-input v-model="personalList.username"></el-input>
       </el-col>
     </el-row>
    </el-form-item>
    <el-form-item label="姓名：" prop="name">
      <el-row>
       <el-col :span="8">
         <el-input v-model="personalList.name"></el-input>
       </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="性别：" prop="gender">
      <el-row>
       <el-col :span="8">
         <el-radio v-model="personalList.gender" :label="male">女</el-radio>
         <el-radio v-model="personalList.gender" :label="femal">男</el-radio>
       </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="电话号码：" prop="phone">
      <el-row>
       <el-col :span="8">
         <el-input v-model="personalList.phone"></el-input>
       </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="邮箱：" prop="email">
      <el-row>
       <el-col :span="8">
         <el-input type="email" v-model="personalList.email"></el-input>
       </el-col>
      </el-row>
    </el-form-item>
     <el-form-item label="职位：" prop="positionId">
      <el-row>
       <el-col :span="8">
         <el-select v-model="personalList.positionId">
           <el-option v-for="item in positionList" :key="item.id" :label="item.positionName" :value="item.id"></el-option>
         </el-select>
       </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="部门：" prop="departmentId">
      <el-row>
       <el-col :span="8">
         <el-select v-model="personalList.departmentId">
           <el-option v-for="item in departmentList" :key="item.id" :label="item.departmentName" :value="item.id"></el-option>
         </el-select>
       </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="账号状态：">
      <el-row>
       <el-col :span="8">
         <el-radio v-model="personalList.status" :label="femal">正常</el-radio>
         <el-radio v-model="personalList.status" :label="male">故障</el-radio>
       </el-col>
      </el-row>
    </el-form-item>
  </el-form>
  <div style="margin-left:500px">
    <el-button type="success" size="small" @click="save('personalList')">保存</el-button>
  </div>
</div>
</template>

<script>
import {getPerson,updatePerson} from '@/api/user'
import {getPositionInfo} from '@/api/position'
import {getDepartmentInfo} from '@/api/department'
  export default {
    props: {
      type: {
        type: String,
        default: 'person_info'
      }
    },
    data() {
      return {
        personalList:null,
        positionList:null,
        departmentList:null,
        femal:0,
        male:1,
        params:{
          id:''
        },
        rules:{
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'}
          ],
          name:[
            {required:true,message:'请输入姓名',trigger:'blur'}
          ],
          gender:[
            {required:true,message:'请选择性别',trigger:'blur'}
          ],
          phone:[
            {required:true,message:'请输入手机号',trigger:'blur'},
            {min:11,max:11,message:'请输入正确的手机号',trigger:'blur'}
          ],
          email:[
            {required:true,message:'请输入手机号',trigger:'blur'},
            {type:'email',message:'请输入正确的邮箱',trigger:'blur'}
          ],
          positionId:[
            {required:true,message:'请选择职位',trigger:'blur'},
          ],
          departmentId:[
            {required:true,message:'请选择部门',trigger:'blur'},
          ],
        }
      }
    },
    created() {
      this.params.id=this.$store.getters.userId
      this.getPersonInfo()
      this.getPositon()
      this.getDepartment()
    },
    methods: {
      /**
       * 获取个人信息
       */
      getPersonInfo(){
        console.log("内部消息")
        console.log(this.params)
        getPerson(this.params).then(res=>{
          this.personalList=res.data
        }).catch(err=>{

        })
      },
      /**
       * 获取职位信息
       */
      getPositon(){
        getPositionInfo().then(res=>{
          this.positionList=res.data
        }).catch(err=>{

        })
      },
      /**
       * 获取部门信息
       */
      getDepartment(){
        getDepartmentInfo().then(res=>{
          this.departmentList=res.data
        }).catch(err=>{

        })
      },
      /**
       * 点击保存
       */
      save(formName){
        // this.$refs[formName].validate((valid)=>{
        //   if(valid){
            /**
             * 修改请求
             */
            updatePerson(this.personalList).then(res=>{
              this.$message.success('修改成功')
              this.$router.go(0)
            }).catch(err=>{
              this.$message.error('修改失败，请重试！')
            })
        //   }else{
        //     return false
        //   }
        // })
      }
    }
  }
</script>

