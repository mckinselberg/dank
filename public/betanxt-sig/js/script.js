'use strict';
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
    linkedInForm,
    officeLocationForm,
    officeLocationOtherForm,
    companyWebsiteForm,
    companyLinkedInForm
];

let inputObj = {};

// create input object
inputArray.forEach(input => {
    inputObj[input.id] = input.value;
    input.addEventListener('change', () => {
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
                    return (inputObj[b] !== '' && inputObj[b] !== 'Other' ? (accumulator + inputObj[b] + '\n') : accumulator);
                case 'departmentsOther':
                    return departmentForm.value === 'Other' ? (inputObj[b] !== '' ? (accumulator + inputObj[b] + '\n') : accumulator) : accumulator;
                case 'telephone':
                    return (inputObj[b] !== '' ? (accumulator + 'O: ' + inputObj[b] + '\n') : accumulator);
                case 'mobile':
                    return (inputObj[b] !== '' ? (accumulator + 'M: ' + inputObj[b] + '\n') : accumulator);
                case 'linkedIn':
                    return (inputObj[b] !== '' ? (accumulator + inputObj[b] + '\n') : accumulator) + '\n';
                case 'officeLocation':
                    const inputObjBCleaned = inputObj[b].replace('<b>','').replace('</b>','').split('\n').join('');
                    return (inputObj[b] !== '' && inputObjBCleaned !== 'Other' ? (accumulator + inputObj[b].replace('<b>','').replace('</b>','') + '\n') : accumulator);
                case 'officeLocationOther':
                    return officeLocationForm.value.replace('<b>', '').replace('</b>','').split('\n').join('') === 'Other' ? (inputObj[b] !== '' ? (accumulator + inputObj[b] + '\n') : accumulator) : accumulator;
                default:
                    return (inputObj[b] !== '' ? (accumulator + inputObj[b] + '\n') : accumulator);
            }
        }, '');
        btn.dataset.clipboardText = clipboardText;
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


const inputArrayForChecks = [
    firstNameForm,
    lastNameForm,
    departmentForm,
    officeLocationForm
];
//Check required fields
const checkRequiredOnSubmit = function () {
    let errors = [];

    inputArrayForChecks.forEach(function (input) {
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
    } else {
        btn.classList.remove('disabled');
        clipboard = new ClipboardJS('.btn');
        clipboard.on('success', function(e) {
            console.log(btn.dataset.clipboardText)
            btn.innerHTML = 'Copied';
            setTimeout(function() {
                updateBtnText(btn)
            }, 1500);
            clipboard.destroy();
        });
    }
};

const checkRequiredOnChange = function () {
    let errors = [];
    inputArrayForChecks.forEach(function (input) {
        
        //trim removes white space
        if (input.value.trim() === '') {
            errors.push('error');
        }

        if (errors.length > 0) {
            btn.classList.add('disabled');
        } else {
            btn.classList.remove('disabled');
        }
    });
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
firstNameForm.addEventListener('keyup', function () {
    fullNameGen();
});

lastNameForm.addEventListener('keyup', function () {
    fullNameGen();
});

functionForm.addEventListener('keyup', function () {
    functionSig.innerHTML = functionForm.value !== '' ? functionForm.value + '<br>' : '';
    showSuccess(functionForm);
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

// handle department dropdown changes
departmentForm.addEventListener('change', function () {
    if (departmentForm.value === 'Other') {
        departmentSig.innerHTML = departmentOtherForm.value + '<br>';
        inputArrayForChecks.push(departmentOtherForm);
    } else {
        departmentSig.innerHTML = departmentForm.value + '<br>';
        inputArrayForChecks.filter(function(input) {
            input.id !== departmentOtherForm.id
        })
    }
    showSuccess(departmentForm);
});

// handle department other changes
departmentOtherForm.addEventListener('keyup', function () {
    departmentSig.innerHTML = departmentForm.value === 'Other' ? departmentOtherForm.value + '<br>' : '';
    showSuccess(departmentForm);
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

telephoneForm.addEventListener('keyup', function () {
    if (telephoneForm.value.length > 0) {
        telephoneSig.innerHTML = 'O: ' + telephoneForm.value + '<br>';
    } else {
        telephoneSig.innerHTML = '';
    }
    // showSuccess(telephoneForm);
});

mobileForm.addEventListener('keyup', function () {
    if (mobileForm.value.length > 0) {
        mobileSig.innerHTML = 'M: ' + mobileForm.value + '<br>';
    } else {
        mobileSig.innerHTML = '';
    }
    // showSuccess(mobileForm);
});

linkedInForm.addEventListener('keyup', function () {
    linkedInSig.innerHTML = linkedInForm.value !== '' ? linkedInForm.value : '';
    // showSuccess(linkedinForm);
});

// populate location dropdowns
const locationsSelect = document.getElementById('officeLocation');
const locationOptions = BetaNXTData.locations;
locationOptions.forEach(function(locationOption) {
    const opt = document.createElement('option');
    opt.value = '<b>' + Object.keys(locationOption) + '</b>' + '\n' + Object.values(locationOption);
    let innerHtml =  Object.keys(locationOption) + (opt.value !== '<b>Other</b>\n' ? ', ' : '') + Object.values(locationOption);
    opt.innerHTML =  innerHtml.split('\n').join(', ');
    locationsSelect.appendChild(opt);
});

// handle office location dropdown changes
officeLocationForm.addEventListener('change', function() {
    const cleanValue = officeLocationForm.value.replace('<b>','').replace('</b>','').replace('\n','');
    if (cleanValue === 'Other') {
        officeLocationSig.innerHTML = officeLocationOtherForm.value;
        inputArrayForChecks.push(officeLocationOtherForm);
    } else {
        officeLocationSig.innerHTML = officeLocationForm.value.split('\n').join('<br/>');
        inputArrayForChecks.filter(function(input) {
            input.id !== officeLocationOtherForm.id;
        });
        checkRequiredOnChange();
    }
    showSuccess(officeLocationForm);
});

// handle location other changes
officeLocationOtherForm.addEventListener('keyup', function() {
    const cleanValue = officeLocationForm.value.replace('<b>','').replace('</b>','').replace('\n','');
    if (cleanValue === 'Other') {
        officeLocationSig.innerHTML = officeLocationOtherForm.value;
    } else {
        officeLocationSig.innerHTML = '';
    }
    showSuccess(officeLocationForm);
});

// handle location other selection
const locationOtherContainer = document.getElementById('officeLocationOtherContainer');
locationsSelect.addEventListener('change', function(e) {
    const cleanValue = e.target.value
        .replace('<b>','')
        .replace('</b>','')
        .replace('\n','');
    if (cleanValue === 'Other') {
        locationOtherContainer.classList.remove('hidden');
    } else {
        locationOtherContainer.classList.add('hidden');
    }
});




// phone
// window.intlTelInput(telephoneForm, {
//   // any initialisation options go here
// });
// window.intlTelInput(mobileForm, {
//     // any initialisation options go here
// });

