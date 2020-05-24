'use strict';

const NAME_REGEX = /^(([A-Za-z\s])+)$/;
const EMAIL_REGEX = /([a-z0-9]+[_az0-9\.-]*[a-z0-9]+)@([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,4})/;
const PHONE_NUMBER_REGEX = /^([0-9]{10})$/;

const HTML_FORM = document.querySelector('.form');
HTML_FORM.addEventListener('submit', validateForm);

const NAME_ERROR_CLASS = 'name-error';
const EMAIL_ERROR_CLASS = 'email-error';
const PHONE_ERROR_CLASS = 'phone-error';
const COURSES_ERROR_CLASS = 'fieldset-courses-legend-error';
const FIELD_COURSES_LEGEND = document.querySelector('.field-courses legend');

function validateForm(event) {
    event.preventDefault();
    let form = {
        name: HTML_FORM.querySelector('#name'),
        email: HTML_FORM.querySelector('#email'),
        phone: HTML_FORM.querySelector('#phonen'),
        courses: HTML_FORM.querySelectorAll('input[type="checkbox"]'),
        message: HTML_FORM.querySelector('#texta')
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
        name.classList.add(NAME_ERROR_CLASS);
        alert('Please fill the name field !');
        return false;
    }
    else if (!NAME_REGEX.test(name.value)) {
        name.classList.add(NAME_ERROR_CLASS);
        alert('Please write a valid name, not numbers or special characters !');
        return false;
    }
    name.classList.remove(NAME_ERROR_CLASS);
    return true;
}

function validateEmail(email) {
    if (email.value == '') {
        email.classList.add(EMAIL_ERROR_CLASS);
        alert('Please fill out the email space !');
        return false;
    }
    else if (!EMAIL_REGEX.test(email.value)) {
        email.classList.add(EMAIL_ERROR_CLASS);
        alert('Please write a valid email');
        return false;
    }
    email.classList.remove(EMAIL_ERROR_CLASS);
    return true
}

function validatePhoneNumber(phoneN) {
    if (phoneN.value != '' && !PHONE_NUMBER_REGEX.test(phoneN.value)) {
        phoneN.classList.add(PHONE_ERROR_CLASS);
        alert('Please write a valid phone number, only integer numbers and must be +57 extension (length 10) !');
        return false;
    }
    phoneN.classList.remove(PHONE_ERROR_CLASS);
    return true;
}

function validateCourses(courses) {
    let checked = [];
    for (let cbCourse of courses) {
        if (cbCourse.checked) {
            checked.push(cbCourse.name);
        }
    }
    if (!checked.length) {
        alert('Please select at least one course, you are interested in');
        FIELD_COURSES_LEGEND.classList.add(COURSES_ERROR_CLASS);
        return '';
    } else {
        FIELD_COURSES_LEGEND.classList.remove(COURSES_ERROR_CLASS);
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