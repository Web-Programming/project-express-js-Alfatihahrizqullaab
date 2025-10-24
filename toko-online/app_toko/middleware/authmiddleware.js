module.exports.adminOnly = (req, res, next) => {
    const isAdmin = req.body.isAdmin; // Misalnya, dapatkan dari token atau sesi
    if (isAdmin === true) {
        console.log("Akses admin diberikan");
        next();
    }else{
        res.status(403).json({ 
            success: false,
            message: 'Akses ditolak. Hanya untuk admin.' 
        });
    }
}