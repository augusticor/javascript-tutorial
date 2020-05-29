'use strict'

const article = document.querySelector('.main-article');
const author_img= article.appendChild(document.createElement('img'));
const author_name = article.appendChild(document.createElement('h3'));

commitsInFrontEndRoadMap().then(
    data => {
        let commitInfo = data[0];
        AUTHOR_IMG.src = commitInfo.author.avatar_url;
        AUTHOR_IMG.alt = commitInfo.commit.author.name;
        AUTHOR_IMG.classList.add('author-img');
        AUTHOR_NAME.textContent = commitInfo.author.login;
    }
);

function commitsInFrontEndRoadMap() {
    return fetch('https://api.github.com/repos/push-dev/frontend-roadmap/commits')
    .then(response => response.json())
}
