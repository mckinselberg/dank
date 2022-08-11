'use strict';



//Selectors for form
const firstNameForm = document.getElementById('firstName');
const lastNameForm = document.getElementById('lastName');
const functionForm = document.getElementById('function');
const departmentForm = document.getElementById('departments');
const officeLocationForm = document.getElementById('officeLocation');
// const streetForm = document.getElementById('street');
// const cityForm = document.getElementById('city');
// const stateForm = document.getElementById('state');
// const zipForm = document.getElementById('zip');
// const countryForm = document.getElementById('country');
const telephoneForm = document.getElementById('telephone');
const mobileForm = document.getElementById('mobile');
const linkedInForm = document.getElementById('linkedIn');
const betanxtWeb = document.getElementById('betanxtWeb');
const companyWebsiteForm = document.getElementById('companyWebsiteForm');
const companyLinkedInForm = document.getElementById('companyLinkedInForm');

// populate company links and inputs
const betaNXTWebsite =  BetaNXTData.links.website !== undefined ? BetaNXTData.links.website : '';
const betaNXTLinkedIn = BetaNXTData.links.linkedin !== undefined ? BetaNXTData.links.linkedin : '';

companyWebsiteForm.value = betaNXTWebsite; 
companyLinkedInForm.value = betaNXTLinkedIn;

//Selectors for live preview
const nameSig = document.getElementById('nameSig');
const functionSig = document.getElementById('functionSig');
const departmentSig = document.getElementById('departmentSig');
const officeLocationSig = document.getElementById('officeLocationSig');
// const streetSig = document.getElementById('streetSig');
// const citySig = document.getElementById('citySig');
// const stateSig = document.getElementById('stateSig');
// const zipSig = document.getElementById('zipSig');
// const countrySig = document.getElementById('countrySig');
const telephoneSig = document.getElementById('telephoneSig');
const mobileSig = document.getElementById('mobileSig');
const linkedInSig = document.getElementById('linkedInSig');


const inputArray = [
    firstNameForm,
    lastNameForm,
    functionForm,
    departmentForm,
    // streetForm,
    // cityForm,
    // stateForm,
    // zipForm,
    // countryForm,
    telephoneForm,
    mobileForm,
    linkedInForm,
    officeLocationForm,
    companyWebsiteForm,
    companyLinkedInForm
];

let inputObj = {};

const btn = document.getElementById('btn');

inputArray.forEach(input => {
    inputObj[input.id] = input.value;
    input.addEventListener('change', () => {

        document.getElementById('companyWebsiteSig').innerHTML = betaNXTWebsite;
        document.getElementById('companyLinkedinSig').innerHTML = betaNXTLinkedIn;

        checkRequired();
        inputObj[input.id] = input.value;
        const clipboardText = Object.keys(inputObj).reduce(function(accumulator, b) {
            switch(b) {
                case 'firstName':
                    return accumulator + inputObj[b] + ' ';
                case 'lastName':
                    return accumulator + inputObj[b] + '\n';
                case 'linkedIn':
                    return (inputObj[b] !== '' ? (accumulator + 'https://linkedin.com/' + inputObj[b] + '\n') : accumulator) + '\n';
                case 'officeLocation':
                    return (inputObj[b] !== '' ? (accumulator + inputObj[b].replace('<b>','').replace('</b>','') + '\n') : accumulator);
                default:
                    return (inputObj[b] !== '' ? (accumulator + inputObj[b] + '\n') : accumulator);
            }
        }, '');
        btn.dataset.clipboardText = clipboardText;
    });
});

//Show input error message
const showError = function (input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form_input error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};

//Remove input success message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form_input success';
}

