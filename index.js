var http = require('http')
var fs = require('fs')
var multer = require('multer')
var port = process.env.PORT || 5500

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'upload/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage}).single('file',4)
const server = http.createServer(function(req,res){
    //file upload start
    if(req.url ==='/upload'){
        upload(req,res, function(error){
            if(error){
                return res.end('error uploading file')
            }else{
                return res.end('file upload success')
            }
        })
    }
    //file upload end
    
    if(req.url ==='/'){
        let data = fs.readFileSync('home.html', 'utf8')
        res.end(data)
    }else if(req.url ==='/about'){
        let data = fs.readFileSync('about.html' , 'utf8')
        res.end(data)

    }else if(req.url ==='/contact'){
        let data = fs.readFileSync('contact.html', 'utf8')
        res.end(data)
    }else if(req.url ==='/terms'){
        let data = fs.readFileSync('terms.html', 'utf8')
        res.end(data)
    }

    if(req.url==='/file-write'){
        fs.writeFile('demo.txt' , 'hello world', function(error){
            if(error){
                res.writeHead(200, {'Content-Type':'text/html'})
                res.write('File Write Fail')
                res.end()
            }else{
                res.writeHead(200,{ 'Content-Type':'text/html'})
                res.write('File Write Success')
                res.end()
            }
        })
    }
})

server.listen(port, function(){
    console.log(`server running port ${port}`)
})