// const API_KEY = "AIzaSyAtzF4gijT870s8F11y20zf8mVqCsBD39g";
const API_KEY = "AIzaSyBupUB_4hmY4Ld8iw4QYrRf0l1OZJ_JAfs";
const BASE_URL = "https://www.googleapis.com/youtube/v3";


// GET VIDEOS

function displayVideos(videos) {
    document.getElementById("videos-container").innerHTML = "";
    videos.map((video, i) => {
        document.getElementById("videos-container").innerHTML += `
        <a href='/video.html?videoId=${video.id.videoId}'>
        <div class="video">
        <img src='${video.snippet.thumbnails.high.url}'/>
        <div>
        <p class="info">${video.snippet.title}</p>
        <p class="info">${video.snippet.channelTitle}</p>
        <p class="info">${video.snippet.publishTime}</p>
        </div>
        </div></a>
        `;
    });
}

function getVideos(query) {
    fetch(`${BASE_URL}/search?key=${API_KEY}&q=${query}&type=video&maxResults=25&part=snippet`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displayVideos(data.items);
        })
}
getVideos("");

document.getElementById("search-btn").addEventListener("click", () => {
    getVideos(document.getElementById("search-input").value);
})

