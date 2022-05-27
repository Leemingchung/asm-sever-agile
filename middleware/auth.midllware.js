
exports.YeuCauDangNhap = (req, res, next)=>{
    if(req.session.user){
        next();     // có tồn tại user trong session thì cho tiếp tục làm việc
    } else {
         res.redirect("/login") ;// chưa có thì yêu cầu đăng nhập
    }
}

exports.ChuaDangNhap = (req, res, next)=>{
    // hàm này dành cho link register và login, nếu đăng nhập rồi thì tự vào danh sách
    if(!req.session.user){
        next();
    } else {
        res.redirect("/home") ;// đã đăng nhập --> chuyển về trang chủ
    }
}
