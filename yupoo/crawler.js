
var request = require('request');
var cheerio = require('cheerio');


var download=require('./../js/download.js');

var crawler={

    downloadList:[]  //download list ,format :{downloadUrl:'','fileName':''}
    ,yupooCrawler:function(pageUrl,pageObj){

        var that=this;
        that.pageObj=pageObj;

        request(pageUrl, function (error, response, body) {
            if (error) {
                console.log("Error: " + error);
                layer.msg('url error '+pageUrl);
            }else if (response.statusCode === 200) {
                var $$ = cheerio.load(body);
        

                that.processPage($$);
                
            }
        });



    }

    ,processPage:function($$){

        var that=this;
        //process diffent page logic here

        that.productDetail($$);


    }
    ,productDetail:function($$){
        var that=this;
        var l1=$$('.showalbum__children');
        console.log(l1.length);

        that.downloadList=[];

        var fileName=that.pageObj.fileName;
        
        var found=false;

        var leftP=fileName.indexOf('(');
        var rightP=fileName.indexOf(')');
        var fileNamePrefix='';
        if(leftP!=-1&&rightP!=-1){

            var len=rightP-leftP;
            var n=50;
            var num=fileName.substr(leftP+1,len-1);

            var leftN=fileName.substr(0,leftP+1);
            fileNamePrefix=fileName.substr(0,leftP);
        }else{

            fileNamePrefix=fileName;

        }

        
       

        for(var i=0;i<l1.length;i++){

            var text=$$(l1[i]).find('h3.text_overflow').text();
            if(text.indexOf(fileName)!=-1){

                found=true;
                var downloadUrl=$$(l1[i]).find('img').attr('data-origin-src');

                var obj={};
                obj.fileName=fileName;
                obj.downloadUrl='http:'+downloadUrl;
                that.downloadList.push(obj);

            }

            if(found){
                if(text.indexOf(fileNamePrefix)!=-1){

                    var downloadUrl=$$(l1[i]).find('img').attr('data-origin-src');

                var obj={};
                obj.fileName=text;
                obj.downloadUrl='http:'+downloadUrl;
                that.downloadList.push(obj);

                }

            }


        }
        

        // if(found){

        //     var leftP=fileName.indexOf('(');
        //     var rightP=fileName.indexOf(')');
        //     if(leftP!=-1&&rightP!=-1){

        //         var len=rightP-leftP;
        //         var n=50;
        //         var num=fileName.substr(leftP+1,len-1);

        //         var leftN=fileName.substr(0,leftP+1);
        //         var rightN=fileName.substr(rightP);
            
        //         var destName='/^'+leftN+'[0-9]+'+rightN+'$/';

        //     for(var i=0;i<l1.length;i++){

        //     debugger
        //         var t=$(l1[i]).find('h3.text_overflow').text();
        //         if(destName.test(t)){
    
        //             var downloadUrl=$(l1[i]).find('img').attr('data-origin-src');
    
        //             var obj={};
        //             obj.fileName=fileName;
        //             obj.downloadUrl='http:'+downloadUrl;
        //             that.downloadList.push(obj);
    
        //         }
        //     }
    
        //     }
        // }else{
        //     that.notFound();
        // }
        

        if(that.downloadList.length>0){

            //find all 
            // var leftP=fileName.indexOf('(');
            // var rightP=fileName.indexOf(')');
            // if(leftP!=-1&&rightP!=-1){

            //     var len=rightP-leftP;
            //     var n=50;
            //     var num=fileName.substr(leftP+1,len-1);

            //     var leftN=fileName.substr(0,leftP+1);
            //     var rightN=fileName.substr(rightP);


            //     num=parseInt(num);

            //     for(var i=num+1;i<num+n;i++){

            //         var destName=leftN+i+rightN;
                    
            //         if($(l1[i]).find('h3.text_overflow').text()==fileName){

            //             var downloadUrl=$(l1[i]).find('img').attr('data-origin-src');
        
            //             var obj={};
            //             obj.fileName=fileName;
            //             obj.downloadUrl='http:'+downloadUrl;
            //             that.downloadList.push(obj);
        
            //         }


            //     }
                


            // }


            //begin download

            
            var dirName='';
            var dashIndex=fileName.lastIndexOf('-');
            if(dashIndex!=-1){
                dirName=fileName.substr(0,dashIndex);
            }else{

                var leftP=fileName.lastIndexOf('(');
                if(leftP!=-1){
                    dirName=fileName.substr(0,leftP);
                }else{
                    var dotIndex=fileName.lastIndexOf('.');

                    if(dotIndex!=-1){
                        dirName=fileName.substr(0,dotIndex);
                    }else{
                        dirName=fileName;
                    }

                }


            }
            $('#msgUl').empty();
            for(var i=0;i<that.downloadList.length;i++){
                var downloadObj=that.downloadList[i];
            
                var downloadUrl=downloadObj.downloadUrl;

                var fileName=downloadObj.fileName;

                var userhome=process.env.USERPROFILE;
                var desktop=userhome+'/Desktop/yupoo';
                var downloadDir='';
                if(dirName){
                    downloadDir=desktop+'/'+dirName;
                }else{
                    downloadDir=desktop+'/'+'yupoo';
                }

                //layer.msg('begin download '+fileName);
                download.download(downloadUrl,downloadDir,fileName);

            }
            

        }else{
            that.notFound();
        }


    }
    ,notFound:function(){
        var that=this;
        var fileName=that.pageObj.fileName;
        layer.msg('not found '+fileName);
    }

};

module.exports=crawler;
