
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { models } = require('../models');
const { users, restaurant } = models;
const helper = require('../helper/helper');

module.exports = {
    auth: async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return helper.unauthorized(res, "Unauthorized");
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (!decoded.id) {
                return helper.unauthorized(res, "Unauthorized");
            }
            const user = await users.findOne({ where: { id: decoded.id } });
            if (!user) {
                return helper.unauthorized(res, "owner user not found");
            }
            if (user.role === 2) {
                const restaurantExists = await restaurant.findOne({ where: { user_id: user.id } });
                if (!restaurantExists) {
                    return helper.unauthorized(res, "Owner Restaurant not found");
                }
                if (restaurantExists.status === 0) {
                    return helper.unauthorized(res, "Restaurant status is inactive");
                }
                req.restaurant = restaurantExists;
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return helper.unauthorized(res, 'Invalid token');
            } else if (error.name === 'TokenExpiredError') {
                return helper.unauthorized(res, 'token expired');
            }
            throw error;
        }
    },

};
