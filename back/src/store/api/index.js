const files = require.context('.', false, /\.js$/)
const apis = {}
console.log(files.keys())
files.keys().forEach(key => {
  console.log(1)
  if (key === './index.js' || key === './Ajax.js') return
  apis[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default apis
