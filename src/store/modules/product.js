const state={
  dialogstatus:'',
  rowList:{
    product_id:'',
    customer_id:'',
    customer_num:0
  },
  dialogFormVisible:false
  
}

const mutations={
  //动态选择弹出框
  SET_STATUS:(state,status)=>{
    state.dialogstatus=status
  },
  SET_ROW_LIST:(state,{product_name,customer_num})=>{
     state.rowList.product_id=product_name
     state.rowList.customer_id=customer_num
     state.rowList.customer_num=customer_num
  },
  SET_DIALOG_STATUS:(state,dialogFormVisible)=>{
    state.dialogFormVisible=dialogFormVisible

  }
}

const actions={
   setStatus({commit},status){
     commit('SET_STATUS',status)
   },
   setRowList({commit},row){
     commit('SET_ROW_LIST',row)
   },
   setDialogStatus({commit},dialogFormVisible){
     commit('SET_DIALOG_STATUS',dialogFormVisible);
   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
