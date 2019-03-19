# html2pdf
javascript 实现 将 html 页面 转为 pdf 下载

## 在依赖 jspdf 和 html2canvas 基础上做下封装

## 案例

```
// 点击下载 pdf 版
  async handleDownloadPdf(){
    this.setState({downloadIng:true})
    try{
      let { userName='下载',pdf } = this.props
      let el = document.getElementById(`html-box-id-${pdf}`)
      let ok = await html2pdf(el,`xxx-${userName}`,true)
      ok.save(`xxxx-${userName}`) // 保存
    }catch(err){
      console.log(err +'')
    }
    this.setState({downloadIng:false})
  }

```