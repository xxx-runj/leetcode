## 1. 跨域是什么？有哪些解决方式
跨域就是不满足同源策略，而所谓同源是指：协议、域名、端口号都相同。
- CORS（跨域资源共享），需要服务端配合，设置响应头Access-Control-Allow-Origin
- JSONP，`<script>`标签，需要服务端配合，只支持get请求
- 代理转发

## 2. CDN
内容分发网络，根据用户位置分配最近的资源\
用户访问域名 ——> DNS解析 ——> 发现CNAME（别名记录）（假设是CDN负载均衡系统） ——> 智能调度，找到最合适的边缘节点，返回该IP ——> 访问该IP

## 3. HTTP是什么？HTTP 和 HTTPS 的区别？
HTTP 超文本传输协议\
HTTPS 在 HTTP 的基础上加入加密协议，实现数据加密传输以及身份认证
- Http1.0：
    - 非持久连接，每次请求都需建立一次连接
- Http1.1：
    - 持久连接，一次TCP连接可以发送多个请求
    - 允许并发请求，但服务器必须按顺序响应，存在队头阻塞问题
    - 引入了更多的缓存控制策略，如 If-Unmodified-Since 等
- Http2.0：
    - 二进制帧、多路复用（解决了队头阻塞的问题）
    - 服务器推送
- Http3.0：
    - 基于 UDP 的 QUIC 协议作为传输层
    - 1次连接或无连接

## 4. HTTP常见的状态码
HTTP状态码 ：服务端告诉客户端当前请求响应的状态
- 1xx 消息（请求已被接受，需要继续处理）
    - 100 告知客户端继续发送请求的剩余部分
    - 101 服务器同意客户端的协议升级请求
- 2xx 成功
    - 200 OK 服务端返回数据
    - 201 Created 服务端新建了资源（如 Post 创建）
    - 202 Accepted 请求已被接受，但尚未处理完成（异步处理）
    - 203 Non-Authoritative Info 非授权信息，返回的信息不是来自原始服务器（如代理修改响应）
    - 204 No Content 无内容返回（如删除）
    - 205 Reset Content 重置内容（要求客户端重置表单或视图状态）
    - 206 Partial Content 成功返回了部分数据
- 3xx 重定向（客户端需要采取进一步动作才能完成请求）
    - 301 Moved Permanent 永久重定向
    - 302 Found 临时重定向 资源暂时在别处，浏览器以后仍用原地址访问（传统上会导致请求方法从 POST 变成 GET）
    - 303 See Other 通过GET方法访问另一个URI，通常用户POST后重定向到结果页面
    - 304 Not Modified 资源未修改，客户端可继续使用缓存
    - 307 Temporary Redirect 临时重定向。同302，不过请求方法不变，POST还是POST
- 4xx 请求错误
    - 400 Bad Request 请求语法错误或参数无效
    - 401 Unauthorized 未授权
    - 403 Forbidden 拒绝访问，权限不足
    - 404 Not Found 资源不存在
    - 405 Method Not Allowed 请求方法不被允许
- 5xx 服务器错误
    - 500 Internal Server Error 服务器内部错误
    - 501 Not Implemented 服务器不支持该请求方法
    - 502 Bad Gateway 反向代理服务器无法从后端服务器得到有效响应
    - 503 Service Unavailable 服务器当前无法处理请求（过载或维护中）
    - 504 Gateway Timeout 网关超时
    - 505 Http Version Not Supported 服务器不支持请求中所用的HTTP协议版本

## 5. 浏览器缓存
浏览器缓存分为强缓存和协商缓存
- 强缓存：无需发送请求，直接从本地缓存区域获取资源。根据 Cache-Control: max-age / Expires 判断资源有效时长
- 协商缓存：浏览器会向服务器发送请求，并在请求头上携带 If-None-Match/If-Modified-Since，如果未改变，服务器会返回状态码304，浏览器继续从本地缓存中获取资源；如果改变了，服务器会新的资源和状态码200，同时在响应头中提供Etag/Last-Modified

