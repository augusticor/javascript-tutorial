'use strict'

const author_img = document.querySelector('.author-img');
const author_name = document.querySelector('.author-name');

commitsInFrontEndRoadMap().then(
    data => {
        let commitInfo = data[0];
        author_img.src = commitInfo.author.avatar_url;
        author_img.alt = commitInfo.commit.author.name;
        author_name.textContent = commitInfo.author.login;
    }
);

function commitsInFrontEndRoadMap() {
    return fetch('https://api.github.com/repos/push-dev/frontend-roadmap/commits')
    .then(response => response.json())
}