"use strict";

const NAME_V = /^(([A-Za-z\s])+)$/;
const EMAIL_V = /([a-z0-9]+[_az0-9\.-]*[a-z0-9]+)@([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,4})/;
const PHONE_V = /[0-9]{2,}/;

const HTML_FORM = document.querySelector('#form');
HTML_FORM.addEventListener('submit', validateForm);

function validateForm(event) {
    event.preventDefault();
    let form = {
        name: document.querySelector('#name'),
        email: document.querySelector('#email'),
        phone: document.querySelector('#phonen'),
        courses: document.querySelectorAll('input[type="checkbox"]'),
        message: document.querySelector('#texta')
    };
    deleteAllInformationParagraphs();
    let name = validateName(form.name);
    let email = validateEmail(form.email);
    let phone = validatePhoneNumber(form.phone);
    let courses = Array.isArray(validateCourses(form.courses));
    if (name && email && phone && courses) {
        printInHTML(form.name.value);
        printInHTML(form.email.value);
        printInHTML(form.phone.value);
        printInHTML(validateCourses(form.courses));
        printInHTML(form.message.value);
    }
}

function validateName(name) {
    if (name.value == '') {
        name.classList.add('name-error');
        printInHTML('Please fill the name field !');
    }
    else if (!NAME_V.test(name.value)) {
        name.classList.add('name-error');
        printInHTML('Please write a valid name, not numbers or special characters !');
    }
    name.classList.remove('name-error');
    return true;
}

function validateEmail(email) {
    if (email.value == '') {
        email.classList.add('email-error');
        printInHTML('Please fill out the email space !');
    }
    else if (!EMAIL_V.test(email.value)) {
        email.classList.add('email-error');
        printInHTML('Please write a valid email');
    }
    email.classList.remove('email-error');
    return true
}

function validatePhoneNumber(phone) {
    if (!PHONE_V.test(phone.value)) {
        printInHTML('Please write at least 2 numbers !');
    }
    return true;
}

function validateCourses(courses) {
    let checked = [];
    for (let cbCourse of courses) {
        if (cbCourse.checked) {
            checked.push(cbCourse.name);
        }
    }
    if (checked === undefined || checked.length == 0) {
        printInHTML('Please select at least one course, you are interested in');
        return '';
    } else {
        return checked;
    }
}

function printInHTML(text) {
    let p = document.createElement('p');
    p.textContent = text;
    p.classList.add('information-p');
    HTML_FORM.appendChild(p);
}

function deleteAllInformationParagraphs() {
    document.querySelectorAll('.information-p').forEach(pa => pa.remove());
}