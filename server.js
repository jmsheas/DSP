#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var browserify = require('browserify-middleware');
var pdfFiller = require('pdffiller');


var app = express();
app.use(express.json());
app.use(express.urlencoded());


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server port " + server_port )
  console.log(__dirname)

});

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));
    app.get('/js/bundle.js', browserify(__dirname + '/public/js/main.js'));
});


  

app.post('/public/formfill', function(req, res) {
    console.log("called to main");
    var data = req.body;
    var sourcePDF = 'public/files/scholarship.pdf';
    var destinationPDF = 'public/files/scholarshipdone.pdf';

    pdfFiller.fillForm( sourcePDF, destinationPDF, data, function(err) {
        if (err) {
            return console.error(err);
        }
    });


    //fs.unlink('public/files/scholarshipdone.pdf', function(err) {
    //    if (err) {
    //        return console.error(err);
    //    }
    //});


});