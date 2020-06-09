'use strict';
const NAME_REGEX = /^(([A-Za-z\s])+)$/;
const EMAIL_REGEX = /([a-z0-9]+[_az0-9\.-]*[a-z0-9]+)@([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,4})/;
const PHONE_NUMBER_REGEX = /^([0-9]{10})$/;

const html_form = document.querySelector('.form');
html_form.addEventListener('submit', validateForm);
const field_courses_legend = html_form.querySelector('#courses-legend');
const parag_error_msg = html_form.querySelector('.parag-error-msg');

const form_data = {
    name: html_form.querySelector('#name'),
    email: html_form.querySelector('#email'),
    phone: html_form.querySelector('#phonen'),
    courses: html_form.querySelectorAll('input[type="checkbox"]'),
    message: html_form.querySelector('#texta')
}

const classes = {
    NAME_ERROR_CLASS: 'name-error',
    EMAIL_ERROR_CLASS: 'email-error',
    PHONE_ERROR_CLASS: 'phone-error',
    COURSES_ERROR_CLASS: 'fieldset-courses-legend-error',
    NAME_P_ERROR: html_form.querySelector('#name-p-error'),
    NAME_ERROR_MSG: 'name-error-msg',
    EMAIL_P_ERROR: html_form.querySelector('#email-p-error'),
    EMAIL_ERROR_MSG: 'email-error-msg',
    PHONE_P_ERROR: html_form.querySelector('#phone-p-error'),
    PHONE_ERROR_MSG: 'phone-error-msg',
    INFO_PARAGRAPH: html_form.querySelectorAll('.information-p')
};

function validateForm(event) {
    event.preventDefault();
    let name = validateName(form_data.name);
    let email = validateEmail(form_data.email);
    let phone = validatePhoneNumber(form_data.phone);
    let courses = validateCourses(form_data.courses);
    if (name && email && phone && Array.isArray(courses)) {
        let dataToSend = {
            'name': form_data.name.value,
            'email': form_data.email.value,
            'phone': form_data.phone.value,
            'courses': courses,
            'message': form_data.message.value
        };
        sendDataToBackEnd(dataToSend);
        html_form.reset();
    }
    else {
        classes.INFO_PARAGRAPH.forEach(pa => pa.classList.add('information-p'));
    }
}

function validateName(name) {
    if (name.value == '') {
        showErrorUI(name, classes.NAME_ERROR_CLASS, classes.NAME_P_ERROR, classes.NAME_ERROR_MSG, 'Please fill the name field !');
        return false;
    }
    else if (!NAME_REGEX.test(name.value)) {
        showErrorUI(name, classes.NAME_ERROR_CLASS, classes.NAME_P_ERROR, classes.NAME_ERROR_MSG, 'Please write a valid name, not numbers or special characters !');
        return false;
    }
    removeErrorUI(name, classes.NAME_ERROR_CLASS, classes.NAME_P_ERROR, classes.NAME_ERROR_MSG);
    return true;
}

function validateEmail(email) {
    if (email.value == '') {
        showErrorUI(email, classes.EMAIL_ERROR_CLASS, classes.EMAIL_P_ERROR, classes.EMAIL_ERROR_MSG, 'Please fill the email field !');
        return false;
    }
    else if (!EMAIL_REGEX.test(email.value)) {
        showErrorUI(email, classes.EMAIL_ERROR_CLASS, classes.EMAIL_P_ERROR, classes.EMAIL_ERROR_MSG, 'Please write a valid email');
        return false;
    }
    removeErrorUI(email, classes.EMAIL_ERROR_CLASS, classes.EMAIL_P_ERROR, classes.EMAIL_ERROR_MSG);
    return true
}

function validatePhoneNumber(phoneN) {
    if (phoneN.value != '' && !PHONE_NUMBER_REGEX.test(phoneN.value)) {
        showErrorUI(phoneN, classes.PHONE_ERROR_CLASS, classes.PHONE_P_ERROR, classes.PHONE_ERROR_MSG, 'Please write a valid phone number, only integer numbers and must be +57 extension (length 10) !');
        return false;
    }
    removeErrorUI(phoneN, classes.PHONE_ERROR_CLASS, classes.PHONE_P_ERROR, classes.PHONE_ERROR_MSG);
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
        field_courses_legend.classList.add(classes.COURSES_ERROR_CLASS);
        return '';
    } else {
        field_courses_legend.classList.remove(classes.COURSES_ERROR_CLASS);
        return checked;
    }
}

function showFinalInfoIfAllIsCorrect() {
    classes.INFO_PARAGRAPH[0].textContent = form_data.name.value;
    classes.INFO_PARAGRAPH[1].textContent = form_data.email.value;
    classes.INFO_PARAGRAPH[2].textContent = form_data.phone.value;
    classes.INFO_PARAGRAPH[3].textContent = validateCourses(form_data.courses);
    classes.INFO_PARAGRAPH[4].textContent = form_data.message.value;
}

function showErrorUI(fieldComponentName, errorClass, paragraphComponent, paragErrorClass,  paragraphErrorMsg) {
    fieldComponentName.classList.add(errorClass);
    paragraphComponent.classList.remove(paragErrorClass);
    paragraphComponent.textContent = paragraphErrorMsg;
}

function removeErrorUI(fieldComponentName, errorClass, paragraphComponent, paragErrorClass) {
    fieldComponentName.classList.remove(errorClass);
    paragraphComponent.classList.add(paragErrorClass);
}

function sendDataToBackEnd(data) {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch('/submit-form', options)
        .then(response => response.json())
        .then(data => console.log(data));
}