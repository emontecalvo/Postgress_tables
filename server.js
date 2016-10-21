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
    knex.select('recipes.name', 'steps.step')
      .from('recipes')
      .join('steps', 'steps.recipes_id', 'recipes.id')
      .then(function(rows) {
        var retuObj = {};
        for (var i = 0; i < rows.length; i++) {
          if (retuObj.hasOwnProperty(rows[i].name)) {
            retuObj[rows[i].name].step.push(rows[i].step);
          } else {
            retuObj[rows[i].name] = {
              name: rows[i].name,
              //step: rows[i].step.split("'Twas Brillig, and the slithy toves")
              step: [rows[i].step],
            };
          }
        }
        console.log(retuObj);
        res.status(200).json(retuObj);
      
    });
            
});







app.listen(process.env.PORT || 8080, process.env.IP);







