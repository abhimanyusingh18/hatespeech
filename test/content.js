chrome.storage.sync.get({ blockedWords: [] }, (data) => {
  const blockedWords = data.blockedWords.map((word) => {
    return new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
  });

  chrome.fileSystem.chooseEntry({ type: 'openFile' }, async (entry) => {
    const file = await entry.getFile();
    const contents = await file.text();
    const csvWords = contents.trim().split('\n');
    const wordsToBlock = [...new Set([...blockedWords, ...csvWords])];
    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(wordsToBlock.join('|'), 'g'), '****');
  });
});
