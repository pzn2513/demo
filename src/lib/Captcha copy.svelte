<!-- Captcha.svelte -->
<script>
  import { onMount } from 'svelte';
  
  // 组件属性
  export let width = 120;
  export let height = 40;
  export let length = 4;
  
  // 内部状态
  let canvas;
  let code = '';
  let ctx;
  
  // 字符集
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  
  // 随机颜色生成
  function randomColor(min, max) {
    const r = Math.floor(Math.random() * (max - min) + min);
    const g = Math.floor(Math.random() * (max - min) + min);
    const b = Math.floor(Math.random() * (max - min) + min);
    return `rgb(${r},${g},${b})`;
  }
  
  // 生成随机验证码
  function generateCode() {
    let result = '';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * characters.length);
      result += characters[idx];
    }
    return result;
  }
  
  // 绘制验证码
  function drawCaptcha() {
    if (!ctx) return;
    
    // 生成新的验证码
    code = generateCode();
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 设置背景色
    ctx.fillStyle = '#f7f7f7';
    ctx.fillRect(0, 0, width, height);
    
    // 绘制文字
    const fontSize = height * 0.6;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textBaseline = 'middle';
    
    // 计算字符间距
    const charWidth = width / (length + 1);
    
    // 绘制每个字符
    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      // 随机旋转角度
      const rotate = (Math.random() - 0.5) * 0.3;
      
      ctx.save();
      // 移动到字符位置
      ctx.translate((i + 1) * charWidth, height / 2);
      ctx.rotate(rotate);
      
      // 设置随机颜色
      ctx.fillStyle = randomColor(50, 160);
      
      // 绘制字符
      ctx.fillText(char, -fontSize / 3, 0);
      ctx.restore();
    }
    
    // 绘制干扰线
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.strokeStyle = randomColor(150, 230);
      ctx.lineWidth = 1;
      
      const x1 = Math.random() * width;
      const y1 = Math.random() * height;
      const x2 = Math.random() * width;
      const y2 = Math.random() * height;
      
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    // 绘制干扰点
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = randomColor(150, 230);
      ctx.beginPath();
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  
  // 验证码刷新
  export function refresh() {
    drawCaptcha();
  }
  
  // 获取当前验证码
  export function getCode() {
    return code;
  }
  
  // 组件挂载时初始化
  onMount(() => {
    if (!canvas) return;
    
    // 设置canvas的实际渲染尺寸
    canvas.width = width;
    canvas.height = height;
    
    // 获取渲染上下文
    ctx = canvas.getContext('2d', {
      alpha: false,  // 禁用alpha通道以提高性能
      willReadFrequently: false  // 提示不会频繁读取像素数据
    });
    
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }
    
    // 初始绘制验证码
    drawCaptcha();
    
    // 清理函数
    return () => {
      // 清空画布
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
      // 释放上下文
      ctx = null;
    };
  });
</script>

<canvas
  bind:this={canvas}
  on:click={refresh}
  style="cursor: pointer; width: {width}px; height: {height}px;"
></canvas>

<style>
  canvas {
    display: inline-block;
    vertical-align: middle;
    user-select: none;
  }
</style>
