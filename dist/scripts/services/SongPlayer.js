(function() {
    function SongPlayer($rootScope, Fixtures) {
        /**
        * @desc service that plays songs
        * @param object
        */          
        var SongPlayer = {};
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
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
            /**
            * @desc curent Buzz object audio file
            * @type {Object}
            */
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
           
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            
            /**
            * @desc current Buzz object audio file
            * @type {Object}
            */
            SongPlayer.currentSong = song;
        };         
         /**
         * @function playsong
         * @desc plays the current buzz object
         * @param {Object} song
         */ 
         var playSong = function(song) {
             song.playing = true;
             currentBuzzObject.play(); 
         };
         
         /**
         * @function setSong
         * @desc gets the index of the song on the album
         * @param {Object} song
         */ 
         var getSongIndex = function(song) {
            return SongPlayer.currentAlbum.songs.indexOf(song);
         };
        
         SongPlayer.currentAlbum = Fixtures.getAlbum();
         
         SongPlayer.currentSong = null;  
        
         SongPlayer.currentTime = null;
        
         SongPlayer.volume = 50;
         
         /**
         * @function SongPlayer.play
         * @desc if currentSong is not the song, it makes it so, then plays the song, and sets playing to true.  otherwise, if the song is the song, then the song is in the paused state, and gets played
         * @param {object} song
         */       
         SongPlayer.play = function(song) {
                song = song || SongPlayer.currentSong;
                if (SongPlayer.currentSong !== song) {
                    setSong(song);    
                    playSong(song);
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
                stopSong(SongPlayer.currentSong);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
          };
         
         /**
         * @function SongPlayer.next
         * @desc indexes to and plays next song and increments the currentsongindex, stops song after last index in the present album
         * @param 
         */   
         SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
             
            if (currentSongIndex >= SongPlayer.currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            } 
         };
        
         SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
         };
            
         SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
         };
         /**
         * @function stopSong
         * @desc stops current buzz object and sets the song.playing to null
         * @param 
         */   
         var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
         };
        
         return SongPlayer;           
    };

        angular
          .module('blocJams')
          .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();