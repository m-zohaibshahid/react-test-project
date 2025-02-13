
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs'; 

export const generateUUID = () => {
    const id = uuidv4();
    return id;
};

export const generateHashedPassword = (password: string) => {
    const saltRounds = 10; // Recommended salt rounds
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword

}

export const compareHashedPassword = (simplePassword: string, hashedPassword: string) => {
    return bcrypt.compareSync(simplePassword, hashedPassword);
}