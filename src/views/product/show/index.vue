<template>
  <div>
     <el-dialog :title="textMap[getdialogStatus]" :visible.sync="getdialogFormVisible" >
       <!-- 产品详情 -->
      <el-form v-if="getdialogStatus=='product_detail'" ref="product_detail" :rules="rules" :model="product_detail" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-form-item label="产品分类" prop="product_class">
          <span v-if="!edit">{{product_detail.product_class}}</span>
          <el-input v-else v-model="product_detail.product_class"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="product_name">
          <span v-if="!edit">{{product_detail.product_name}}</span>
          <el-input v-else v-model="product_detail.product_name"></el-input>
        </el-form-item>
        <el-form-item label="产品型号" prop="product_type">
          <span v-if="!edit">{{product_detail.product_type}}</span>
          <el-input v-else v-model="product_detail.product_type"></el-input>

        </el-form-item>
        <el-form-item label="产品图片" prop="url">
        </el-form-item>
        <el-form-item label="销售单价">
         <span v-if="!edit">{{product_detail.sale_price}}</span>
         <el-input v-else v-model="product_detail.sale_price"></el-input>
        </el-form-item>
        <el-form-item label="销售单位">
          <span v-if="!edit">{{product_detail.sale_unit_name}}</span>
          <el-input v-else v-model="product_detail.sale_unit_name"></el-input>
        </el-form-item>
         <el-form-item label="成本">
           <span v-if="!edit">{{product_detail.cost}}</span>
           <el-input v-else v-model="product_detail.cost"></el-input>
        </el-form-item>
         <el-form-item label="销售状态">
          <span v-if="!edit">{{product_detail.on_sale}}</span>
          <el-input v-else v-model="product_detail.on_sale"></el-input>
        </el-form-item>
         <el-form-item label="上市时间">
           <span v-if="!edit">{{product_detail.ttm}}</span>
           <el-input v-else v-model="product_detail.ttm"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍">
          <span v-if="!edit">{{product_detail.product_introduce}}</span>
          <el-input v-else v-model="product_detail.product_introduce"></el-input>
        </el-form-item>
        <el-form-item label="产品相关文档">
          <span v-if="!edit">{{product_detail.product_file}}</span>
          <el-input v-else v-model="product_detail.product_file"></el-input>
        </el-form-item>
      </el-form>
      <!-- 客户信息 -->
       <el-form  v-if="getdialogStatus=='customer_detail'" ref="customer_detail" :rules="rules" :model="customer_detail" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="客户名称" prop="customer_name">
          <span>{{customer_detail.customer_name}}</span>
        </el-form-item>
        <el-form-item label="负责人" prop="employee">
          <span>{{customer_detail.employee}}</span>
        </el-form-item>
      </el-form>
      <!-- 成交产品详情 -->
      <el-tabs v-if="getdialogStatus=='deal_detail'"  >
          <el-tab-pane  label="成交记录">
              <el-form ref="deal_detail" :model="deal_detail.deal" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="成交时间" prop="order_time">
                  <span>{{deal_detail.deal.order_time}}</span>
                </el-form-item>
                <el-form-item label="成本" prop="cost">
                  <span>{{deal_detail.deal.cost}}</span>
                </el-form-item>
                <el-form-item label="销售单价" prop="sale_price">
                  <span>{{deal_detail.deal.sale_price}}</span>
                </el-form-item>
                <el-form-item label="成交数量" prop="order_count">
                  <span>{{deal_detail.deal.order_count}}</span>
                </el-form-item>
                <el-form-item label="实际成交价" prop="actual_price">
                  <span>{{deal_detail.deal.actual_price}}</span>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                  <span>{{deal_detail.deal.remark}}</span>
                </el-form-item>
              </el-form>

            </el-tab-pane>

            <el-tab-pane  label="关联的订单">
              <el-form ref="deal_detail" :model="deal_detail.order" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="成交/签约时间" prop="order_time">
                  <span>{{deal_detail.order.order_time}}</span>
                </el-form-item>
                <el-form-item label="成交客户" prop="customer_name">
                  <span>{{deal_detail.order.customer_name}}</span>
                </el-form-item>
                <el-form-item label="成交产品" prop="product_name">
                  <span>{{deal_detail.order.product_name}}</span>
                </el-form-item>
                <el-form-item label="总数量" prop="all_count">
                  <span>{{deal_detail.order.all_count}}</span>
                </el-form-item>
                <el-form-item label="负责人" prop="employee">
                  <span>{{deal_detail.order.employee}}</span>
                </el-form-item>
              </el-form>
            </el-tab-pane>
        </el-tabs>
      <!-- 个人信息 -->
      <el-form v-if="getdialogStatus=='personal_detail'" ref="personal_detail" :rules="rules" :model="personal_detail" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="product_class">
          <span>{{personal_detail.username}}</span>
        </el-form-item>
        <el-form-item label="部门" prop="product_name">
          <span>{{personal_detail.department}}</span>
        </el-form-item>
        <el-form-item label="职位" prop="product_type">
          <span>{{personal_detail.position}}</span>
        </el-form-item>
        <el-form-item label="手机号" prop="url">
          <span>{{personal_detail.phone}}</span>
        </el-form-item>
        <el-form-item label="Email">
         <span>{{personal_detail.email}}</span>
        </el-form-item>
        <el-form-item label="最后登录时间">
          <span>{{personal_detail.last_login_date}}</span>
        </el-form-item>
         <el-form-item label="登录次数">
           <span>{{personal_detail.login_count}}</span>
        </el-form-item>
      </el-form>
       <div slot="footer" class="dialog-footer">
        <el-button v-if="edit" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button v-if="getdialogStatus=='product_detail'" style="color:red">
          自动创建订单
        </el-button>
        <el-button v-if="edit" type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
         <el-button v-else type="primary" @click="edit=!edit">
            修改
          </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textMap:{//动态修改弹出框的标题
        product_detail:"产品详情",
        customer_detail:"客户信息",
        deal_detail:"成交产品详情",
        personal_detail:"个人信息",
      },
      edit:false,//是否修改产品详情
      //产品详情
      product_detail:{
        product_class:'',
        product_name:'',
        product_type:'',
        url:'',
        sale_price:'',
        sale_unit_name:'',
        cost:'',
        on_sale:'',
        ttm:'',
        product_introduce:'',
        product_file:''
      },
      //客户信息
      customer_detail:{
         customer_name:'',
         employee:''
      },
      //成交产品详情
      deal_detail:{
        deal:{
           order_time:'',
           cost:'',
           sale_price:'',
           order_count:'',
           actual_price:'',
           remark:'',
        },
        order:{
           order_time:'',
           customer_name:'',
           product_name:'',
           all_count:'',
           actual_price:'',
           employee:''
        }

      },
      //个人信息
      personal_detail:{
         username:'',
         department:'',
         position:'',
         phone:'',
         email:'',
         last_login_date:'',
         login_count:'',

      }
    }
  },
  computed: {
    getdialogStatus:function(){
        return this.$store.getters.dialogstatus
    },
    getdialogFormVisible:{
      get(){
        return this.$store.getters.dialogFormVisible
      },
      set(){
        this.$store.dispatch('product/setDialogStatus',false)
        return this.$store.getters.dialogFormVisible
      }
    },
  },
}
</script>