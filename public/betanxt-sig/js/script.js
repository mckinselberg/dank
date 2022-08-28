'use strict';
//utility
const makeArray = function (domNodes) {
    return [].slice.apply(domNodes);
}
//Selectors for form
const firstNameForm = document.getElementById('firstName');
const lastNameForm = document.getElementById('lastName');
const functionForm = document.getElementById('function');
const departmentForm = document.getElementById('departments');
const departmentOtherForm = document.getElementById('departmentsOther');
const officeLocationForm = document.getElementById('officeLocation');
const officeLocationOtherForm = document.getElementById('officeLocationOther');
const telephoneForm = document.getElementById('telephone');
const mobileForm = document.getElementById('mobile');
const emailForm = document.getElementById('email');
const linkedInForm = document.getElementById('linkedIn');
const betanxtWeb = document.getElementById('betanxtWeb');
const companyWebsiteForm = document.getElementById('companyWebsiteForm');
const companyLinkedInForm = document.getElementById('companyLinkedInForm');

// populate company links and inputs
const betaNXTWebsite =  BetaNXTData.links.website !== undefined ? BetaNXTData.links.website : '';
const betaNXTLinkedIn = BetaNXTData.links.linkedin !== undefined ? BetaNXTData.links.linkedin : '';

// assign values to inputs
companyWebsiteForm.value = betaNXTWebsite; 
companyLinkedInForm.value = betaNXTLinkedIn;

const inputArray = [
    firstNameForm,
    lastNameForm,
    functionForm,
    departmentForm,
    departmentOtherForm,
    telephoneForm,
    mobileForm,
    emailForm,
    linkedInForm,
    officeLocationForm,
    officeLocationOtherForm,
    companyWebsiteForm,
    companyLinkedInForm
];

let inputObj = {};


const events = ['change','input','keyup','beforeinput'];

// create input object
inputArray.forEach(input => {
    inputObj[input.id] = input.value;
    events.forEach(function(event) {
        input.addEventListener(event, () => {
            checkRequiredOnChange();
            document.getElementById('companyWebsiteSig').innerHTML = betaNXTWebsite;
            document.getElementById('companyLinkedinSig').innerHTML = betaNXTLinkedIn;
            inputObj[input.id] = input.value;
            const clipboardText = Object.keys(inputObj).reduce(function(accumulator, b) {
                switch(b) {
                    case 'firstName':
                        return accumulator + inputObj[b] + ' ';
                    case 'lastName':
                        return accumulator + inputObj[b] + '\n';
                    case 'departments':
                        return (inputObj[b] !== '' && 
                                inputObj[b] !== 'Other' && 
                                inputObj[b] !== "Corporate (no department will be shown)"
                                    ? (accumulator + inputObj[b] + '\n\n')
                                    : accumulator + '\n');
                    case 'departmentsOther':
                        return departmentForm.value === 'Other' 
                            ? (inputObj[b] !== '' 
                                ? (accumulator + inputObj[b] + '\n\n')
                                : accumulator)
                            : accumulator;
                    case 'telephone':
                        const isValidWorkNumber = isValidNumber(itiPhone);
                        const workCountryData = getCountryData(itiPhone);
                        const workFormattedNumber = getFormattedNumber(itiPhone, workCountryData);
                        const workNumber = isValidWorkNumber ? workFormattedNumber  + ' w \n' : '';
                        return (inputObj[b] !== '' ? (accumulator + workNumber) : accumulator);
                    case 'mobile':
                        const isValidMobileNumber = isValidNumber(itiMobilePhone);
                        const mobileCountryData = getCountryData(itiMobilePhone);
                        const mobileFormattedNumber = getFormattedNumber(itiMobilePhone, mobileCountryData);
                        const mobileNumber = isValidMobileNumber ? mobileFormattedNumber  + ' m \n' : '';
                        return (inputObj[b] !== '' ? (accumulator + mobileNumber) : accumulator);
                    case 'linkedIn':
                        return (inputObj[b] !== '' ? (accumulator + inputObj[b].replace(/((http:\/\/)|(https:\/\/))/, '') + '\n') : accumulator) + '\n';
                    case 'officeLocation':
                        const inputObjCleaned = inputObj[b].split('\n').join('');
                        return (inputObj[b] !== '' && inputObjCleaned !== 'Other' && inputObj? (accumulator + inputObj[b] + '\n') : accumulator);
                    case 'officeLocationOther':
                        return officeLocationForm.value.split('\n').join('') === 'Other' 
                            ? (inputObj[b] !== ''
                                ? (accumulator + inputObj[b] + '\n')
                                : accumulator)
                            : accumulator;
                    default:
                        return (inputObj[b] !== '' ? (accumulator + inputObj[b] + '\n') : accumulator);
                }
            }, '');
            btn.dataset.clipboardText = clipboardText;
        });
    });
});

