const express = require('express');
const {writeDB, readDB} = require('./file.service');

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/users', async (req, res) => {
    const users = await readDB();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const {name, age, gender} = req.body;

    if (!name || name.length < 4) {
        res.status(400).json('name is wrong');
    }

    if (!age || age > 120) {
        return res.status(400).json('age is wrong');
    }

    const users = await readDB();
    const newUser = {
        id: users.length ? users.length + 1 : 1,
        name,
        age,
        gender,
    }
    users.push(newUser);

    await writeDB(users);

    res.status(201).json(newUser);

});

app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    // console.log(userId, "USERID");

    const user = req.body;
    // console.log(user, "REQ BODY");

    const users = await readDB();
    // console.log(users, "USERS FROM DB");

    const foundIndex = users.findIndex(user => user.id === +userId);
    console.log(foundIndex, "FOUND INDEX");


    if (foundIndex === undefined|| foundIndex === -1) {
        return res.status(404).json({message: 'xxxxxx'});
    }

    // console.log(users[foundIndex].id, "FOUND USERS");

    const newUser = {
        ...user,
        id: users[foundIndex].id,
    };

    console.log(newUser, "NEW USER");

    users[foundIndex] = newUser;

    await writeDB(users);

    res.status(203).json(newUser)

});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    console.log(userId, "USER ID");

    const users = await readDB();
    console.log(users, "USERS FROM DB");

    const foundIndex = users.findIndex(user => user.id === +userId);
    console.log(foundIndex, "FOUND INDEX");

    if (foundIndex === -1) {
        return res.status(404).json('GGGGGGGGGGGGGG');
    }

    users.splice(foundIndex, 1);
    await writeDB(users);

    res.sendStatus(204);

});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});