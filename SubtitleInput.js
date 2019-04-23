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
         * timeToMs aceita um string contendo hh:mm:ss,MMM
         * 
         * Essa função pode ser passada posteriormente para uma outra biblioteca de utils
         */
        timeToMs(time){
            //Dividimos a sting do tempo separando hora, minuto e segundo, usando a expressão regular abaixo para poder dividir somente uma vez o tempo
            let t = time.split(/[:,]/)
            let msTime = 0;
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
            //header: index, start time, end time, duration, line1,line2,charpline1,charpline2,charpsec
            let output = this.index + ',' + this.sTime + ',' + this.eTime
            let max = maxLines
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