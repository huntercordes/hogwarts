import pool from "../db.js";

export async function getAllHouses() {
  const result = await pool.query("SELECT * FROM houses ORDER BY id");
  return result.rows;
}

export async function getHouseById(id) {
  const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);
  return result.rows[0];
  // This function retrieves a house from the database based on its ID. The result is returned as the first row of the query result which explains the 0 in the array index.
}
