import path from 'path';

export default {
    entry: './src/index.ts', // Your entry file (make sure to use .ts for TypeScript)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve TypeScript and JavaScript files
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Test for .ts files
                use: 'ts-loader', // Use ts-loader to process TypeScript files
                exclude: /node_modules/, // Exclude node_modules from being processed
            },
            {
                test: /\.(png|jpe?g|svg)$/i, // Example: image files loader
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
        ],
    },
};
