const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  dialogstatus:state=>state.product.dialogstatus,
  rowList:state=>state.product.rowList,
  dialogFormVisible:state=>state.product.dialogFormVisible,
  modelType:state=>state.customer.modelType,
}
export default getters
