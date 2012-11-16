(function(){
  
  var FvbXdmBookmarklet = {

    visible : false,
    consumer : {
      css : ['/assets/fvb_simple_bookmarklet.css'], // could be an array or a string
      init : function(full_host,remote){
        full_host = full_host == undefined ? '' : full_host
        
        var content = document.createElement('div')
        content.id = 'fvb_simple_content'
        
        var vote = document.createElement('p')
        vote.appendChild(document.createTextNode('Vote on the Foo V Baz status of this page.'))
        /*vote.onclick = function(){
          var dest = full_host + "/pages/new?url=" + encodeURIComponent(document.location)
          document.location = dest;
        }*/

        var foo = document.createElement('a')
        foo.appendChild(document.createTextNode('Vote foo!'))
        foo.onclick = function(){
          remote.post('Foo',document.location.href,
                      function(){
                        alert('Your vote has been cast!');
                        document.body.removeChild(document.getElementById('fvb_simple_insert'));
                      });
        }

        var baz = document.createElement('a')
        baz.appendChild(document.createTextNode('Vote baz!'))
        baz.onclick = function(){
          remote.post('Baz',document.location.href,
                      function(){
                        alert('Your vote has been cast!');
                        document.body.removeChild(document.getElementById('fvb_simple_insert'));
                      });
        }


        var no = document.createElement('a')
        no.appendChild(document.createTextNode('Nevermind.'))
        no.onclick = function(){
          document.body.removeChild(document.getElementById('fvb_simple_insert'));
        }

        content.appendChild(vote)
        content.appendChild(foo)
        content.appendChild(baz)
        content.appendChild(no)
        document.body.appendChild(FooVsBaz.wrap(content,'fvb_simple_insert'));
      },

      methods : { // The methods that the producer can call
        //post : function(){}
      }
    },
    producer : {
      path : "/fvb_xdm_producer", // The path on your app that provides your data service
      methods : { // The methods that the consumer can call
        post : function(vote,url,callback){
          $.post( '/pages',
                  { page : { url : url, vote : vote } },
                  callback
          )
        }
      }
    }
  }
  
  window.FvbXdmBookmarklet = FvbXdmBookmarklet;

})();

