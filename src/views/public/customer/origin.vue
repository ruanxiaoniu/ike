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
            label="来源"
            min-width="150px"
            element-loading-text="请给我点时间！"
            prop="origin_name"
          >
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.origin_name }}</span>
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
          origin_name:'11',
        }
      ]
        
    }
  },
}
</script>