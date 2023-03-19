const brain = require("brain.js")
//const testNet = require('./DATA/Test/20-20-20 2000 (Edited)/brain.json')
const data = require('./data.json')
const prompt = require('prompt-sync')()
const fs = require('file-system')
const newData = "DATA/Test"
const net = new brain.recurrent.LSTM()

fs.writeFile('./DATA/Test/test.json', JSON.stringify(data, null, 4))