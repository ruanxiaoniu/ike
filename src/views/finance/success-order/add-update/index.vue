<template>
  <div v-if="dialogVisible">
    <el-dialog :title="type == 'add' ? '新建' : '修改'" :visible.sync="dialogVisible">
      <div class="top">基本信息</div>
      <el-form ref="orderList" :model="orderList" :rules="rules" label-position="right" label-width="130px" style="margin-top:10px">
        <el-form-item label="客户">
          <el-row>
            <el-col :span="18">
              <customerSelect v-model="orderList.customerId" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="联系人" prop="relationId">
          <el-row>
            <el-col :span="18">
              <el-select v-model="orderList.relationId" placeholder="请选择联系人" style="width:200px">
                <el-option v-for="(item) in relationList" :key="item.id" :label="item.relationName" :value="item.id" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div class="top">选择产品</div>
      <el-table
        :data="productList"
        border
        style="width: 100%;margin-top:10px"
      >
        <el-table-column width="150px">
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-plus" @click="addOrder(scope.$index)" />
            <el-button size="small" icon="el-icon-delete" @click="subOrder(scope.$index)" />
          </template>
        </el-table-column>
        <el-table-column label="产品名称" min-width="100px" prop="productName" width="150px">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.productId"
              filterable
              remote
              reserve-keyword
              style="width:100%"
              placeholder="请输入关键词"
              :remote-method="remoteMethodProduct"
              :loading="loading"
              @change="changeProduct"
            >
              <el-option
                v-for="item in productOptions"
                :key="item.id"
                :label="item.productName"
                :value="item.id"
              />
            </el-select>
          </template>

        </el-table-column>
        <el-table-column label="成本" width="100px" prop="cost">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cost" disabled />
          </template>
        </el-table-column>
        <el-table-column label="销售单价" width="100px" prop="salePrice">
          <template slot-scope="scope">
            <el-input v-model="scope.row.salePrice" disabled />
          </template>
        </el-table-column>
        <el-table-column label="成交数量" width="200px" prop="orderNum">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.orderNum" style="width:150px" :min="0" label="描述文字" @change="changehandle(scope.$index)" />
          </template>
        </el-table-column>

        <el-table-column label="总价" width="100px" prop="total">
          <template slot-scope="scope">
            <el-input v-model="scope.row.orderTotal" disabled />
          </template>

        </el-table-column>
      </el-table>
      <el-form ref="orderList" class="demo-form-inline" :rules="rules" :model="orderList" style="margin-top:10px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="成交总额：">
              <el-row>
                <el-col :span="7">
                  <el-input v-model="orderList.orderTotal" disabled />
                </el-col>
                <el-col :span="5">
                  <span>元</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="总成本：">
              <el-row>
                <el-col :span="7">
                  <el-input v-model="orderList.orderCost" disabled />
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="实际成交价：">
              <el-row>
                <el-col :span="7">
                  <el-input v-model="orderList.orderActualTotal" />
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付款方式：">
              <el-row>
                <el-col :span="5">
                  <el-input v-model="orderList.paymentMethod" />
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="备注：">
              <el-input v-model="orderList.note" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div style="margin-left:500px;margin-top20px;">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button v-if="type == 'edit'" size="small" type="primary" @click="editOperate('orderList')">修改</el-button>
        <el-button v-else size="small" type="primary" @click="add('orderList')">新建</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { orderById, updateOrder, createOrder } from '@/api/order'
