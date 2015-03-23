# Webscraping bookmarklet demo

This is a spike to demonstrate feasability of scraping data off https site with a bookmarklet.
We can scrape name, skills and experience titles from Linked In

### Setup

##### SSL

* [for more detail see](http://makandracards.com/makandra/15903-using-thin-for-development-with-ssl)

* create self signed ssl cert in ~/.ssl directory
```openssl req -new -newkey rsa:2048 -sha1 -days 365 -nodes -x509 -keyout server.key -out server.crt```
* add localhosts to hosts file
```echo "127.0.0.1 localhost.ssl" | sudo tee -a /etc/hosts```

######

### Running
```bundle install```
```thin start -p 3000 --ssl --ssl-key-file ~/server.key --ssl-cert-file ~/server.crt```
* then navigate to https://localhost:3000
* you may need to manually accept the certificate to load the page 
* drag 'Iframe Bookmarklet' to menu bar
* Navigate to a Linked In contact page
* click 'Iframe Bookmarklet'
* click 'Scrape Contact'

###### notes
scraping has a dependency on loading 'artoo' - check this is working if any 
errors

## To do
* doesn't save any data but ajax api call already demonstrated in gem
* no error handling in callback!

## Lessons learned
* To scrape a page with https, you need ssl set up on bookmarklet server
* Iframe is easier to display than the shadow dom
* Communication between frames happens via XDM. The setup of this happens in Easymarklet producer.js and consumer.js files. Configuration is a bit complex
* passing data by callbacks easier to configure than return functions
* setup of shared functions is via the bookmarklets.js file. Example code is
```
var FvbIframeBookmarklet = {

    visible : true,
    protocol : 'https',
    consumer : {
      css : ['/assets/fvb_iframe_bookmarklet.css'], // could be an array or a string
      init : function(producer_url,producer) {
        console.log('initializing consumer fucntions');
    
      },
      methods : { 
        scrapeSomething: {
        method : function(callback){
          var data = artoo.scrape('h1','text');
          callback({ scrapeResult: data })
        }
      }
    }
```




