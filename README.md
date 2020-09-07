### Felib 前后端组件类库

* 该类库用于整合Feapi 后端接口，应用到Vue 前端项目中。

### 版本信息

#### v1.1.4
* 完成npm 发布工作

#### v1.0.1
* 主要完成接口请求的基础功能项目。


### 安装信息

#### 通过NPM 安装类库
* `npm i jk-felib --save-dev`

#### 升级类库
* `npm update jk-felib --save-dev`


### 使用方法

#### 修改Vue 项目的main.js
* `vim main.js` 编辑Vue项目的main.js 文件加入如下代码。
* 注意api_request_url 是一个FEApi的请求地址，这个是根据实际情况变化的。
```
import feapi from "jk-felib"

// FEApi 接口请求组件，之后类中可以使用 this.$feapi 引用这个组件
Vue.use(felib, {
    // 配置API的请求接口
    feapiconf: {
        // 这个Mock 地址返回一个Feapi 数据格式中的成功状态
        api_request_url: "https://www.fastmock.site/mock/0a24fa68ebb6b2ab59e535eb08a3b2be/felib/fedata/success",
    }
})

```

#### 通过 callApi() 项目中创建Feapi 请求
* 这是一种相对基础的方法，其返回全部的Feapi 请求
```
// 写一个接口配置JSON
let config = {
    ic: "h200729",
    im: "get_curriculum_video_list",
    fps: {
        video_grouping_id: 1,
        start: 0,
        end: 10,
    },
    // 可选，默认是GET
    method: CKLFEApi.CONST_REQUEST_METHOD_IS_GET
}

this.$feapi.callApi(config).then((res)=>{
    // 请求正常进入这里
    console.log("请求成功::", res)
}).catch((err)=>{
    console.log(err)
})

```
//npm install --save-dev babel-cli 需要安装依赖
#### 通过 successCallback() 创建Feapi 请求

```

this.$feapi.successCallback({
    ic: "h200729",
    im: "get_curriculum_video_list",
    fps: {
        video_grouping_id: this.groupobj.id,
        start: this.page_start,
        end: this.page_end,
    },
    method: 'get'
}).then((res) => {
   console.log("这里仅仅返回成功的结果::", res)
})

```

