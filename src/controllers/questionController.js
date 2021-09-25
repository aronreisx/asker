const Database = require('../database/config');

module.exports = {
    async index(req,res) {
        try {
            const roomId = req.params.room;
            const questionId = req.params.question;
            const action = req.params.action;
            const password = req.body.password;
            const db = await Database();
            //Get room data
            const roomData = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`);
            // Validate password
            if(roomData.pass == password){
                if(action == 'delete'){
                    await db.run(`DELETE FROM questions WHERE id = ${questionId}`);
                }else if(action == 'check'){
                    await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`);
                }
            } else {
                //Define strategy when password came wrong
                return res.render('pass-incorrect', {roomId: roomId})
            }
            res.redirect(`/room/${roomId}`);
        } catch (error) {
            console.log(error);
        }
    },
    async create(req,res){
        try {
            const db = await Database();
            const question = req.body.question;
            const roomId = req.params.room;

            await db.run(`
                INSERT INTO questions(
                    title,
                    room,
                    read
                ) VALUES (
                    "${question}",
                    ${roomId},
                    0
                )
            `)
            res.redirect(`/room/${roomId}`);
        } catch (error) {
            console.error(error);
        }
    }
};