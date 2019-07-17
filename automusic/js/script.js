const decision_btn = document.getElementById("decision-btn");

decision_btn.addEventListener("click", async function () {
    const modal_window = document.getElementById("modal");

    // 授業回数の取得
    const class_time = document.querySelector('.class-number select').value;
    console.log(class_time);

    // 座席番号の取得
    const seat_number = document.querySelector('.seat-number select').value;
    console.log(seat_number);
    
    
    // await music いんふぉ
 const music_info_ref =  db.collection(`work0`).doc(`seat0`);
 const created_music_info =  await music_info_ref.onSnapshot( function (snapshot) {
        return new Promise((resolve, reject) =>{
            
        if (snapshot.exists) {
            console.log(snapshot.data());
             resolve(snapshot.data());
        } else {
            //値がない時のエラー
            console.log(`データがありません: ${snapshot.data()}`);
            reject;
        }
        });
    }, function (error) {
        //権限がないときか無効のQueryの時のエラー
        console.error(`Error getting document:${error}`);

    });
    console.log(created_music_info);
    Object.values(created_music_info)[0].forEach(async function (card_info) {  
    
        // await url
        const mp3_url = await downloadMP3(class_time, seat_number);
    
        // create dom
        insertCreatedMusicList(created_music_info.data(), mp3_url);
    
    });
        
    // insert dom

    // モーダルを消す
    const parent = modal_window.parentNode;
    parent.removeChild(modal_window);


    const music_info = getCreatedMusicInfo(class_time, seat_number);
});

/**
 *作った音楽のリストのDOMを生成してHTMLに入れる
 *@param{object}music_info:作成した音楽のデータが入ったオブジェクト
 */
async function insertCreatedMusicList(music_info, mp3_url) {
    //作った音楽の情報。(HTML)
    let card_elements = ``; 
    console.log(Object.values(music_info)[0]);
    
    Object.values(music_info)[0].forEach(function (card_info) {    
        
        const song_name = card_info.song_name;
        console.log(`保存時につけたタイトル${song_name}`)
        const song_tone = card_info.song_tone;
        console.log(`調${song_tone}`);
        const used_song = card_info.used_song;
        console.log("作曲に使った曲　" + used_song);

        card_elements +=
            
            `<li class="card ${song_tone}">
                <h1>${song_name}</h1>
                <div class="music-player">
                    <audio controls src="${mp3_url}" controlslist="nodownload">
                    </audio>
                </div>
                <div class="music-elements">

                    <div class="music-info">
                        <p>作曲に使った曲</p>
                        <ul class="used-music-list">`;
        
        for(i=0; i<used_song.length; i++){
            card_elements += `<li>${used_song[i]}</li>`;
        }
                        
            
        card_elements +=
            
            `</ul>
                    </div>

                    <div class="downloader">

                        <a id="download-PDF-btn"><img src="../img/PDF_icon.svg">
                            <p>PDF</p>
                        </a>

                        <a id="download-music-btn"><img src="../img/download_icon.svg">
                            <p> mp3</p>
                        </a>

                    </div>

                </div>
            </li>`;
    })
    
    document.querySelector('#Top ul').innerHTML = card_elements;
                           
}



/**
 *fire baseからデータベースの内容を取得
 *@param{int}class_time：授業回数
 *@param{int}seat_number:座席番号
 *@param{string}mp3_url:MP3ファイルのURL
 */
async function getCreatedMusicInfo(class_time, seat_number) {
    //参照及び取得
console.log("start");
    const music_info_ref =  db.collection(`work0`).doc(`seat0`);
   await music_info_ref.onSnapshot(function (snapshot) {
        return new Promise((resolve, reject) =>{
            
        if (snapshot.exists) {
            console.log(snapshot.data());
             resolve(snapshot.data());
        } else {
            //値がない時のエラー
            console.log(`データがありません: ${snapshot.data()}`);
            reject;
        }
        });
    }, function (error) {
        //権限がないときか無効のQueryの時のエラー
        console.error(`Error getting document:${error}`);

    });

console.log("end");
};
/**
 *fire base storageから楽譜をダウンロードする
 *@param{int}class_time：授業回数
 *@param{int}seat_number:座席番号
 */

async function downloadMP3(class_time, seat_number) {
//        const path_mp3 = storage.ref(`MP3/work${class_time}/seat${seat_number}/1.mp3/`);
    const path_mp3 = storage.ref('MP3/work0/seat0/1.mp3');
    path_mp3.getDownloadURL().then(function (url) {
//        console.log(url);
        return new Promise((resolve,reject)=>{
            
            resolve(url);
        });
    }).catch(function (error) {
        console.log("error");
    });
}
