class Subtitle{
    constructor(totalSubtitles){
        this.subs = totalSubtitles //recive an array with all the subtitle entries
        this.greatLineNumber = this.greatLineNum(totalSubtitles)
        this.maxIndex = this.setMaxIndex(totalSubtitles)
        this.mediumDur = this.calcMediumDur(totalSubtitles)
    }

    /**
     * greatLineNum returns the total of lines the biggest line entry has
     * this value is important to write the csv file
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
     * setMaxIndex sets the last index (biggest index)
     * It's also important for the csv file write
     * Still, I don't need to keep this data so I will probably get ride of it in the future
     */
    setMaxIndex(subs){
        return subs[(subs.length - 1)].index
    }
    /**
     * Retorn the medium time of duration in the file
     */
    calcMediumDur(subs){
        let m = 0
        subs.forEach((l,key)=>{
            m = m + l.dur
        })
        return m / (subs[(subs.length - 1)].index)
    }

    /**
     * Write the data of the subtitle in csv format using the entry method
     */

    allToCSV(){
        let out = []
        this.subs.forEach((l,key)=>{
            
            out.push(l.csvString(this.greatLineNumber))
        })
        return out
    }
}



module.exports = Subtitle
