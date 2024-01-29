chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addWord') {
    chrome.storage.sync.get({ blockedWords: [] }, (data) => {
      const blockedWords = data.blockedWords;
      blockedWords.push(message.word);
      chrome.storage.sync.set({ blockedWords }, () => {
        sendResponse({ success: true });
      });
    });
  }
});

function readCSVFile() {
  const csvContent = window.prompt('Enter words (comma-separated) or paste the content of the CSV file:');
  if (csvContent) {
    const words = csvContent.split(',');
  }
}

async function saveToCSV(word) {
  const fileHandle = await window.chooseFileSystemEntries({
    type: 'open-file',
    accepts: [{
      description: 'CSV Files',
      mimeTypes: ['text/csv'],
      extensions: ['csv']
    }]
  });
  const file = await fileHandle.getFile();
  const contents = await file.text();
  const existingWords = contents.trim().split('\n');
  existingWords.push(word);
  const csvData = existingWords.join('\n');

  const writer = await file.createWriter();
  await writer.write(0, csvData);
}
