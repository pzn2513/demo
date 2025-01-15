<script>
  import { plansStore } from "$lib/stores";

  let name = $state("");
  let { children } = $props();
  if (typeof Window !== "undefined") {
    // setInterval(profile, 5000)
    profile();
  }
  function profile() {
    // fetch /user/signout 清空cookie
    fetch("/v1/user/profile", {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        window.location.href = "/auth/signin";
      })
      .then((data) => {
        globalThis.x.profile = data;
        name = data.name;
        plansStore.set(data);
      });
  }
  function signout() {
    fetch("/v1/user/signout", {
      method: "GET",
    });
    window.location.href = "/auth/signin";
  }
  function signoutall() {
    fetch("/v1/user/signoutall", {
      method: "GET",
    });
    window.location.href = "/auth/signin";
  }
</script>

<div>
  <button onclick={signout}>登出</button>
  <button onclick={signoutall}>登出所有设备</button>
</div>
<div>
  手捧轻香，从一杯下午茶开始，你好：{name}
  <!-- 0-6 别熬夜啦，对身体不好, -->
  <!-- 18-24 晚上: -->
  <!-- 6-12 早上: -->
</div>
<div>
  <a href="/dashboard">仪表盘</a>
  <a href="/dashboard/doc">使用文档</a>
  <a href="/dashboard/node">节点状态</a>
  <a href="/dashboard/order">我的订单</a>
  <a href="/dashboard/profile">个人信息</a>
  <a href="/dashboard/plan">购买订阅</a>
  <a href="/dashboard/ticket">我的工单</a>
  <a href="/dashboard/traffic">流量明细</a>
</div>
{@render children()}
