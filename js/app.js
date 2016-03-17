/* MODEL */

var model = {
  currentTVShow: null,
  TVShows: [
    {
      clickCount : 0,
      name : 'Mr.Robot',
      imgSrc : 'img/mr-robot.jpeg'
    },
    {
      clickCount : 0,
      name : 'Orphan Black',
      imgSrc : 'img/OB.jpeg'
    },
    {
      clickCount : 0,
      name : 'Penny Dreadful',
      imgSrc : 'img/PD.png'
    },
    {
      clickCount : 0,
      name : 'The 100',
      imgSrc : 'img/100.jpeg'
    },
    {
      clickCount : 0,
      name : 'iZombie',
      imgSrc : 'img/iZ.jpeg'
    }
  ]
};

/* CONTROLLER */

var controller = {

  init: function() {
    model.currentTVShow = model.TVShows[0];
    TVShowListView.init();
    TVShowView.init();
  },

  getCurrentTVShow: function() {
    return model.currentTVShow;
  },

  getTVShows: function() {
    return model.TVShows;
  },

  setCurrentTVShow: function(TVShow) {
    model.currentTVShow = TVShow;
  },

  incrementCounter: function() {
    model.currentTVShow.clickCount++;
    TVShowView.render();
  }
};


/* VIEW */

var TVShowView = {

  init: function() {
    this.TVShowElem = document.getElementById('TVShow');
    this.TVShowNameElem = document.getElementById('TVShow-name');
    this.TVShowImageElem = document.getElementById('TVShow-img');
    this.countElem = document.getElementById('TVShow-count');

    this.TVShowImageElem.addEventListener('click', function() {
      controller.incrementCounter();
    });

    this.render();
  },

  render: function() {
    var currentTVShow = controller.getCurrentTVShow();
    this.countElem.textContent = currentTVShow.clickCount;
    this.TVShowNameElem.textContent = currentTVShow.name;
    this.TVShowImageElem.src = currentTVShow.imgSrc;
  }
};

var TVShowListView = {

  init: function() {
    this.TVShowListElem = document.getElementById('TVShow-list');

    this.render();
  },

  render: function() {
    var TVShow, elem, i;
    var TVShows = controller.getTVShows();

    this.TVShowListElem.innerHTML = '';

    for (i = 0; i < TVShows.length; i++) {
      TVShow = TVShows[i];

      elem = document.createElement('li');
      elem.textContent = TVShow.name;

      elem.addEventListener('click', (function(TVShowCopy) {
        return function() {
          controller.setCurrentTVShow(TVShowCopy);
          TVShowView.render();
        };
      })(TVShow));

      this.TVShowListElem.appendChild(elem);
    }
  }
};

controller.init();
