require('dotenv').config();
const { models } = require('../../models');
const { users, preference_details, service, images, service_details } = models;
const { Op } = require('sequelize');


module.exports = {

    all_user_list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';
            const roleFilter = req.query.roleFilter || 'all'; // '1', '2', or 'all'
            const offset = (page - 1) * limit;

            // Base conditions
            const whereClause = {
                [Op.and]: [
                    { role: { [Op.ne]: 0 } }, // Exclude role 0 always
                    {
                        [Op.or]: [
                            { name: { [Op.like]: `%${search}%` } },
                            { email: { [Op.like]: `%${search}%` } }
                        ]
                    }
                ]
            };

            // If filtering by specific role
            if (roleFilter !== 'all') {
                whereClause[Op.and].push({
                    role: parseInt(roleFilter)
                });
            }

            const { count, rows: user_list } = await users.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            });

            res.status(200).json({
                user_list,
                total: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit)
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error', error });
        }
    },


    customer_list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';
            const offset = (page - 1) * limit;

            const { count, rows: customers } = await users.findAndCountAll({
                where: {
                    role: 2,
                    [Op.or]: [
                        { name: { [Op.like]: `%${search}%` } },
                        { email: { [Op.like]: `%${search}%` } }
                    ]
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            });

            res.status(200).json({
                customers,
                total: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit)
            });
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    },
    view_customer_details: async (req, res) => {
        const { id } = req.params;
        try {
            const userExists = await users.findOne({ where: { id } });
            if (!userExists) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            const details = await users.findOne({
                where: { id },
                include:
                {
                    model: preference_details, as: 'preference',
                    include: {
                        model: service,
                        as: 'preference_service'
                    }
                }
            })
            res.status(200).json({ message: "service view", details });
        } catch (error) {
            throw error
        }
    },

    escort_list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';
            const offset = (page - 1) * limit;

            const { count, rows } = await users.findAndCountAll({
                where: {
                    role: 1,
                    [Op.or]: [
                        { name: { [Op.like]: `%${search}%` } },
                        { email: { [Op.like]: `%${search}%` } }
                    ]
                },
                include: [
                    {
                        model: images,
                        as: 'escort_images',
                        where: { media_type: 0 },
                        required: false
                    }
                ],
                distinct: true,
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            });

            // Get only the first image for each user
            const escorts = rows.map(user => {
                const escort = user.toJSON();
                escort.escort_images = escort.escort_images?.length ? [escort.escort_images[0]] : [];
                return escort;
            });

            res.status(200).json({
                escorts,
                total: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit)
            });

        } catch (error) {
            throw error
        }
    },

    view_escort_details: async (req, res) => {
        const { id } = req.params;
        try {
            const userExists = await users.findOne({ where: { id } });
            if (!userExists) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            const details = await users.findOne({
                where: { id },
                include: [
                    {
                        model: images,
                        as: 'escort_images',
                    },
                    {
                        model: service_details,
                        as: 'escort_service',
                        include: {
                            model: service,
                            as: 'serviceDetails_service'
                        }

                    }
                ]
            })
            res.status(200).json({ message: "escort view", details });
        } catch (error) {
            throw error
        }
    },


    toggle_status: async (req, res) => {
        const { id } = req.params;
        try {
            const user_exists = await users.findOne({ where: { id } });
            if (!user_exists) {
                return res.status(404).json({ message: "user not found" });
            }
            const status = user_exists.status == 0 ? 1 : 0;
            await users.update({ status }, { where: { id } });
            res.status(200).json({ message: "status toggled" });
        } catch (error) {
            throw error
        }
    },
    approve_user: async (req, res) => {
        const { id } = req.params;
        try {
            const user_exists = await users.findOne({ where: { id } });
            if (!user_exists) {
                return res.status(404).json({ message: "user not found" });
            }
            await users.update({ is_approved: 1 }, { where: { id } });
            res.status(200).json({ message: "user approved" });
        } catch (error) {
            throw error
        }
    }

}