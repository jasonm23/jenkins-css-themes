document.observe('dom:loaded', function() {
  setTimeout(function(){
    document.getElementById('search-box').setAttribute("type","search");
  }, 500);
});
