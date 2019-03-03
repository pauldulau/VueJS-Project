const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express();
const cors = require('cors');
const upload = multer({ dest: './src/static/poster/' });
const fs = require("fs");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded());
router.use('/static', express.static(path.join(__dirname + '/../static')));

//Movies examples
const movies = [
  {
    id: 0,
    title: "Bohemian Rhapsody",
    real: {
      name: 'Bryan Singer',
      nationality : 'Américain',
      birth : '17/09/1965'
    },
    note : "5",
    year : '2018',
    lang : 'Anglais',
    type : 'Biographie',
    desc : 'Bohemian Rhapsody retrace le destin extraordinaire du groupe Queen et de leur chanteur emblématique Freddie Mercury, qui a défié les stéréotypes, brisé les conventions et révolutionné la musique. Du succès fulgurant de Freddie Mercury à ses excès, risquant la quasi-implosion du groupe, jusqu\’à son retour triomphal sur scène lors du concert Live Aid, alors qu\’il était frappé par la maladie, découvrez la vie exceptionnelle d\’un homme qui continue d\’inspirer les outsiders, les rêveurs et tous ceux qui aiment la musique.',
    poster_url : '/../../static/poster/bohemianRhapsody.jpg'
  },
  {
    id: 1,
    title: "Avengers : Infinity War",
    real: {
      name: 'Joe Russo',
      nationality : 'Américain',
      birth : '08/07/1971'
    },
    note : "5",
    year : '2018',
    lang : 'Anglais',
    type : 'Aventure',
    desc : 'Despote craint dans tout l\'univers, père adoptif de Gamora et Nébula, Thanos a commencé à recueillir les six Pierres d\'Infinité : la Pierre du Pouvoir, la Pierre de l\'Espace, la Pierre de la Réalité, la Pierre de l\'Âme, la Pierre du Temps et la Pierre de l\'Esprit. Son objectif est de réunir ces six artefacts sur le Gant de l\'Infini, forgé jadis par le nain Eitri sur Nidavellir, afin d\'utiliser leur immense puissance pour détruire la moitié de la population de l\'Univers et rétablir ainsi un certain équilibre. Dans sa quête le menant sur diverses planètes, la Terre, Knowhere et Vormir, Thanos est aidé par ses enfants adoptifs : Cull Obsidian, Ebony Maw, Proxima Midnight et Corvus Glaive3. Face à cette nouvelle menace qui concerne l\'Univers entier, le groupe de super-héros des Avengers, divisé depuis 2 ans, doit se reformer, et s\'associer au Docteur Strange, aux Gardiens de la Galaxie et au peuple du Wakanda.',
    poster_url : '/../../static/poster/avengersInfWar.jpg'
  },
  {
    id: 2,
    title: "Les Indestructibles 2",
    real: {
      name: 'Brad Bird',
      nationality : 'Américain',
      birth : '24/09/1957'
    },
    note : "4",
    year : '2018',
    lang : 'Anglais',
    type : 'Animation',
    desc : 'Notre famille de super-héros préférée est de retour ! Cette fois c\’est Hélène qui se retrouve sur le devant de la scène laissant à Bob le soin de mener à bien les mille et une missions de la vie quotidienne et de s\’occuper de Violette, Flèche et de bébé Jack-Jack. C’est un changement de rythme difficile pour la famille d\’autant que personne ne mesure réellement l\’étendue des incroyables pouvoirs du petit dernier… Lorsqu\’un nouvel ennemi fait surface, la famille et Frozone vont devoir s\’allier comme jamais pour déjouer son plan machiavélique.',
    poster_url : '/../../static/poster/lesIndestructibles2.jpg'
  },
  {
    id: 3,
    title: "Dunkerque",
    real: {
      name: 'Christopher Nolan',
      nationality : 'Britannique',
      birth : '30/07/1970'
    },
    note : "4",
    year : '2017',
    lang : 'Anglais',
    type : 'Action',
    desc : 'Le récit de la fameuse évacuation des troupes alliées de Dunkerque en mai 1940.',
    poster_url : '/../../static/poster/dunkerque.jpg'
  },
  {
    id: 4,
    title: "Moonlight",
    real: {
      name: 'Barry Jenkins',
      nationality : 'Américain',
      birth : '19/11/1979'
    },
    note : "3",
    year : '2016',
    lang : 'Anglais',
    type : 'Drame',
    desc : 'Après avoir grandi dans un quartier difficile de Miami, Chiron, un jeune homme tente de trouver sa place dans le monde. Moonlight évoque son parcours, de l\’enfance à l\’âge adulte.',
    poster_url : '/../../static/poster/moonlight.jpg'
  },
  {
    id: 5,
    title: "Dragonball Evolution",
    real: {
      name: 'James Wong',
      nationality : 'Américain',
      birth : '20/04/1959'
    },
    note : "1",
    year : '2009',
    lang : 'Anglais',
    type : 'Fantastique',
    desc : 'Dans les temps anciens, la Terre faillit être détruite par des forces maléfiques. Pour s\'en prémunir, sept sages créèrent les boules de cristal : les Dragonballs. Décidées à prendre leur revanche, les forces du Mal sont désormais de retour, et un seul guerrier d\'exception est capable d\'empêcher le pire. Le jeune Sangoku va alors découvrir le jour de ses 18 ans que son destin est trés loin de ce qu\'il avait imaginé.',
    poster_url : '/../../static/poster/dragonballEvolution.jpg'
  },
];
const type = upload.single('file');

router.get('/src/dist/build.js', (request, response) => {
  response.sendFile(path.join(__dirname + '/../dist/build.js'))
});

router.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/../../index.html'))
});

//Get all movies
router.get('/api/movies', (request, response) => {
  response.json(movies)
});

//Add
router.post('/api/movie', (request, response) => {
  let movie = request.body;
  let id = null;
  do {
    id = Math.random().toString(36).slice(2); //Génération d'un id aléatoire
  } while (movies.some(movie => movie.id === id));
  movie.id = id;
  movies.push(movie);
  response.status(200);
  response.json(movie);
});

//Remove a movie
router.put('/api/movie/:id', (request, response) => {
  let id = request.body.params.id;
  if(id !== -1) {
    movies.splice(id, 1);
    response.json(movies);
  } else {
    response.status(404);
    response.json({error: "DELETE : Movie not found."})
  }
});

//Edit
router.put('/api/movie/edit/:movie', (request, response) => {
  let movie = request.body;
  if(movies.findIndex(m => movie.id === m.id) !== -1) {
    movies.splice(movies.findIndex(m => movie.id === m.id), 1, movie);
    response.json(movies);
  } else {
    response.status(404);
    response.json({error: "EDIT : Movie not found."})
  }
});

//Upload poster
router.post('/api/upload', type, function (req, res, next) {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    const extension = req.file.originalname.split(".").reverse()[0];
    const filename = req.file.originalname.split(".")[0] + "_" + req.body.movieId + "." + extension; //unicite de l'image grace à l'ID
    const newPath = req.file.destination + filename; //Nouveau nom

    let index = movies.findIndex(m => m.id == req.body.movieId);
    if(index !== -1) {
      movies[index].poster_url = "/../../static/poster/" + filename;
      fs.rename(req.file.path, newPath,
        err => {
          if (err) {
            throw (err);
          }
        }
      );
      res.status(200);
      return res.send({
        success: true
      });
    }
    else {
      res.status(404);
      res.json({error: "UPLOAD POSTER : Movie not found."})
    }
  }
});

module.exports = router;
