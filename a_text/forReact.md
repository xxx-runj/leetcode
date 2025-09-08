## 1. React 生命周期
- 渲染
    - render 渲染之前，执行render决定模板
    - componentDidMount 已经挂载
- 更新
    - shouldComponentUpdate 是否应该重新渲染 return false 则不更新
    - componentDidUpdate 更新完成
- 卸载
    - componentWillUnmount 即将卸载