const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем плагин html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключаем плагин для отчистки
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //подключаем плагин css

// указали в какой файл будет собираться весь js и дали ему имя 
module.exports = {
    entry: { main: './src/pages/index.js' },
    target: 'es5',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development', // добавили режим разработчика
    devServer: {
        contentBase: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

        open: true // сайт будет открываться сам при запуске npm run dev
    },
    module: {
        rules: [ // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: {
                    loader: 'babel-loader'
                },
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },

            {
                // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        // добавьте объект options
                        options: { importLoaders: 1 }
                    },
                    // Добавьте postcss-loader
                    'postcss-loader']
            },

            // добавили правило для обработки файлов картинок и шрифтов
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
                
            },
        ]
    },
    plugins: [ //добавляем массив
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов css
    ]
};