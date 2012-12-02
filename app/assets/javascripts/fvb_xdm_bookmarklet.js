(function(){
  
  var FvbXdmBookmarklet = {

    visible : false,
    consumer : {
      css : ['/assets/fvb_simple_bookmarklet.css'], // could be an array or a string
      init : function(full_host,remote){
        full_host = full_host == undefined ? '' : full_host
        // Start building up a UI container.
        // We take the 'long way' here because we may not have
        // any convenience libraries loaded in the consumer page.
        var content = document.createElement('div')
        content.id = 'fvb_simple_content'
        
        var vote = document.createElement('p')
        vote.appendChild(document.createTextNode('Vote on the Foo V Baz status of this page.'))
        
        // Set up a couple of links which call the fvbPost function
        // that is declared in our producer
        var foo = document.createElement('a')
        foo.appendChild(document.createTextNode('Vote foo!'))
        foo.onclick = function(){
          remote.fvbPost('Foo',document.location.href,handleResults);
        }

        var baz = document.createElement('a')
        baz.appendChild(document.createTextNode('Vote baz!'))
        baz.onclick = function(){
          remote.fvbPost('Baz',document.location.href,handleResults);
        }

        // Give the user a way to opt out mid stream
        var no = document.createElement('a')
        no.appendChild(document.createTextNode('Nevermind, voting is for suckers.'))
        no.onclick = function(){
          document.body.removeChild(document.getElementById('fvb_simple_insert'));
        }
        // Chain everything together and add it to the document
        content.appendChild(vote)
        content.appendChild(foo)
        content.appendChild(baz)
        content.appendChild(no)
        document.body.appendChild(FooVsBaz.wrap(content,'fvb_simple_insert'));

        // A handler to display the current voting results
        function handleResults(data){
          console.log(data);
          var response = document.createElement('div')
          response.appendChild(document.createTextNode('Congratulations!  Your vote has been counted.'))

          var foo = document.createElement('div')
          foo.appendChild(document.createTextNode('Foo : ' + data.foo_count ))
          response.appendChild(foo)

          var baz = document.createElement('div')
          baz.appendChild(document.createTextNode('Baz : ' + data.baz_count ))
          response.appendChild(baz)


          var no = document.createElement('a')
          no.appendChild(document.createTextNode('Thank you, come again!'))
          no.onclick = function(){
            document.body.removeChild(document.getElementById('fvb_simple_insert'));
          }
          response.appendChild(no)

          content.innerHTML = "";
          content.appendChild(response);
        }
      },

      methods : { // The methods that the producer can call
        // We don't have anything for this demo!
     }
    },
    producer : {
      path : "/fvb_xdm_producer", // The path on your app that provides your data service
      methods : { // The methods that the consumer can call
        // The RPC method used by our consumer.
        fvbPost : function(vote,url,callback){
          // Since this code will be executed inside of our producer page
          // and not on the client, we can make use of JQuery
          $.post( '/pages', { page : { url : url, vote : vote } }, callback, 'json')
        }
      }
    }
  }
  
  window.FvbXdmBookmarklet = FvbXdmBookmarklet;

})();
