<script>
  import { onMount } from "svelte";
  let email, pwd, pwd2, code='',emailcode='';
  let captchaSvg = "";
  let error = null;
  onMount(async () => {
    await fetchCaptcha();
  });
  function handleVerify(token) {
    console.log("Verified with token:", token);
    // Send token to your backend for verification
  }
  async function fetchCaptcha() {
    try {
      const response = await fetch("/v1/auth/captcha", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      captchaSvg = await response.text();
      error = null;
    } catch (err) {
      error = "加载验证码失败";
      console.error("Error fetching captcha:", err);
    }
  }
  function emailverify() {
    // 验证码错误,账号已注册,ok
    const data = {
      email,
      code,
      type: "signup",
    };
    fetch("/v1/auth/emailverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  function signup(){
    const data = {
      email,
      pwd,
      code:emailcode,
    };
    console.log(data);    
    if(pwd!==pwd2){
      console.error("两次密码不一致")
      return
    }
    if(emailcode.length!==6){
      console.error("邮箱验证码格式错误")
      return
    }
    // 验证码错误,账号已注册,ok
    fetch("/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(response => {
      if (response.ok) {
        console.log("注册成功");
        window.location.href = "/dashboard";
      } else {
        console.error(response);
      }
    }).catch(error => {
      console.error("网络错误", error);
    })
  }
</script>

<h1>注册</h1>
<div>邮箱:<input type="email" bind:value={email} /></div>
<div>密码:<input type="password" bind:value={pwd} /></div>
<div>确认密码:<input type="password" bind:value={pwd2} /></div>
<div class="captcha-container">
  {#if captchaSvg}
    <button class="svg-container" on:click={fetchCaptcha}>
      {@html captchaSvg}
    </button>
    <input
      style="height: 30px; width: 80px;"
      type="text"
      placeholder="图形验证码"
      bind:value={code}
      maxlength="4"
    />
    <button on:click={emailverify}>发送邮件</button>
  {:else}
    <div class="error">{error}</div>
  {/if}
</div>
<div>
  邮箱验证码:<input type="text" bind:value={emailcode} />
</div>
<div>
  <button on:click={signup}>注册</button>
</div>
