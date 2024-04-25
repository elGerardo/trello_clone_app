import { v4 as uuidv4 } from 'uuid';

export default class GenerateUser {
    public static handle(){
        const uuid = uuidv4()
        const letters = uuid.replace(/[^a-z]/gi, '');
        let numbers: any = uuid.match(/\d/g);
        numbers = numbers?.join("").toString()
        return `${letters.substring(0, 5).toUpperCase()}${numbers?.substring(0, 5).toUpperCase()}`
    }
}