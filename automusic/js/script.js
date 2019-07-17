
// 決定ボタンクリックイベントリスナー
// =========================================================

const decision_btn = document.getElementById("decision-btn");
decision_btn.addEventListener("click", async function () {
    const modal_window = document.getElementById("modal");

    // 授業回数取得
    const class_time = document.querySelector('.class-number select').value;
    // console.log(class_time);

    // 座席番号取得
    const seat_number = document.querySelector('.seat-number select').value;
    // console.log(seat_number);

    // DBから、作成した楽曲情報を取得
    const created_music_info = await db.collection(`work0`).doc(`seat0`).get().then(function (snapshot) {
        return new Promise((resolve, reject) => {
            if (snapshot.exists) {
                console.log(snapshot.data());
                resolve(snapshot.data());
            } else {
                // 該当パスに値がない時
                console.error(`データがありません: ${snapshot.data()}`);
                reject;
            }
        });
    }, function (error) {
        // DBへのアクセス権限がないとき or 無効クエリの時
        console.error(`Error getting document:${error}`);

    });

    // DOM作成
    let music_list_DOM = '';
    Object.values(created_music_info)[0].forEach(async function (card_info) {
        console.log("loop");
        console.log(card_info);

        storage.ref('MP3/work0/seat0/1.mp3').getDownloadURL().then(function (url) {
            console.log(url);
            music_list_DOM += createMuscListDOM(card_info, url);
        }).then(function () {
            document.querySelector(`#Top ul`).innerHTML = music_list_DOM;
        });
    });

    // 作成したDOMを挿入
    console.log(music_list_DOM);
    document.querySelector(`#Top ul`).innerHTML = music_list_DOM;

    // モーダルウィンドウを取り除く
    const parent = modal_window.parentNode;
    parent.removeChild(modal_window);

    // const music_info = getCreatedMusicInfo(class_time, seat_number);
});


// 関数
// =========================================================

/**
 * 作られた曲リストのDOMを生成
 * @param {object} music_info:作成した音楽のデータが入ったオブジェクト
 * @return {string} cards_element: 作られた曲リストのDOM（文字列）
 */
function createMuscListDOM(music_info, mp3_url) {
    //作った音楽の情報。(HTML)
    let card_elements = ``;
    const song_name = music_info.song_name;
    const song_tone = music_info.song_tone;
    const used_song_list = music_info.used_song;

    // DOM生成
    card_elements += `
    <li class="card ${song_tone}">
      <h1>${song_name}</h1>
      <div class="music-player">
        <audio controls src="${mp3_url}" controlslist="nodownload"></audio>
      </div>
      <div class="music-elements">
        <div class="music-info">
          <p>作曲に使った曲</p>
          <ul class="used-music-list">`;
    for (let used_song of used_song_list) card_elements += `<li>${used_song}</li>`;
    card_elements +=
        `</ul>
        </div>
        <div class="downloader">
          <a id="download-PDF-btn"><img src="./img/PDF_icon.svg">
            <p>PDF</p>
          </a>
          <a id="download-music-btn"><img src="./img/download_icon.svg">
            <p>MP3</p>
          </a>
        </div>
       </div>
     </li>`;

    return card_elements;
}



/**
 *fire baseからデータベースの内容を取得
 *@param{int}class_time：授業回数
 *@param{int}seat_number:座席番号
 *@param{string}mp3_url:MP3ファイルのURL
 */
async function getCreatedMusicInfo(class_time, seat_number) {
    //参照及び取得
    const music_info_ref = db.collection(`work0`).doc(`seat0`);
    await music_info_ref.onSnapshot(function (snapshot) {
        return new Promise((resolve, reject) => {

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

};

/**
 * CloudfireStorageから楽譜をダウンロードする
 * @param {int} class_time： 授業回数
 * @param {int} seat_number: 座席番号
 */

async function getMP3URL(class_time, seat_number) {
    //        const path_mp3 = storage.ref(`MP3/work${class_time}/seat${seat_number}/1.mp3/`);
    const path_mp3 = storage.ref('MP3/work0/seat0/1.mp3');
    await path_mp3.getDownloadURL().then(function (url) {
        //        console.log(url);
        return new Promise((resolve, reject) => {
            resolve(url);
        });
    }).catch(function (error) {
        console.log("error");
    });
}
