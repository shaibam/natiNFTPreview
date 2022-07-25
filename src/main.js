const _ = require('lodash');
const { makeVideo } = require("./ffmpegVariations")
const { concatSounds } = require("./ffmpegVariations")
const { mergeSounds } = require("./ffmpegVariations")

const INTRO_SOUND = './FartMix/Background_audio/intro_2sec.mp3'
const PART2_SOUND = './FartMix/Background_audio/part2_BG.mp3'

const EXPORT_FOLDER = './exports'

const fs = require('fs');
const rootDirs = fs.readdirSync('./FartMix').slice(1);
(async () => {
    let count = 0;
    for (var i in rootDirs) {
        console.log(rootDirs)
        if (i < 2) continue;
        const dir = './FartMix/' + rootDirs[i]
        const files = fs.readdirSync(dir);
        const videoIndex = _.findIndex(files, (f) => f.indexOf('.mp4') !== -1);
        const video = files[videoIndex];

        const _files = _.filter(files, (f) => f.indexOf('.mp4') === -1 && f.indexOf('.jpg') === -1)

        count += _files.length;
        const exportDir = EXPORT_FOLDER + '/' + rootDirs[i];

        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir);
        }

        for (var j in _files) {
            await mergeSounds(dir + '/' + _files[j], PART2_SOUND);
            await concatSounds(INTRO_SOUND, './mergedSounds.mp3');
            await makeVideo(dir + '/' + video, './concatSound.mp3', exportDir + '/' + _files[j].split('.')[0] + '.mp4');
        }
    }
    console.log({ filesCount: count });
})()

//mergeSounds('./FartMix/Applause/Applause 1.mp3', PART2_SOUND)
//    .then(() => {
//        concatSounds(INTRO_SOUND, './mergedSounds.mp3')
//            .then(() => {
//                makeVideo('./FartMix/Applause/Applause.mp4', './concatSound.mp3', './madeVideo.mp4')
//            })
//    })