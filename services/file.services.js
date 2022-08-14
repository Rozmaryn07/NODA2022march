
const path = require("path");
const fs = require('fs').promises;

const pathFile = path.join(process.cwd(), 'DataBase', 'index.json');

const reader = async () => {
    try {
        const buffer = await fs.readFile(pathFile);
        const data = buffer.toString();

        const users = data ? JSON.parse(data) : [] ;

        return users.sort((a , b)=> a.id - b.id);
    } catch (e) {
        console.log(e)
    }
}

const writer = async (users) => {
    try {
        await fs.writeFile(pathFile, JSON.stringify(users));
    } catch (e) {
        console.log(e)
    }
}


module.exports = {
    createUser: async (user) => {
        const users = await reader();
        user.id = users.length ? users[users.length -1].id + 1 : 1;
        users.push(user)
        await writer(users);

        return user;
    },


    getUsers:  () => {
        return reader()
    },

    getOneUsers: async (id) => {
        const users = await reader();
        return users.find((user)=> user.id === id);
    },

    deleteOneUsers: async (id) => {
        const users = await reader();
        const indexUser = users.findIndex((user)=> user.id === id);
        if (indexUser < 0){
            return
        }
        const user = users[indexUser];
        users.splice(indexUser, 1);
        await writer(users);
        return user
    },


    updeteOneUsers: async (id , data) => {
        const users = await reader();
        const indexUser = users.findIndex((user)=> user.id === id);
        if (indexUser < 0){
            return
        }
        users[indexUser] = {...users[indexUser], ...data};

        await writer(users);
        return users[indexUser];
    }

}