let clipboard = new ClipboardJS('.btn');
//Check required fields
const checkRequired = function () {
    let errors = [];

    const inputArr = [
        firstNameForm,
        lastNameForm,
        functionForm,
        departmentForm,
    ];

    inputArr.forEach(function (input) {
        //trim removes white space
        if (input.value.trim() === '') {
            showError(input, `This field is required`);
            errors.push('error');
        } else {
            showSuccess(input);
        }
    });

    if (errors.length > 0) {
        btn.classList.add('disabled');
        clipboard.destroy();
    } else {
        btn.classList.remove('disabled');
        clipboard = new ClipboardJS('.btn');
        clipboard.on('success', function(e) {
            console.log(btn.dataset.clipboardText)
            btn.innerHTML = 'Signature Copied';
            setTimeout(function() {
                btn.innerHTML = 'Copy Signature';
            }, 3000);
        });
    }
};

//Generate name
const fullNameGen = function () {
    nameSig.textContent = `${firstNameForm.value} ${lastNameForm.value}`;
}

//Format phone numbers
const formatPhone = function (numberInput) {
    const numClean = ('' + numberInput).replace(/\D/g, '');
    let match;
    if (numClean.length != 10) {
        return numClean;
    } else {
        if (companyForm.value.includes('Wisconsin') || companyForm.value.includes('New York')) {
            match = numClean.match(/^(\d{3})(\d{3})(\d{4})$/);
            return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
        } else if (companyForm.value.includes('India')) {
            match = numClean.match(/^(\d{5})(\d{5})$/);
            return `+91 ${match[1]}-${match[2]}`;
        } else {
            return numClean;
        }
    }
};


//Event listeners for live preview
firstNameForm.addEventListener('input', function () {
    fullNameGen();
});

lastNameForm.addEventListener('input', function () {
    fullNameGen();
});

functionForm.addEventListener('input', function () {
    functionSig.textContent = functionForm.value;
    showSuccess(functionForm);
});

departmentForm.addEventListener('change', function () {
    departmentSig.innerHTML = departmentForm.value;
    showSuccess(departmentForm);
});

officeLocationForm.addEventListener('change', function() {
    officeLocationSig.innerHTML = officeLocationForm.value.split('\n').join('<br/>');
});

telephoneForm.addEventListener('input', function () {
    if (telephoneForm.value.length > 0) {
        telephoneSig.innerHTML = 'O: ' + telephoneForm.value;
    } else {
        telephoneSig.innerHTML = '';
    }
    showSuccess(telephoneForm);
});

mobileForm.addEventListener('input', function () {
    if (mobileForm.value.length > 0) {
        mobileSig.innerHTML = 'M: ' + mobileForm.value;
    } else {
        mobileSig.innerHTML = '';
    }
    showSuccess(mobileForm);
});

linkedInForm.addEventListener('input', function () {
    linkedInSig.innerHTML = linkedInForm.value !== '' ? 'https://linkedin.com/' + linkedInForm.value : '';
    // showSuccess(linkedinForm);
});

// populate select dropdowns
const depts = document.getElementById('departments');
const deptOptions = BetaNXTData.departments;
deptOptions.forEach(function(deptOption) {
    const opt = document.createElement('option');
    opt.value = deptOption;
    opt.innerHTML = deptOption;
    depts.appendChild(opt);
});

// populate location dropdowns
const locationsSelect = document.getElementById('officeLocation');
const locationOptions = BetaNXTData.locations;
Object.keys(locationOptions).forEach(function(locationOption) {
    const opt = document.createElement('option');
    opt.value = '<b>' + locationOption + '</b>' + '\n' + locationOptions[locationOption];
    const innerHtml = locationOption + '\n' + locationOptions[locationOption];
    opt.innerHTML =  innerHtml.split('\n').join('<br/>');
    locationsSelect.appendChild(opt);
});




// streetForm.addEventListener('input', function () {
//     streetSig.textContent = streetForm.value;
//     showSuccess(streetForm);
// });

// cityForm.addEventListener('input', function () {
//     citySig.textContent = cityForm.value;
//     showSuccess(cityForm);
// });

// stateForm.addEventListener('input', function () {
//     stateSig.textContent = stateForm.value;
//     showSuccess(stateForm);
// });

// zipForm.addEventListener('input', function () {
//     zipSig.textContent = zipForm.value;
//     showSuccess(zipForm);
// });

// countryForm.addEventListener('input', function () {
//     countrySig.textContent = countryForm.value;
//     showSuccess(countryForm);
// });