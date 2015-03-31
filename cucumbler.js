'use strict';
var request = require('request');
var fs = require('fs');

var list = [];
var url = 'https://spreadsheets.google.com/feeds/list/1t5MZYZ92qMVSBqKsqbf-DXtzapBCSJrMq45lfD5EefU/od6/public/values?alt=json';
var listString = '';

request({
  url: url,
  json: true
}, function (error, response, body) {
  if (!error && response.statusCode === 200) {

    console.log(body); // Print the json response

    body.feed.entry.forEach (function (entry) {
      var tmp = {'element': entry.gsx$element.$t, 'fontSize': entry.gsx$fontsize.$t, 'color': entry.gsx$color.$t  };
      list.push(tmp);
    });

    console.log('Drumroll please');

    console.log('list: ', list);

    listString =  'Feature: Contact Page\n' +
                  '\tAs a user I want visual consistency on http://url.com\n' +
                  '\tScenario: Visit the contact page with a laptop\n' +
                  '\t\tGiven I visit "http://url.com/contact"\n\n';

    list.forEach (function (item) {
      listString += '\t\tThen "' + item.element + '" should have "' + item.fontSize + '" of "' + item.color + '"\n' ;
    });

    fs.writeFile('test.feature', listString, function (err) {
      if (err) { throw err; }
      console.log('It was saved!');
    });
  }
});
