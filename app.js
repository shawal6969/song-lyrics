const apiUrl = "https://api.lyrics.ovh/suggest";
const search = document.getElementById("search-btn");
const result = document.getElementById("result");
const text = document.getElementById("text");
//const getLyrics = document.getElementsByClassName("get-lyrics");

//event listener to search song or artist
search.addEventListener("click", e => {
    //e.preventDefault();
    const searchTerm = text.value;
    if (!searchTerm) {
        alert("please type a song a name");
    } else {
        searchSongs(searchTerm);
    }
})

//function search song  
function searchSongs(term) {
    fetch (`${apiUrl}/${term}`)
    .then (response => response.json())
    .then (data => {
        const lyricsName = document.getElementsByClassName("lyrics-name");
        const getLyrics = document.getElementsByClassName("get-lyrics ");
        const artist = document.getElementsByClassName("artist");
        for (let index = 0; index < lyricsName.length; index++) {
            var title = data.data[index].album.title;
            var artistName = data.data[index].artist.name;
            lyricsName[index].innerText = title;
            artist[index].innerText = artistName;

            
            //event to get lyrics => when get lyrics button is clicked then the below code will be executed
            getLyrics[index].addEventListener("click", function(){
                const selectedSong = data.data[index].album.title;
                const byArtist = data.data[index].artist.name;
                fetch(`https://api.lyrics.ovh/v1/${byArtist}/${selectedSong}`)
                .then (res => res.json())
                .then (json => {
                    const resultLyrics = document.getElementById("result-lyrics").innerText = json.lyrics;
                    //console.log(json.lyrics);
                })
                document.getElementById("result").style.display = "none"
                document.getElementById("lyrics").style.display = "block";
                //console.log("Song:"+data.data[index].album.title +" By:"+data.data[index].artist.name);
                const resultTitle = document.getElementById("result-title").innerText = data.data[index].album.title;
            //getLyricsAPI(title, artist);
            });

        }

        document.getElementById("result").style.display = "block";
        //console.log(data);
    });
}



