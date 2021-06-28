const db = require('../db')

class UserController {
    async createUser(res, req) {
        const {name, surname} = req.body
        const newPerson = await db.query(`INSERT INTO person (name, surname)
                                          values ($1, $2)
                                          RETURNING *`, [name, surname])
        res.json(newPerson.rows[0])
    }

    async getUsers(res, req) {
        const users = await db.query(`SELECT *
                                      FROM person`)
        res.json(users.rows)
    }

    async getOneUser(res, req) {
        const id = await req.params.id
        const user = await db.query(`SELECT *
                                     FROM person
                                     where id = $1`, [id])
        res.json(user.rows[0])
    }

    async updateUser(res, req) {
        const {id, name, surname} = req.body
        const user = db.query(`UPDATE person
                               set name    = $1,
                                   surname = $2
                               where id = $3
                               RETURNING *`, [name, surname, id])
        res.json(user.rows[0])
    }

    async deleteUser(res, req) {
        const id = await req.params.id
        const user = await db.query(`DELETE
                                     FROM person
                                     where id = $1`, [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()
