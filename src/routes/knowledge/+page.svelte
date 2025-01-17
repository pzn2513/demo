<script>
  // Data structure for the sections
  const sections = [
    {
      title: "更新订阅",
      items: [
        {
          title: "更新订阅方法",
          lastUpdate: "2023/09/30"
        }
      ]
    },
    {
      title: "iOS(客户端下载)/教程",
      items: [
        {
          title: "苹果iOS/iPad Karing(免费)客户端(推荐)",
          lastUpdate: "2024/11/10"
        },
        {
          title: "苹果iOS/iPad Sing-Box(免费)客户端(推荐)",
          lastUpdate: "2024/09/24"
        },
        {
          title: "苹果iOS/iPad Shadowrocket(收费)客户端",
          lastUpdate: "2024/09/09"
        }
      ]
    },
    {
      title: "Windows/Mac OS/Linux(客户端下载)",
      items: [
        {
          title: "电脑Clash Verge客户端使用方法(1.16)",
          lastUpdate: "2025/01/16"
        }
      ]
    },
    {
      title: "Android/鸿蒙(客户端下载)",
      items: [
        {
          title: "安卓/鸿蒙Clash Meta客户端使用方法(推荐)(12.27)",
          lastUpdate: "2024/12/27"
        },
        {
          title: "安卓/鸿蒙Nekobox客户端使用方法(12.27)",
          lastUpdate: "2024/12/27"
        }
      ]
    },
    {
      title: "路由器",
      items: [
        {
          title: "路由器 梅林Merlin/OpenWrt(2025.16)推荐更新，解决断流",
          lastUpdate: "2025/01/16"
        }
      ]
    }
  ];
</script>

<div class="container mx-auto px-4 py-8">
  {#each sections as section}
    <div class="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
        <h2 class="text-xl font-semibold text-white">{section.title}</h2>
      </div>
      
      <div class="divide-y divide-gray-200">
        {#each section.items as item}
          <a 
            href="#/knowledge" 
            class="block p-6 hover:bg-gray-50 transition-colors duration-200"
          >
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-medium text-gray-900 mb-1">
                {item.title}
              </h3>
              <span class="text-sm text-gray-500 whitespace-nowrap ml-4">
                最后更新: {item.lastUpdate}
              </span>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  /* Add any custom styles here if needed */
  :global(body) {
    @apply bg-gray-50;
  }
</style>