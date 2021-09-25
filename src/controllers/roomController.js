const Database = require('../database/config');

module.exports = {
    async create (req,res) {
        try {
            const db = await Database();
            const pass = req.body.password;
            let roomId;
            let idExists = true;
            // This statement checks if generated hash exists inside an id
            // While idExists it will keep generating new hashes
            while(idExists){
                // Loop for generating custom hashes
                for(var i = 0; i < 6; i++){
                    // Strategy to prevent hash start from zero
                    i == 0 ? roomId = Math.floor(Math.random()*10).toString()
                    : roomId += Math.floor(Math.random()*10).toString()
                };
                // Check if the hash id already exists in the Database
                const allRoomsIds = await db.all(`SELECT id FROM rooms`);
                idExists = allRoomsIds.some(id => id === roomId);
                // Case there is no existing ids save information on DB
                if(!idExists){
                    await db.run(`
                        INSERT INTO rooms (
                            id,
                            pass
                        ) VALUES (
                            ${parseInt(roomId)},
                            ${pass}
                        )
                    `)
                }
            };
            await db.close();
            res.redirect(`/room/${roomId}`)
        } catch (error) {
            console.log(error);
        }
    },
    async open(req,res){
        try {
            const db = await Database();
            const roomId = req.params.room;
            const questions = await db.all(`
                SELECT * FROM questions WHERE room = ${roomId} ORDER BY read;
            `)
            // const hasQuestions = questions.length == 0 ? false : true;
            res.render('room', {roomId: roomId, questions: questions})
        } catch (error) {
            console.log(error)
        }
    },
    async enter(req,res){
        const roomId = req.body.roomId;
        res.redirect(`/room/${roomId}`)
    }
}