const { pool } = require("../../config/database");

exports.readImages = async function (connection, placeName) {
    const Query = `SELECT image_path, floor FROM newSchema WHERE placeName = ? ORDER BY floor;`;
    const Params = [placeName.trim()];

    console.log('Executing SQL Query:', Query);
    console.log('With Params:', Params);

    const [rows] = await connection.query(Query, Params);

    console.log('Query result:', rows); // 쿠리 디버깅

    return rows;
};
