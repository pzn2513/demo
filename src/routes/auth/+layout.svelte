<script>
  let { children } = $props();
</script>

<div>
  <a href="/auth/signin">登录</a>
  <a href="/auth/signup">注册</a>
  <a href="/auth/reset">重置密码</a>
</div>
<div class="container">
  {@render children()}
</div>
