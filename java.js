const STUDIO_GHIBLI_API = "https://www.imdb.com/name/nm0634240/"


window.onload= function(){
    downloadFilm();
};

async function taiPhim(){
    try{
        document.getElementById("movielist").innerHTML = '<p>WAIT THE FILM IS DOWNLOADING MEGA KNIGHT...</p>';

        const response = await fetch(STUDIO_GHIBLI_API);
        if(!response.ok) throw new Error('Cant load');

        const data = await response.json();

        renderFilms(data);
    }catch(error){
        document.getElementById('movielist').innerHTML = '<p>CANT DOWNLOAD STUPID MEGAKNIGHT</p>';
    }   

    
}



function renderFilms(films){
    const html = films.map(phim =>
    `<div class = "movie-card">
        <img scr="${phim.image}" alt="$(phim.title)">
        <h3>${phim.title}</h3>
        <p><strong>Nam:</strong>${phim.release_date}</p>
        <p><strong>Director:</strong>${phim.director}</p>
        <p><strong>Score:</strong>${phim.score}</p>
        <p><strong>Description:</strong>${phim.Description}</p>
        </div>'
    ).join('');
    document.getElemntById('movieList').innerHTML = html;
    }