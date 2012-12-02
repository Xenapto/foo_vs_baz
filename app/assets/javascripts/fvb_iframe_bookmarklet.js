(function(){
  
  var FvbIframeBookmarklet = {

    visible : true,
    consumer : {
      css : ['/assets/fvb_iframe_bookmarklet.css'], // could be an array or a string
      methods : { // The methods that the producer can call
      }
    },
    producer : {
      path : "/fvb_iframe_producer", // The path on your app that provides your data service
      init : function(consumer_url,consumer){
        // Set up some click handlers
        $('#vote_foo').click(function(){
          doPost('Foo')
          return false;
        });

        $('#vote_baz').click(function(){
          doPost('Baz')
          return false;
        });
        $('.fvb_close').click(function(){
          consumer.closeFrame();
          return false;
        });
        // Send the vote to the server via AJAX and pass the rusults off to the handleResults function
        function doPost(vote){
          url = consumer_url;
          $.post( '/pages', { page : { url : url, vote : vote } }, handleResults, 'json')
        }
        // A handler to display the current voting results
        function handleResults(data){
          $("#foo_count").html(data.foo_count);
          $("#baz_count").html(data.baz_count);
          $('#vote').hide();
          $('#results').show();
        }

      },
      methods : { // The methods that the consumer can call
        // We only need one way communication for this one.
      }
    }
  }
  
  window.FvbIframeBookmarklet = FvbIframeBookmarklet;

})();

