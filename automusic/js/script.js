const decision_btn = document.getElementById("decision-btn");

decision_btn.addEventListener("click", function () {
    const modal_window = document.getElementById("modal");

    // 授業回数の取得
    const class_time = document.querySelector('.class-number select').value;
    console.log(class_time);

    // 座席番号の取得
    const seat_number = document.querySelector('.seat-number select').value;
    console.log(seat_number);

    // モーダルを消す
    const parent = modal_window.parentNode;
    parent.removeChild(modal_window);

    const music_info = getCreatedMusicInfo(class_time, seat_number);

});

/**
 *作った音楽のリストのDOMを生成してHTMLに入れる
 *@param{object}created_music_info:作成した音楽のデータが入ったオブジェクト
 */
function insertCreatedMusicList(created_musics_info) {
    //作った音楽の情報。(HTML)
    let music_list = "";

    Object.values(created_musics_info).forEach(function (music_info) {
        
        const song_name = music_info.song_name;
        console.log("保存時につけたタイトル　" + song_name);
        const song_tone = music_info.song_tone;
        console.log("調　" + song_tone);
        const used_song = music_info.used_song;
        console.log("作曲に使った曲　" + used_song);
        
        
    })
}



/**
 *fire baseからデータベースの内容を取得
 *@param{int}class_time：授業回数
 *@param{int}seat_number:座席番号
 */
function getCreatedMusicInfo(class_time, seat_number) {
    //参照及び取得
    const music_info_ref = db.collection(`work${class_time}`).doc(`seat${seat_number}`);
    music_info_ref.onSnapshot(function (snapshot) {
        if (snapshot.exists) {
            console.log(snapshot.data());

            //            return snapshot.data();
            insertCreatedMusicList(snapshot.data());
        } else {
            //値がない時のエラー
            console.log(`データがありません: ${snapshot.data()}`);
        }
    }, function (error) {
        //権限がないときか無効のQueryの時のエラー
        console.error(`Error getting document:${error}`);

    });


};
