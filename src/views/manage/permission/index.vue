<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="id" label="id" width="100">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="120">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="positionName" label="职位" width="120">
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" width="120">
          </el-table-column>
          <el-table-column prop="phone" label="电话" width="120">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="120">
          </el-table-column>
          <el-table-column prop="loginDate" label="登陆时间" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作"  width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="权限管理">权限管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          id: '1',
          username: 'Kyre',
          name: '洪金宝',
          positionName: '经理',
          departmentName: '研发部',
          phone:'13202657925',
          email:'55555@qq.com',
          loginDate:'2019-02-02',
        }, {
          id: '2',
          username: 'Allen',
          name: '洪金宝',
          positionName: '经理',
          departmentName: '批发部',
          phone:'13202689754',
          email:'55555@qq.com',
          loginDate:'2019-02-02',
        }, {
          id: '3',
          username: 'Luck',
          name: '蔡徐坤',
          positionName: '经理',
          departmentName: '研发部',
          phone:'12345678998',
          email:'55555@qq.com',
          loginDate:'2019-02-02',
        }, {
          id: '4',
          username: 'Bob',
          name: '金城武',
          positionName: '经理',
          departmentName: '研发部',
          phone:'12345678998',
          email:'55555@qq.com',
          loginDate:'2019-02-02',
        }]
      }
    }
  }
</script>
