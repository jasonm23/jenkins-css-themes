document.observe('dom:loaded', function() {
  setTimeout(function(){
    document.getElementById('search-box').setAttribute("type","search");
    document.getElementById('main-table').setAttribute("style","none");
    CodeMirror.defaults = {
      theme: 'menlo'
    }

  }, 500);
  // Emacs codemirror keymap
  var emacs = document.createElement('script');
  emacs.src = "http://codemirror.net/keymap/emacs.js";
  document.getElementsByTagName('head')[0].appendChild(emacs);
});