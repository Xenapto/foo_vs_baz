(function(){
  
  var FvbIframeBookmarklet = {

    visible : true,
    protocol : 'https',
    consumer : {
      css : ['/assets/fvb_iframe_bookmarklet.css'], // could be an array or a string
      init : function(producer_url,producer) {
        console.log('initializing consumer fucntions');
    
      },
      methods : { 
        consumerMethod: {
          method : function(callback){
            alert('closing!');
            console.log('consumer method')
            callback({data: 'hello from callback'})
            return { data:  'hello' };
          }
        },
        scrapeSomething: {
          method : function(callback){
            var data = artoo.scrape('h1','text');
            callback({ scrapeResult: data })
          }
        }
      }
    },
    producer : {
      path : "/fvb_iframe_producer", // The path on your app that provides your data service
      init : function(consumer_url,consumer){
        // Set up some click handlers
        $('#vote_foo').click(function(){
          consumer.scrapeSomething(showScrape)
          return false;
        });
        
        function showScrape(hash){
          $('#vote_foo').html(hash.scrapeResult)
        }

        $('#vote_baz').click(function(){
          doPost('Baz')
          return false;
        });
        $('.fvb_close').click(function(){
          console.log('got back ' + consumer.closeFrame());
          consumer.consumerMethod(showConsumer)
          return false;
        });
        function showConsumer(hash){
          console.log(hash['data'])
        }
        // Send the vote to the server via AJAX and pass the rusults off to the handleResults function
        function doPost(vote){
          url = consumer_url;
          url = 'default'
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
      methods : { 
        producerMethod : 'hello from producer'
      }
    }
  }
  
  window.FvbIframeBookmarklet = FvbIframeBookmarklet;

})();

