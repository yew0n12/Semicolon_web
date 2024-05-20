const { pool } = require("../../config/database");

exports.readImages = async function (connection) {
    const Query = `SELECT * FROM buildings;`;
    const Params = [];

    const [rows] = await connection.query(Query, Params); // query 메소드가 async/await를 지원하는지 확인하세요

    return rows;
};
