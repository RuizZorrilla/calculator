document.addEventListener("DOMContentLoaded", loaded)





function loaded() {

  const keys = document.querySelector('.buttons')

  keys.addEventListener('click', e => {

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = currentNumber.textContent;
    const firstNum=result.textContent;
    const prevKey= keys.dataset.previousKeyType;
    
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('activeOp'))  

    if (e.target.matches('button')) {

      if (!action) {
        if (displayedNum === '' || prevKey === 'operator') {
          currentNumber.textContent = keyContent;
        } else {
          currentNumber.textContent = currentNumber.textContent + keyContent;
        }
      }

      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'pow' ||
        action === 'divide'
      ) {
        key.classList.add('activeOp') 
        keys.dataset.previousKeyType = 'operator';
        result.textContent = displayedNum;
        keys.dataset.operator = action;

      }

      if (action === 'decimal') {
        if(displayedNum.includes('.')){

        }else{
        currentNumber.textContent = displayedNum + '.';
        keys.dataset.previousKeyType = 'decimal';

      }
      }

      if (action === 'clear') {
        keys.dataset.previousKeyType='';
        currentNumber.textContent='';
        result.textContent='';
      }

      if (action === 'sign') {
        if(displayedNum.includes('-')){
          currentNumber.textContent = currentNumber.textContent.replace('-', '')
        }else{
          currentNumber.textContent = '-' + displayedNum;
        }
      }

      if (action === 'delete') {
      }

      if (action === 'calculate') {
        const operator = keys.dataset.operator;
        const firstValue= firstNum;
        const secondValue = displayedNum;

        currentNumber.textContent = calculate(firstValue, operator, secondValue)


      }

    }
  })

}

function calculate(num1, op, num2) {
  let result

  switch (op){
    case 'add':
      result= parseFloat(num1)+parseFloat(num2)
    break;

    case 'subtract':
      result= num1-num2
    break;

    case 'multiply':
      result= num1*num2;
    break;

    case 'divide':
      if(num2!=0){
        result= num1/num2;
      }else{
        result= "Syntax error";
      }
    break;

    case 'pow':
      result= Math.pow(num1, num2);
    break;

    default: 
      result="error"
    break;

  }

  return result;
}