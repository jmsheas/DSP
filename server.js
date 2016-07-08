#!/bin/env node
//  OpenShift sample Node application
var express = require("express");
var fs = require('fs');
var browserify = require('browserify-middleware');


var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server port " + server_port )
});

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));
    app.get('/js/bundle.js', browserify(__dirname + '/public/js/main.js'));
});

