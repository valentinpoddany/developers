$('a.has-child').click(function() {
  $(this).toggleClass('active')
  $(this).toggleClass('open')
})

var scriptTag = document.createElement('script');
scriptTag.src = 'https://cdn.slaask.com/chat.js';
document.getElementsByTagName('head')[0].appendChild(scriptTag);
scriptTag.onload = function() {
  _slaask.init('ef8f4787e310a053be820c434e35ea2c');
}
