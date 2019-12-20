const userType = [
  {
    id:'visitor',
    name:'游客'
  },
  {
    id:'reg',
    name:'注册用户'
  },
  {
    id:'member',
    name:'会员用户'
  },
  {
    id:'vip',
    name:'VIP用户'
  },
  {
    id:'staff',
    name:'内部员工'
  },
]
function changeName(list, id) {
  let name
  list.map(item => {
    if (id === item.id) { name = item.name }
  })
  return name
}
function changeKeyName(list, id) {
  let name
  list.map(item => {
    if (id === item.key) { name = item.value }
  })
  return name
}
export {
  userType,
  changeName,
  changeKeyName
}
