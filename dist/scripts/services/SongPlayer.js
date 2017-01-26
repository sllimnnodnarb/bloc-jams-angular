 (function() {
     function SongPlayer() {
         var SongPlayer = {};
         
/**
 * @desc the current playing song
 * @type {Object}
 */
         var currentSong = null;
/**
 * @desc Buzz object audio file
 * @type {Object}
 */
         var currentBuzzObject = null;
         
         var playSong = function() {
             currentBuzzObject.play();
             song.playing = true
         };
         
/**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
         var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            currentSong = song;
        };
         
/**
 * @function SongPlayer.play
 * @desc if currentSong is not the song, it makes it so, then plays the song, and sets playing to true.  otherwise, if the song is the song, then the song is in the paused state, and gets played
 * @param {object} song
 */       
         SongPlayer.play = function(song) {
                if (currentSong !== song) {
                    setSong(song);    
                    playSong();
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }

         };        
 /**
 * @function SongPlayer.pause
 * @desc pauses the current song and sets playing value to false
 * @param {object} song
 */
         SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
         };
         
          return SongPlayer;
}
 
      angular
          .module('blocJams')
          .factory('SongPlayer', SongPlayer);
 })();