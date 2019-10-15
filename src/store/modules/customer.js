import { getCustomerById } from '@/api/customer'
import { resolve, reject } from 'q'
const state={
  modelType:'',
  customerRowList:null,
  updateDialogVisible:false
}

const mutations={
  //动态选择弹出框
  SET_MODELTYPE:(state,modelType)=>{
    state.modelType=modelType
  },
  SET_CUSTOMERROWLIST:(state,rowlist)=>{
    state.customerRowList=rowlist
  },
  SET_UPDATEDIALOGVISIBLE:(state,updateDialogVisible)=>{
    state.updateDialogVisible=updateDialogVisible
  }
}

const actions={
   setmodelType({commit},modelType){
     commit('SET_MODELTYPE',modelType)
   },
   setcustomerRowList({commit},rowlist){
     commit('SET_CUSTOMERROWLIST',rowlist)
   },
   setupdateDialogVisible({commit},updateDialogVisible){
     commit('SET_UPDATEDIALOGVISIBLE',updateDialogVisible)
   }
  //  getAllList({commit},params){
  //    console.log("pa"+params)
  //    return new Promise((resolve,reject)=>{
  //        getCustomerById(params).then(response=>{
  //          console.log("response:")
  //          console.log(response)
  //          resolve(response)
  //        })
  //        .catch(err=>{
  //          reject(err)
  //        })
  //    })
  //  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
