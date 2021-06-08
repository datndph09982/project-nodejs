export const userSignupValidator = (req, res, next) => {
    req.check('name', 'Tên bắt buộc phải nhập!!!').notEmpty();
    req.check('email', 'Email chỉ dài từ 3 đến 32 ký tự!!!')
        .matches(/.+\@.+\..+/)
        .withMessage('Email phải có ký tự @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Mật khẩu bắt buộc phải nhập!!!').notEmpty()
    req.check('password')
        .isLength(
            { min: 6 }
        )
        .withMessage('Mật khẩu phải có ít nhất 6 ký tự!!!')
        .matches(/\d/)
        .withMessage('Mật khẩu bắt buộc phải chứa số!!!');

    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }
    next();
}