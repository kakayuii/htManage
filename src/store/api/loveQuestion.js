/*
 *爱记忆相关接口
 * */
import {http} from './Ajax'
import {
  ijyURL
} from '@/config/env'

// 获取爱记忆提问列表
async function QuestionList() {
  return new Promise((resolve, reject) => {
    http.get(ijyURL + '/loveQuestion/listLoveQuestion').then(res => {
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

// view问题
async function getQuestion(id) {
  return new Promise((resolve, reject) => {
    http.get(`${ijyURL}/loveQuestion/jumpEditLoveQuestion`, {questionId: id}).then(res => {
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

// 改变状态
async function changeQuestionState(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/loveQuestion/updateLoveQuestionState?questionId=' + parms.questionId + '&replyState=' + parms.replyState, {}).then(res => {
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

// 发送回复
async function sendLoveQuestion(parms) {
  return new Promise((resolve, reject) => {
    http.post('iweb/loveQuestion/saveLoveQuestion', parms).then(res => {
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

// 删除回复
async function delReply(parms) {
  return new Promise((resolve, reject) => {
    http.get('iweb/loveQuestion/deleteReply', parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject(res)
    }).catch(res => {
      reject(res)
    })
  })
}


async function deleteQuestionState(parms) {
  return new Promise((resolve, reject) => {
    http.post(ijyURL + '/loveQuestion/deleteLoveQuestion?questionId=' + parms.questionId, {}).then(res => {
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

async function unDeleteLoveQuestion(questionId) {
  return new Promise((resolve, reject) => {
    http.post(ijyURL + '/loveQuestion/unDeleteLoveQuestion?questionId=' + questionId, {}).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject(res)
    }).catch(res => {
      reject(res)
    })
  })
}


//问题标签列表
async function listLoveTag(typeId) {
  return new Promise((resolve, reject) => {
    http.post(ijyURL + '/api/loveTag/listLoveTag?typeId=' + typeId, {}).then(res => {
      let {code, data} = res;
      if (code === 0) {
        data.forEach(val=>val.isSee=Boolean(val.isSee))
        resolve(data)
      }
      reject(res)
    }).catch(res => {
      reject(res)
    })
  })
}

//删除标签
async function deleteLoveTag(tagId) {
  return new Promise((resolve, reject) => {
    http.post(ijyURL + '/api/loveTag/deleteLoveTag?tagId=' + tagId, {}).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject(res)
    }).catch(res => {
      reject(res)
    })
  })
}

//保存标签
async function saveLoveTag(parms,userId) {
  return new Promise((resolve, reject) => {
    http.post(ijyURL + '/api/loveTag/saveLoveTag?userId=' + userId, parms).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject(res)
    }).catch(res => {
      reject(res)
    })
  })
}

//选择显示的标签
async function unSeeLoveTag(ids,type) {
  return new Promise((resolve, reject) => {
    http.post(ijyURL + '/api/loveTag/unSeeLoveTag?ids=' + ids+'&type='+type, {}).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject(res)
    }).catch(res => {
      reject(res)
    })
  })
}


//显示测评结果
async function questionNaire(parm) {
  return new Promise((resolve, reject) => {
    http.get(ijyURL + '/api/questionNaire/getLatestQuestionNaire',parm).then(res => {
      let {code, data} = res;
      if (code === 0) {
        resolve(data)
      }
      reject(res)
    }).catch(res => {
      reject(res)
    })
  })
}


export default{
  QuestionList,
  getQuestion,
  changeQuestionState,
  sendLoveQuestion,
  delReply,
  deleteQuestionState,
  unDeleteLoveQuestion,
  listLoveTag,
  deleteLoveTag,
  saveLoveTag,
  unSeeLoveTag,
  questionNaire
}

export{
  listLoveTag,
  deleteLoveTag,
  saveLoveTag,
  unSeeLoveTag,
  questionNaire
}
