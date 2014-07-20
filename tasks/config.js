var config = {
    path: {
        spec: "spec",
        src: {
            self: "src",
            js: "src/js/**/*.js",
            css: "src/css/**/*.less",
            images: "src/images",
            fonts: "src/fonts",
            templates: [ "src/templates/**/*.html"],
            index: 'src/index.html',
            specs: [ 'spec/**/*.js']
        },
        vendor: {
            self: "vendor",
            js: "vendor/js/**/*.js",
            css: "vendor/css",
            images: "vendor/images",
            fonts: "vendor/fonts"
        },
        development: {
            self: "development",
            js: "development/js",
            css: "development/css",
            images: "development/images",
            fonts: "development/fonts",
            templates: "development/templates",
            index: 'development/index.html',
            spec: 'development/spec'
        },
        dist: {
            self: "dist",
            js: "dist/js",
            css: "dist/css",
            images: "dist/images",
            fonts: "dist/fonts",
            templates: "dist/templates",
            index: 'dist/index.html',
            spec: 'dist/spec'
        }
    }
};

module.exports = config;