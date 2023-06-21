const express = require('express');
const https = require('https');
const router = express.Router();


router.get('/:query/:number', function(req, res) {
    const options = createFlickrOptions(req.params.query, req.params.number);
   
    const flickrReq = https.request(options, (flickRes) => {
        let body = [];

        flickRes.on('data', function(chunk) {
            body.push(chunk);
        });

        flickRes.on('end', function() {
            res.writeHead(flickRes.statusCode, {'content-type':'application/json'} );
            const bodyString = body.join('');
            const rsp = JSON.parse(bodyString);
            const data = JSON.stringify(rsp);
            res.write(data);
            res.end();
        })
    });

    flickrReq.on('error', (e) => {
        console.log(e);
    })
    flickrReq.end();
});


router.get('/:id', function(req, res) {
    const options = commentsFlickrOptions(req.params.id);
   
    const flickrReq = https.request(options, (flickRes) => {
        let body = [];

        flickRes.on('data', function(chunk) {
            body.push(chunk);
        });

        flickRes.on('end', function() {
            res.writeHead(flickRes.statusCode, {'content-type':'application/json'} );
            const bodyString = body.join('');
            const rsp = JSON.parse(bodyString);
            const data = JSON.stringify(rsp);
            res.write(data);
            res.end();
        })
    });

    flickrReq.on('error', (e) => {
        console.log(e);
    })
    flickrReq.end();
});


const flickr = {
    search_method: 'flickr.photos.search',
    comments_method: 'flickr.photos.comments.getList',
    api_key: "6b4a8f3c087f02b5abd86259c193c21d",
    format: "json",
    media: "photos",
    nojsoncallback: 1
};

function createFlickrOptions(query, number) {
    const options = {
        hostname: 'api.flickr.com',
        port: 443,
        path: '/services/rest/?',
        method: 'GET'
    }

    const str = 'method=' + flickr.search_method + '&api_key=' + flickr.api_key +
    '&tags=' + query + 
    '&per_page=' + number + 
    '&format=' + flickr.format +
    '&media=' + flickr.media + 
    '&nojsoncallback=' + flickr.nojsoncallback;
    
    options.path += str;
    return options;
}


function commentsFlickrOptions(id) {
    const options = {
        hostname: 'api.flickr.com',
        port: 443,
        path: '/services/rest/?',
        method: 'GET'
    }

    const str = 'method=' + flickr.comments_method + '&api_key=' + flickr.api_key +
    '&photo_id=' + id +
    '&format=' + flickr.format +
    '&nojsoncallback=' + flickr.nojsoncallback;
    
    options.path += str;
    return options;
}



module.exports = router;