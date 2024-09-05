const axios = require("axios");

class ValController {
  static async getAllAgent(req, res, next) {
    try {
      const response = await axios.get(`https://valorant-api.com/v1/agents`);
      const agent = response.data.data
        .filter((agents) => agents.isPlayableCharacter)
        .map((agents) => ({
          name: agents.displayName,
          id: agents.uuid,
          image: agents.fullPortraitV2,
          abilities: agents.abilities.map((ability) => ({
            displayName: ability.displayName,
            displayIcon: ability.displayIcon,
          })),
        }));
      res.status(200).json(agent);
    } catch (error) {
      next(error);
    }
  }

  static async getAllMap(req, res, next) {
    try {
      const response = await axios.get(`https://valorant-api.com/v1/maps`);
      const map = response.data.data.map((maps) => ({
        name: maps.displayName,
        id: maps.uuid,
        coordinates: maps.coordinates,
        image: maps.splash,
      }));
      res.status(200).json(map);
    } catch (error) {
      next(error);
    }
  }

  static async getAllWeapon(req, res, next) {
    try {
      const response = await axios.get(`https://valorant-api.com/v1/weapons`);
      const weapon = response.data.data.map((weapons) => ({
        name: weapons.displayName,
        id: weapons.uuid,
        weaponStat: weapons.weaponStats,
        shopData: weapons.abilities.map((shopdata) => ({
          cost: shopdata.cost,
          category: shopdata.category,
        })),
      }));
      res.status(200).json(weapon);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ValController;
