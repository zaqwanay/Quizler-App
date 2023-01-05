import fs from 'fs'

// Takes in two parameters an array and number and retuns an array
// ([], num) -> []
export const chooseRandom = (array, numItems) => {
  if (array.length === 0 || array.length === 1) {
    return array
  }
  let newArray = [...array].sort(() => 0.5 - Math.random())
  return newArray.slice(0, numItems)
}

// takes in a destructured object with two key-value parameters and returns an array of objects
// ({numChoices: num, numQuestions: num}) -> [{}]
export const createPrompt = ({ numChoices = 2, numQuestions = 1 } = {}) => {
  let promptArray = []
  for (let i = 1; i <= numQuestions; i++) {
    let promptQuestion = {
      type: 'input',
      name: `question-${(i)}`,
      message: `Enter question ${(i)}`
    }
    promptArray.push(promptQuestion)
    for (let a = 1; a <= numChoices; a++) {
      let promptChoices = {
        type: 'input',
        name: `question-${(i)}-choice-${(a)}`,
        message: `Enter answer choice ${(a)} for question ${(i)}`
      }
      promptArray.push(promptChoices)
    }
  }
  return promptArray
}

// returns an array of question objects
// ->[{}]
export const createQuestions = (newObject = {}) => {
  let questionsArray = []

  // using .filter to check conditions are met in the callback and then matching the question string to an object
  let questions = Object.keys(newObject).filter(property => property.match(new RegExp(/question-\d$/)))
  for (let qst of questions) {
    let question = {
      type: 'list',
      name: qst,
      message: newObject[qst],
      choices: []
    }
    let listOfChoices = Object.keys(newObject).filter(property => property.match(new RegExp(`${qst}-choice-\\d`)))
    for (let choice of listOfChoices) {
      question.choices = [
        ...question.choices,
        newObject[choice]
      ]
    }
    questionsArray.push(question)
  }
  return questionsArray
}

export const readFile = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
})

export const writeFile = (path, data) => new Promise((resolve, reject) => {
  fs.writeFile(path, data, err => err ? reject(err) : resolve('File saved successfully')
  )
})
