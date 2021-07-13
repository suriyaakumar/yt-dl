var express = require('express');
const { filterFormats } = require('ytdl-core');
var ytdl = require('ytdl-core');
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/', (req,res) => {
    res.render('home', {formats: null, title: null, thumbnail: null, value: null});
});

app.get('/getinfo', async (req,res) => {
    var url = req.query.input;
    var info = await ytdl.getInfo(url);
    res.render('home', {
        formats: info.formats, 
        title: info.videoDetails.title, 
        thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1],
        value: url
    });
});

app.get("/download", (req,res) => {
    var videoUrl = req.query.value;
    var itag = req.query.itag;
    res.header("Content-Disposition",'attachment;\ filename="video.mp4"');
    ytdl(videoUrl,{filter: format => format.itag == itag}).pipe(res);
});

app.listen(3000, (req,res) => {
    console.log("Server listening at port 3000");
});