// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var download=require('./../js/download.js');

var crawler=require('./crawler.js');

var yupoo={

    init:function(){
        console.log('init');
        var that=this;
        that.bindStartDownload();
    }

    ,bindStartDownload:function(){

        
        var that=this;
        $('#startDownload').click(function(){

            var url=$.trim($('#url').val());
            var name=$.trim($('#name').val());

            if(url==''){
                layer.msg('请输入地址');
                return;
            }

            if(name==''){
                layer.msg('请输入名称');
                return;
            }



            var pageOj={};
            pageOj.fileName=name;

            var downloadObjList=crawler.yupooCrawler(url,pageOj);

            console.log(downloadObjList);






        });

    }

    ,download:function(){

        
        var userhome=process.env.USERPROFILE;
           

        var desktop=userhome+'/Desktop/tt';
        
        download.download(url,desktop,'b.txt');

    }
};




module.exports=yupoo;

