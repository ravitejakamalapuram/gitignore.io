var app = require("../app");

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'gitignore.io' });
};

exports.dropdown = function(req, res){
  res.send(app.gitIgnoreDropdownList);
}
/*
 * GET Command Line Instructions page.
 */

exports.cli = function(req, res){
  res.render('cli', { title: 'gitignore.io' });
};

exports.help =  function(req, res){
  res.send('gitignore.io help:\n  list    - lists the operating systems, programming languages and IDE input types\n  :types: - generates .gitignore files for types of operating systems, programming languages or IDEs\n');
};
/*
 * GET API page.
 */

exports.apiIgnore = function(req, res){
//  console.log(req.params.ignore);
  var ignoreFileList = req.params.ignore.split(",");
  var output = "# Generated by http://gitignore.io\n";
  for (var file in ignoreFileList){
    if (app.gitIgnoreJSONObject[ignoreFileList[file]] == undefined){
      output += "\n#!! ERROR: " + ignoreFileList[file] + " is undefined. Use list command to see defined gitignore types !!#\n"
    } else {
      output += "\n### " + app.gitIgnoreJSONObject[ignoreFileList[file]].name + " ###\n"
      output += app.gitIgnoreJSONObject[ignoreFileList[file]].contents+"\n";
    }
  }
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Expires', '0');
  res.send(output);
};
/*
 * GET List of all ignore types
 */
exports.apiListTypes = function(req, res){
  res.setHeader('Content-Type', 'text/plain');
  res.send(app.gitIgnoreJSONString);
};