// button
const updateBtnText = function(btn) {
    btn.innerHTML = '';
    btn.appendChild(btnImage);
    btn.appendChild(btnText)
}
const btn = document.getElementById('btn');
const btnImage = document.createElement('img');
btnImage.src = "img/content_copy_gm_white_18dp.png";
const btnText = document.createTextNode(' Copy Signature');
updateBtnText(btn);

//Selectors for live preview
const nameSig = document.getElementById('nameSig');
const functionSig = document.getElementById('functionSig');
const departmentSig = document.getElementById('departmentSig');
const officeLocationSig = document.getElementById('officeLocationSig');
const telephoneSig = document.getElementById('telephoneSig');
const mobileSig = document.getElementById('mobileSig');
const emailSig = document.getElementById('emailSig');
const linkedInSig = document.getElementById('linkedInSig');

//Show input error message
const showError = function (input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form_input error';
    const small = formControl.querySelector('div.error-text');
    small.innerText = message;
};

//Remove input success message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form_input success';
}

let clipboard;

let inputArrayForChecks = [
    firstNameForm,
    lastNameForm,
    departmentForm,
    officeLocationForm,
    functionForm,
    emailForm,
];

//Check required fields on submit
function checkRequiredOnSubmit() {
    let errors = [];

    inputArrayForChecks.forEach(function (input) {
        //trim removes white space
        if (input.value.trim() === '') {
            showError(input, `This field is required`);
            errors.push('error');
        } else if (input.id === 'email') {
            validateEmail(input.value);
        } else {
            showSuccess(input);
        }
    });

    if (errors.length > 0) {
        btn.classList.add('disabled');
    } else {
        btn.classList.remove('disabled');
        clipboard = new ClipboardJS('.btn');
        clipboard.on('success', function(e) {
            console.log(btn.dataset.clipboardText);
            btn.innerHTML = 'Copied';
            setTimeout(function() {
                updateBtnText(btn)
            }, 1500);
            clipboard.destroy();
        });
    }
    errors = [];
};

//Check required on fields on change
function checkRequiredOnChange() {
    let errors = [];
    inputArrayForChecks.forEach(function (input) {
        //trim removes white space
        if (input.value.trim() === '') {
            showError(input, `This field is required`);
            errors.push('error');
        } else if (input.id === 'email') {
            validateEmail(input.value);
            showSuccess(input)
        } else {
            showSuccess(input)
        }
    });
    if (errors.length > 0) {
        btn.classList.add('disabled');
    } else {
        btn.classList.remove('disabled');
    }
    errors = [];
}

btn.addEventListener('click', function() {
    checkRequiredOnSubmit();
})

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
//first name eventListener
events.forEach(function(event) {
    firstNameForm.addEventListener(event, function () {
        fullNameGen();
        checkRequiredOnChange();
        if (firstNameForm.value) {
            showSuccess(firstNameForm);
        }
    });
    lastNameForm.addEventListener(event, function () {
        fullNameGen();
        checkRequiredOnChange();
        if (lastNameForm.value) {
            showSuccess(lastNameForm);
        }
    });
    
    functionForm.addEventListener(event, function () {
        functionSig.innerHTML = functionForm.value !== '' ? functionForm.value + '<br>' : '';
        checkRequiredOnChange();
    });
});



// populate department dropdowns
const departmentsSelect = document.getElementById('departments');
const deptOptions = BetaNXTData.departments;
deptOptions.forEach(function(deptOption) {
    const opt = document.createElement('option');
    opt.value = deptOption;
    opt.innerHTML = deptOption;
    departmentsSelect.appendChild(opt);
});


