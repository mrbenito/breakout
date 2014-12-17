function Sound(src,repeat) {
  var elements = [];
  for (var i=0;i<repeat;i++) {
    var audio = document.createElement("audio");
    var mp3 = document.createElement("source");
    mp3.src = src + ".mp3";
    audio.appendChild(mp3);
    var wav = document.createElement("source");
    wav.src = src + ".wav";
    audio.appendChild(wav);
    elements.push(audio);
  }
  var last_played = 0;
  function play() {
    last_played +=1;
    if (last_played == repeat) {
      last_played = 0;
    }
    elements[last_played].play();
  }
  function stop() { elements[last_played].stop(); }
  function set_volume(level) {
    for (var i=0;i<elements.length;i++) { elements[i].volume=level; }
  }
  return {
    play: play,
    stop: stop,
    set_volume: set_volume
  }
}

var beep = new Sound("beep",8);
beep.set_volume(0.5);
