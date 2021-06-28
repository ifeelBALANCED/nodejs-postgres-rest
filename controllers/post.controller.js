class PostController {
    async createPost(res, req) {
        const {title, content, userId} = req.body
        const newPost = await db.query(`INSERT INTO post (title, content, user_id)
                                        values ($1, $2, $3)
                                        RETURNING *`, [title, content, userId])
        res.json(newPost.rows[0])
    }

    async getPostsByUser(res, req) {
        const id = req.query.id
        const posts = await db.query(`SELECT *
                                        FROM post
                                        where user_id = $1`, [id])
        res.json(posts.rows)
    }
}

module.exports = PostController()
