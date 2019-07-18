// 決定ボタンクリックイベントリスナー
// =========================================================

const decision_btn = document.getElementById("decision-btn");
decision_btn.addEventListener("click", async function () {
    const modal_window = document.getElementById("modal");

    // 授業回数及び座席番号取得
    const class_time = document.querySelector('.class-number select').value;
    const seat_number = document.querySelector('.seat-number select').value;

    // DBから、作成した楽曲情報を取得
    const created_music_info = await db.collection(`work${class_time}`).doc(`seat${seat_number}`).get().then(function (snapshot) {
        return new Promise((resolve, reject) => {
            if (snapshot.exists) {
                resolve(snapshot.data());
            } else {
                // 該当パスに値がない時
                console.error(`データがありません: ${snapshot.data()}`);
                reject;
            }
        });
    }, function (error) {
        // DBへのアクセス権限がないとき or 無効クエリの時
        console.error(`Error: getting document:${error}`);
    });

    // DOM作成
    let music_list_DOM = '';
    Object.values(created_music_info)[0].forEach(async function (card_info) {
        const song_tone = card_info.song_tone;
        const song_id = card_info.song_id;
        storage.ref(`MP3/work${class_time}/seat${seat_number}/${song_id}.mp3`).getDownloadURL().then(function (url) {
            music_list_DOM = createMuscListDOM(card_info, url);
        }).then(function () {
            const ul = document.querySelector(`#Top ul`)
            const cards = document.createElement('li');

            cards.classList.add('card');
            cards.classList.add(song_tone);
            cards.innerHTML = music_list_DOM;

            ul.appendChild(cards);
        });
    });

    // モーダルウィンドウを取り除く
    modal_window.parentNode.removeChild(modal_window);
});


// 関数
// =========================================================

/**
 * 作られた曲リストのDOMを生成
 * @param {object} music_info: 作成した音楽のデータが入ったオブジェクト
 * @return {string} cards_element: 作られた曲リストのDOM（文字列）
 */
function createMuscListDOM(music_info, mp3_url) {
    //作った音楽の情報。(HTML)
    let card_elements = ``;
    const song_name = music_info.song_name;
    const used_song_list = music_info.used_song;
    console.log(mp3_url);

    // DOM生成
    card_elements = `
      <h1>${song_name}</h1>
      <div class="music-player">
        <audio controls src="${mp3_url}"></audio>
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
          <a id="download-PDF-btn">
            <img src="./img/PDF_icon.svg">
            <p>PDF</p>
          </a>
          <a type="image/png" id="download-music-btn" href="${mp3_url}" download>
            <img src="./img/download_icon.svg">
            <p>MP3</p>
          </a>
        </div>
       </div>`;
    return card_elements;
}
