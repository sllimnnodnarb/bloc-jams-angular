(function() {
    function Fixtures() {
        var Fixtures = {};
         
        var albumPicasso = {
            title: 'The Colors',
            artist: 'Pablo Picasso',
            label: 'Cubism',
            year: '1881',
            albumArtUrl: '../assets/images/album_covers/01.png',
            songs: [
                { title: 'Sweet Home Alabama', duration: '94.00', audioUrl: '/assets/music/bloc_jams_music/alabama' },
                { title: 'Money for Nothin', duration: '63.00', audioUrl: '/assets/music/bloc_jams_music/money' },
                { title: 'You Got The Music in You' , duration: '23.00', audioUrl: '/assets/music/bloc_jams_music/music' },
                { title: 'We Will Rock You', duration: '26.00', audioUrl: '/assets/music/bloc_jams_music/queen' },
                { title: 'Stayin Alive', duration: '48.00', audioUrl: '/assets/music/bloc_jams_music/alive' }
            ]
        };
 
        var albumMarconi = {
            title: 'The Telephone',
            artist: 'Guglielmo Marconi',
            label: 'EM',
            year: '1909',
            albumArtUrl: '../assets/images/album_covers/20.png',
            songs: [
                { title: 'Hello, Operator?', duration: '1:01' },
                { title: 'Ring, ring, ring', duration: '5:01' },
                { title: 'Fits in your pocket', duration: '3:21' },
                { title: 'Can you hear me now?', duration: '3:14' },
                { title: 'Wrong phone number', duration: '2:15' }
            ]
        };
         
        Fixtures.getAlbum = function() {
            return albumPicasso;
        };
         
        Fixtures.getCollection = function(numberOfAlbums) {
            var albums = [];
            for (var i = 0; i < numberOfAlbums; i++) {
                albums.push(angular.copy(albumPicasso));
            }   
            return albums;
        };
        
        return Fixtures;
    }
 
        angular
            .module('blocJams')
            .factory('Fixtures', Fixtures);
 })();