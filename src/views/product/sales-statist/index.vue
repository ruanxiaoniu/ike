<template>
  <div>
    <div>
      <el-button size="small" type="success" @click="Statist('year')">按年统计</el-button>
      <el-button size="small" type="warning" @click="Statist('month')">按月统计</el-button>
      <el-button size="small" type="primary" @click="Statist('day')">按日统计</el-button>
    </div>
    <div style="margin-top:30px;margin-left:100px">
      <!-- <div v-show="isNull" style="width:100%;opacity:0.5;font-size:25px;margin-top:100px;text-align:center">无销售记录</div> -->
      <!-- <div v-show="!isNull"  id="product" style="width:800px;height:500px"></div> -->
      <div id="product" style="width:800px;height:500px"></div>
    </div>
    <el-dialog :title="textMap[params.type]" :visible.sync="dialogFlag" width="30%">
      <el-input v-if="params.type=='month'||params.type=='day'" placeholder="请输入所需统计的年份" v-model="year" style="margin-left:100px;width:250px"></el-input>
      <el-input v-if="params.type=='day'" placeholder="请输入所需统计的月份" v-model="month" style=" width:250px"></el-input>
      <el-button type="primary" size="small" @click="submit" style="margin-left:200px;margin-top:50px;">统计</el-button>
    </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts'
import resize from '../../../components/Charts/resize'
import {getSaleStatist} from '@/api/product'
require('echarts/map/js/china');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
export default {
  props:['productId'],
  data() {
    return {
      productChart:null,
      type:'year',
      params:{
        id:'',
        type:''
      },
      xData:[],//横坐标
      series:[],//柱状
      xtype:'年',
      customerTimesData:[],
      orderNumData:[],
      orderCountData:[],
      isNull:true,
      year:'',
      month:'',
      textMap:{
        year:'按年统计',
        month:'按月统计',
        day:'按日统计'
      },
      dialogFlag:false
    }

  },
  created() {
   this.params.id=this.productId
   this.params.type='year'
    this.getStatist()
  },
  mounted(){
     console.log("id")
    console.log(this.productId)
    // this.initChart()
  },
  methods: {
    /**
     * 获取产品销量统计信息
     */
    getStatist(){
      this.customerTimesData=[]
      this.orderNumData=[]
      this.orderCountData=[]
      this.xData=[]
      getSaleStatist(this.params).then(res=>{
        let item=res.data
        if(item.length>0){
          this.isNull=false
        }
        item.forEach((ele,index)=>{
            let date=ele.date+this.xtype
            this.customerTimesData.push(ele.customerTimes)
            this.orderNumData.push(ele.orderNum)
            this.orderCountData.push(ele.orderCount)
            this.xData.push(date)
        })
        console.log('this.customerTimesData')
        console.log(this.customerTimesData)
        console.log('this.orderNumData')
        console.log(this.orderNumData)
         console.log('this.orderCountData')
        console.log(this.orderCountData)
         console.log('this.xData')
        console.log(this.xData)
        console.log('this.isNull')
        console.log(this.isNull)
        this.initChart()
      }).catch(err=>{
              
      })
    },
    /**
     * 初始化柱状图
     */
    initChart(){
      console.log("怎么没来？")
      this.productChart=echarts.init(document.getElementById('product'))
      const customerTime=this.customerTimesData
      const option={
        title:{
          text:'销量统计'
        },
        tooltip:{
          trigger:'axis',
          axisPointer:{
            type:'shadow'
          }
        },
        legend:{
          data:['成交客户数','成交数量','成交总额']
        },
        xAxis:[
          {
            type:'category',
            data:this.xData
          }
        ],
        yAxis:[
          {
            type:'value'
          }
        ],
        series:[
          {
            name:'成交客户数',//每个主星所代表的名称
            type:'bar',
            barGap:0,
            data:this.customerTimesData
          },
          {
            name:'成交数量',//每个主星所代表的名称
            type:'bar',
            barGap:0,
            data:this.orderNumData
           
          },
          {
            name:'成交总额',//每个主星所代表的名称
            type:'bar',
            barGap:0,
            data:this.orderCountData
          }
        ]
      }
      console.log("option")
      console.log(option)
      this.productChart.setOption(option)
    },
    /**
     * 统计
     */
    Statist(type){
      if(type=='year'){//按年统计，显示各年份的统计
        this.xtype='年'
        this.productChart.dispose()
        this.productChart = null
        this.getStatist()
      }else if(type=='month'){
        this.xtype='月'
        this.dialogFlag=true
      }else{
        this.xtype='号'
        this.dialogFlag=true
      }
       this.params.type=type
      
    },
    /**
     * 根据选择统计
     */
    submit(){
      if(this.params.type=='month'){
        if(this.year==''){
          this.$message.error('请输入年份')
        }else{
          this.productChart.dispose()
          this.productChart = null
          this.$set(this.params,'year',this.year)
          this.getStatist()
          this.dialogFlag=false
           this.year=''
           this.month=''
        }
      }else{
        if(this.year==''){
          this.$message.error('请输入年份')
        }
        if(this.month==''){
          this.$message.error('请输入月份')
        }
        if(this.year!=''&&this.month!=''){
           this.productChart.dispose()
           this.productChart = null
           this.$set(this.params,'year',this.year)
           this.$set(this.params,'month',this.month)
           this.getStatist()
           this.dialogFlag=false
           this.year=''
           this.month=''
        }
      }
    }
  }
}
</script>
