const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            //Filtrar as conexões que estao ha no maximo 10KM de distancia e que
            //o novo dev tenha pelo menos uma das tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );

           sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    },

    async destroy(request, response) {
        const { _id } = request.params;

        const dev = await Dev.findByIdAndDelete({ _id });
        if (!dev) {
            response.json({ message: "User already not exist" })
        }
        response.json({ message: "User deleted" });
    },

    async update(request, response) {
        const { name, bio, avatar_url, latitude, longitude, techs} = request.body;
        const { _id } = request.params;

        const techArray = parseStringAsArray(techs);

        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        };

        await Dev.findByIdAndUpdate({ _id }, { name, bio, techs, location, avatar_url }, (err, doc) => {
            if(err) {
                return response.json({ message: "User already not exist" });
            }
            return response.json(doc);
        });

    }
};