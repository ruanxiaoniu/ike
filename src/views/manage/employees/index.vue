<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="部门管理">
        <el-button size="small" icon="el-icon-edit" @click="dialogFormVisibles_dept_add = true">
          添加
        </el-button>

        <el-dialog title="添加部门" :visible.sync="dialogFormVisibles_dept_add" >
          <el-form :model="form">
            <el-form-item label="部门名称" :label-width="formLabelWidth">
              <el-input v-model="form.departmentName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibles_dept_add = false">取 消</el-button>
            <el-button type="primary" @click="addDepartment">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="部门详情" :visible.sync="dialogFormVisibles_dept_detail" custom-class="detail">
          <el-form :data="deptDetail" :model="form" >
            <el-form-item label="部门id" :label-width="formLabelWidth">
              <el-input prop="id"  v-model="deptDetail.id" autocomplete="off"  readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="部门名称" :label-width="formLabelWidth">
              <el-input prop="departmentName" v-model="deptDetail.departmentName" autocomplete="off" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibles_dept_detail = false">取 消</el-button>
              <el-button type="primary" @click="updDepartment()">确 定</el-button>
          </div>
        </el-dialog>


        <el-table :data="deptData" style="width: 100%">
          <el-table-column prop="id" label="部门id" width="180"></el-table-column>
          <el-table-column prop="departmentName" label="部门名称" width="180"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button  size="small" icon="el-icon-edit"   @click="getDepartment(scope.row)">修改</el-button>
              <el-button  size="small" icon="el-icon-delete" @click="delDepartment(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="职位管理">
        <el-button size="small" icon="el-icon-edit" @click="dialogFormVisibles_position_add = true">
          添加
        </el-button>

        <el-dialog title="添加职位" :visible.sync="dialogFormVisibles_position_add" >
          <el-form :model="form">
            <el-form-item label="职位名称" :label-width="formLabelWidth">
              <el-input v-model="form.positionName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibles_position_add = false">取 消</el-button>
            <el-button type="primary" @click="addPosition">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="职位详情" :visible.sync="dialogFormVisibles_position_detail" custom-class="detail">
          <el-form :data="positionDetail" :model="form" >
            <el-form-item label="职位id" :label-width="formLabelWidth">
              <el-input prop="id"  v-model="positionDetail.id" autocomplete="off"  readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="职位名称" :label-width="formLabelWidth">
              <el-input prop="positionName" v-model="positionDetail.positionName" autocomplete="off" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibles_position_detail = false">取 消</el-button>
            <el-button type="primary" @click="updPosition">确 定</el-button>
          </div>
        </el-dialog>
        
        <el-table :data="positionData" style="width: 100%">
          <el-table-column prop="id" label="职位id" width="180"></el-table-column>
          <el-table-column prop="positionName" label="职位名称" width="180"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button  size="small" icon="el-icon-edit"   @click="getPosition(scope.row)">修改</el-button>
              <el-button  size="small" icon="el-icon-delete" @click="delPosition(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
import { getDepartmentInfo } from '@/api/department'
import { addDepartment } from '@/api/department'
import { delDepartment } from '@/api/department'
import { updDepartment } from '@/api/department'
import { getPositionInfo } from '@/api/position'
import { addPosition } from '@/api/position'
import { delPosition } from '@/api/position'
import { updPosition } from '@/api/position'

  export default {
    created(){
      this.getAllDepartment(),
      this.getAllPosition()
    },

    data() {
      return {
        deptData: [],
        positionData: [],
        deptDetail:{
          id:'',
          departmentName:'',
        },
        positionDetail:{
          id:'',
          positionName:'',
        },
        dialogFormVisibles_dept_add: false,
        dialogFormVisibles_dept_detail:false,
        dialogFormVisibles_position_add:false,
        dialogFormVisibles_position_detail:false,
        form: {
          name: '',
        },
        formLabelWidth: '120px'
      }
    },
    methods:{
      getAllDepartment(){
        getDepartmentInfo().then(response=>{
          this.deptData = response.data;
        })
      },
      addDepartment(){
        addDepartment(this.form).then(response=>{
          if (response.data.code == 0) {
            this.getAllDepartment();
            this.dialogFormVisibles_dept_add = false;
          }
        })

      },
      addPosition(){
        addPosition(this.form).then(response=>{
          if (response.data.code == 0) {
            this.getAllPosition();
            this.dialogFormVisibles_position_add = false;
          }
        })
      },
      getAllPosition(){
        getPositionInfo().then(response=>{
          this.positionData = response.data;
        })
      },
      delDepartment(data){
        delDepartment(data.id).then(response=>{
          console.log("res: "+response.data);
          if (response.data.code == 0) {
            this.getAllDepartment();
          }
        })
      },
     delPosition(data){
        delPosition(data.id).then(response=>{
          console.log("res: "+response.data);
          if (response.data.code == 0) {
            this.getAllPosition();
          }
        })
      },
      getDepartment(data){
        console.log(data.id+"---->"+data.departmentName);
        this.dialogFormVisibles_dept_detail = true;
        this.deptDetail.id = data.id;
        this.deptDetail.departmentName = data.departmentName;
      },
      getPosition(data){
        this.dialogFormVisibles_position_detail = true;
        this.positionDetail.id = data.id;
        this.positionDetail.positionName = data.positionName;
      },
      updDepartment(){
        this.dialogFormVisibles_dept_detail = false;
        const param = {
          id:this.deptDetail.id,
          departmentName:this.deptDetail.departmentName
        }
        updDepartment(param).then(response=>{
          if (response.data.code == 0) {
            this.getAllDepartment();
          }
        })
      },
      updPosition(){
        this.dialogFormVisibles_position_detail = false;
        const param = {
          id:this.positionDetail.id,
          positionName:this.positionDetail.positionName
        }
        updPosition(param).then(response=>{
          if (response.data.code == 0) {
            this.getAllPosition();
          }
        })
      }
    }

  }
</script>
