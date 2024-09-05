const axios = require("axios");

class ValController {
  static async getAllAgent(req, res, next) {
    try {
      const response = await axios.get(
        `https://ap.api.riotgames.com/val/content/v1/contents?api_key=${process.env.API_KEY}`,
        {
          headers: { "X-Riot-Token": process.env.API_KEY },
        }
      );
      const agents = response.data.characters.map((agent) => ({
        name: agent.name,
      }));
      res.status(200).json(agents);
    } catch (error) {
      next(error);
    }
  }

  static async getAllMap(req, res, next) {
    try {
      const response = await axios.get(
        `https://ap.api.riotgames.com/val/content/v1/contents?api_key=${process.env.API_KEY}`,
        {
          headers: { "X-Riot-Token": process.env.API_KEY },
        }
      );
      const map = response.data.maps.map((maps) => ({
        name: maps.name,
      }));
      res.status(200).json(map);
    } catch (error) {
      next(error);
    }
  }

  static async getAllWeapon(req, res, next) {
    try {
      const response = await axios.get(
        `https://ap.api.riotgames.com/val/content/v1/contents?api_key=${process.env.API_KEY}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ValController;
