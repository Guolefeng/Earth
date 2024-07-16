import { authApi } from "@/api"
import JSEncrypt from 'jsencrypt'
import { sm2 } from 'sm-crypto'

// 登录加密 公钥
export const PUBLIC_kEY = 'xxx'

// sm2加密 公钥
export const SM2_PUBLIC_KEY = 'xxx'

// 加密参数是需要加密的字符串
export const encrypt = async (str: string) => {
    let pwd = ''
    // 当前加密方式: rsa/sm2
    const encryptModel = await authApi.getEncryptModel()
    if (encryptModel?.data === 'rsa') {
        const encryptor = new JSEncrypt()
        encryptor.setPublicKey(PUBLIC_kEY) // 设置公钥
        pwd = encryptor.encrypt(str) || '' // 对需要加密的数据进行加密
    } else if (encryptModel?.data === 'sm2') {
        pwd = sm2.doEncrypt(str, SM2_PUBLIC_KEY)
    }
    return pwd
}