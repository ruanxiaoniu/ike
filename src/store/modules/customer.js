const state={
  modelType:'',
}

const mutations={
  //动态选择弹出框
  SET_MODELTYPE:(state,modelType)=>{
    state.modelType=modelType
  },
}

const actions={
   setmodelType({commit},modelType){
     commit('SET_MODELTYPE',modelType)
   },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
