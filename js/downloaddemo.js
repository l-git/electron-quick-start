
var url=require('url')
var fs=require('fs')
var http=require('http')


var download_file_httpget = function(file_url) {
    
    var options = {
        host: url.parse(file_url).host,
        port: 80,
        path: url.parse(file_url).pathname
    };

    var destFile='e:/config/a.jpg'
    var file = fs.createWriteStream(destFile);

    http.get(options, function(res) {
        res.on('data', function(data) {
                file.write(data);
            }).on('end', function() {
                file.end();
               
            });
        });
    };

    var file_url='http://photo.yupoo.com/ysly/133528bd/f6fa6340.jpg'
    download_file_httpget(file_url)