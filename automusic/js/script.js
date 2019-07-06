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
    
  var test_read = db.collection('root').doc('work0').collection('seat0');
    
    test_read.get().then(function(doc){
       if(doc.exists){
           console.log("testDATA:",doc.data());
       } else{
           console.log("No data")
       }
    }).catch(function(error) {
        console.log("Error",error);
    });
});

