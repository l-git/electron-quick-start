var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;


var download={

    download:function(downloadurl,dir,fileName,cb){
        
        // App variables
        var file_url = 'http://upload.wikimedia.org/wikipedia/commons/4/4f/Big%26Small_edit_1.jpg';
        var DOWNLOAD_DIR = '';

        file_url=downloadurl;

        if(dir){
            
        }else{
            dir=process.env.USERPFOFILE+'/Desktop/'+'yuppo';
        }

        //create dir recursive
        var dirArr=dir.split('/');

        var tmpDir='';
        for(var i=0;i<dirArr.length;i++){

            tmpDir+=dirArr[i]+'/';
            if(!fs.existsSync(tmpDir)){
                fs.mkdirSync(tmpDir);
            }

        }
        
        DOWNLOAD_DIR=dir;
        destFile=DOWNLOAD_DIR+'/'+fileName;

        // Function to download file using HTTP.get
        var download_file_httpget = function(file_url) {
        var options = {
            host: url.parse(file_url).host,
            port: 80,
            path: url.parse(file_url).pathname
        };

        //var file_name = url.parse(file_url).pathname.split('/').pop();
        var file = fs.createWriteStream(destFile);

        http.get(options, function(res) {
            res.on('data', function(data) {
                    file.write(data);
                }).on('end', function() {
                    file.end();
                    var msg=fileName + ' downloaded to ' + DOWNLOAD_DIR;
                    console.log(msg);
                    $('#msgUl').prepend('<li class="list-group-item">'+msg+'</li>');
                    //layer.msg(msg);
                });
            });
        };

        download_file_httpget(file_url)

    }

};

module.exports=download;

/**
https://www.hacksparrow.com/using-node-js-to-download-files.html

// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// App variables
var file_url = 'http://upload.wikimedia.org/wikipedia/commons/4/4f/Big%26Small_edit_1.jpg';
var DOWNLOAD_DIR = './downloads/';

// We will be downloading the files to a directory, so make sure it's there
// This step is not required if you have manually created the directory
var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr) {
    if (err) throw err;
    else download_file_httpget(file_url);
});

// Function to download file using HTTP.get
var download_file_httpget = function(file_url) {
var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
};

var file_name = url.parse(file_url).pathname.split('/').pop();
var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

http.get(options, function(res) {
    res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
        });
    });
};



*/
