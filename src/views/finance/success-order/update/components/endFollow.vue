<template>
  <div>
    <el-form label-width="130px" label-position="left">
      <el-form-item label="主联系人手机号" >
          <el-date-picker
            v-model="value3"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
      </el-form-item>
    </el-form>
    <br>
    <div style="text-align:center">
      <el-button size="small">取消</el-button>
      <el-button type="primary" size="small">确认</el-button>
    </div>
  </div>

</template>