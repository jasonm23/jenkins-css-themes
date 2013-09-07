// Require JS
var jq = document.createElement('script');
jq.src = "http://code.jquery.com/jquery-latest.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
jQuery.noConflict();

// Emacs codemirror keymap
var emacs = document.createElement('script');
emacs.src = "http://codemirror.net/keymap/emacs.js";
document.getElementsByTagName('head')[0].appendChild(emacs);

$(document).ready(function(){

  document.querySelector('#search-box').setAttribute("type","search");

  document.querySelector('#main-table').setAttribute("style","none");

  CodeMirror.defaults = {
    theme: 'menlo',
    smartIndent: true,
    indentWithTabs: false,
    lineNumbers: true,
    undoDepth: 100
  }

})
