const argv = require('process').argv
const subInput = require("./SubtitleInput.js")
const subs = require("./Subtitle.js")
const utils = require("./Utils.js")
const fs = require("fs")

let counter = 2
let files = []
let subtitles

while(counter <= (argv.length - 1)){
    if(fs.lstatSync(argv[counter]).isDirectory()){
        files = fs.readdirSync(argv[counter]).filter((file) => {
            return file.includes('.srt')
        })
        files.forEach((file,index) => {
            const outputName = file.replace('.srt','')
            subtitles = utils.Parser(argv[counter] + "/" + file)
            utils.ToCSV(subtitles.subs,subtitles.greatLineNumber,argv[counter] + "/" + outputName)  
        })
        counter ++
    }else{
        const outputName = argv[counter].replace('.srt','')
        subtitles = utils.Parser(argv[counter])
        utils.ToCSV(subtitles.subs,subtitles.greatLineNumber,outputName)
        counter ++
    }
}

/**
 * Eu deveria arrumar para *.srt, mas por enquanto... está bom
 */