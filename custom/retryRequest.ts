// 问题描述: 实现一个基于Promise的请求重试机制，支持最大重试次数、重试间隔和失败回调。
function retryRequest(
    requestFn,
    options
) {
    const { maxRetries = 3, retryDelay = 1000, onRetry = null } = options;
    
    return new Promise((resolve, reject) => {
        let attempt = 0;

        function execute() {
            attempt++;
            requestFn().then(res => {
                resolve(res);
            }, error => {
                if(attempt < maxRetries) {
                    if(typeof onRetry === 'function') {
                        onRetry({attempt, error})
                    }
                    execute();
                } else {
                    reject(error); // 最后一次请求的报错
                }
            })
        }
    })

}
