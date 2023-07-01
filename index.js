global.express = require('express');
global.app = express();
global.bodyParser = require('body-parser');
global.sorgu = require('./sorgu.js').sorgu;
global.ejs = require('ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static('views'));
///////////////////////// GET - POST /////////////////////////
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/check', async (req, res) => {
    let {
        username
    } = req.body;
    if (!username) return res.send({
        error: true,
        message: 'Lütfen bir kullanıcı adı giriniz.'
    });
    if (username.length < 3) return res.send({
        error: true,
        message: 'Kullanıcı adı 3 karakterden az olamaz.'
    });

    let check = await sorgu(username);
    if (!check.status) return res.send({
        error: true,
        message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
    });
    res.render('profile', {
        profile: check
    });
});
///////////////////////// GET - POST /////////////////////////

app.listen(80, () => {
    console.log('Web site açıldı. Port: 80')
});