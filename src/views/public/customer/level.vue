<template>
  <div>
    <div>
      <el-button size="small" icon="el-icon-search" @click="handle('search')">
            搜索
      </el-button>
      <el-button  size="small"  icon="el-icon-delete">
            删除
      </el-button>
      <el-button :loading="downloadLoading" size="small" icon="el-icon-edit" @click="handle('add')" >
        新建
      </el-button>
    </div>
     <el-table :data="list" border fit highlight-current-row style="width: 100%"  @cell-click="operation">
       <el-table-column  type="selection" align="center"  />
          <el-table-column
            v-loading="loading"
            align="center"
            label="等级名"
            width="150px"
            element-loading-text="请给我点时间！"
            prop="level_name"

          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.level_name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="等级说明"
            width="150px"
            prop="level_explain"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.level_name }}</span>
            </template>
          </el-table-column>
           <el-table-column
            align="center"
            label="等级条件"
            width="150px"
            prop="level_criteria"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.level_criteria }}</span>
            </template>
          </el-table-column>
     </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total:0,
      list: null,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      list:{
        level_name:'',
        level_explain:'',
        level_criteria:''
      }
    }
  },
}
</script>