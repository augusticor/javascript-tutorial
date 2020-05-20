let userAge = parseInt(prompt("Write your age in the space below"));
let adult = areYouAnAdult(userAge);
alert(adult);

function areYouAnAdult(age) {
    return age > 18 ? 'Welcome, You\'re an adult' : 'GO BACK ! You\'re not an adult';
}
