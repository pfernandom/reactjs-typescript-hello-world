module.exports = function(grunt) {
	
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		connect : {
			server : {
				options : {
					port : 9001,
					base : '.'
				}
			},
			dist : {
				options : {
					port : 9001,
					base : './dist'
				}
			}
		},
		jshint: {
			all: ['Gruntfile.js', '<%=conf.src%>**/*.js']
		},
		csslint: {
		  all: {
			options: {
			  import: 2
			},
			src: ['<%= conf.src %>**/*.css']
		  }
		},
		watch: {
			bower:{
				files: ['bower_components/*'],
				tasks: ['loadconst','wiredep']
			},
			html: {
				files: ['index.html'],
				tasks: ['loadconst','build'],
				options: {
					interrupt: true
				}
			},
			js: {
				files: ['<%=conf.src%>/**/*.js'],
				tasks: ['loadconst','jshint:all','build'],
				options: {
					interrupt: true
				}
			},
			sass: {
				files: ['<%=conf.src%>/**/*.scss'],
				tasks: ['loadconst','sass:build' ,'build'],
				options: {
					interrupt: true
				}
			},
			typescript: {
				files: ['src/ts/*.ts','src/ts/*.tsx'],
				tasks: ['loadconst','ts','build']
			}
		},
		wiredep: {
			dev: {
				src: ['index.html']
			},
			prod: {
				src: ['index.html'],
				overrides: {
					'react': {
						main: ['react.min.js','react-dom.min.js']
					}
				}
			}
		},
		useminPrepare: {
			html: 'index.html',
			options: {
				dest: '<%=conf.dist%>'
			}
		},
		usemin:{
			html:['<%=conf.dist%>/index.html']
		},
		clean: {
		  build: {
			src: ['<%=conf.dist%>']
		  }
		},
		copy: {
			html: {
				src: 'index.html', dest: '<%=conf.dist%>/index.html'
			}
		},
		sass: {
			build: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: '<%=conf.src%>',
					src: ['**/*.scss'],
					dest: '<%=conf.dist%>',
					ext: '.css'
				}]
			}
		},
		ts: {
            build: {
                src: ['src/ts/**/*.ts', 'src/ts/**/*.tsx'],
                dest: '<%=conf.dist%>/js',
                options: {
                    module: 'commonjs ',
                    target: 'es5',
					jsx:'react'
                }
            }
        }
	});
	

	
	grunt.registerTask('loadconst', 'Load constants', function() {
		grunt.config('conf', {
			dist: 'dist',
			src: 'src',
			tmp: '.tmp'
		});
	});
	
	
	
	grunt.registerTask('build',[
        'copy:html',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'usemin'
	]);

	grunt.registerTask('default', ['loadconst','clean:build','ts:build','jshint:all','sass:build' ,'wiredep:dev','build']);
	grunt.registerTask('default:prod', ['loadconst','clean:build','ts:build','jshint:all','sass:build' ,'wiredep:prod','build']);
	grunt.registerTask('serve', "Serve your app", ['default','connect:server', 'watch' ]);
	grunt.registerTask('serve:dist', "Serve your app", ['default:prod','connect:dist', 'watch' ]);
};
