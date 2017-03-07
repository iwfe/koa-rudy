/**
 * Created by slashhuang on 17/1/13.
 * 工具相关
 */
const crypto = require('crypto');

/*加密*/
exports.U_cipher=(data)=>{
    let cipher = crypto.createCipher('aes192', 'iwjw-rent-platform');
    return cipher.update(data.toString(),'utf8', 'hex') +  cipher.final('hex')
}
/*解密*/
exports.U_decipher=(data)=>{
    let decipher = crypto.createDecipher('aes192', 'iwjw-rent-platform')
    try{
        let decipherData =  decipher.update(data,'hex','utf8') + decipher.final('utf8');
        return decipherData
    }catch(e){
        return false
    }
}




