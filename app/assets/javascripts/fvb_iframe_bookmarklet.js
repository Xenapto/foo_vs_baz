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
        $('#save_contact').click(function(){
          alert ('pretend success')
          consumer.closeFrame();
          return false;
        });
        
        $('.fvb_close').click(function(){
          consumer.closeFrame();
          return false;
        });

        function handleLiResults(data){
          console.log('writing ' + data.name);
          $("#scraped_name").html(data.name);
          _populateList('#scraped_skills', data.skills.slice(0,7))
          _populateList('#scraped_experience', data.experience.slice(0,7))
          $('#vote').hide();
          $('#results').show();
        }
        function _populateList (list, array) {
          $.each(array, function(i){
            $(list).append  ('<li>' + array[i] + '</li>');
          });
        }

      },
      methods : { 
        producerMethod : 'hello from producer'
      }
    }
  }
  
  window.FvbIframeBookmarklet = FvbIframeBookmarklet;

})();

