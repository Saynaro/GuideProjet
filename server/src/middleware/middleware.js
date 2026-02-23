import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    // Получаем токен из куки, которую мы назвали "jwt" в твоем файле
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Не авторизован, токен отсутствует" });
    }

    try {
        // Расшифровываем токен
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Записываем ID пользователя в объект запроса (req.user)
        req.userId = decoded.id; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Токен не валиден" });
    }
};