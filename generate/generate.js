const fs = require('fs');

const files = {
  "pages-list.json": null,
  "header.html": null,
  "footer.html": null
};



function init() {
  var readFiles = 0;
  var nbFiles = 0;
  for (var idF in files) {
    nbFiles++;
  }
  function readFile(fileId) {
    fs.readFile(fileId, function(err, data) {
      if (err) {
        console.log("Failed to read " + fileId);
      }
      else {
        files[fileId] = String(data);
        readFiles++;
      }
      if (readFiles >= nbFiles) merge();
    });
  }
  for (var idF in files) {
    readFile(idF);
  }
}



function merge() {

  var catgList = JSON.parse(files["pages-list.json"]);

  function generateIndexNav() {
    var indexNav = "";
    for (var idC in catgList) {
      var catg = catgList[idC];
      if (idC != "index") {
        indexNav += '<li class="add-api-key-link"><h5>' + catg.name + '</h5>';
        for (var idP in catg.pages) {
          var page = catg.pages[idP];
          indexNav += '<a href="/' + idC + '/' + idP + '.html">' + page.title + '</a>';
        }
        indexNav += "</li>";
      }
    }
    return indexNav;
  }

  function generateNav(currCatg, currPage) {
    var nav = "";
    for (var idC in catgList) {
      var catg = catgList[idC];
      if (idC == "index") {
        nav += '<li class="add-api-key-link"><a href="/"' + ((currCatg == "index") ? ' class="active"' : '') + '>Overview</a></li>'
      }
      else {
        nav += '<li class="add-api-key-link"><a class="' + ((currCatg == idC) ? 'active open ' : '') + 'has-child" href="#">' + catg.name + '</a><ul>';
        for (var idP in catg.pages) {
          var page = catg.pages[idP];
          nav += '<li class="add-api-key-link"><a ' + ((currCatg == idC && currPage == idP) ? 'class="active" ' : '') + 'href="/' + idC + '/' + idP + '.html">' + page.title + '</a></li>';
        }
        nav += "</ul></li>";
      }
    }
    return nav;
  }

  function getHeader(currCatg, currPage) {
    if (currCatg == "index"){
      windowTitle = catgList[currCatg].window_title || catgList[currCatg].title
    } else {
      windowTitle = catgList[currCatg].pages[currPage].window_title || catgList[currCatg].pages[currPage].title
    }

    return files["header.html"].replace(/{{nav}}/g, generateNav(currCatg, currPage)).replace(/{{title}}/g, windowTitle);
  }

  function getBody(currCatg, currPage, data) {
    return (currCatg == "index") ? String(data).replace(/{{quick-nav}}/g, generateIndexNav()) : data;
  }

  function getFooter(currCatg, currPage) {
    return files["footer.html"];
  }

  function writePage(idC, idP) {
    var path = ((idC == "index") ? "index.html" : (idC + '/' + idP + '.html'));
    fs.readFile('./' + path, function(err, data) {
      if (err) {
        console.log("Failed to read " + './' + path);
      }
      else {
        fs.writeFile('../' + path, getHeader(idC, idP) + getBody(idC, idP, data) + getFooter(idC, idP), function(err) {
          if (err) console.log("Failed to write file " + '../' + path);
          else console.log('../' + path);
        });
      }
    });
  }

  function writeCatg(idC) {
    if (idC == "index") {
      writePage(idC, null);
    }
    else {
      function writePages() {
        for (var idP in catgList[idC].pages) {
          writePage(idC, idP);
        }
      }
      fs.access('../' + idC, function(err) {
        if (err) {
          fs.mkdir('../' + idC, function(err) {
            if (err) {
              console.log("Failed to create directory " + '../' + idC + '(' + err + ')');
            }
            else {
              console.log("New folder: " + '../' + idC);
              writePages();
            }
          })
        }
        else writePages();
      });
    }
  }

  // Parse pages-list
  for (var idC in catgList) {
    writeCatg(idC);
  }
}

// Change pwd to allow launch from another path
process.chdir(process.mainModule.filename.substr(0, process.mainModule.filename.lastIndexOf('/')));
init();
