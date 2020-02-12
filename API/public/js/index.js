/* global document,XMLHttpRequest humanized_time_span */
function createPostImage(postData) {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.setAttribute('src', postData.imageUrl);
    image.setAttribute('title', postData.imageTitle);
    image.setAttribute('alt', postData.imageAlt);
    figure.appendChild(image);
    return figure;
}

function createLink(where) {
    const link = document.createElement('a');
    link.setAttribute('href', where);
    return link;
}

function createPostTags(postData) {
    const tags = document.createElement('div');
    tags.setAttribute('class', 'tags');

    postData.categories.forEach(function(cat) {
        const tag = document.createElement('a');
        tag.innerText = cat.name;
        tag.setAttribute('href', 'javascript:void(0)');
        tags.appendChild(tag);
    });
    return tags;
}

function createPostDetails() {
    const article = document.createElement('article');
    article.setAttribute('class', 'details');
    return article;
}

function createPostHeading(postData) {
    const heading = document.createElement('h3');
    heading.setAttribute('title', postData.title);
    heading.innerText = postData.title;
    return heading;
}

function createPostContent(postData) {
    const paragraph = document.createElement('p');
    paragraph.innerText = postData.content;
    return paragraph;
}

function createPost(postData, type) {
    let post = document.createElement('div');
    let isNew = new Date(postData.created).getTime() > (new Date().getTime() - 1000 * 60 * 60) ? 'new' : '';
    post.setAttribute('class', 'post ' + isNew);

    const image = createPostImage(postData);

    const imgLink = createLink('javascript:void(0)');
    imgLink.appendChild(image);
    post.appendChild(type === 'featured' ? image : imgLink);

    const details = createPostDetails();
    post.appendChild(details);

    if (type !== 'latest') {
        details.appendChild(createPostTags(postData));
    }
    const heading = createPostHeading(postData);

    const headingLink = imgLink.cloneNode(false);
    headingLink.appendChild(heading);
    details.appendChild(headingLink);

    if (type === 'basic') {
        details.appendChild(createPostContent(postData));
    } else {
        let time = document.createElement('span');
        time.innerText = humanized_time_span(postData.created);
        details.appendChild(time);
    }
    return post;
}

function fetchPosts() {
    const postContainer = document.querySelector('.posts');
    const latestPostContainer = document.querySelector('.latest.posts');
    const featuredPostContainer = document.querySelector('.featured-post-container');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            response.forEach(function(post, index) {
                if (index < 4) {
                    featuredPostContainer.appendChild(createPost(post, 'featured'));
                }
                postContainer.appendChild(createPost(post, 'basic'));
                latestPostContainer.appendChild(createPost(post, 'latest'));
            });
        }
    };
    xhttp.open('GET', '/api/posts', true);
    xhttp.send();
}
document.onload = fetchPosts();