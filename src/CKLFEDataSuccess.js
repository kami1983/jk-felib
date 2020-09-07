
/**
 * @author kami
 * @description 这个Api 用于随机测试，生成字符串用
 * */
export class CKLFEDataSuccess {


    /**
     * 构造方法
     * */
    constructor (config) {
        for(let key in config) {
            this[key] = config[key]
        }
    }

}
