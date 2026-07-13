chrome.action.onClicked.addListener((tab) => {
  if (!tab.id || !tab.url || !tab.url.startsWith('https://github.com/')) return

  chrome.tabs.sendMessage(
    tab.id,
    {
      type: 'OPEN_GITHUB_FRESHNESS_SETTINGS',
    },
    () => {
      chrome.runtime.lastError
    }
  )
})
