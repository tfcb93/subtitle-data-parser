class Subtitle{
    constructor(totalSubtitles){
        this.subs = totalSubtitles //recebe uma lista com todas as legendas encontradas
        this.greatLineNumber = this.greatLineNum(totalSubtitles)
        this.maxIndex = this.setMaxIndex(totalSubtitles)
        this.mediumDur = this.calcMediumDur(totalSubtitles)
    }

    /**
     * greatLineNum retorna o maior número de linhas de todas as entradas
     * esse valor é importante para a criação do CSV
     */
    greatLineNum(subs){
        let max = 0
        subs.forEach((l,key)=>{
            if(l.lines.length > max){
                max = l.lines.length
            }
        })
        return max
    }
    /**
     * Retorna o maior index da lista de entradas
     */
    setMaxIndex(subs){
        return subs[(subs.length - 1)].index
    }
    /**
     * Retorna o tempo médio de duração para o arquivo inteiro
     */
    calcMediumDur(subs){
        let m = 0
        subs.forEach((l,key)=>{
            m = m + l.dur
        })
        return m / (subs[(subs.length - 1)].index)
    }

    allToCSV(){
        let out = []
        this.subs.forEach((l,key)=>{
            
            out.push(l.csvString(this.greatLineNumber))
        })
        return out
    }
}



module.exports = Subtitle
