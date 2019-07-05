  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdpxD0cZBJZbjxnCunxj8iouou-muTC1c",
    authDomain: "otanilab-music-downloader.firebaseapp.com",
    databaseURL: "https://otanilab-music-downloader.firebaseio.com",
    projectId: "otanilab-music-downloader",
    storageBucket: "otanilab-music-downloader.appspot.com",
    messagingSenderId: "238815551872",
    appId: "1:238815551872:web:1c00f909a1622823"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


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
});


var docRef = db.collection("seat0").doc("1");

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

