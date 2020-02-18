/* global window document XMLHttpRequest select Event alert confirm selectedItemsValues FormData */
const formFields = {
    title: document.querySelector('#title'),
    content: document.querySelector('#content'),
    image: document.querySelector('#image'),
    imageTitle: document.querySelector('#imageTitle'),
    imageAlt: document.querySelector('#imageAlt'),
    tags: document.querySelector('#select'),
    featured: document.querySelector('#featured'),
};
const imagePreviewWrapper = document.querySelector('#image~.file-dummy>.preview-image');

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function loadOptions() {
    if (loadTagsRequest.status === 200) {
        let response = JSON.parse(loadTagsRequest.responseText);
        for (let i = 0; i < response.length; i++) {
            let option = document.createElement('option');
            option.innerText = response[i].name;
            option.value = response[i]._id;
            select.appendChild(option);
        }
    }
}

function loadPostData() {
    if (loadPostRequest.status === 200) {
        let response = JSON.parse(loadPostRequest.responseText);
        formFields.title.value = response.title;

        formFields.content.value = response.content;
        const areaChange = new Event('input');
        formFields.content.dispatchEvent(areaChange);

        formFields.imageTitle.value = response.imageAlt;
        formFields.imageAlt.value = response.imageAlt;

        let imagePreview = document.createElement('img');
        imagePreview.src = response.imageUrl;
        imagePreviewWrapper.appendChild(imagePreview);
        // formFields.image.files.add(new File())

        let options = formFields.tags.options;
        for (let i = 0; i < options.length; i++) {
            for (let j = 0; j < response.categories.length; j++) {
                if (options[i].value === response.categories[j]._id) {
                    options[i].selected = true;
                    break;
                }
            }
        }

        const selectChange = new Event('change');
        formFields.tags.dispatchEvent(selectChange);
    } else if (loadPostRequest.status === 404) {
        alert('Post not found. You will be redirected to homepage');
        window.location.href = '/';
    }
}

function deletePost() {
    if (deletePostRequest.status === 200) {
        alert('post deleted successfully');
        window.location.href = '/';
    }
}

function createPost() {
    console.log('wtf');
}

function updatePost() {
    throw new Error('Not implemented');
}

function createHttpRequest(type, url, onloadFunc) {
    let req = new XMLHttpRequest();
    req.addEventListener('load', onloadFunc);
    req.open(type, url, true);
    // req.setRequestHeader('Content-Type', 'multipart/form-data');
    return req;
}

function createRequestBody() {
    let reqBody = new FormData();
    reqBody.append('imageUrl', formFields.image.files[0]);
    reqBody.append('imageAlt', formFields.imageAlt.value);
    reqBody.append('imageTitle', formFields.imageTitle.value);
    reqBody.append('content', formFields.content.value);
    reqBody.append('title', formFields.title.value);
    reqBody.append('categories', selectedItemsValues.map(option => { return option.value; }));
    reqBody.append('featured', formFields.featured.checked);
    return reqBody;
}
const parsedQuery = parseQuery(window.location.search);
const loadTagsRequest = createHttpRequest('GET', '/api/categories', loadOptions);
loadTagsRequest.send();


const loadPostRequest = createHttpRequest('GET', '/api/posts/' + parsedQuery.id, loadPostData);
const deletePostRequest = createHttpRequest('DELETE', '/api/posts/' + parsedQuery.id, deletePost);

const saveRequest = parsedQuery && parsedQuery.id ?
    createHttpRequest('PUT', '/api/posts/' + parsedQuery.id, updatePost) :
    createHttpRequest('POST', '/api/posts/', createPost);


const submitButton = document.querySelector('#submitButton');
submitButton.onclick = function(event) {
    event.preventDefault();
    let body = createRequestBody();
    console.log(body);
    if (confirm('You really save it?')) {
        saveRequest.send(body);
    }
};

if (parsedQuery && parsedQuery.id) {
    loadPostRequest.send();
    const deleteButton = document.querySelector('#deleteButton');
    deleteButton.disabled = false;
    deleteButton.hidden = false;
    deleteButton.onclick = function() {
        if (confirm('You really wanna delete it?')) {
            deletePostRequest.send();
        }
    };

}