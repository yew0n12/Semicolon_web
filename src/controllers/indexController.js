const indexDao = require('../Dao/indexDao');
const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");

exports.readImages = async function (req, res) {
    const { placeName } = req.query;
    console.log('Received placeName:', placeName);

    if (!placeName) {
        logger.error('placeName is not defined');
        return res.status(400).send({
            isSuccess: false,
            code: 400,
            message: "placeName is required",
        });
    }

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            console.log("Database connection established");
            const rows = await indexDao.readImages(connection, placeName); // 직접 rows를 반환하도록 변경
            console.log("Query executed, rows:", rows); // 쿼리 결과 로그 출력

            if (rows.length === 0) {
                console.log("No images found for placeName:", placeName);
            } else {
                console.log("이미지 목록 요청 성공");
            }

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
