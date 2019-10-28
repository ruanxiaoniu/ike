<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="部门管理">
        <el-button size="small" icon="el-icon-edit" @click="dialogFormVisible = true">
          添加
        </el-button>

        <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="部门名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDepartment">确 定</el-button>
          </div>
        </el-dialog>

        <el-table :data="deptData" style="width: 100%">
          <el-table-column prop="id" label="部门id" width="180"></el-table-column>
          <el-table-column prop="departmentName" label="部门名称" width="180"></el-table-column>
          <el-table-column>
            <el-button size="small" icon="el-icon-edit" @click="">
              修改
            </el-button>
            <el-button size="small" icon="el-icon-delete" @click="">
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="职位管理">
        <el-button size="small" icon="el-icon-edit" @click="getAllDepartment">
          添加
        </el-button>
        <el-table :data="positionData" style="width: 100%">
          <el-table-column prop="id" label="职位id" width="180"></el-table-column>
          <el-table-column prop="positionName" label="职位名称" width="180"></el-table-column>
          <el-table-column>
            <el-button size="small" icon="el-icon-edit" @click="">
              修改
            </el-button>
            <el-button size="small" icon="el-icon-delete" @click="">
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
import { getDepartmentInfo } from '@/api/department'
import { addDepartment } from '@/api/department'
import { getPositionInfo } from '@/api/position'

  export default {
    created(){
      this.getAllDepartment(),
      this.getAllPosition()
    },

    data() {
      return {
        deptData: [],
        positionData: [],
        dialogFormVisible: false,
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
          console.log("data:  "+response.data);
        })
        this.dialogFormVisible = false;
      },
      getAllPosition(){
        getPositionInfo().then(response=>{
          this.positionData = response.data;
        })
      },

    }

  }
</script>
