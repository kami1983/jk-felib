
/**
 * @author kami
 * @description 这个Api 用于随机测试，生成字符串用
 * */
export class CKLFEDataErr {

    error_sign = undefined
    error_code = undefined
    error_info = undefined

    /**
     * 构造方法
     * */
    constructor (config) {
        this.error_sign = config.error_sign
        this.error_code = config.error_code
        this.error_info = config.error_info
    }

}
