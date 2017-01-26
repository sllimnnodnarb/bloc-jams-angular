 (function() {
     function SongPlayer(Fixtures) {
         var SongPlayer = {};
/**
* @function the current album
* @desc retreives the current album
* @param 
*/
         var currentAlbum = Fixtures.getAlbum();
/**
 * @desc Buzz object audio file
 * @type {Object}
 */
         var currentBuzzObject = null;
         
         var playSong = function(song) {
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
                 SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 /**
 * @function setSong
 * @desc gets the index of the song on the album
 * @param {Object} song
 */ 
              var getSongIndex = function(song) {
                  return currentAlbum.songs.indexOf(song);
              };
             
            SongPlayer.currentSong = song;
        };
         
         /**
 * @desc the current playing song
 * @type {Object}
 */
         SongPlayer.currentSong = null;
         
/**
 * @function SongPlayer.play
 * @desc if currentSong is not the song, it makes it so, then plays the song, and sets playing to true.  otherwise, if the song is the song, then the song is in the paused state, and gets played
 * @param {object} song
 */       
         SongPlayer.play = function(song) {
                song = song || SongPlayer.currentSong;
                if (SongPlayer.currentSong !== song) {
                    setSong(song);    
                    playSong();
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }

         };        
 /**
 * @function SongPlayer.pause
 * @desc pauses the current song and sets playing value to false
 * @param {object} song
 */
         SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
         };
         
 /**
 * @function SongPlayer.previous
 * @desc indexes to and plays previous song and decrements the currentsongindex, stops playing current song if index is zero and is clicked
 * @param 
 */    
         SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
             
             if (currentSongIndex < 0) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
         };

         
          return SongPlayer;
}
 
      angular
          .module('blocJams')
          .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();