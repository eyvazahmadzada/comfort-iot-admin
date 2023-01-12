import { decode, encode } from 'js-base64';

class Cryption {
    static encrypt(data) {
        return encode(data);
    }

    static decrypt(data) {
        return decode(data);
    }
}

export default Cryption;
