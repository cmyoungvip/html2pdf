/*
 * @Description: html 转为 pdf 并下载
 * @Author: cmyoung
 * @Date: 2018-08-10 19:07:32
 * @LastEditTime: 2019-03-19 19:40:55
 */

/** 
 * @param html { String } DOM树
 * @param faileName { String } 文件名字
 * @param isOne { Boolean }  是否为单页 默认 否(false)
 * @return 文件 {pdf格式}
 */

'use strict'
import * as jsPDF from "jspdf"
import html2canvas from 'html2canvas'

export default async (html,faileName,isOne) => {
  return html2canvas(html).then(canvas => {

    let contentWidth = canvas.width
    let contentHeight = canvas.height
    let pageData = canvas.toDataURL('image/jpeg', 1.0) // 清晰度 0 - 1
    let pdf 
    if(isOne){ // 单页
      // console.log(contentWidth,'contentWidth')
      // console.log(contentHeight,'contentHeight')
      pdf = new jsPDF('orientation', 'pt', [contentWidth,contentHeight]) // 下载尺寸 a4 纸 比例
      pdf.addImage(pageData, 'JPEG', 0, 0, contentWidth, contentHeight )
    }else{
      //一页pdf显示html页面生成的canvas高度
      let pageHeight = contentWidth / 552.28 * 841.89
      //未生成pdf的html页面高度
      let leftHeight = contentHeight
      //页面偏移
      let position = 0
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      let imgWidth = 555.28
      let imgHeight = 552.28/contentWidth * contentHeight

      pdf = new jsPDF('', 'pt', 'a4') // 下载尺寸 a4 纸 比例
      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight )
      } else {
        while(leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          //避免添加空白页
          if(leftHeight > 0) {
            pdf.addPage()
          }
        }
      }
    }
    // pdf.save(`${faileName}.pdf`)
    return pdf
  })
}