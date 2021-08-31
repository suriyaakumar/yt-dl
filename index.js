var express = require('express');
var ytdl = require('ytdl-core');
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine','ejs');

var port = process.env.PORT || 3000;

app.get('/', async (req,res) => {
    try {
     res.render('home', {formats: null, title: null, iframe: null, value: null});
    }
    catch (e) {
        console.log(e)
    }
});

app.get('/getinfo', async (req,res) => {
    try {
    var url = req.query.input;
    var info = await ytdl.getInfo(url);
    res.render('home', {
        formats: info.formats, 
        title: info.videoDetails.title, 
        iframe: info.videoDetails.embed.iframeUrl,
        value: url
    });
    }
    catch (e) {
        console.log(e)
    }
});

app.get("/download", async (req,res) => {
    try {
    var videoUrl = req.query.value;
    var itag = req.query.itag;
    res.header("content-disposition",'attachment; filename="video.mp4"');
    ytdl(videoUrl, { filter: format => format.itag == itag })
            .on('response', response => {
                res.setHeader("content-length", response.headers['content-length']);
            }).pipe(res);
    }
    catch (e) {
        console.log(e)
    } 
});

app.listen(port, (req,res) => {
    console.log("Server listening at port " + port);
});