"use strict";
exports.__esModule = true;
// import dependencies
var express = require('express');
var axios = require('axios');
var path = require('path');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// define the Express app
var app = express();
// YT API Key
var ytKey = process.env.YT_KEY;
// Set base URL to retrieve a Youtube channel's videos
var urlBase = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=7&key=" + ytKey + "&playlistId=";
// List of Youtube channel sources
var channelsYT = {
    Proximity: 'UU3ifTl5zKiCAhHIBQYcaTeg',
    'Revealed Music': 'UUnhHe0_bk_1_0So41vsZvWw',
    'Thrilling Music': 'UUh_Ob9q_Tf7-7Opf_6YvaKw',
    WaveMusic: 'UUbuK8xxu2P_sqoMnDsoBrrg'
};
// function to create array of promises from urlBase and channelsYT
var promiseMake = function () { return Object.values(channelsYT).map(function (channel) { return axios.get(urlBase + channel); }); };
// function to format date
var dateFormat = function (date) {
    var dateNew = new Date(date);
    return dateNew.toLocaleString('en-us');
};
// function to insert each song into its own object
var songInsert = function (channel, songs) {
    channel.data.items.map(function (song) {
        var songObj = {
            title: song.snippet.title,
            published: dateFormat(song.snippet.publishedAt),
            videoId: song.snippet.resourceId.videoId,
            channel: song.snippet.channelTitle
        };
        songs.push(songObj);
    });
};
// function to sort songs by date
var sortDate = function (songs) {
    var songsSorted = songs.sort(function (a, b) {
        var d1 = new Date(a.published);
        var d2 = new Date(b.published);
        if (d1 >= d2) {
            return -1;
        }
        if (d1 < d2) {
            return 1;
        }
        return 0;
    });
    return songsSorted;
};
// retrieve list of videos
app.get('/api/', function (req, res) {
    // Array of songs to be collected
    var songs = [];
    // Wait until all promises are finished before sending array to front
    Promise.all(promiseMake())
        .then(function (channels) {
        channels.map(function (channel) {
            songInsert(channel, songs);
        });
        res.send(sortDate(songs));
    })["catch"](function (error) {
        res.send({
            status: '500',
            message: error
        });
    });
});
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
// Port
var port = process.env.PORT || 8081;
app.listen(port, function () {
    console.log("listening on port " + port);
});
