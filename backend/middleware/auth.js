import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // check if header exists and starts with 'bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing token' });
    }

    // structure is Bearer + token -> split it based on space and then extract the token
    const token = authHeader.split(' ')[1];
    // verify that the token is correct -> not expired + used the correct secret key
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // assign the userId to the req so that it is available to other route handlers
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
