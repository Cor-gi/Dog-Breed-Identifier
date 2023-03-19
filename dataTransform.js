const fs = require('file-system')
const data = require('./RawData.json')

const newArray = JSON.stringify(data, null, 4).replace(/""/g, '\"input\"').replace(/"description"/g, '\"output\"')
fs.writeFile('./TrainingData.json', newArray)