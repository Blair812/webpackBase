import $ from 'jquery'

// webpack 中，一切皆模块。都可以通过es6导入语法导入
import '@/css/index.css'
import './css/index.less'
import img1 from './imgs/a.jpeg'
import './index1.js'

$(function(){
    $('li:odd').css('background-color','red')
    $('li:even').css('background-color','yellow')
    $('.img1').attr('src', img1)
})