events.forEach(function(event) {
    // handle department dropdown changes
    departmentForm.addEventListener(event, function () {
        if (departmentForm.value === 'Other') {
            departmentSig.innerHTML = departmentOtherForm.value + '<br><br>';
            inputArrayForChecks.push(departmentOtherForm);
        } else if (departmentForm.value === "Corporate (no department will be shown)") {
            departmentSig.innerHTML = "<br>";
        } else {
            departmentSig.innerHTML = departmentForm.value + '<br><br>';
            inputArrayForChecks.filter(function(input) {
                input.id !== departmentOtherForm.id
            })
        }
        // showSuccess(departmentForm);
    });

    // handle department other changes
    departmentOtherForm.addEventListener(event, function () {
        departmentSig.innerHTML = departmentForm.value === 'Other' ? departmentOtherForm.value + '<br>' : '';
        // showSuccess(departmentForm);
    });
});

// handle department other selection
const deptOtherContainer = document.getElementById('deptOtherContainer');
departmentsSelect.addEventListener('change', function(e) {
    if (e.target.value === 'Other') {
        deptOtherContainer.classList.remove('hidden');
    } else {
        deptOtherContainer.classList.add('hidden');
    }
});

function isValidNumber(phoneInstance) {
    return phoneInstance.isValidNumber();
}

function getFormattedNumber(phoneInstance, countryData) {

    let formattedNumber;
    const regex = /[\-]/g;
    if (countryData.iso2 === 'us') {
        formattedNumber = '+' + countryData.dialCode + ' ' + phoneInstance.getNumber(intlTelInputUtils.numberFormat.NATIONAL);
    } else {
        formattedNumber = phoneInstance.getNumber(intlTelInputUtils.numberFormat.RFC3966).replace(regex, ' ').replace('tel:','');
    }
    // const matched = phoneInstance.getNumber(intlTelInputUtils.numberFormat.RFC3966).match(regex);
    return formattedNumber;
}

// setup mutation observer
const phoneDropdownObserver = new MutationObserver(phoneMutationCallback);
const observerOptions = {
    attributes: true,
    attributeOldValue: true,
}
// add mutation observer to phone dropdown after page load
window.addEventListener('load', function() {
    makeArray(document.querySelectorAll('.iti__selected-flag')).forEach(function(el) {
        phoneDropdownObserver.observe(el, observerOptions);
    });
});

// phone/mobile
function phoneMutationCallback(mutationsList, observer) {
    mutationsList.forEach(function(mutation) {
        if (mutation.attributeName === 'aria-expanded' && mutation.oldValue === 'true') {
            updatePhone();
            updateMobile();
        }
    })
}

function getCountryData(phoneInstance) {
    return phoneInstance.getSelectedCountryData();
}

const validationErrors = {
    "IS_POSSIBLE": 0,
    "INVALID_COUNTRY_CODE": 1,
    "TOO_SHORT": 2,
    "TOO_LONG": 3,
    "IS_POSSIBLE_LOCAL_ONLY": 4,
    "INVALID_LENGTH": 5,
}

function getValidationError(phoneInstance) {
    return phoneInstance.getValidationError();
}

function updatePhone() {
    const countryData = getCountryData(itiPhone);
    if (telephoneForm.value.length === 0) {
        telephoneForm.className = '';
        telephoneSig.innerHTML = '';
    } else if (isValidNumber(itiPhone)) {
        telephoneForm.className = 'valid';
        telephoneSig.innerHTML = getFormattedNumber(itiPhone, countryData) + ' w<br>';
    } else {
        let validationClass;
        switch (getValidationError(itiPhone)) {
            case 0:
            case -99:
            case 2:
            case 4:
                telephoneForm.className = '';
                validationClass = 'too-short';
                telephoneForm.classList.add(validationClass);
                break;
            case 3: 
                telephoneForm.className = '';
                validationClass = 'too-long';
                telephoneForm.classList.add(validationClass);
                break;
            default:
                validationClass = '';
                telephoneForm.className = '';
                break;
        }
        telephoneSig.innerHTML = telephoneForm.value + (telephoneForm.value.length > 0 ? ' w<br>' : '');
    }
}


events.forEach(function(event) {
    telephoneForm.addEventListener(event, function () {
        updatePhone();
    });
})

