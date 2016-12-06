'use strict';

module.exports = grunt => {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        jshint: {
            all: ['index.js', 'test/*.spec.js'],
            options: {
                jshintrc: '.jshintrc',
                ignores: ['node_modules/']
            }
        },

        jsdoc2md: {
            oneOutputFile: {
                src: 'index.js',
                dest: 'docs/index.md'
            }
        },

        run: {
            unit: {
                cmd: 'node_modules/.bin/_mocha',
                args: [
                    '-R', 'spec',
                    'test/unit.spec.js'
                ]
            }
        },

        conventionalChangelog: {
            options: {
                changelogOpts: {
                    preset: 'angular',
                    releaseCount: 0
                }
            },
            release: {
                src: 'CHANGELOG.md'
            }
        },

        bump: {
            options: {
                files: ['package.json'],
                commit: true,
                commitMessage: 'chore(release) v%VERSION%',
                commitFiles: ['package.json', 'CHANGELOG.md', 'docs/*.md'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin'
            }
        }

    });

    grunt.registerTask('unit', 'Run unit tests', ['run:unit']);
    grunt.registerTask('release', 'Docs, bump and push to GitHub', (type) => {
        grunt.task.run(
            [
                'jsdoc2md',
                'contributors',
                `bump-only:${type || 'patch'}`,
                'conventionalChangelog',
                'bump-commit'
            ]);
    });
    grunt.registerTask('default', ['jshint:all', 'unit']);
};