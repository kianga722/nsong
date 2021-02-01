// import dependencies
const express = require('express');
const axios = require('axios');
const path = require('path');
// types
import { Request, Response } from 'express';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// define the Express app
const app = express();

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

// function to create array of promises from urlBase and channelsYT
const promiseMake: () => Promise<any>[] = () => Object.values(channelsYT).map(channel => axios.get(urlBase + channel));

// function to format date
const dateFormat = (date: string) => {
  const dateNew = new Date(date);
  return dateNew.toLocaleString('en-us');
};



type YTSongItem = {
    snippet: {
        title: string,
        publishedAt: string,
        resourceId: {
            videoId: string
        },
        channelTitle: string
    }
}

type YTChannel = {
    data: {
        items: YTSongItem[]
    }
}

type SongObject = {
    title: string,
    published: string,
    videoId: string,
    channel: string
}

// function to insert each song into its own object
const songInsert = (channel: YTChannel, songs: SongObject[]) => {
  channel.data.items.map((song: YTSongItem) => {
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
const sortDate = (songs: SongObject[]) => {
  const songsSorted = songs.sort((a: SongObject, b: SongObject) => {
    const d1 = new Date(a.published);
    const d2 = new Date(b.published);
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
app.get('/api/', (req: Request, res: Response) => {
  // Array of songs to be collected
  const songs: SongObject[] = [];

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
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Port
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
