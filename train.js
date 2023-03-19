const brain = require('brain.js')
const fs = require('file-system')
const prompt = require('prompt-sync')()
const data = require('./TrainingData.json')
//const progressBar = require('cli-progress')
//const trainBar = new progressBar.SingleBar({}, progressBar.Presets.shades_classic)

console.log('Running Training program..')
const hiddenLayers = prompt('Hidden Layers. Ex: 60/65/70/60 => ').split('/').map(item => {
  return Number(item)
})

const iterations = Number(prompt('Iterations. Ex: 2000 => '))

const maxPredict = Number(prompt('Max prediction length. Ex: 200 => '))

const netConfig = {
    hiddenLayers: hiddenLayers
  };

  function trainProgress(info) {
    // Here make training SVG every iteration
  }

  const trainingConfig = {
    iterations: iterations, 
    errorThresh: 0.005,
    log: true,
    logPeriod: 10,
    callback: trainProgress
  }
  
  const net = new brain.recurrent.LSTM(netConfig);

const trainingData = data.map(data => ({
    input: data.input,
    output: data.output
  }));
  
net.train(trainingData, trainingConfig)

net.options.maxPredictionLength = maxPredict

const newData = "DATA/"+netConfig.hiddenLayers.join("-").toString() + ' ' + trainingConfig.iterations

fs.mkdir(newData)

fs.writeFile(newData+'/'+'Validation'+'Out.json', JSON.stringify({
  "Net Output": net.run(data[1].input),
  "Validation": data[1].output
}, null, 4))

fs.writeFile(newData+'/brain.svg', brain.utilities.toSVG(net))
fs.writeFile(newData+'/TrainingData.json', JSON.stringify(data, null, 4))

const netState = net.toJSON();
fs.writeFileSync(newData+"/brain.json",  JSON.stringify(netState), "utf-8");

console.log('Training Complete!')
console.log('Data saved at: '+newData.toString())