import { getProductList, getProductDetail } from '@/api/product'
import { getOneRelation } from '@/api/customer'
import customerSelect from '../../../public/customer/customerSelect/customerSelect'
import moment from 'moment'
export default {
  components: {
    customerSelect
  },
  data() {
    return {
      type: '',
      dialogVisible: false,
      productId: 0,
      productList: [
        {
          cost: '',
          salePrice: '',
          orderNum: 0,
          orderActualTotal: '',
          productId: '',
          orderTotal: '',
          productName: ''
        }
      ],
      loading: false,
      Cid: '',
      orderList: {
        id: '',
        employeeId: '',
        relationId: '',
        productClassId: '',
        note: '',
        orderTotal: 0,
        orderActualTotal: '',
        orderCost: 0,
        orderState: '',
        orderTimeStr: '',
        paymentMethod: '',
        orderProductVoList: []
      },
      editDialog: false,
      title: '',
      textMap: {
        classedit: '产品类别管理',
        unit: '销售单位管理'
      },
      editQuery: {
        id: ''
      },
      rules: {
        customerId: [
          { requried: true, message: '请选择客户', trigger: 'blur' }
        ],
        relationId: [
          { requried: true, message: '请选择联系人', trigger: 'blur' }
        ],
        orderActualTotal: [
          { requried: true, message: '请输入实际成交价', trigger: 'blur' }
        ],
        paymentMethod: [
          { requried: true, message: '请输入付款方式', trigger: 'blur' }
        ]
      },
      productFilter: null, // 客户搜索
      productOptions: null,
      relationList: null,
      currentIndex: 0
    }
  },
  computed: {
    watchProduct() {
      return this.productList
    },
    getTotal: {

      get() {
        let sum = 0
        console.log('计算啦1')
        this.productList.forEach((item, index) => {
          console.log('计算啦2')
          sum = sum + item.orderActualTotal
        })
        return sum
      },
      set() {
        let sum = 0
        this.productList.forEach((item, index) => {
          console.log('计算啦2')
          sum = sum + item.orderActualTotal
        })
        return sum
      }
    },
    getTotalCost() {
      let sum = 0
      console.log('计算啦1')
      this.productList.forEach((item, index) => {
        sum = sum + item.cost
      })
      return sum
    }
  },
  watch: {
    'orderList.customerId': function(newVal) {
      this.Cid = newVal
      this.relationList = []
      if (newVal) {
        this.getRelation()
      }
    },
    watchProduct: {
      deep: true,
      handler: function(val) {
        let orderActualTotalSum = 0
        let orderTotalSum = 0
        let costSum = 0
        this.productList.forEach((item, index) => {
          console.log('数组变化了')
          orderTotalSum = orderTotalSum + parseInt(item.orderTotal)
          costSum = costSum + (parseInt(item.cost)) * item.orderNum
          orderActualTotalSum = orderActualTotalSum + parseInt(item.orderActualTotal)
          console.log(orderTotalSum, costSum, orderActualTotalSum)
        })
        this.orderList.orderTotal = orderTotalSum
        this.orderList.orderActualTotal = orderActualTotalSum
        this.orderList.orderCost = costSum
      }
    }
  },
  methods: {
    show(item) {
      this.clearData()
      if (item && item.id) {
        this.type = 'edit'
        this.editQuery = {
          orderBaseId: item.id
        }
        this.getOrderById()
      } else {
        this.type = 'add'
      }
      this.getProduct()
      this.dialogVisible = true
    },
    clearData() {
      this.orderList = {
        id: '',
        employeeId: '',
        relationId: '',
        productClassId: '',
        note: '',
        orderTotal: 0,
        orderActualTotal: '',
        orderCost: 0,
        orderState: '',
        orderTimeStr: '',
        paymentMethod: '',
        orderProductVoList: []
      }
      this.productList = [
        {
          cost: '',
          salePrice: '',
          orderNum: 0,
          orderActualTotal: '',
          productId: '',
          orderTotal: '',
          productName: ''
        }
      ]
    },
    getOrderById() {
      this.productList = []
      orderById(this.editQuery).then(res => {
        this.orderList.relationId = res.data.relationId
        this.orderList.orderActualTotal = res.data.orderActualTotal
        this.orderList.note = res.data.note
        this.orderList.customerId = res.data.customerId
        this.orderList.orderTimeStr = res.data.orderTime
        this.orderList.id = res.data.id
        this.orderList.paymentMethod = res.data.paymentMethod
        res.data.orderProductVoList.forEach((item, index) => {
          if (item.actualPrice == null) {
            item.actualPrice = item.totalPrice
          }
          const product = {
            cost: item.saleCost,
            salePrice: item.salePrice,
            orderNum: item.orderCount,
            orderActualTotal: item.actualPrice,
            orderTotal: item.totalPrice,
            productName: item.productName,
            productId: item.productId
          }
          this.productList.push(product)
          this.Cid = this.orderList.customerId
          this.getRelation()
        })
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
      })
    },
    /**
     * 获取所有产品名
     */
    getProduct() {
      getProductList().then(res => {
        this.productOptions = res.data.records
        console.log(this.productOptions)
      }).catch(err => {
        console.log(err)
      })
    },
    /**
    * 远程搜索产品
    */
    remoteMethodProduct(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.productOptions = this.productFilter.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 100)
      } else {
        this.customerOptions = this.customerFilter
      }
    },
    /**
      获取所有客户联系人信息
    */
    getRelation() {
      const params = {
        Cid: this.Cid
      }
      getOneRelation(params).then(res => {
        this.relationList = res.data
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {

      })
    },
    /**
      * 获取某个产品信息
      */
    getPDetail(id) {
      const query = {
        id: id
      }
      getProductDetail(query).then(res => {
        const p = {
          cost: res.data.productExtVO.cost,
          salePrice: res.data.productExtVO.salePrice,
          orderNum: 0,
          orderActualTotal: res.data.productExtVO.salePrice * res.data.productVO.orderNum,
          productId: id
        }
        this.productList[this.currentIndex] = p
        let orderActualTotalSum = 0
        let orderTotalSum = 0
        let costSum = 0
        this.productList.forEach((item, index) => {
          console.log('计算啦2')
          orderTotalSum = orderTotalSum + parseInt(item.orderActualTotal)
          costSum = costSum + parseInt(item.cost)
          orderActualTotalSum = orderActualTotalSum + parseInt(item.orderActualTotal)
          console.log(orderTotalSum, costSum, orderActualTotalSum)
        })
        this.orderList.orderTotal = orderTotalSum
        this.orderList.orderActualTotal = orderActualTotalSum
        this.orderList.orderCost = costSum
        console.log('product')
        console.log(this.productList)
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {

      })
    },
    /**
     * 点击取消
     */
    cancel() {
      this.clearData()
      this.dialogVisible = false
    },
    /**
     * 添加
     */
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.productList.forEach((item, index) => {
            const ele = {
              productId: item.productId,
              orderCount: item.orderNum
            }
            this.orderList.orderProductVoList.push(ele)
          })
          /**
           * 添加订单请求
           */
          createOrder(this.orderList).then(res => {
            this.$message.success('添加成功！')
            this.$emit('updatelist')
            this.dialogVisible = false
            this.clearData()
          // eslint-disable-next-line handle-callback-err
          }).catch(err => {
            this.$message.error('添加失败，请重试！')
          })
        } else {
          return false
        }
      })
    },
    /**
     * 修改
     */
    editOperate(formName) {
      /**
       * 修改请求
       */
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.productList.forEach((item, index) => {
            const ele = {
              productId: item.productId,
              orderCount: item.orderNum,
              totalPrice: item.orderTotal
            }
            this.orderList.orderProductVoList.push(ele)
          })
          this.orderList.orderTimeStr = moment(this.orderList.orderTimeStr).format('YYYY-MM-DD')
          updateOrder(this.orderList).then(res => {
            this.$message.success('修改成功！')
            this.$emit('updatelist')
            this.dialogVisible = false
            this.clearData()
          // eslint-disable-next-line handle-callback-err
          }).catch(err => {
            this.$message.error('修改失败，请重试！')
          })
        } else {
          return false
        }
      })
    },

    /**
     * 产品选中值发生变化时
     */
    changeProduct(id) {
      this.getPDetail(id)
    },
    /**
     * 数量框发生变化
     */
    changehandle(index) {
      console.log('下标')

      this.productList[index].orderTotal = this.productList[index].orderNum * this.productList[index].salePrice
      let orderActualTotalSum = 0
      let orderTotalSum = 0
      let costSum = 0
      this.productList.forEach((item, index) => {
        console.log('数字框变化')
        orderTotalSum = orderTotalSum + parseInt(item.orderTotal)
        costSum = costSum + (parseInt(item.cost)) * item.orderNum
        orderActualTotalSum = orderActualTotalSum + parseInt(item.orderActualTotal)
        console.log(orderTotalSum, costSum, orderActualTotalSum)
      })
      this.orderList.orderTotal = orderTotalSum
      this.orderList.orderActualTotal = orderActualTotalSum
      this.orderList.orderCost = costSum
    },
    /**
     * 添加产品
     */
    addOrder(index) {
      this.productList.push({
        cost: 0,
        salePrice: 0,
        orderNum: 0,
        orderActualTotal: 0,
        productId: ''
      })
      this.currentIndex = index + 1
    },
    /**
     * 删除产品
     */
    subOrder(index) {
      this.productList.splice(index, 1)
    }
  }
}
</script>
<style scoped>
.span{
  padding-top: 10px;
}
</style>
