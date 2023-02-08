// import dependencies
import express from 'express';
import axios, {AxiosResponse} from 'axios';
import path from 'path';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// define the Express app
const app = express();

// YT API Key
const ytKey = process.env.YT_KEY;
// Set base URL to retrieve a Youtube channel's videos
const urlBase = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=7&key=${ytKey}&playlistId=`;

// Types
interface ChannelsObj {
    Proximity: string,
    'Revealed Music': string,
    'Thrilling Music': string,
    WaveMusic: string
}
interface SongResponse {
    snippet: {
        title: string,
        publishedAt: string,
        resourceId: {
            videoId: string
        },
        channelTitle: string
    }
}
interface ChannelResponse {
    data: {
        items: SongResponse[]
    }
}
interface Song {
    title: string,
    published: string,
    videoId: string,
    channel: string
}

// List of Youtube channel sources
const channelsYT: ChannelsObj = {
  Proximity: 'UU3ifTl5zKiCAhHIBQYcaTeg',
  'Revealed Music': 'UUnhHe0_bk_1_0So41vsZvWw',
  'Thrilling Music': 'UUh_Ob9q_Tf7-7Opf_6YvaKw',
  WaveMusic: 'UUbuK8xxu2P_sqoMnDsoBrrg',
};

// TODO Figure out how to type Promise.all and axios
// function to create array of promises from urlBase and channelsYT
const promiseMake = () => Object.values(channelsYT).map((channel: string) => axios.get(urlBase + channel));

// console.log('promisemake', promiseMake())

// function to format date
const dateFormat = (date: string) => {
  const dateNew = new Date(date);
  return dateNew.toLocaleString('en-us');
};

// function to insert each song into its own object

const songInsert = (channel: ChannelResponse, songs: Song[]) => {
  channel.data.items.map((song: SongResponse) => {
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
const sortDate = (songs: Song[]) => {
  const songsSorted = songs.sort((a, b) => {
    const d1 = new Date(a.published);
    const d2 = new Date(b.published);
    if (d1 >= d2) {
        return -1;
    } else if (d1 < d2) {
        return 1;
    } else {
        return 0;
    }
  });
  return songsSorted;
};

// retrieve list of videos
app.get('/api/', (req, res) => {
  // Array of songs to be collected
  const songs: Song[] = [];

  // Wait until all promises are finished before sending array to front
  Promise.all(promiseMake())
    .then((channels: ChannelResponse[]) => {
        channels.map((channel: ChannelResponse) => {
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
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Port
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
