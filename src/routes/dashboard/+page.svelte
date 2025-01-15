<script>
  // 引入 store
  import { plansStore } from "$lib/stores";

  // 使用 $ 前缀来订阅 store 的值
  // $: plans = $plansStore;
  function converTraffic(...argv) {
    let n = 0;
    argv.forEach(i=>{
      n += parseInt(i);
    })
    if (n<1048576) {
      return (n / 1024 / 1024).toFixed(2) + "MB";
    }
    else{
      return (n / 1024 / 1024 / 1024).toFixed(2) + "GB";
    }
  }
  function converDate(t){
    return new Date(t*1000).toLocaleDateString();
  }
</script>

<h1>仪表盘</h1>
<h2>我的订阅</h2>
{#each $plansStore.plans as plan}
  <div>
    {plan.title} 于 {converDate(plan.expire)} 到期 已用{converTraffic(plan.upload,plan.download)} /总计{converTraffic(plan.total)}
  </div>
{/each}
