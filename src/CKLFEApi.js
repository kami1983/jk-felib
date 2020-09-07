import axios from 'axios'
import {CKLFEDataErr} from "./CKLFEDataErr";
import {CKLFEDataSuccess} from "./CKLFEDataSuccess"

/**
 * @author kami
 *
 * */
export class CKLFEApi {

    static CONST_REQUEST_METHOD_IS_GET = 'get'
    static CONST_REQUEST_METHOD_IS_POST = 'post'

    api_default_request_url = null
    // api_default_im = null
    // api_default_ic = null

    /**
     * 构造方法
     * @param {Object} config
     * */
    constructor (config) {
        // 基本配置属性检查
        if(this.isUndefined(config) || this.isUndefined(config.api_request_url)) {
            throw new Error("ERROR CODE::200208241649 CONTENT::CKLFEApi 需要传入配置参数，该配置参数中至少包含 api_request_url 属性，用于传入PHP接口地址。")
        }
        this.api_default_request_url = config.api_request_url
    }

    /**
     * 获取请求地址的URL
     * @param {Object} requestconf   配置对象
     * @param {String} method 请求方法
     * @return {String}
     * */
    getRequestUrl(requestconf){

        // 基本配置检查
        if (this.isUndefined(requestconf) || this.isUndefined(requestconf.ic) || this.isUndefined(requestconf.im) ) {
            throw new Error("ERROR CODE::200208241650 CONTENT::getRequestUrl 需要传入配置参数，该配置参数中至少包含 ic,im 属性，用于通州后端调用的接口位置。")
        }

        let request_url = this.api_default_request_url
        let ic = requestconf.ic
        let im = requestconf.im
        let method = requestconf.method
        if(this.isUndefined(method)) {
            method = CKLFEApi.CONST_REQUEST_METHOD_IS_GET
        }


        // 检查request url 中是否有?号
        let first_link='?'
        if(-1 != request_url.indexOf('?')) {
            first_link='&'
        }

        // 定义返回值变量
        let result_rui = `${request_url}${first_link}ic=${ic}&im=${im}`


        // 检查是否有FPS 参数，如果有这里进行参数整理
        if(CKLFEApi.CONST_REQUEST_METHOD_IS_GET == method && !this.isUndefined(requestconf.fps)) {
            let fpsparam = ""
            for ( let key in requestconf.fps ) {
                if('' == fpsparam){
                    fpsparam=`fps[${key}]=${ encodeURIComponent(requestconf.fps[key]) }`
                }else{
                    fpsparam=`${fpsparam}&fps[${key}]=${ encodeURIComponent(requestconf.fps[key]) }`
                }
            }
            if('' != fpsparam) {
                result_rui=`${result_rui}&${fpsparam}`
            }
        }

        return result_rui
    }

    /**
     * 获取请求数据
     * @param {Object} requestconf
     * @return {Object}
     * */
    getRequestData(requestconf) {
        // 基本配置检查
        if (this.isUndefined(requestconf.fps)) {
            throw new Error("ERROR CODE::200208241813 CONTENT:: 需要传入 fps 配置参数，该参数表示数据段落内容。")
        }

        let resultdata = {}
        for ( let key in requestconf.fps ) {
            let newkey = `fps[${key}]`
            resultdata[newkey] = requestconf.fps[key]
        }

        return resultdata
    }

    /**
     * 创建一个Axios 请求
     * @return
     * */
    callApi (config) {

        // 获取配置文件中定义的请求方式，目前支持Get Post 两种
        let method = config.method
        // 如果参数没有设定，那么默认是Get
        if(this.isUndefined(method)) {
            method = CKLFEApi.CONST_REQUEST_METHOD_IS_GET
        }

        // 计算请求变量值
        let requesturl = this.getRequestUrl(config)

        let axiosconf = {}
        axiosconf["timeout"] = config.timeout || 5000
        if(!this.isUndefined(config.headers)) {
            axiosconf["headers"] = config.headers
        }

        axiosconf["withCredentials"] = true
        axiosconf["responseType"] = config.responseType || "json"

        let myaxios = axios.create(axiosconf)
        let myrequest = null

        if( CKLFEApi.CONST_REQUEST_METHOD_IS_POST == method ) {
            // 默认不需要post data
            let requestpostdata = undefined
            // 如果是POST 请求需要单独提取POST Data数据
            requestpostdata = this.getRequestData(config)
            myrequest = myaxios.post(requesturl, requestpostdata)
        }else{
            myrequest =  myaxios.get(requesturl)
        }

        return myrequest
    }

    /**
     * 这个函数只返回并处理成功的操作
     * @return {Promise}
     * */
    successCallback(config) {
        return new Promise(
            (resolve, reject) => {
                this.callApi(config).then((res) => {
                    // console.log(res)

                    if("success" == res.data.result) {
                        resolve(new CKLFEDataSuccess(res.data.back_value))
                    }else if("failure" == res.data.result){
                        reject(new CKLFEDataErr(res.data))

                    }
                }).catch((err) => {
                    reject(err)
                })
            }
        )
    }

    isUndefined( compvar ){
        if(undefined == compvar) {
            return true
        }
        return false
    }
}
