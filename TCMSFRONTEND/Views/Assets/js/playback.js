﻿var href = "http://107.189.40.50/ptv/iran/" + document.getElementById('inpPlayback').value.replace('\\', '/');
var config = {
    abouttext: 'ایران کالا'
    , aboutlink: window.location.hostname
    , width: "100%"
    , stretching: 'uniform'
    , controls: true
    , aspectratio: '16:9'
    , autostart: true
    , analytics: { enabled: false, cookies: false }
};
config.playlist = [{
    image: href.replace('mp4', 'jpg')
    , sources: [
        { "file": href, "label": "1080p", "default": true },
        { "file": href.replace('.mp4', '_low800.mp4'), "label": "720p" },
        { "file": href.replace('.mp4', '_low400.mp4'), "label": "360p" },
        { "file": href.replace('.mp4', '_low200.mp4'), "label": "180p" }
    ]
}];

if (typeof jwplayer !== "undefined") {
    jwplayer("mediaplayer").setup(config);
}

/*
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
function IE(v) {
    var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
    return r.test(navigator.userAgent);
}

var rfile = '', rfile = '';
var srcs;
var ff22 = document.getElementById('inpPlayback').value;
ff22v = ff22.replace("\\", "/");
var ff23 = document.getElementById('imgPlayback').src;
var baseAddr = "http://178.32.255.194/ptv/iran/";
srcs = [
        { "file": baseAddr + ff22, "label": "1080p", "default": true },
        { "file": baseAddr + ff22.replace('.mp4', '_low800.mp4'), "label": "720p" },
        { "file": baseAddr + ff22.replace('.mp4', '_low400.mp4'), "label": "360p" },
		{ "file": baseAddr + ff22.replace('.mp4', '_low200.mp4'), "label": "180p" }
];
jwplayer("mediaplayer").setup({
    playlist: [{
        image: ff23.replace(" ", "%20").replace('.mp4', '.jpg').replace('\\', '/'),
        sources: srcs,
        tracks: [{
            file: baseAddr + ff22.replace('\\', '/').replace('.mp4', '.vtt'),
            kind: "thumbnails"
            //file: "http://217.218.67.244:8181/vtt.aspx?address="+baseAddr+ff22+"&format=.vtt", 
            // file: 'http://217.218.67.233:82/video' + ff22.replace('.mp4', '.mp4'),
        }]
    }],
    height: '100%',
    //autostart: true,
    startparam: "start",
    width: '100%',
    //primary: (IE(9)||IE(10))?"html5":"flash",
    primary: "html5",
    skin: "/views/assets/player/six.xml",
    stretching: "fill"
});
//}, 50);
*/