$('a.has-child').click(function() {
  $(this).toggleClass('active')
  $(this).toggleClass('open')
})

var scriptTag = document.createElement('script');
scriptTag.src = 'https://cdn.slaask.com/chat.js';
document.getElementsByTagName('head')[0].appendChild(scriptTag);
scriptTag.onload = function() {
  _slaask.init('6e32de720b47555bdc81696b3fa955b1');
}
