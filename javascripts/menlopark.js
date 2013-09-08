// Check/Purge existing codemirror.js, codemirror.css & codemirror/theme/default.css
window.purgeStaplerCodeMirror = function(){
  var cm_js_old = document.querySelector('src*="stapler/codemirror/lib/codemirror.js"');
  var cm_css_old = document.querySelector('link[href*="stapler/codemirror/lib/codemirror.css"]');
  var cm_default_theme_css_old = document.querySelector('link[href*="stapler/codemirror/theme/default.css"]');
  cm_parent = cm_js_old.parentNode;
  cm_parent.removeChild(cm_css_old);
  cm_parent.removeChild(cm_default_theme_css_old);
  cm_parent.removeChild(cm_js_old);
}

// Add updated versions.
window.addUpdatedCodeMirror = function(){
  var cm_js = document.createElement('script');
  cm_js.src = "//cdn.jsdelivr.net/codemirror/3.14.0/codemirror.js";
  cm_js.type = "application/javascript";
  var cm_css = document.createElement('link');
  cm_css.href = "//cdn.jsdelivr.net/codemirror/3.14.0/codemirror.css";
  cm_css.type = "text/css"
  cm_css.rel = "stylesheet"
  document.head.appendChild(cm_css);
  document.head.appendChild(cm_js);
}

window.addEmacsKeyMapToCodeMirror = function(){
  // Emacs codemirror keymap - requires an up-to-date CodeMirror instance...
  var emacs = document.createElement('script');
  emacs.src = "http://codemirror.net/keymap/emacs.js";
  document.getElementsByTagName('head')[0].appendChild(emacs);
}

document.observe('dom:loaded', function() {
  setTimeout(function(){
    document.getElementById('search-box').setAttribute("type","search");
    document.getElementById('main-table').setAttribute("style","none");
  }, 500);
});
