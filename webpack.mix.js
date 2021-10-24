const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts("resources/js/index.tsx", "public/js/app.js")
    .react()
    .postCss("resources/css/app.css", "public/css/app.css")
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                    resolve: {
                        extensions: [".ts", ".tsx", ".js", ".jsx"],
                    },
                },
            ],
        },
    })
    .browserSync("127.0.0.1:8000");
