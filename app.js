// const express = require('express');
// const serv = require('./services/file.services');
//
//
// const app = express();
//
// app.use(express.json());
//
// app.listen(5000, ()=>{
//     {
//         console.log('App listen 5000')}
// })

const express = require('express');


const fileService = require('./services/file.services');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('REQUEST PROCESSED');

    res.json('HELLO WORLD')
});

app.get('/users', async (req, res) => {
    let usersFromService = await fileService.getUsers();
    res.json(usersFromService);
});

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('Wrong user id');
        return;
    }

    const user = await fileService.getOneUsers(+userId);

    if (!user) {
        res.status(404).json('User not found');
        return;
    }

    res.json(user);
});

app.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('Wrong user id');
        return;
    }

    const user = await fileService.deleteOneUsers(+userId);

    if (!user) {
        res.status(404).json('User not found');
        return;
    }

    res.sendStatus(204);
});

app.post('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const {age , name} = req.body;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('Wrong user id');
        return;
    }

    const obj = {}
    if (name) obj.name = name;
    if (age) obj.age = age;
    const user = await fileService.updeteOneUsers(+userId , obj );

    if (!user) {
        res.status(404).json('User not found');
        return;
    }

    res.status(201).json(user);
});

app.post('/users',  async (req, res) => {
    const {age, name} = req.body;

    if (Number.isNaN(+age) || age <= 0) {
        res.status(400).json('Wrong user age');
        return;
    }

    let user = await fileService.createUser({age, name});

    res.status(201).json(user);
});

app.listen(5000, () => {
    console.log('App listen 5000')
});
