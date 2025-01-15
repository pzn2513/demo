<script>
  let email, pwd;
  function login() {
    console.log(email, pwd);
    fetch("/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pwd }),
    })
      .then((r) => r.json())
      .then(async (r) => {
        console.log(r);
        if (r.msg === "登录成功") {
          window.location.href = "/dashboard";
        }
      });
  }
</script>

<h1>登录</h1>
<div>邮箱:<input type="text" bind:value={email} /></div>
<div>密码:<input type="password" bind:value={pwd} /></div>

<button onclick={login}>登录</button>
