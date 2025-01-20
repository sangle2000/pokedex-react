const path = require('path');

module.exports = {
    entry: './src/index.ts', // Ensure this points to your TypeScript entry file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'assets/images/',
                        },
                    },
                ],
            },
            {
                test: /\.ts$/, // Add TypeScript loader
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'], // Ensure .ts and .js files are resolved
    },
};
