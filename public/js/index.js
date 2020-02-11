const FeaturedPost = () => {
    const post = new HTMLDivElement();
}
const fetchPosts = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhttp.responseText)
            for (let i = 0; i < 4; i++) {

            }
        }
    };
    xhttp.open("GET", `https://picsum.photos/v2/list?page=${++pagesLoaded}`, true);
    xhttp.send();
}