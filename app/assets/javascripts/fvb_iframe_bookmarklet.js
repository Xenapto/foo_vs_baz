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
        },
        scrapeLiContact: {
          method : function (callback) {
            console.log('scraping contact')
            var skills = artoo.scrape('.skills-section li', 'data-endorsed-item-name');
            var filteredSkills = skills.filter(function(element) { return element != undefined } ); 
            var experience = artoo.scrape( '.background-section h4', 'text' );
            var name = artoo.scrape( '.full-name','text' );
            var data = { name: name, skills: filteredSkills, experience: experience }
            console.log('found data for ' + data.name)
            callback(data);
          }
        }
      }
    },
    producer : {
      path : "/fvb_iframe_producer", // The path on your app that provides your data service
      init : function(consumer_url,consumer){
        // Set up some click handlers
        $('#scrape_contact').click(function(){
          consumer.scrapeLiContact(handleLiResults);
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
        function handleLiResults(data){
          console.log('writing ' + data.name);
          $("#scraped_name").html(data.name);
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

