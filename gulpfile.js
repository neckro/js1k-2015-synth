// Settings
var template_file = 'shim.tpl';
var source_file = 'code.js';
var crushed_file = 'crunched.js';
var minified_out = 'index_min.html';
var original_out = 'index.html';
var submission_info = {
	id: '0',
	title: '1k Modular Synthesizer',
	author: 'neckro',
	description: '1k Modular Synthesizer',
	canvas_shim: 'false'
};

// Includes
var gulp = require('gulp');
var extend = require('extend');
var fs = require('fs');
var express = require('express');
var rename = require('gulp-rename');
var mustache = require('gulp-mustache');
var spawn = require('child_process').spawnSync;
var jscrush = require('jscrush');

// Tasks
gulp.task('build', function() {
	var original = fs.readFileSync(source_file);
	//var minified = spawn('closure-compiler', ['--js', source_file, '--compilation_level', 'ADVANCED']);
	var minified = spawn('uglifyjs', [source_file, '--screw-ie8', '--mangle', 'sort,toplevel,eval', '--compress']);
	minified = minified.stdout.toString();
	var crushed = jscrush(minified);
	console.log('Original:', original.length, 'bytes');
	console.log('Minified:', minified.length, 'bytes');
	console.log(' Crushed:', crushed.length, 'bytes');
	fs.writeFileSync(crushed_file, crushed);

	var minified_tags = extend({}, submission_info, {
		demo: crushed
	});

	gulp.src('./' + template_file)
		.pipe(mustache(minified_tags))
		.pipe(rename(minified_out))
		.pipe(gulp.dest('./'))
	;

	var original_tags = extend({}, submission_info, {
		demo: original
	});

	gulp.src('./' + template_file)
		.pipe(mustache(original_tags))
		.pipe(rename(original_out))
		.pipe(gulp.dest('./'))
	;
});

gulp.task('watch', ['build'], function() {
	gulp.watch(source_file, ['build']);
});

gulp.task('default', ['build']);
