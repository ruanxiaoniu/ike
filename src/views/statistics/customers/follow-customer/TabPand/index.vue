<template>
  <div>
    <div>
      <!-- <el-select v-model="sortType">
        <el-option label="按产品名统计" value="name"></el-option>
        <el-option label="按产品类别统计" value="class"></el-option>
      </el-select> -->
        <el-input placeholder="请输入年份" size="small" v-model="year"  style="width:100px"></el-input>
        <span>年</span>
        <el-input placeholder="请输入月份" size="small" v-model="month"  style="width:100px"></el-input>
        <span>月</span>
        <el-button type="success" size="small" @click="getStatist" style="margin-left:100px;">统计</el-button>
    </div>
    <div style="margin-top:30px;margin-left:20px">
      <div id="customer" style="width:100%;height:500px"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import resize from '../../../../../components/Charts/resize'
// import {getAllClass} from '@/api/product'
import {followCustomerStatist} from '@/api/statist'
import { now } from 'moment';
require('echarts/map/js/china');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/title');
export default {
  data() {
    return {
      customerChart:null,
      type:'year',
      params:{
        dateType:'year'
      },
      xData:[],//横坐标
      series:[],//柱状
      countData:[],
      year:'',
      month:'',
      day:'',
      textMap:{
        month:'按月统计',
        day:'按日统计'
      },
      dialogFlag:false,
      productClass:[],
      preId:0
    }

  },
  watch:{
     watchTab:function (newTab) {
      
      this.type=newTab
      if(newTab=='year'){
        let nowDate=new Date();
        this.year=nowDate.getUTCFullYear()
        console.log("year")
        console.log(this.year)
        this.getStatist()
      }else if(newTab=='month'){
        let nowDate=new Date();
        this.year=nowDate.getUTCFullYear()
        this.month=nowDate.getMonth()+1
        console.log("month")
        console.log(this.year,this.month)
        this.getStatist()
      }else{
        let nowDate=new Date();
        this.year=nowDate.getUTCFullYear()
        this.month=nowDate.getMonth()+1
        this.day=nowDate.getDate()
        console.log("day")
        console.log(this.year,this.month,this.day)
        this.getStatist()
      }
    }
  },
  computed: {
    watchTab(){
      return this.$route.query.tab
    }
  },
  created() {
     //获取当前年月日
    let nowDate=new Date();
    this.type=this.$route.query.tab
    if(this.type=='month'){
      console.log("年月日")
      this.year=nowDate.getUTCFullYear()
      this.month=nowDate.getMonth()+1
      console.log(this.year)
    }else if(this.type=='day'){
       this.year=nowDate.getUTCFullYear()
       this.month=nowDate.getMonth()+1
       this.day=nowDate.getDate()
    
    }else {
      this.year=nowDate.getUTCFullYear()
    }
   
    this.getStatist()
  },
  methods: {
    /**
     * 获取产品销量统计信息
     */
    getStatist(){
      this.xData=[]
      this.countData=[]
      const flag=this.Statist()
      console.log("统计安啦安啦")
      console.log(this.params)
      if(flag){
         followCustomerStatist(this.params).then(res=>{
        let item=res.data
        item.forEach((ele,index)=>{
          if(this.type=='month'){
            this.xData.push(ele.month+'月')
          }else if(this.type=='day'){
             this.xData.push(ele.day+'号')
          }else{
            this.xData.push(ele.year+'年')
          }
          this.countData.push(ele.count)
          console.log("count,x")
          console.log(this.countData,this.xData)
        })
        this.initChart()
      }).catch(err=>{
              
      })
      }
     
    },
    /**
     * 初始化柱状图
     */
    initChart(){
      console.log("怎么没来？")
      this.customerChart=echarts.init(document.getElementById('customer'))
      const option={
        //  backgroundColor: '#344b58',
        title:{
          text:'新增客户统计',
           textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip:{
          trigger:'axis',
          // axisPointer:{
          //   type:'shadow'
          // }
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
          grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          // top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend:{
          textStyle: {
            color: '#90979c'
          },
          data:['客户跟进记录数']
        },
       
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 0,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        xAxis:[
          {
            type:'category',
             axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data:this.xData
          },  
        ],
        yAxis:[
          {
            type:'value',
             splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
          }
        ],
        series:[
          {
            name:'客户跟进记录数',//每个主星所代表的名称
            type:'bar',
            barGap:0,
            itemStyle:{
              color:'#20B2AA'
            },
            data:this.countData
          }
        ]
      }
      this.customerChart.setOption(option)
    },
     /**
     * 清空params
     */
    clearParams(){
      for(let key in this.params){
        delete this.params[key]
      }
    },
    /**
     * 统计
     */
    Statist(){
      console.log("type")
      console.log(this.type)
      
      if(this.type=='month'){//按月统计，显示指定年份和月份的统计
        this.clearParams()
        if(this.year==''){
          this.$message.error('请输入年份')
          return false
        }
        else{
           this.customerChart = null
           this.$set(this.params,'dateType','month')
           this.$set(this.params,'date',this.year)
           this.customerChart = null
           return true
        }
      }else if(this.type=='day'){//按日统计，显示指定年份和月份和日期的统计
         this.clearParams()
        if(this.year==''){
          this.$message.error('请输入年份')
          return false
        }
        if(this.month==''){
          this.$message.error('请输入月份')
          return false
        }
        if(this.year!=''&&this.month!=''){
           this.customerChart = null
            console.log('day不是变化了吗')
            console.log(this.year,this.month,this.day)
           this.$set(this.params,'dateType','day')
           let day=this.year+'-'+this.month
           this.$set(this.params,'date',day)
           this.customerChart = null
           return true
        }
      }else{//按年统计，显示指定年份的统计
        this.clearParams()
        this.$set(this.params,'dateType','year')
        return true
      } 
    },
   
  }
}
</script>
