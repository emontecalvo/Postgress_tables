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

// knex.select('recipes.name', 'steps.text')
//     .from('recipes')
//     .join('steps', 'steps.recipe_id', 'recipe.id')
//     .then(function(rows) {
//         console.log(rows)
//     });

app.get('/recipes', jsonParser, function(req, res) {
  
  var query = knex.select('recipes.name', 'steps.recipes_id', 'tags.recipes_id')
              .from('recipes')
              .join('steps.step', 'tags.tag', 'recipes.id')
              .then(function(rows) {
                  res.status(200).json(rows);
            });
});







app.listen(process.env.PORT || 8080, process.env.IP);







