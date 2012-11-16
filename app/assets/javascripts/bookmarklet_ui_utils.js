var FooVsBaz = FooVsBaz || {};
FooVsBaz.wrap = function(content,id){

  var div = document.createElement('div')
  div.id = id

  var frame = document.createElement('div')
  frame.id = 'fvb_simple_frame'
  div.appendChild(frame)

 
  var logo_text = '<div id="logo_bar"><div id="logo_frame"><div id="badge"><span id="foo">Foo</span><span id="vs">vs.</span><span id="baz">Baz</span></div></div></div>';
  frame.innerHTML = logo_text;
  
  frame.appendChild(content)
  return div;
  

}
