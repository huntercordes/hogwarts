import * as housesRepository from "../repositories/houses.repository.js";

export async function getAllHouses(req, res) {
  try {
    const houses = await housesRepository.getAllHouses();

    console.table(houses);
    res.json(houses);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch houses" });
  }
}
// why are there no requests? Because get , gets all houses by default so no id needs to be found.

export async function getHouse(req, res) {
  try {
    const id = req.params.id;

    if (!Number.isInteger(Number(id)))
      return res.status(400).json({ error: "id must be a whole number" });
// must be whole number to match the id in the database, otherwise return a 400 error

    const house = await housesRepository.getHouseById(id);

    if (!house)
      return res.sendStatus(404);

    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch house" });
  }
}
