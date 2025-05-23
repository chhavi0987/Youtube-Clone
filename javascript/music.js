const videoCardContainer= document.querySelector(".video-wrapper")

let api_key= api key
let video_http=  "https://www.googleapis.com/youtube/v3/videos?"
let channel_http= "https://www.googleapis.com/youtube/v3/channels?"

fetch(
    video_http + new URLSearchParams({
        part: "snippet,contentDetails,statistics,player",
        chart:"mostPopular",
        maxResults:21,
        regionCode:"IN",
        videoCategoryId:10,
        key: api_key,
    })
)

.then((res)=> res.json())
.then((data)=>{
    data.items.forEach((item)=>{
        getChannelIcon(item);
    })
        
    })

.catch((err)=>console.log(err))

const getChannelIcon = (video_data)=>{
    fetch (
        channel_http+ new URLSearchParams({
            key:api_key,
            part:"snippet",
            id:video_data.snippet.channelId
        })
    )
    .then((res)=> res.json())
    .then((data)=>{
        video_data.channelThumbnail=data.items[0].snippet.thumbnails.medium.url
        makeVideoCard(video_data)
    })

}

const playVideo = (embedHtml)=>{
    sessionStorage.setItem("videoEmbedHtml",embedHtml)

    window.location.href="video-page.html"
}


const makeVideoCard = (data)=>{
    const videoCard= document.createElement("div")
    videoCard.classList.add("video")
    videoCard.innerHTML=
    `<div class="video-content">
    <img src="${data.snippet.thumbnails.high.url}" alt="thumbnail" class="thumbnail">

    </div>
    <div class="video-details">
        <div class="channel-logo">
            <img src="${data.channelThumbnail}" alt="channel icon" class="channel-icon">
        </div>
        <div class="detail">
            <h3 class="title">${data.snippet.title}</h3>
            <div class="channel-name">${data.snippet.channelTitle}</div>
            <div class="stats">
                <span class="likes"> ${data.statistics.viewCount} views</span><br>

            </div>
        </div>
    </div>
    `

    videoCard.addEventListener("click",()=>{
        playVideo(data.player.embedHtml)

    })
    videoCardContainer.appendChild(videoCard)
}

var n=document.querySelectorAll(".tag").length
for (let index = 0; index < n ; index++) {
    if (index==0) {
        document.querySelectorAll(".tag")[0].addEventListener("click",()=>{
            window.location.href = 'index.html';
        }) 
    }
    if (index==1) {
        document.querySelectorAll(".tag")[1].addEventListener("click",()=>{
            window.location.href = 'music.html';
        })
    }
    if(index==3){
        document.querySelectorAll(".tag")[3].addEventListener("click",()=>{
            window.location.href = 'gaming.html';
        })
    }
    if(index==5){
        document.querySelectorAll(".tag")[5].addEventListener("click",()=>{
            window.location.href='web development.html';

        })
    }
    if(index==2){
        document.querySelectorAll(".tag")[2].addEventListener("click",()=>{
            window.location.href='mixes.html';
    })}
    if(index==4){
        document.querySelectorAll(".tag")[4].addEventListener("click",()=>{
            window.location.href='shopping.html'
        })
    }
}
