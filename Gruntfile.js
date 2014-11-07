var version = require('./build/version'),
    setup = require('./build/setup'),
    path = require('path'),
    connect_livereload = require('connect-livereload');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-nuget');

    var ports = {
        server: 7001,
        livereload: 14141
    };
    var meta = {
        name: 'Fayde'
    };

    var dirs = {
        test: {
            root: 'test'
        },
        testsite: {
            root: 'testsite',
            build: 'testsite/.build'
        }
    };

    function mount(connect, dir) {
        return connect.static(path.resolve(dir));
    }

    grunt.initConfig({
        ports: ports,
        meta: meta,
        dirs: dirs,
        pkg: grunt.file.readJSON('./package.json'),
        clean: {
            bower: ['./lib'],
            test: ['<%= dirs.test.root %>/lib'],
            testsite: ['<%= dirs.testsite.root %>/lib']
        },
        setup: {
            fayde: {
                cwd: '.'
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            test: {
                files: [
                    { src: './lib/minerva', dest: './test/lib/minerva' },
                    { src: './lib/qunit', dest: './test/lib/qunit' },
                    { src: './lib/requirejs', dest: './test/lib/requirejs' },
                    { src: './lib/requirejs-text', dest: './test/lib/requirejs-text' },
                    { src: './themes', dest: './test/lib/fayde/themes' },
                    { src: './fayde.js', dest: './test/lib/fayde/fayde.js' },
                    { src: './fayde.d.ts', dest: './test/lib/fayde/fayde.d.ts' },
                    { src: './fayde.js.map', dest: './test/lib/fayde/fayde.js.map' },
                    { src: './src', dest: './test/lib/fayde/src' }
                ]
            },
            testsite: {
                files: [
                    { src: './lib/minerva', dest: './testsite/lib/minerva' },
                    { src: './lib/qunit', dest: './testsite/lib/qunit' },
                    { src: './lib/requirejs', dest: './testsite/lib/requirejs' },
                    { src: './lib/requirejs-text', dest: './testsite/lib/requirejs-text' },
                    { src: './themes', dest: './testsite/lib/fayde/themes' },
                    { src: './fayde.js', dest: './testsite/lib/fayde/fayde.js' },
                    { src: './fayde.d.ts', dest: './testsite/lib/fayde/fayde.d.ts' },
                    { src: './fayde.js.map', dest: './testsite/lib/fayde/fayde.js.map' },
                    { src: './src', dest: './testsite/lib/fayde/src' }
                ]
            },
            localminerva: {
                files: [
                    { src: '../minerva', dest: './lib/minerva' }
                ]
            }
        },
        typescript: {
            build: {
                src: ['typings/*.d.ts', 'lib/minerva/minerva.d.ts', 'src/_Version.ts', 'src/**/*.ts'],
                dest: 'Fayde.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: ['typings/*.d.ts', 'lib/minerva/minerva.d.ts', 'fayde.d.ts', '<%= dirs.test.root %>/**/*.ts', '!<%= dirs.test.root %>/lib/**/*.ts'],
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true
                }
            },
            testsite: {
                src: ['typings/*.d.ts', 'lib/minerva/minerva.d.ts', 'fayde.d.ts', '<%= dirs.testsite.root %>/**/*.ts', '!<%= dirs.testsite.root %>/lib/**/*.ts'],
                options: {
                    basePath: dirs.testsite.root,
                    target: 'es5',
                    module: 'amd'
                }
            }
        },
        qunit: {
            all: ['<%= dirs.test.root %>/**/*.html']
        },
        connect: {
            server: {
                options: {
                    port: ports.server,
                    base: dirs.testsite.root,
                    middleware: function (connect) {
                        return [
                            connect_livereload({ port: ports.livereload }),
                            mount(connect, dirs.testsite.build),
                            mount(connect, dirs.testsite.root)
                        ];
                    }
                }
            }
        },
        watch: {
            src: {
                files: ['src/**/*.ts'],
                tasks: ['typescript:build']
            },
            testsitets: {
                files: ['testsite/**/*.ts'],
                tasks: ['typescript:testsite']
            },
            testsitejs: {
                files: ['testsite/**/*.js'],
                options: {
                    livereload: 35729
                }
            },
            testsitefay: {
                files: ['testsite/**/*.fap', 'testsite/**/*.fayde'],
                options: {
                    livereload: 35729
                }
            }
        },
        open: {
            testsite: {
                path: 'http://localhost:<%= ports.server %>/index.html'
            }
        },
        version: {
            bump: {
            },
            apply: {
                src: './build/_VersionTemplate._ts',
                dest: './src/_Version.ts'
            }
        },
        nugetpack: {
            dist: {
                src: './nuget/Fayde.nuspec',
                dest: './nuget/',
                options: {
                    version: '<%= pkg.version %>'
                }
            }
        },
        nugetpush: {
            dist: {
                src: './nuget/Fayde.<%= pkg.version %>.nupkg'
            }
        }
    });

    grunt.registerTask('default', ['version:apply', 'typescript:build']);
    grunt.registerTask('test', ['version:apply', 'typescript:build', 'typescript:test', 'qunit']);
    grunt.registerTask('testsite', ['version:apply', 'typescript:build', 'typescript:testsite', 'connect', 'open', 'watch']);
    setup(grunt);
    version(grunt);
    grunt.registerTask('package', ['nugetpack:dist']);
    grunt.registerTask('publish', ['nugetpack:dist', 'nugetpush:dist']);
    grunt.registerTask('lib:reset', ['clean', 'setup', 'symlink:test', 'symlink:testsite']);
    grunt.registerTask('link:minerva', ['symlink:localminerva']);
};