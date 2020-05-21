"use strict";

const NAME_V = /^(([A-Za-z\s])+)$/;
const EMAIL_V = /([a-z0-9]+[_az0-9\.-]*[a-z0-9]+)@([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,4})/;
const PHONE_V = /[0-9]{2,}/;

var htmlForm = document.querySelector('#form');
htmlForm.addEventListener('submit', validateForm);
var finalMessages = document.querySelector('#final-information');

function validateForm(event) {
    event.preventDefault();
    let form = {
        name: document.querySelector('#name'),
        email: document.querySelector('#email'),
        phone: document.querySelector('#phonen'),
        courses: document.querySelectorAll('input[type="checkbox"]'),
        message: document.querySelector('#texta')
    };
    printInHTML(form.name, form.email, form.phone, form.courses, form.message);
}

function validateName(nameToValidate) {
    if (nameToValidate.value == '') {
        nameToValidate.classList.add('name-error');
        return 'Please fill the name field !';
    }
    else if (!NAME_V.test(nameToValidate.value)) {
        nameToValidate.classList.add('name-error');
        return 'Please write a valid name, not numbers or special characters !';
    }
    nameToValidate.classList.remove('name-error');
    return nameToValidate.value;
}

function validateEmail(emailToValidate) {
    if(emailToValidate.value == '') {
        emailToValidate.classList.add('email-error');
        return 'Please fill out the email space !';
    }
    else if (!EMAIL_V.test(emailToValidate.value)) {
        emailToValidate.classList.add('email-error');
        return 'Please write a valid email';
    }
    emailToValidate.classList.remove('email-error');
    return emailToValidate.value;
}

function validatePhoneNumber(phoneToValidate) {
    return PHONE_V.test(phoneToValidate) ? phoneToValidate : 'Please write at least 2 numbers !';
}

function validateCourses(courses) {
    let checked = [];
    for (let cbCourse of courses) {
        if (cbCourse.checked) {
            checked.push(cbCourse.name);
        }
    }
    return (checked === undefined || checked.length == 0) ? 'Please select at least one course, you are interested in !' : checked;
}

function printInHTML(nameToValidate, emailToValidate, phoneToValidate, courses, message) {
    finalMessages.innerHTML = 'VALIDATION RESULT : <br><br>';
    finalMessages.innerHTML += validateName(nameToValidate) + '<br>';
    finalMessages.innerHTML += validateEmail(emailToValidate) + '<br>';
    finalMessages.innerHTML += validatePhoneNumber(phoneToValidate) + '<br>';
    finalMessages.innerHTML += validateCourses(courses) + '<br>';
    finalMessages.innerHTML += message.value;
}