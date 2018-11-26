/**
 * subInput contem a instância da estrutura de uma entrada da legenda
 * sub possui a estrutura que segura todas as linhas de entrada
 */
const subInput = require("./SubtitleInput.js")
const sub = require("./Subtitle.js")


const lineReader = require('n-readlines') // Para a leitura do arquivo
const fs = require("fs") // Para escrita do arquivo .csv

function Parser(fileName, subtitles) {
    const lineIterator = new lineReader(fileName)
    let line
    let counter = 1
    let allSubInputs = []
    let actualInput = {}

    actualInput.lines = []
    while(line = lineIterator.next()) {
        if(counter === 1) {
            // index
            actualInput.indexNum = line.toString('utf8').replace('\r','')
            counter++
        }
        else if(counter === 2) {
            // start and end time
            let dur = (line.toString('utf8').replace('\r','')).split('-->')
            actualInput.sTime = dur[0]
            actualInput.eTime = dur[1]
            counter++
        }
        else if(counter >= 3) {
            // lines
            if(line.toString('utf8').replace('\r','').length === 0) {
                let pushedInput = new subInput(actualInput.indexNum,actualInput.sTime,actualInput.eTime,actualInput.lines)
                allSubInputs.push(pushedInput)
                actualInput = {}
                actualInput.lines = []
                counter = 1
            }else{
                //in case the line is not empty
                actualInput.lines.push(line.toString('utf8').replace('\r',''))
                counter++
            }
        }
    }
    return new sub(allSubInputs)
}

//Eu tenho que arrumar isso para poder usar o toCSV
function ToCSV(legendas,maxEnt,outputName){
    /**
     * escrever dentro do arquivo linha por linha
     */
  
    let out = fs.createWriteStream(outputName + '.csv',{flags:'a'}) //'a' é setado para adicionar ao longo do arquivo 'a' = append
    let header = "index;inicio(ms);fim(ms);duracao(ms)"
    for(let i = 1;i <= maxEnt;i++){
        header = header + ";linha " + i
    }
    for(let i = 1;i <= maxEnt;i++){
        header = header + ";characteres na linha " + i
    }
    header = header + ";caracteres por segundo" + "\r\n"
    out.write(header)
    legendas.forEach((l,key)=>{
        out.write(l.csvString() + "\r\n")
    })
}

module.exports = { Parser, ToCSV }