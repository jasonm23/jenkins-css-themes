// Check/Purge existing codemirror.js, codemirror.css & codemirror/theme/default.css
window.purgeStaplerCodeMirror = function(){
  var cm_js_old = document.querySelector('script[src*="stapler/codemirror/lib/codemirror.js"]');
  var cm_js_old_xml = document.querySelector('script[src*="stapler/codemirror/mode/xml/xml.js"]');
  var cm_js_old_js = document.querySelector('script[src*="stapler/codemirror/mode/javascript/javascript.js"]');
  var cm_js_old_css = document.querySelector('script[src*="stapler/codemirror/mode/css/css.js"]');
  var cm_js_old_html = document.querySelector('script[src*="stapler/codemirror/mode/htmlmixed/htmlmixed.js"]');
  var cm_js_old_textarea = document.querySelector('script[src*="lib/form/textarea/textarea.js"]');
  var cm_css_old = document.querySelector('link[href*="stapler/codemirror/lib/codemirror.css"]');
  var cm_default_theme_css_old = document.querySelector('link[href*="stapler/codemirror/theme/default.css"]');
  cm_parent = cm_js_old.parentNode;
  cm_parent.removeChild(cm_css_old);
  cm_parent.removeChild(cm_default_theme_css_old);
  cm_parent.removeChild(cm_js_old);
  cm_parent.removeChild(cm_js_old_xml);
  cm_parent.removeChild(cm_js_old_js);
  cm_parent.removeChild(cm_js_old_css);
  cm_parent.removeChild(cm_js_old_html);
  cm_parent.removeChild(cm_js_old_textarea);
}

// Add updated versions.
window.addUpdatedCodeMirror = function(){
  var cm_js = document.createElement('script');
  cm_js.src = "//cdn.jsdelivr.net/codemirror/3.14.0/codemirror.js";
  cm_js.type = "application/javascript";

  var cm_css = document.createElement('link');
  cm_css.href = "//cdn.jsdelivr.net/codemirror/3.14.0/codemirror.css";
  cm_css.type = "text/css";
  cm_css.rel = "stylesheet";

  var cm_theme = document.createElement('link');
  cm_theme.href = "http://codemirror.net/theme/ambiance.css";
  cm_css.type = "text/css";
  cm_css.rel = "stylesheet";

  var emacs = document.createElement('script');
  emacs.src = "http://codemirror.net/keymap/emacs.js";

  var fullScreen = document.createElement('script');
  fullScreen.src = "http://codemirror.net/addon/display/fullscreen.js";

  document.head.appendChild(cm_css);
  document.head.appendChild(cm_theme);
  document.head.appendChild(cm_js);
  document.head.appendChild(emacs);
  // document.head.appendChild(fullScreen);

}

document.observe('dom:loaded', function() {
  setTimeout(function(){
    document.getElementById('search-box').setAttribute("type","search");
    document.getElementById('main-table').setAttribute("style","none");
  }, 500);

  purgeStaplerCodeMirror();

  addUpdatedCodeMirror();

  Behaviour.specify("TEXTAREA.codemirror", 'textarea', 0, function(e) {
    var h = e.clientHeight;
    var config = e.getAttribute("codemirror-config") || "";
    config = eval('({'+config+'})');

    config.theme = "ambiance";
    config.keyMap = "emacs";

    console.log(config);

    var codemirror = CodeMirror.fromTextArea(e,config);
    e.codemirrorObject = codemirror;
    if(typeof(codemirror.getScrollerElement) !== "function") {
      // Maybe older versions of CodeMirror do not provide getScrollerElement method.
      codemirror.getScrollerElement = function(){
        return findElementsBySelector(codemirror.getWrapperElement(), ".CodeMirror-scroll")[0];
      };
    }
    var scroller = codemirror.getScrollerElement();
    scroller.setAttribute("style","border:1px solid black;");
    scroller.style.height = h+"px";

    // the form needs to be populated before the "Apply" button
    if(e.up('form')) { // Protect against undefined element
      Element.on(e.up('form'),"jenkins:apply", function() {
        e.value = codemirror.getValue()
      })
    }
  });

  Behaviour.specify("DIV.textarea-preview-container", 'textarea', 100, function (e) {
    var previewDiv = findElementsBySelector(e,".textarea-preview")[0];
    var showPreview = findElementsBySelector(e,".textarea-show-preview")[0];
    var hidePreview = findElementsBySelector(e,".textarea-hide-preview")[0];
    $(hidePreview).hide();
    $(previewDiv).hide();

    showPreview.onclick = function() {
      // Several TEXTAREAs may exist if CodeMirror is enabled. The first one has reference to the CodeMirror object.
      var textarea = e.parentNode.getElementsByTagName("TEXTAREA")[0];
      var text = textarea.codemirrorObject ? textarea.codemirrorObject.getValue() : textarea.value;
      var render = function(txt) {
        $(hidePreview).show();
        $(previewDiv).show();
        previewDiv.innerHTML = txt;
        layoutUpdateCallback.call();
      };

      new Ajax.Request(rootURL + showPreview.getAttribute("previewEndpoint"), {
        parameters: {
          text: text
        },
        onSuccess: function(obj) {
          render(obj.responseText)
        },
        onFailure: function(obj) {
          render(obj.status + " " + obj.statusText + "<HR/>" + obj.responseText)
        }
      });
      return false;
    }

    hidePreview.onclick = function() {
      $(hidePreview).hide();
      $(previewDiv).hide();
    };
  });



});
