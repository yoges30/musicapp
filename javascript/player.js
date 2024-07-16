const music = new Audio('audio/1.mp3');
let lp = 1;
let index = 1;
let last = document.getElementsByClassName('last')[0];

last.addEventListener('click', () => {
    let res = document.getElementById(`_${lp}`);
    res.classList.add('lastplay');
})

let play = document.getElementById('play');
// let songItem = Array.from(document.getElementsByClassName('song_item'));

// let songs = [
//     {
//         songname: `Rabb Manneya
//         <div class="subtitle">
//             Lakhwinder Wadali <br>
//             Neeti Mohan
//         </div>`,
//         cover:'images/1.jpg',
//     },
//     {
//         songname:`Akhiyan Udeek Diyan
//         <div class="subtitle">
//             Nusrat Fateh Ali Khan
//         </div>`,
//         cover:'images/2.jpg',
//     },
//     {
//         songname:`genda Phool
//         <div class="subtitle">
//         Badshah <br> Payal Dev
//         </div>`,
//         cover:'images/3.jpg',
//     },
//     {
//         songname:`Jug Jug Jeeve
//         <div class="subtitle">
//             Sachet-Parampara Tandon <br>
//             Sachin-Jigar
//         </div>`,
//         cover:'images/4.jpg',
//     },
//     {
//         songname:`Ranjhaa
//         <div class="subtitle">
//             Jasleen Royal <br>
//             B Praak 
//         </div>`,
//         cover:'images/5.jpeg',
//     },
//     {
//         songname:`Tera Ban Jaunga
//         <div class="subtitle">
//             Akhil Sachdeva <br>
//             Tulsi Kumar
//         </div>`,
//         cover:'images/6.jpg',
//     },
//     {
//         songname:`Raatan Lambiyann
//         <div class="subtitle">
//             Tanishk Bagchi <br> 
//             Jubin Nautiyal
//         </div>`,
//         cover:'images/7.jpg',
//     },
//     {
//         songname:`Tujhe Kitna Chahne Lage
//         <div class="subtitle">
//             Arijit Singh
//         </div>`,
//         cover:'images/8.jpg',
//     }
    
// ]
// songItem.forEach((element, i) => {
//     element.getElementsByTagName('img')[0].src = songs[i].cover;
//     element.getElementsByTagName('h5')[0].innerhtml = songs[i].songname;
// });

let wave = document.getElementsByClassName('wave')[0];

play.addEventListener('click', () => {
    let res = document.getElementById(`_${lp}`);
    res.classList.remove('lastplay');
    
    if (music.paused || music.currentTime <= 0) {
        music.play();
        play.classList.remove('bi-play-fill');
        play.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    }
    else {
        music.pause();
        play.classList.remove('bi-pause-fill');
        play.classList.add('bi-play-fill');
        wave.classList.remove('active2');

    }
});

const makeplay = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.remove('bi-pause-circle-fill');
        element.classList.add('bi-play-circle-fill');
    })
};


Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        console.log(index);
        makeplay();
        e.target.classList.remove('bi-play-circle-fill');
        music.src = `audio/${index}.mp3`;
        music.play();
        e.target.classList.add('bi-pause-circle-fill');
        play.classList.remove('bi-play-fill');
        play.classList.add('bi-pause-fill');
        wave.classList.add('active2');

        let res = document.getElementById(`_${lp}`);
        res.classList.remove('lastplay');
        lp = index;


        music.addEventListener('ended', () => {

            wave.classList.remove('active2');
            play.classList.add('bi-play-fill');

    
        })
    })
});

let start = document.getElementById('start');
let end = document.getElementById('end');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];


music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur / 60);
    let sec = Math.floor(music_dur % 60);

    if (sec < 10) {
        sec = `0${sec}`;
    }

    end.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    start.innerText = `${min1}:${sec1}`;

    let progress = parseInt((music.currentTime / music.duration) * 100);
    seek.value = progress;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

music.addEventListener('ended', () => {
    wave.classList.remove('active2');
    play.classList.add('bi-play-fill');

})

btn = document.getElementsByTagName('button')[0];

btn.addEventListener('click', () => {
    music.src = `audio/${lp}.mp3`;
    music.play();
    wave.classList.add('active2');
    play.classList.remove('bi-play-fill');
    play.classList.add('bi-pause-fill');
})
let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('song_item')).length;
    }
    makeplay();
    console.log(index);
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');


    music.src = `audio/${index}.mp3`;
    music.play();
    
    play.classList.remove('bi-play-fill');
    play.classList.add('bi-pause-fill');
    wave.classList.add('active2');


})
next.addEventListener('click', () => {

    index++;
    console.log(index);

    if (index > Array.from(document.getElementsByClassName('song_item')).length) {
        index = 1;
    }

    makeplay();
    console.log(index);
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    music.src = `audio/${index}.mp3`;
    music.play();
    
    play.classList.remove('bi-play-fill');
    play.classList.add('bi-pause-fill');
    wave.classList.add('active2');


})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {

    if (vol.value == 0) {
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
})
 
let left = document.getElementById('left');
let right = document.getElementById('right');

let lefta = document.getElementById('lefta');
let righta = document.getElementById('righta');

let pop_song = document.getElementsByClassName('pop_songs')[0];
let item= document.getElementsByClassName('item')[0];

left.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
});
right.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
});
lefta.addEventListener('click', () => {
    item.scrollLeft -= 330;
});
righta.addEventListener('click', () => {
    item.scrollLeft += 330;
});