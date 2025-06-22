module.exports = {
    success: function (res, message = "", body = {}) {
        return res.status(200).json({
            success: true,
            status: 200,
            message: message,
            body: body
        });
    },
    failed: function (res, message = "", body = {}) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: message,
            body: body
        });
    },
    unauthorized: function (res, message = "", body = {}) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: message,
            body: body
        });
    },
}