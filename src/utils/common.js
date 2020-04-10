export const sortNameOpts = [
  { label: '客户id', value: 'c.id' },
  { label: '客户名', value: 'c.customer_name' },
  { label: '联系人名称', value: 're_name' },
  { label: '跟进时间', value: 'ftime' },
  { label: '客户状态', value: 'c.customer_state' },
  { label: '客户阶段id', value: 'c.customer_stage_id' },
  { label: '客户来源', value: 'c.customer_origin_id' }
]

export const sortTypeOpts = [
  { label: '降序', value: 'desc' },
  { label: '升序', value: 'asc' }
]

export const customerStatus = [
  { label: '冷却', value: '冷却' },
  { label: '潜在', value: '潜在' },
  { label: '意向', value: '意向' },
  { label: '成交', value: '成交' },
  { label: '失败', value: '失败' },
  { label: '流失', value: '流失' }
]
