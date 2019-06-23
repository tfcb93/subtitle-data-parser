/**
 * subInput contem a instância da estrutura de uma entrada da legenda
 * sub possui a estrutura que segura todas as linhas de entrada
 */
const subInput = require("./SubtitleInput.js")
const sub = require("./Subtitle.js")


const lineReader = require('n-readlines') // Read file line by line
const fs = require("fs") // write of the .csv file

function Parser(fileName, subtitles) {
    const lineIterator = new lineReader(fileName)
    let line
    let index = 1 // we don't get the index of the file because it may contain repetitive index due to errors from the sync-subtitle software
    let counter = 1
    let allSubInputs = []
    let actualInput = {}
    actualInput.lines = []
    while(line = lineIterator.next()) {
        if(counter === 1 && line.toString('utf8').replace('\r','').length !== 0) {
            // index
            actualInput.indexNum = index
            index++
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

function ToCSV(legendas,maxEnt,outputName){

    let out = fs.createWriteStream(outputName + '.csv',{flags:'w'}) //'w' is set to rewrite the file everytime it runs again
    let header = "index,inicio(ms),fim(ms)"
    for(let i = 1;i <= maxEnt;i++){
        header = header + ",characteres na linha " + i
    }
    header = header + "\r\n"
    out.write(header)
    legendas.forEach((l,key)=>{
        out.write(l.csvString(maxEnt) + "\r\n")
    })
}

module.exports = { Parser, ToCSV }