function updateMobile() {
    const countryData = getCountryData(itiMobilePhone);
    if (mobileForm.value.length === 0) {
        mobileForm.className = '';
        mobileSig.innerHTML = '';
    } else if (isValidNumber(itiMobilePhone)) {
        mobileForm.className = 'valid';
        mobileSig.innerHTML = getFormattedNumber(itiMobilePhone, countryData) + ' m<br>';
    } else {
        let validationClass;
        switch (getValidationError(itiMobilePhone)) {
            case 0:
            case -99:
            case 2:
            case 4:
                mobileForm.className = '';
                validationClass = 'too-short';
                mobileForm.classList.add(validationClass);
                break;
            case 3: 
                mobileForm.className = '';
                validationClass = 'too-long';
                mobileForm.classList.add(validationClass);
                break;
            default:
                validationClass = '';
                mobileForm.className = '';
                break;
        }
        mobileSig.innerHTML = mobileForm.value + (mobileForm.value.length > 0 ? ' m<br>' : '');
    }
}

events.forEach(function(event) {
    mobileForm.addEventListener(event, function () {
        updateMobile();
    });
});

function validateEmail(email) {
    const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const emailValid = regex.test(email) ? true : false;
    if (emailValid) {
        emailForm.classList.add('email-valid');
        emailForm.classList.remove('email-error');
    } else {
        emailForm.classList.add('email-error');
        emailForm.classList.remove('email-valid');
    }
    return emailValid;
}


events.forEach(function(event) {
    emailForm.addEventListener(event, function (e) {
        validateEmail(e.target.value)
        if (emailForm.value.length > 0) {
            emailSig.innerHTML = emailForm.value + '<br>';
        } else {
            emailSig.innerHTML = '';
        }
        checkRequiredOnChange();
    });

    linkedInForm.addEventListener(event, function () {
        linkedInSig.innerHTML = linkedInForm.value !== '' ? linkedInForm.value.replace(/((http:\/\/)|(https:\/\/))/, '') : '';
        // showSuccess(linkedinForm);
    });
});

// populate location dropdowns
const locationsSelect = document.getElementById('officeLocation');
const locationOptions = BetaNXTData.locations;
locationOptions.forEach(function(locationOption) {
    const opt = document.createElement('option');
    opt.value = Object.keys(locationOption) + '\n' + Object.values(locationOption);
    let innerHtml =  Object.keys(locationOption) + (opt.value !== 'Other\n' ? ', ' : '') + Object.values(locationOption);
    opt.innerHTML =  innerHtml.split('\n').join(', ');
    locationsSelect.appendChild(opt);
});

// handle office location dropdown changes
events.forEach(function(event) {
    officeLocationForm.addEventListener(event, function() {
        const cleanValue = officeLocationForm.value.replace('\n','');
        if (cleanValue === 'Other') {
            officeLocationSig.innerHTML = officeLocationOtherForm.value;
            inputArrayForChecks.push(officeLocationOtherForm);
        } else {
            officeLocationSig.innerHTML = officeLocationForm.value.split('\n').join('<br/>');
            inputArrayForChecks = inputArrayForChecks.map(function(input) {
                if (input.id.toString() !== officeLocationOtherForm.id.toString()) {
                    return input;
                }
            }).filter(Boolean);
        }
        checkRequiredOnChange();
    });
});

// handle location other changes
events.forEach(function(event) {
    officeLocationOtherForm.addEventListener(event, function() {
        officeLocationSig.innerHTML = officeLocationOtherForm.value;
        checkRequiredOnChange();
    });
});

// handle location other selection
const locationOtherContainer = document.getElementById('officeLocationOtherContainer');
events.forEach(function(event) {
    locationsSelect.addEventListener(event, function(e) {
        const cleanValue = e.target.value.replace('\n','');
        if (cleanValue === 'Other') {
            locationOtherContainer.classList.remove('hidden');
        } else {
            locationOtherContainer.classList.add('hidden');
        }
        checkRequiredOnChange();
    });
});

// phone options
const phoneOpts = { 
  // any initialisation options go here
  utilsScript: 'lib/phone/js/utils.js',
  formatOnDisplay: false,
  nationalMode: true,
  separateDialCode: true,
  autoHideDialCode: false,
  autoPlaceholder: 'aggressive',
  placeholderNumberType: 'FIXED_LINE',
  preferredCountries: ['us','in','gb'],
}

// phone
let itiPhone = window.intlTelInput(telephoneForm, phoneOpts);

let itiMobilePhone = window.intlTelInput(mobileForm, phoneOpts);
