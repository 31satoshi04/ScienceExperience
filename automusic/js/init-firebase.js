  // Your web app's Firebase configuration
  const firebaseConfig = {
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
  //データベースの宣言
  const db = firebase.firestore();
  const storage = firebase.storage();
