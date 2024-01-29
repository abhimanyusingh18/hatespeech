chrome.storage.sync.get(['blockedWord'], function(result) {
    if (result.blockedWord) {
      const blockedWord = result.blockedWord;
      const regex = new RegExp('\\b' + blockedWord + '\\b', 'gi');
      const replacement = '*'.repeat(blockedWord.length);
  
      document.body.innerHTML = document.body.innerHTML.replace(regex, replacement);
    }
  });
  