const indexDao = require('../Dao/indexDao');
const { pool } = require("../../config/database");
const winston = require('../../config/winston');



exports.readImages = async function (req, res) {
    try {
        console.log('Connecting to the database...');
        const connection = await pool.getConnection(async (conn) => conn);
        console.log('Connecting to the database...22');
        try {
            const rows = await indexDao.readImages(connection);

            return res.send({
                result: rows,
                isSuccess: true,
                code: 200,
                message: "이미지 목록 요청 성공",
            });
        } catch (err) {
            logger.error(`readImages Query error\n: ${err.message}`, { error: err });
            return res.status(500).send({
                isSuccess: false,
                code: 500,
                message: "서버 오류",
            });
        } finally {
            connection.release();
        }
    } catch (err) {
        logger.error(`readImages DB Connection error\n: ${err.message}`, { error: err });
        return res.status(500).send({
            isSuccess: false,
            code: 500,
            message: "서버 오류",
        });
    }
};
