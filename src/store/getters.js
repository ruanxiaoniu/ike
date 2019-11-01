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
  customerRowList:state=>state.customer.customerRowList,
  customerUpdateDialogVisible:state=>state.customer.updateDialogVisible,
  customerTableList:state=>state.customer.customerTableList,

  complaintUpdateDialogVisible:state=>state.complaint.updateDialogVisible,
  complaintRowList:state=>state.complaint.complaintRowList,
  complaintTableList:state=>state.complaint.complaintTableList,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  userId:state=>state.user.userId
}
export default getters
