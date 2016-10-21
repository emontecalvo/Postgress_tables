var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
app.use(express.static('public'));

var knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'pizza',
        password: 'thinkful'
    },
});

app.post('/recipes', jsonParser, function(req, res) {
//   knex.insert({
//     name: 'Khichidi Kadhi',
//     description: 'Rice and lentils with a yoghurt gravy'
// }).into('recipes').then();
  if (!req.body.name) {
    return res.status(422).json({message: 'Missing field: name'});
  }
  if (!req.body.description) {
    return res.status(422).json({message: 'Missing field: description'});
  }
  // if (!req.body.name) {
  //   return res.status(422).json({message: 'Missing field: name'});
  // }
    knex.insert({
      name: req.body.name,
      description: req.body.description
    }).into('recipes').then();
  
//  res.status(201).json({});
})



app.get('/recipes', jsonParser, function(req, res) {
    knex.select('recipes.name', 'steps.step')
      .from('recipes')
      .join('steps', 'steps.recipes_id', 'recipes.id')
      .then(function(rows) {
      var retuObj = {};
        for (var i = 0; i < rows.length; i++) {
          if (retuObj.hasOwnProperty(rows[i].name)) {
            retuObj[rows[i].name].step.push(rows[i].step);
          } else {
            // Dennell and Emily:  please talk to your
            // mentors about taking off the excessive
            // pizza name key 
            retuObj[rows[i].name] = {
              name: rows[i].name,
              step: [rows[i].step],
            };
          }
        }
        knex.select('recipes.name', 'tags.tag')
          .from('recipes')
          .join('tags', 'tags.recipes_id', 'recipes.id')
          .then(function(rows2) {
          var retuObj = {};
            for (var i = 0; i < rows2.length; i++) {
              if (retuObj.hasOwnProperty(rows2[i].name)) {
                retuObj[rows2[i].name].tag.push(rows2[i].tag);
              } else {
                retuObj[rows2[i].name] = {
                  name: rows2[i].name,
                  tag: [rows2[i].tag],
                };
              }
            }
        res.status(200).json(retuObj);
      });
    });


            
});







app.listen(process.env.PORT || 8080, process.env.IP);







