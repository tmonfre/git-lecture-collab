/* SETUP */
const map = L.map('map',{
    tms: false
}).setView([42.755942, -72.8092041],3);

const PersonIcon = L.Icon.extend({
    options: {
        iconSize: [60, 60],
        className: 'circular',
        popupAnchor:  [0, -30],
    }
});

// load up the background tile layer
L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {}).addTo(map);

const facemarkers = L.layerGroup();

// function to add markers
const addMarker = (options) => {
  const icon = new PersonIcon({iconUrl: options.iconUrl});
  const marker = L.marker(options.lat_long, { icon }).bindPopup(options.name + "  |  " + options.message);
  facemarkers.addLayer(marker);
};

// parse json and attempt to print out better error message
const parseJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    const char = error.message.match(/position (\d*)/)
    if (char.length > 1) {
      const i = parseInt(char[1]);
      console.log('error is near: \n' + text.slice(i-50, i+50));
      console.log('probably somewhere right before: ' + text.slice(i, i+5));
      console.log('try running your JSON through: https://jsonformatter.curiousconcept.com/');
    } else {
      console.log('error in: \n' + char);
    }
    throw error;
  }
}

// load members json
const loadJSONFiles = (index, accumulator, callback) => {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', `people-${index}.json`);

    xobj.onreadystatechange = () => {
      if (xobj.readyState == 4 && xobj.status == "200") {
        const newlist = parseJSON(xobj.responseText);

        if (index > 0) {
          loadJSONFiles(index - 1, accumulator.concat(newlist), callback);
        } else {
          callback(accumulator.concat(newlist));
        }
      }
    };

    xobj.send(null);
};

// load and process members
loadJSONFiles(1, [], function(response) {
  const members = response;

  Object.keys(members).forEach((member) => {
    addMarker(members[member]);
  });

  facemarkers.eachLayer((marker) => {
    marker.on('mouseover', (e) => {
      e.target.openPopup();
    });
    marker.on('mouseout', (e) => {
      e.target.closePopup();
    });
  });

  map.addLayer(facemarkers);
});


// setup the info control layer
const info = L.control();

info.onAdd = (map) => {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this._div.innerHTML = '<a href="https://github.com/tmonfre/git-lecture-collab" target="_blank"><h4>CS50 Git Lecture Collab</h4></a><p><a href="https://github.com/tmonfre/git-lecture-collab" target="_blank">code on github</p></a>';
    return this._div;
};

info.addTo(map);
