const { pool } = require("../../config/database");

exports.readImages = async function (connection,placeName) {
    const Query = `SELECT image_path FROM buildings WHERE placeName = ?;`;
    const Params = [placeName.trim()];  // placeName에서 공백을 제거

    console.log('Executing SQL Query:', Query);
    console.log('With Params:', Params);

    const [rows] = await connection.query(Query, Params); //

    return rows;
};
