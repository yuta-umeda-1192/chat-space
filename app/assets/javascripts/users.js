$(function() {

  var search_list = $("#user-search-result");
  var menber_list = $(".js-chat-menber-test");

  function appendUserToSearchList(user) {
    var html = 
      `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${ user.name }</p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name }>追加</a>
      </div>`
    search_list.append(html);
 return html;
   }

  function appendUserToMenberList(name, user_id) {
    var html =
      `<div class="chat-group-user clearfix js-chat-menber"> 
          <input name="group[user_ids][]", type="hidden", value='${ user_id }'>
          <p class="chat-group-user__name">${ name } </p>
          <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
      </div> `
    $("#chat-group-users").append(html);
  }

  function appendNoUserToSearchList(user) {
    var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user }</p>
      </div>`
    search_list.append(html);
  }

  $(function(){
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(user) {
        $("#user-search-result").empty();
          if (user.length !== 0) {
            user.forEach(function(user){
            appendUserToSearchList(user);
            });
          }
          else {
            appendNoUserToSearchList("一致するユーザーはいません");
          }
        })
      .fail(function() {
        alert('通信エラーです。ユーザーが表示できません。');
      })
    });

    $(function(){
      $(document).on('click', '.user-search-add', function() {
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        $(this).parent().remove();
        appendUserToMenberList(name, user_id);
      });

      $(document).on("click", '.user-search-remove', function() {
        $(this).parent().remove();
      });
    });
  });
});