const inputBill = document.getElementById("bill");
const noOfPeople = document.getElementById("no-of-people");
const tipButtons = document.querySelector(".tip-percentage");
const custom = document.querySelector(".custom-div .custom");
const tipAmount = document.querySelector(".tip-amount");
const total = document.querySelector(".total");
const resetBtn = document.querySelector(".reset");
let customPercentage = document.querySelector(".custom-div .clickedCustom");

let persons = 0;
let tip;
let tipPerPerson;
let totalBill;
let totalPerPerson;
let inputCustomPercentage;
let trimmedValue;
let savedCustomValue;
let savedCustomKey;
let customTipValue;
let buttonContent;

const buttons = document.querySelectorAll("div button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("clicked");
      button.classList.add("clicked");
    });
  });
});

let billValue = 0;
inputBill.addEventListener("input", (bill) => {
  billValue = bill.target.value;
    const ogBill = document.querySelector(".OG-bill");
  const invalidBill = document.querySelector(".bill-error");
  
  if (isNaN(Number(billValue)) || billValue === '0') {


    ogBill.classList.add("none");
    invalidBill.classList.add("display");
    inputBill.classList.add("invalid");
  }
  else {   

    ogBill.classList.remove("none");
    invalidBill.classList.remove("display");
    inputBill.classList.remove("invalid");
  }
  
});

const ogBill = document.querySelector(".OG-bill");
const invalidBill = document.querySelector(".bill-error");
const validityCheck =  document.querySelector(".validity-check")
 

tipButtons.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON" && ((billValue === 0 || persons === 0) || (isNaN(billValue) || isNaN(persons)))) {
    document.querySelector("body").classList.add("backdrop");
    document.querySelector("main").classList.add("opacity");
    validityCheck.classList.add("invalidity");

  
    document.querySelector('.validity-check button')
      .addEventListener('click', () =>
      {
    document.querySelector("body").classList.remove("backdrop");
    document.querySelector("main").classList.remove("opacity");
    validityCheck.classList.remove("invalidity");
}
)
  }
  else {
    ogBill.classList.remove("none");
    invalidBill.classList.remove("display");
    inputBill.classList.remove("invalid");

    let tipButtonClassname;
    
      if (event.target.tagName === "BUTTON") {
        buttonContent = event.target.textContent;
        tipButtonClassname = event.target.className
      
        const neededTipValue = buttonContent.slice(0, buttonContent.length - 1);
        customTipValue = buttonContent;

        if (
          buttonContent !== "Custom" &&
          event.target.className === "clicked"
        ) {
          tipCal(neededTipValue);

          resetBtn.addEventListener("click", () => {
            tipAmount.textContent = `$0.00`;
            total.textContent = `$0.00`;
            inputBill.value = "";
            noOfPeople.value = "";
            event.target.classList.remove("clicked");
            resetBtn.classList.remove("clicked");
            custom.textContent = "Custom";
            customPercentage.value = "";
            custom.classList.remove("clicked");
          });
        }
      }
      else {
        console.log('sikee')
      }
   
  }
})

noOfPeople.addEventListener("input", (people) => {
  persons = people.target.value;

  const ogPeople = document.querySelector(".OG-people");
    const zeroPeople = document.querySelector(".zero-people");
  if (isNaN(Number(persons)) || persons === '0') {
       ogPeople.classList.add("none");
    zeroPeople.classList.add("display");
    noOfPeople.classList.add("invalid");
  } else {
       ogPeople.classList.remove("none");
    zeroPeople.classList.remove("display");
    noOfPeople.classList.remove("invalid");
  }
});   

custom.addEventListener("click", () => {
  customPercentage.classList.add("display");

  document.querySelector(".custom-div").replaceChild(customPercentage, custom);

  customPercentage.addEventListener("input", (ev) => {
    inputCustomPercentage = ev.target.value;
    trimmedValue = inputCustomPercentage.trim();
  });
});
    
customPercentage.addEventListener("keypress", (ev2) => {
  savedCustomKey = ev2.key;

  savedCustomValue = inputCustomPercentage;
  custom.textContent = inputCustomPercentage;

  if (savedCustomKey === "Enter") {
    custom.classList.add("clicked");
    document
      .querySelector(".custom-div")
      .replaceChild(custom, customPercentage);

    customTipCal(customTipValue);
  }
});
    
function tipCal(tipPercentage) {
  if (tipPercentage !== "Custo") {
    tip = tipPercentage * 0.01 * billValue;
    tipPerPerson = Number(tip) / Number(persons);
    Number(tipAmount.textContent).toFixed(2);
    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;

    totalPerPerson = billValue / Number(persons) + tipPerPerson;
    total.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    customTipCal(customTipValue);
    console.log("You don code shit");
  }

  if (tipPerPerson !== undefined && totalPerPerson !== undefined) {
    resetBtn.classList.add("clicked");
  }
}

let customTipArr = ["custom"];

function customTipCal(customTip) {
  customTipArr.push(inputCustomPercentage);

  if (customTip === "Custom" && savedCustomValue.endsWith("%")) {
    tip =
      (Number(savedCustomValue.slice(0, savedCustomValue.length - 1)) / 100) *
      billValue;

    tipPerPerson = Number(tip) / Number(persons);
    Number(tipAmount.textContent).toFixed(2);
    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;

    totalPerPerson = billValue / Number(persons) + tipPerPerson;
    total.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else if (customTip === "Custom" && !savedCustomValue.endsWith("%")) {
    tip = (Number(savedCustomValue) / 100) * billValue;
    tipPerPerson = Number(tip) / Number(persons);
    Number(tipAmount.textContent).toFixed(2);
    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalPerPerson = billValue / Number(persons) + tipPerPerson;
    total.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else if (
    customTip === customTipArr[customTipArr.length - 2] &&
    savedCustomValue.endsWith("%")
  ) {
    tip =
      (Number(savedCustomValue.slice(0, savedCustomValue.length - 1)) / 100) *
      billValue;

    tipPerPerson = Number(tip) / Number(persons);
    Number(tipAmount.textContent).toFixed(2);
    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;

    totalPerPerson = billValue / Number(persons) + tipPerPerson;
    total.textContent = `$${totalPerPerson.toFixed(2)}`;
  }

  if (tipPerPerson !== undefined && totalPerPerson !== undefined) {
    resetBtn.classList.add("clicked");
  }
}

 const errorTypes = document.querySelectorAll(".validity-check p")
    let errorTypeClass = ''
    errorTypes.forEach((errorType) => {
      errorTypeClass = errorType.className
    })
switch (errorTypeClass) {
  case 'invalid-bill':
    document.querySelector(`.${errorTypeClass}`).textContent = "Enter a valid bill value"
    break;
  case 'invalid-persons':
    document.querySelector(`.${errorTypeClass}`).textContent = "Enter a valid number of people"
    break;
  case 'zero-person':
    document.querySelector(`.${errorTypeClass}`).textContent = "Number of people cannot be zero"
    break;

  default:
    errorTypeClass = 'invalid-bill-and-people'
    document.querySelector(`.${errorTypeClass}`).textContent = "Enter a valid bill value and number of people"
    break;
}

