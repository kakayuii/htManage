/*
 *爱记忆相关接口
 * */
import {http} from './Ajax'
import {
  ijyURL
} from '@/config/env'

// 获取机构标签列表
async function DomainList() {
  return new Promise((resolve, reject) => {
    http.get(ijyURL+'/loveDomain/listLoveDomain').then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 新增门店
async function postDomain(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/loveDomain/saveLoveDomain',parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 编辑门店
async function putDomain(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/loveDomain/updateLoveDomain',parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}



// 删除门店
async function delDomain(parms) {
  return new Promise((resolve, reject) => {
    http.get('iweb/loveDomain/delLoveDomain',parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 保存门店
async function saveDomain(parms) {
  if(parms.id > 0){
    return putDomain(parms);
  }else{
    return postDomain(parms);
  }
}

// view门店信息
async function getDomain(id) {
  return new Promise((resolve, reject) => {
    http.get('iweb/loveDomain/jumpEditLoveDomain',{id:id}).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 获取用户列表
async function UserList(parms) {
  console.log(ijyURL);
  return new Promise((resolve, reject) => {
    http.post(ijyURL+'/api/loveRole/listLoveUser?roleType='+parms.roleType,parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(res)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// view用户
async function getUserInfo(id) {
  return new Promise((resolve, reject) => {
    http.post(ijyURL+'/api/loveRole/findLoveUser?userId='+id).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 编辑用户
async function putUserInfo(parms) {
  return new Promise((resolve, reject) => {
    http.post(ijyURL+'/api/loveRole/editLoveUser',parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}

// 删除用户
async function delUser(parms) {
  return new Promise((resolve, reject) => {
    http.post(ijyURL+'/api/loveRole/deleteLoveUser?userId='+parms.userId,{}).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}


//门店排序
async function upOrDownDomain(parm) {
  return new Promise((resolve, reject) => {
    http.post(ijyURL+'/api/loveDomain/upOrDownDomain?type='+parm.type+'&domainId='+parm.domainId,{}).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject('error')
    }).catch(res => {
      reject('error')
    })
  })
}


export default{
  DomainList,
  saveDomain,
  delDomain,
  getDomain,
  UserList,
  getUserInfo,
  putUserInfo,
  delUser,
  upOrDownDomain
}
