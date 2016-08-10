$(function() {
  $('a.has-child').click(function() {
    $(this).toggleClass('active')
    $(this).toggleClass('open')
  })

  $('.btn').click(function() {
    $('.code-window .btn').removeClass('active');
    $(this).addClass('active');

    $('.code-window pre').addClass('hidden');
    $('#' + this.id.split('-')[1]).removeClass('hidden');
  })

  $('.hover-swag').hover(function() {
    $('.code-window .token.property').addClass('big-property')
  }, function() {
    $('.code-window .token.property').removeClass('big-property')
  })

  var slk = document.createElement('script');
  slk.src = 'https://cdn.slaask.com/chat.js';
  slk.type = 'text/javascript';
  slk.async = 'true';
  slk.onload = slk.onreadystatechange = function() {
    var rs = this.readyState;
    if (rs && rs != 'complete' && rs != 'loaded') return;
    try {
      _slaask.init('ef8f4787e310a053be820c434e35ea2c');
    } catch (e) {}
  };
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(slk, s);
})

