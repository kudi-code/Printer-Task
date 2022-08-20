class Queue{
    constructor(){
        this.queue = []
    }
    enqueue(item){
        this.queue.push(item)
    }
    dequeue(item){
        return this.queue.shift(item)
    }
    isEmpty(){
        return this.queue.length===0
    }
    size(){
        return this.queue.length
    }
}

class Printer{
    constructor(ppm){
        this.pageRate = ppm
        this.currentTask = null
        this.timeRemaining = 0
    }
    tick(){
        if (this.currentTask !== null){
            this.timeRemaining = this.timeRemaining -1
            if (this.timeRemaining <=0){
                this.currentTask = null
            }
        }
    }
    busy(){                                       
        if(this.currentTask !==null){                     
            return true
        }
        else{
            return false 
        }   
    }
    startNext(newTask){                                        
        this.currentTask = newTask                                       
        this.timeRemaining = newTask.getPages() * 60/this.pageRate     
    }
}
class Task{
    constructor(time){
        this.timestamp=time
        this.pages = Math.floor(Math.random() * 80);
    }
    getStamp(){
        return this.timestamp
    }
    getPages(){
        return this.pages
    }
    waitTime(currentTime){
        return currentTime - this.timestamp
    }
}

// -----------------------------------------------------------


function newPrintTask () {
    const num = Math.floor(Math.random() * 181)
    return num===180

}

function simulation(numSeconds, pagesPerMinute){
    const labPrinter = new Printer(pagesPerMinute)
    const printQueue = new Queue()
    var waitingTimes = []
    var ArrayNumSeconds = [...Array(numSeconds).keys()];
    ArrayNumSeconds.forEach(currentSecond => {
        if (newPrintTask()) {
            const task = new Task(currentSecond)
            printQueue.enqueue(task)
        }
        // console.log(printQueue.isEmpty())
        // console.log(labPrinter.busy());
        if (!labPrinter.busy() && !printQueue.isEmpty()){
            const nextTask = printQueue.dequeue()
            waitingTimes.push(nextTask.waitTime(currentSecond))
            labPrinter.startNext(nextTask)
        }

        labPrinter.tick()

    })
    console.log(waitingTimes)
    const sum = waitingTimes.reduce((partialSum, a) => partialSum + a, 0);
    averageWait = sum/waitingTimes.length
    console.log(`Average Wait %${averageWait} secs ${printQueue.size()} tasks remaining.`)

}

var Array1 = [...Array(10).keys()];

Array1.forEach((i)=> {
    simulation(3600, 20)
})