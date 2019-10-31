const state={
  modelType:'',
  complaintRowList:null,
  complaintTableList:null,
  updateDialogVisible:false
}

const mutations={
  //动态选择弹出框
  SET_MODEL_TYPE:(state,modelType)=>{
    state.modelType=modelType
  },
  SET_COMPLAINT_ROWLIST:(state,rowlist)=>{
    state.complaintRowList=rowlist
  },
  SET_UPDATE_DIALOG_VISIBLE:(state,updateDialogVisible)=>{
    state.updateDialogVisible=updateDialogVisible
  },
  SET_COMPLAINT_TABLE_LIST:(state,tableList)=>{
    state.complaintTableList=tableList
  }
}

const actions={
   setModelType({commit},modelType){
     commit('SET_MODEL_TYPE',modelType)
   },
   setComplaintRowList({commit},rowlist){
     commit('SET_COMPLAINT_ROWLIST',rowlist)
   },
   setUpdateDialogVisible({commit},updateDialogVisible){
     commit('SET_UPDATE_DIALOG_VISIBLE',updateDialogVisible)
   },
   setComplaintTableList({commit},tableList){
     commit('SET_COMPLAINT_TABLE_LIST',tableList)
   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
