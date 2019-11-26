var jsonData = require('../samples/sample2.json')
const fs = require('fs')

module.exports = {
  test: () => {
    console.log('--test')
  },
  edit: () => {
    jsonData.elements['test'] = 'test'
    console.log(jsonData.elements)
    try {
      fs.writeFileSync(
        './src/samples/sample3.json',
        JSON.stringify(jsonData, null, 4)
      )
      console.log('write end')
    }catch(e){
      console.log(e)
    }
  },
  add: {
    
  }
}
