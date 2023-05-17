import { Socket } from "socket.io";



class handleAllJobs {
    private io: any
    private accumulatorNumbers: number[] = []

    constructor(io: any) {
        this.io = io
    }

    async viewNumbersAccumulator() {
        return this.accumulatorNumbers
    }

    async viewVerifyNumbersAccumulator(): Promise<any> {
        console.log("viewVerifyNumbersAccumulator: ", new Date().toTimeString());
        if (this.accumulatorNumbers.length > 0) {
            console.log("menor");
            return this.io.emit("gamer:total", this.accumulatorNumbers)
        }
    }

    async setNumberAccumulatot(values: number) {
        this.accumulatorNumbers.push(values)
        this.resetArray()
    }

    resetArray() {
        if (this.accumulatorNumbers.length == 6) {
            this.accumulatorNumbers = []
        } else {
        }
    }

}

export { handleAllJobs }