'use strict';

const NAME_V = /^(([A-Za-z\s])+)$/;
const EMAIL_V = /([a-z0-9]+[_az0-9\.-]*[a-z0-9]+)@([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,4})/;

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
    let courses = Array.isArray(validateCourses(form.courses));
    if (name && email && courses) {
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
        alert('Please fill the name field !');
        return false;
    }
    else if (!NAME_V.test(name.value)) {
        name.classList.add('name-error');
        alert('Please write a valid name, not numbers or special characters !');
        return false;
    }
    else {
        form.name.classList.remove('name-error');
        return true;
    }
}

function validateEmail(email) {
    if (email.value == '') {
        email.classList.add('email-error');
        alert('Please fill out the email space !');
        return false;
    }
    else if (!EMAIL_V.test(email.value)) {
        email.classList.add('email-error');
        alert('Please write a valid email');
        return false;
    }
    else {
        form.email.classList.remove('email-error');
        return true
    }
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
        document.querySelector('.field-courses legend').classList.add('fieldset-courses-legend-error');
        return '';
    } else {
        document.querySelector('.field-courses legend').classList.remove('fieldset-courses-legend-error');
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