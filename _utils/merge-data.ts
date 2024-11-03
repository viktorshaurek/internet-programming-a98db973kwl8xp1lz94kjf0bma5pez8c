import * as fs from 'fs';

type Era = "Modern" | "Classic" | "Recent"

type Doctor = {
    actor: string;
    incarnation: `${string} Doctor`;
}

type Cast = {
    actor: string;
    character: string;
}

type Episode = {
    rank: number,
    title: string,
    series: number,
    era: Era,
    broadcast_date: string,
    director: string,
    writer: string,
    plot: string
    doctor: Doctor,
    companion: Cast,
    cast: Cast[];
}

type EpisodeData = {
    episodes: Episode[]
}

// read all the files in the data folder
const files = fs.readdirSync('../data');

// read the content of each file
const episodes = files.map((file) => {
    const data = fs.readFileSync(`../data/${file}`, 'utf-8');
    return JSON.parse(data) as EpisodeData;
});

// merge all the episodes into a single array
const allEpisodes = episodes.reduce((acc, curr) => {
    return acc.concat(curr.episodes);
}, [] as Episode[]);

// write the merged data to a file

fs.writeFileSync('../data/doctor-who-episodes.json', JSON.stringify({episodes: allEpisodes}, null, 2));

//extract unique values for doctors

// const doctors = allEpisodes.map((episode) => episode?.doctor.incarnation);

// const uniqueDoctors = Array.from(new Set(doctors));

// console.log(uniqueDoctors);


// console.log(allEpisodes.filter((episode) => !episode));
