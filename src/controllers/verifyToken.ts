import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const verifyToken = async (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  console.log("token", token);
  if(!token) return res.status(401).json({message: 'Ви не зареєстровані.'});
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if(err) { 
      console.log(err);
      return res.status(403).json({ message: 'Токен неправильний, або прострочений.'})
    };
    
    req.user = user;
    console.log(user)
  })
  if(req.user) {
    
    const user = await User.findById(req.user.id);
    if(!user) {
      return res.status(401).json({message: 'Ви не зареєстровані.'});
    }
    req.isAdmin = user.status === 'admin';
    next();
  } else {
    return res.status(403).json({ message: 'Щось пішло не так.'});
  }
}
