const axios = require("axios");

class ValController {
  static async getAllAgent(req, res, next) {
    try {
      const response = await axios.get(`https://valorant-api.com/v1/agents`);
      const agent = response.data.data
        .filter((agents) => agents.isPlayableCharacter)
        .map((agents) => ({
          name: agents.displayName,
          role: {
            displayName: agents.role.displayName,
            displayIcon: agents.role.displayIcon,
          },
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
        displayIcon: weapons.displayIcon,
        id: weapons.uuid,
        weaponStat: {
          fireRate: weapons.weaponStats?.fireRate,
          magazineSize: weapons.weaponStats?.magazineSize,
          equipTimeSeconds: weapons.weaponStats?.equipTimeSeconds,
          reloadTimeSeconds: weapons.weaponStats?.reloadTimeSeconds,
          firstBulletAccuracy: weapons.weaponStats?.firstBulletAccuracy,
        },
        shopData: {
          cost: weapons.shopData?.cost,
          category: weapons.shopData?.category,
        },
      }));
      res.status(200).json(weapon);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ValController;
