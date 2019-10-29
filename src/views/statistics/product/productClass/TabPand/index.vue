<template>
  <div>
    <div>
        <el-input placeholder="请输入年份" size="small" v-model="year"  style="width:100px"></el-input>
        <span>年</span>
        <el-input placeholder="请输入月份" size="small" v-model="month"  style="width:100px"></el-input>
        <span>月</span>
        <el-input placeholder="请输入日期" size="small" v-model="day"  style="width:100px"></el-input>
        <span>日</span>
        <el-button type="success" size="small" @click="getStatist" style="margin-left:100px;">统计</el-button>
    </div>
    <div style="margin-top:20px;color:blue">
      <span  class="link-type" v-for="(item,index) in spanList" :key="index" @click="clickSpan(item,index)">{{item.xName}}></span>
    </div>
    <div style="margin-top:30px;margin-left:20px">
      <div id="product" style="width:100%;height:600px"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import resize from '../../../../../components/Charts/resize'
// import {getAllClass} from '@/api/product'
import {productStatist} from '@/api/statist'
import { now } from 'moment';
require('echarts/map/js/china');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/dataZoom');
export default {
  props:['productId'],
  data() {
    return {
      productChart:null,
      type:'year',
      sortType:'按类产品名统计',
      params:{
        sortType:'class'
      },
      xData:[],//横坐标
      series:[],//柱状
      customerTimesData:[],
      totalPriceData:[],
      totalSumData:[],
      productName:[],
      count:[],
      isNull:true,
      year:'',
      month:'',
      day:'',
      textMap:{
        month:'按月统计',
        day:'按日统计'
      },
      dialogFlag:false,
      productClass:[],
      preId:0,
      classId:[],//存储当前横坐标X轴对应产品类别的对应ID
      classPreId:[],
      spanList:[
        {
          xName:'不限',
          id:0
        }
      ],//存储当前显示的类别级别，并用于点击显示对应级别的统计
      
    }

  },
  watch:{
     watchTab:function (newTab) {
      
      this.type=newTab
      if(newTab=='year'){
        let nowDate=new Date();
        this.year=nowDate.getUTCFullYear()
        this.getStatist()
      }else if(newTab=='month'){
        let nowDate=new Date();
        this.year=nowDate.getUTCFullYear()
        this.month=nowDate.getMonth()+1
        this.getStatist()
      }else{
        let nowDate=new Date();
        this.year=nowDate.getUTCFullYear()
        this.month=nowDate.getMonth()+1
        this.day=nowDate.getDate()
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
      this.customerTimesData=[]
      this.totalPriceData=[]
      this.totalSumData=[]
      this.xData=[]
      this.classId=[]
      const flag=this.Statist()
      
      this.$set(this.params,'sortType','class')
      this.$set(this.params,'preId',this.preId)
      console.log("统计安啦安啦")
      console.log(this.params)
      console.log(flag)
      if(flag){
         productStatist(this.params).then(res=>{
        let item=res.data
        item.forEach((ele,index)=>{
            this.customerTimesData.push(ele.customerTimes)
            this.totalPriceData.push(ele.totalPrice)
            this.totalSumData.push(ele.totalSum)
            this.xData.push(ele.className)
            // this.classId.push(ele.id)
            this.classId.push(ele.id)
            // this.classPreId.push(ele.preClassId)
        })
        // console.log("获取了数据")
        // console.log(this.totalPriceData)
        // console.log(this.totalSumData)
        // console.log(this.xData)
        // console.log(this.classId)
        this.initChart()
      }).catch(err=>{
              
      })
      }
     
    },
    /**
     * 初始化柱状图
     */
    initChart(){
      this.productChart=echarts.init(document.getElementById('product'))
      const customerTime=this.customerTimesData
      const option={
        //  backgroundColor: '#344b58',
        title:{
          text:'产品分类统计',
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
          data:['成交客户数','总价格','产品总数量']
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
            triggerEvent:true,
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
            name:'成交客户数',//每个主星所代表的名称
            type:'bar',
            barGap:0,
            data:this.customerTimesData
          },
          {
            name:'总价格',//每个主星所代表的名称
            type:'bar',
            barGap:0,
            data:this.totalPriceData
           
          },
          {
            name:'产品总数量',//每个主星所代表的名称
            type:'bar',
            barGap:0,
            data:this.totalSumData
          }
        ]
      }
      this.productChart.setOption(option)
      //点击了横坐标
       this.productChart.on('click',params=>{
          if(params.componentType=='xAxis'){
              console.log("点击了横坐标")
              console.log(this.classId)
              let xIndex=0
              if(this.classId.length>0){
                this.xData.forEach((item,index)=>{
                  if(item==params.value){
                    xIndex=index
                    return 
                  }
                })
                 console.log(xIndex)
                 //存进span，用于客户的点击
                  let spanArr={
                    xName:params.value,//点击横坐标的名称
                    id:this.classId[xIndex]//index是当前横坐标的index
                  }
                  this.spanList.push(spanArr)
                  //赋值给preId
                  this.preId=this.classId[xIndex]//index是当前横坐标的index
                  this.getStatist()
              }
          }
       })
    },
    /**
     * 点击了span
     */
    clickSpan(item,index){
      console.log("点击了span")
      console.log(item,index)
      this.preId=item.id
      let l=this.spanList.length
      this.spanList.splice(index+1,l-(index+1))//把后面的长度去掉
      console.log(this.spanList)
      this.getStatist()
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
      if(this.type=='month'){//按月统计，显示指定年份和月份的统计
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
           this.productChart = null
           this.$set(this.params,'year',this.year)
           this.$set(this.params,'month',this.month)
           this.productChart = null
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
        if(this.day==''){
          this.$message.error('请输入日期')
          return false
        }
        if(this.year!=''&&this.month!=''&&this.day!=''){
           this.productChart = null
           this.$set(this.params,'year',this.year)
           this.$set(this.params,'month',this.month)
           this.$set(this.params,'day',this.day)
           this.productChart = null
           return true
        }
      }else{//按年统计，显示指定年份的统计
        this.clearParams()
        if(this.year==''){
          this.$message.error('请输入年份')
          return false
        }else{
          this.$set(this.params,'year',this.year)
          this.productChart = null
          return true
        }
        
      } 
    },
   
  }
}
</script>
