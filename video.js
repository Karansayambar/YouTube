
const API_KEY = "AIzaSyBupUB_4hmY4Ld8iw4QYrRf0l1OZJ_JAfs";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

window.addEventListener("load", () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const videoId = params.get('videoId');

    if (YT) {
        new YT.Player('video-container', {
            height: "500",
            width: "1000",
            videoId: videoId,
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        // Player is ready, fetch video details
        getVideoDetails();
    }

    function getVideoDetails() {
        fetch(`${BASE_URL}/videos?key=${API_KEY}&part=snippet&id=${videoId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Video Details:", data);
                const channelId = data.items[0].snippet.channelId;
                console.log("Channel ID:", channelId);
                // Display video details
                displayVideoDetails(data.items[0].snippet);
                // Call other functions or perform actions with the channel ID as needed
                getRecommendedVideos(channelId);
            })
            .catch((error) => {
                console.error("Error fetching video details:", error);
            });
    }

    function displayVideoDetails(videoSnippet) {
        const videoDetailsContainer = document.getElementById("video-details");
        // Create HTML content for video details
        const videoDetailsHTML = `
        <p class="channelDetails"> <img class="logo"src='${videoSnippet.thumbnails.standard.url}' alt='Video Thumbnail' /> ${videoSnippet.channelTitle}</p>
            <h2>${videoSnippet.title}</h2>
            <p>${videoSnippet.description}</p>
            <p>Published at: ${videoSnippet.publishedAt}</p>
        `;
        // Set the HTML content for the video details container
        videoDetailsContainer.innerHTML = videoDetailsHTML;
    }

    function recommendedVideos(videos) {
        const recommendedContainer = document.getElementById("recommended");

        // Clear the content in case there were previous recommendations
        recommendedContainer.innerHTML = "";

        videos.forEach((video) => {
            // Create a new div element to hold each recommended video
            const videoDiv = document.createElement("div");
            videoDiv.className='videoDiv';
            // Set the HTML content for the video div
            videoDiv.innerHTML = `
                <img src='${video.snippet.thumbnails.high.url}'/>
                <p>${video.snippet.title}</p>
            `;

            // Append the video div to the recommended container
            recommendedContainer.appendChild(videoDiv);
        });
    }

    function getRecommendedVideos(channelId) {
        // Replace 'your_tags' with the actual tags you want to use for searching
        fetch(`${BASE_URL}/search?key=${API_KEY}&part=snippet&q=your_tags&type=video&maxResults=10`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Recommended Videos:", data);
                recommendedVideos(data.items);
            })
            .catch((error) => {
                console.error("Error fetching recommended videos:", error);
            });
    }

    // Call onPlayerReady when the YouTube API is ready
    function onYouTubeIframeAPIReady() {
        onPlayerReady();
    }
});
