"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dependencies
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// define the Express app
const app = (0, express_1.default)();
// YT API Key
const ytKey = process.env.YT_KEY;
// Set base URL to retrieve a Youtube channel's videos
const urlBase = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=7&key=${ytKey}&playlistId=`;
// List of Youtube channel sources
const channelsYT = {
    Proximity: 'UU3ifTl5zKiCAhHIBQYcaTeg',
    'Revealed Music': 'UUnhHe0_bk_1_0So41vsZvWw',
    'Thrilling Music': 'UUh_Ob9q_Tf7-7Opf_6YvaKw',
    WaveMusic: 'UUbuK8xxu2P_sqoMnDsoBrrg',
};
// TODO Figure out how to type Promise.all and axios
// function to create array of promises from urlBase and channelsYT
const promiseMake = () => Object.values(channelsYT).map((channel) => axios_1.default.get(urlBase + channel));
// console.log('promisemake', promiseMake())
// function to format date
const dateFormat = (date) => {
    const dateNew = new Date(date);
    return dateNew.toLocaleString('en-us');
};
// function to insert each song into its own object
const songInsert = (channel, songs) => {
    channel.data.items.map((song) => {
        const songObj = {
            title: song.snippet.title,
            published: dateFormat(song.snippet.publishedAt),
            videoId: song.snippet.resourceId.videoId,
            channel: song.snippet.channelTitle,
        };
        songs.push(songObj);
    });
};
// function to sort songs by date
const sortDate = (songs) => {
    const songsSorted = songs.sort((a, b) => {
        const d1 = new Date(a.published);
        const d2 = new Date(b.published);
        if (d1 >= d2) {
            return -1;
        }
        else if (d1 < d2) {
            return 1;
        }
        else {
            return 0;
        }
    });
    return songsSorted;
};
// retrieve list of videos
app.get('/api/', (req, res) => {
    // Array of songs to be collected
    const songs = [];
    // Wait until all promises are finished before sending array to front
    Promise.all(promiseMake())
        .then((channels) => {
        channels.map((channel) => {
            songInsert(channel, songs);
        });
        res.send(sortDate(songs));
    })
        .catch((error) => {
        res.send({
            status: '500',
            message: error,
        });
    });
});
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express_1.default.static(path_1.default.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, 'client/build', 'index.html'));
    });
}
// Port
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
