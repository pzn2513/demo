<!-- Captcha.svelte -->
<script>
  import { onMount } from "svelte";
  export let width = 120;
  export let height = 40;
  export let length = 4;
  let canvas;
  let code = "";
  let ctx;
  // 字符集
  const characters = "23457ACDFGHJKLPQRSTUVWXY23457";
  // 舍弃的易混淆0O I 1 8B NZ EM 69
  onMount(() => {
    ctx = canvas.getContext("2d");
    drawCaptcha();
    document.addEventListener("mousedown", (e) => {
      console.log(e);
    });
  });
  // 随机颜色生成
  function randomColor(min, max) {
    const r = Math.floor(Math.random() * (max - min) + min);
    const g = Math.floor(Math.random() * (max - min) + min);
    const b = Math.floor(Math.random() * (max - min) + min);
    return `rgb(${r},${g},${b})`;
  }
  function generateCode() {
    let result = "";
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * characters.length);
      result += characters[idx];
    }
    return result;
  }

  // 绘制验证码
  function drawCaptcha() {
    if (!ctx) return;
    code = generateCode();
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f7f7f7";
    ctx.fillRect(0, 0, width, height);
    const fontSize = height * 0.65;
    ctx.font = `bold ${fontSize}px Arial`;
    // ctx.font = `bold ${fontSize}px Courier New`;
    ctx.textBaseline = "middle";
    // 计算字符间距 绘制每个字符
    const charWidth = width / length;
    const offsetX = charWidth/2;
    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      // 随机旋转角度
      const rotate = (0.4+Math.random()*0.7)*(Math.round(Math.random())*2-1); //(-1.3,-0.4),(0.4,1.3))  1.5躺平
      ctx.save();
      // 移动到字符位置
      ctx.translate((i + 1) * charWidth-offsetX, height / 2);
      ctx.rotate(rotate);
      // 设置随机颜色
      ctx.fillStyle = randomColor(50, 150);
      // 绘制字符
      ctx.fillText(char, -fontSize / 3, 0);
      ctx.restore();
    }

    // 绘制干扰线,左上到右下,
    //x0.1-0.4 0.6-0.9,y0.2-0.8
    const basic = [
      [
        //两上
        [0.05, 0.2, 0.95, 0.8],
        [0.05, 0.3, 0.95, 0.7],
        [0.05, 0.8, 0.95, 0.2],
      ],
      [
        //两下
        [0.05, 0.2, 0.95, 0.8],
        [0.05, 0.7, 0.95, 0.3],
        [0.05, 0.8, 0.95, 0.2],
      ],
      [
        //上中
        [0.05, 0.2, 0.95, 0.8],
        [0.35, 0.2, 0.65, 0.8],
        [0.05, 0.8, 0.95, 0.2],
      ],
      [
        //下中
        [0.05, 0.2, 0.95, 0.8],
        [0.35, 0.8, 0.65, 0.2],
        [0.05, 0.8, 0.95, 0.2],
      ],
      [
        //上中中
        [0.05, 0.2, 0.95, 0.8],
        [0.35, 0.2, 0.65, 0.8],
        [0.35, 0.8, 0.65, 0.2],
      ],
      [
        //下中中
        [0.05, 0.8, 0.95, 0.2],
        [0.35, 0.2, 0.65, 0.8],
        [0.35, 0.8, 0.65, 0.2],
      ],
    ];
    const randomInt = Math.floor(Math.random() * 6);
    basic[Math.floor(Math.random() * 6)].forEach((item) => {
      ctx.beginPath();
      ctx.strokeStyle = randomColor(170, 230);
      ctx.lineWidth = 1.3;
      ctx.moveTo((item[0]+Math.random()*0.1) * width, (item[1]+Math.random()*0.3-0.15) * height);
      ctx.lineTo((item[2]-Math.random()*0.1) * width, (item[3]+Math.random()*0.3-0.15) * height);
      ctx.stroke();
    });

    // 绘制干扰点
    for (let i = 0; i < 100; i++) {
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
</script>

<canvas
  bind:this={canvas}
  {width}
  {height}
  on:click={refresh}
  style="cursor: pointer;"
></canvas>

<style>
  canvas {
    display: inline-block;
    vertical-align: middle;
    user-select: none;
  }
</style>
