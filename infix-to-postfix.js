/**
 * Copyrite 2021 Nicholas Shiell - NShiell
 * @license https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * A JavaScript implementation of
 * Shunting Yard Algorithm - https://brilliant.org/wiki/shunting-yard-algorithm/
 */

 /**
  * Execute some maths provided in reverse-polish notation
  * @see https://en.wikipedia.org/wiki/Reverse_Polish_notation
  * @param String reversePolish 
  * @return Number 
  */
function executer(reversePolish) {
    const parts = reversePolish.split(' ')

    var stack = []

    parts.forEach(part => {
        if (part == '+') {
            stack.push(stack.pop() + stack.pop())
        } else if (part == '*') {
            stack.push(stack.pop() * stack.pop())
        } else if (part == '-') {
            const top = stack.pop()
            stack.push(stack.pop() - top)
        } else if (part == '/') {
            const top = stack.pop()
            stack.push(stack.pop() / top)
        } else {
            stack.push(part - 0)
        }
    })
    return stack[0]
}

/**
 * Render some arythamtic provided in normal infix notation
 * to reverse-polish notation
 * @param String infix 
 * @return String postfix 
 */
function infixToPostfix(infix) {
    class Stack extends Array {
        top () {
            return this.slice(-1).pop()
        }
    }

    const operatorStack = new Stack()
    const outputQueue = []

    const operatorPrecedence = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1
    }

    // While there are tokens to be read:
    // Read a token
    infix.split('').forEach(token => {
        if (token == ' ') {
            return null
        }
        // If it's a number add it to queue
        if ('0123456789'.includes(token)) {
            outputQueue.push(token)


        } else if ('+-*/'.includes(token)) {
            // If it's an operator
            const tokenPrecedence = operatorPrecedence[token]

            // While there's an operator on the top of the stack with greater precedence:
            while (operatorStack.length) {
                // Pop operators from the stack onto the output queue
                let operatorPrecedenceFromStack = operatorPrecedence[
                    operatorStack.top()
                ]

                let higherPrecedence = (
                    operatorPrecedenceFromStack !== undefined &&
                    operatorPrecedenceFromStack > tokenPrecedence
                )

                if (higherPrecedence) {
                    outputQueue.push(operatorStack.pop())
                } else {
                    break
                }
            }
            // Push the current operator onto the stack
            operatorStack.push(token)

        // If it's a left bracket push it onto the stack
        } else if (token == '(') {
            operatorStack.push(token)
        } else { // If it's a right bracket

            // While there's not a left bracket at the top of the stack
            while (operatorStack.length) {
                if (operatorStack.top() != '(') {
                    // Pop operators from the stack onto the output queue.
                    outputQueue.push(operatorStack.pop())
                // Pop the left bracket from the stack and discard it
                } else {
                    operatorStack.pop()
                }
            }
        }
    })

    // While there are oper ators on the stack, pop them to the queue
    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop())
    }

    return outputQueue.join(' ')
}

// A quick test - it should equal 40
console.log(executer(infixToPostfix('(3 + 5) * (7 - 2)')))