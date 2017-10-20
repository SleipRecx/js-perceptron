class Perceptron {
  constructor() {
    this.weights = []
    this.bias = Math.random()
    this.learningRate = 0.01
  }

  forward(input){
    while (this.weights.length < input.length) {
       this.weights.push(Math.random())
    }
    let sum = this.bias
    for (let i = 0; i < input.length; i++) {
      sum += input[i] * this.weights[i]
    }
    return this.threshold(sum)
  }

  delta(actual, expected, input) {
    return (expected - actual) * this.learningRate * input
  }

  threshold(x) {
    if (x > 0) return 1
    else return 0
  }

  train(training_set){
    for(let i = 0; i < 1000; i++){
      training_set.forEach(set => {
        const t = set[set.length - 1]
        set = set.slice(0, set.length - 1)
        const o = this.forward(set)
        if (o !== t) {
          set.forEach((e, index) => {
            this.weights[index] += this.delta(o, t, e)
          })
          this.bias += this.delta(o, t, 1)
        }
      })
    }
  }
}

const training = [[1,0,1],[1,1,1],[0,0,0],[0,1,1]]
const training2 = [[1,0],[0,1],[0,1],[1,0]]
const perceptron_or = new Perceptron
const perceptron_not = new Perceptron

perceptron_or.train(training)
perceptron_not.train(training2)

console.log(perceptron_or.weights);
console.log(perceptron_or.bias);

console.log(perceptron_not.forward([0]))
