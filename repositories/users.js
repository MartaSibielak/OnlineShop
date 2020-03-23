const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);


class UsersRepository extends Repository{

    async comparePasswords(saved, supplied){
        // saved -> password saved in our database. 'hashed.salt'
        // supplied -> password given by user trying to sign in
        // const result = saved.split('.');
        // const hashed = result[0];
        // const salt = result[1];  //ver 1
        const [hashed, salt] = saved.split('.'); //ver2
        const hashedSuppliedBuf = await scrypt(supplied, salt,64); //hashedSupplied become a buffer so need to convert it to a string

        return hashed === hashedSuppliedBuf.toString('hex');
    }

    async create(attrs) {
        // attrs === { email: '', password: ''}
        attrs.id = this.randomId();

        const salt = crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(attrs.password, salt, 64);

        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        };
        records.push(record);

        await this.writeAll(records);

        return record;
    }
}

module.exports = new UsersRepository('users.json'); //wysylamy instancje klasy a nie sama klase do
// uzupelnienia, zeby nie pomylic oliku. nie musimy trorzyc nowego obiektu klasy tylko mozemy w innym pliku
// uzywac wszystkich metod z tej klasy


// const test = async () => {
//     const repo = new UsersRepository('users.json');
//
//     const user = await repo.getOneBy({ id: 'aa0501bf'});
//     console.log(user);
// };
//
// test();

