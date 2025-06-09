const string1 = '(ab(cd)'
const string2 = 'a)b(c)d'
const string3 = '))(('
const string4 = '(a(b(c)d)'
const string5 = '(abc)'
const minRemoveToMakeValid = function (str) {
  const stack = []

  const workString = str.split('')
  const length = workString.length

  if (!length) { return str }

  for (let i = 0; i < length; i++) {
    if (workString[i] === '(') { stack.push(i) } else if (workString[i] === ')' && stack.length) { stack.pop() } else if (workString[i] === ')') { workString[i] = '' }
  }
  // if we encounter ')' and the stack is empty, remove it.
  // if we reached the end of the string, and the stack is not empty, remove by indexes

  if (stack.length) {
    stack.forEach(index => workString[index] = '')
  }

  return workString.join('')
}

console.log(string1, minRemoveToMakeValid(string1))
console.log(string2, minRemoveToMakeValid(string2))
console.log(string3, minRemoveToMakeValid(string3))
console.log(string4, minRemoveToMakeValid(string4))
