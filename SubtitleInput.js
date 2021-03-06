class SubtitleInput {
        constructor(index, sTime, eTime, lines){
            this.index = parseInt(index)
            this.sTime = this.timeToMs(sTime)
            this.eTime = this.timeToMs(eTime)
            this.dur = this.durCalc(this.sTime, this.eTime)
            this.lines = lines
            this.charsPerLine = this.charPerLineCalc(lines)
            this.charsPerSec = this.charsPerSecCalc(this.charsPerLine,this.dur)
        }
        durCalc(startTime,endTime){
            return endTime - startTime
        }

        charPerLineCalc(lines){
            let chars = []
            lines.forEach((line,key) => {
                chars.push(line.length)
            })
            return chars
        }

        charsPerSecCalc(cpLine, dur){
            let totalChar = 0
            cpLine.forEach((line,key) => {
                totalChar = totalChar + line
            })
            return totalChar / (dur/1000)
        }
        /**
         * timeToMs accepts a string within hh:mm:ss,MMM
         * We create this function instead to install an library since it's easy to implement, and another implementations might be heavier for this project.
         * 
         * This function maybe be in utils in the future, and will not be a method
         */
        timeToMs(time){
            // Split the time string separating hour, minute, second using the regular expression below.
            const t = time.split(/[:,]/)
            let msTime = 0;
            // t is an array, and we sum for each key value the time converted to miliseconds
            t.forEach((time,key) => {
                switch(key){
                    case 0:
                        msTime = (parseInt(time) * 3600000) + msTime
                    break
                    case 1:
                        msTime = (parseInt(time) * 60000) + msTime
                    break
                    case 2:
                        msTime = (parseInt(time) * 1000) + msTime
                    break
                    case 3:
                        msTime = parseInt(time) + msTime
                    break
                    default:
                        msTime = msTime + 0
                }
            })
            return msTime
        }
        csvString(maxLines){
            // Set the output following the header definition
            let output = this.index + ',' + this.sTime + ',' + this.eTime
            let max = maxLines
            // Counts each character of the lines and add the value to the csv file 
            this.charsPerLine.forEach((c,key) => {
                output = output + ',' + c
                max = max - 1
            })
            
            while(max > 0){
                output = output + ',' + 0
                max = max - 1
            }
            return output
        }
    }
    module.exports = SubtitleInput