## 6. Etag怎么生成的
- 根据文件内容生成 Hash 值
- 根据最后修改时间和文件大小生成
- 根据版本号或序列号

## 7. Cookie是什么？
- Cookie是小型文本数据（在浏览器和服务器之间存储和传输用户状态信息的小型文本数据）
- 通过服务器响应头 Set-Cookie 发送给浏览器的小片数据，浏览器会保存这些数据，并在下一次请求（同源）中自动携带
- `Set-Cookie: sessionId=abc123; SameSite=None; Secure; HttpOnly; Path=/`
    - 跨站携带：SameSite=None；（注意：跨站指的是：顶级域名+一级域名 不同）
    - 只能通过HTTPS发送：Secure 
    - 防止 JavaScript 访问 Cookie：HttpOnly 
    - Cookie 对整个网站有效：Path=/（当前域名下的所有子页面都会自动携带）
- 主要用于会话管理（登录状态）、个性化设置（主题、语言偏好）、跟踪用户行为等
- SameSite=Lax 只有导航到第三方网站的 Get 链接会发送 Cookie

## 8. token是什么？
token是一种代表用户身份和权限的数字凭证，常用于网络应用中的身份认证和授权
- 无状态：服务器不保存会话状态，只需解密token
- 可跨域：token可以跨域发送，需要手动添加在请求头 Authorization 中

## 9. 单点登录
单点登录简称 SSO ，定义是在多个系统中，用户只需登录一次就可以访问所有相互信任的系统

## 10. web常见的攻击方式
- XSS攻击（跨站脚本攻击）
    - 反射型XSS：
        - 恶意脚本拼接在 URL 上
        - 用户访问此链接
        - 服务器将恶意脚本拼接在HTML中返回
        - 浏览器执行这段恶意脚本
    - 存储型XSS：
        - 攻击者在受害网站的输入框中提交恶意代码
        - 服务端将此恶意代码保存在数据库中
        - 其他正常用户浏览页面时，服务端将带有恶意脚本的数据返回
        - 浏览器执行这段恶意脚本
    - DOM型XSS：攻击和漏洞主要发生在客户端。
        - 攻击者构造恶意 URL （`https://example.com/page.html#<script>alert('XSS')</script>`）
        - 用户访问 URL
        - 页面中的JS代码获取URL片段（`location.hash`、 `document.URL`），直接写入DOM中，如 `document.write`、`innerHTML = `
- CSRF 跨站请求伪造
    利用 用户已登录状态 发起的跨站请求攻击
    - 用户访问 bank.com 登录，浏览器存储 Cookie
    - 攻击者诱导用户访问恶意网站，并在用户不知情的情况下向目标网站发送请求，如用户点击图片
        `<img src="https://bank.com/transfer?to=attacker&amount=10000" />`
    - 浏览器自动带上 Cookie（这个由 Set-Cookie 的 domain、path 控制），bank.com 发现 Cookie 有效，执行操作

## 11. Express Koa
Express 和 Koa 是 Node.js 生态里的 Web 框架，它们都是用来快速搭建 Web 服务器或 API 服务的。Koa 是 Express 团队推出的新一代框架。
![这是图片](./Express%20VS%20Koa.png "Express VS Koa")

## 12. 前端性能优化方案
从 <font color=red>加载、渲染、运行时</font> 三个阶段
进行思考。 

加载阶段：
- 压缩资源与体积优化
- 缓存策略
- CDN加速
- 懒加载/预加载

渲染阶段：
- 减少重排与重绘（避免频繁操作DOM样式、批量操作DOM、动画属性优先用 transform 和 opacity）
- CSS与DOM优化（简化CSS选择器、减少DOM深度）

运行阶段：
- 优化JS执行效率（长任务拆分、事件委托、节流防抖）
- 避免内存泄露（未清除的定时器和事件监听器、引用大数据的闭包、对废弃DOM的引用）

## 13. webworker VS serviceworker
![这是图片](./webworker%20VS%20serviceworker.png "Webworker VS Serviceworker")





