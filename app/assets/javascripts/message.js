$(function() {
  
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
  	  var html =
  	    `<div class="message" data-id= "${message.id}">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div> 
          ${image}
        </div>`
    return html;
  }
  
   function ScrollToNewMessage(){
       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
   }

  $('#new_message').on('submit',function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
          .done(function(data){
                  var html = buildHTML(data);
                $('.messages').append(html);
      ScrollToNewMessage();
                $('.new_message')[0].reset();
                $(".form__mask__submit").prop('disabled', false);
	        })
	        .fail(function(){
	          alert('error');
	        });
  })

var reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
  // var href = 'api/messages {:format=>"json"}' 
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = $('.message:last').data("id");
  
  $.ajax({
    //ルーティングで設定した通りのURLを指定
    url:"api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'GET',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })

  .done(function(messages) {
    //追加するHTMLの入れ物を作る
    var insertHTML = '';
    //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
    $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });

    ScrollToNewMessage();
    //メッセージが入ったHTMLに、入れ物ごと追加
    $('.messages').append(insertHTML);
  })

  .fail(function() {
    alert('error');
  });

 };
}
setInterval(reloadMessages, 7000);
});