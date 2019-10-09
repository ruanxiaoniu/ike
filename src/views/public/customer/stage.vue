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
    <p></p>
     <el-table :data="list" border fit highlight-current-row style="width: 100%"  >
       <el-table-column  type="selection" align="center"  />
          <el-table-column
            align="center"
            label="阶段名"
            min-width="150px"
            element-loading-text="请给我点时间！"
            prop="level_name"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.level_name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="阶段说明"
            min-width="150px"
            prop="level_explain"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.level_name }}</span>
            </template>
          </el-table-column>
           <el-table-column
            align="center"
            label="阶段条件"
            min-width="150px"
            prop="level_criteria"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.level_criteria }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="修改时间"
            min-width="150px"
            prop="level_criteria"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.level_criteria }}</span>
            </template>
          </el-table-column>
     </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    
  </div>
</template>
<script>
import pagination from '@/components/Pagination'

export default {
  components:{
    pagination,
  },
  data() {
    return {
      total:10,
      list: null,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      list:[
        {
          level_name:'11',
          level_explain:'11',
          level_criteria:'11'
        }
      ]
        
    }
  },
}
</script>