document.addEventListener('DOMContentLoaded', function() {
    const blockButton = document.getElementById('blockButton');
    const blockWordInput = document.getElementById('blockWord');
    const statusDiv = document.getElementById('status');
  
    // Load the blocked word from storage if it exists
    chrome.storage.sync.get(['blockedWord'], function(result) {
      if (result.blockedWord) {
        blockWordInput.value = result.blockedWord;
      }
    });
  
    blockButton.addEventListener('click', function() {
      const wordToBlock = blockWordInput.value.trim();
  
      if (wordToBlock === '') {
        statusDiv.textContent = 'Please enter a word to block.';
      } else {
        // Save the blocked word to storage
        chrome.storage.sync.set({ 'blockedWord': wordToBlock }, function() {
          statusDiv.textContent = 'Word blocked: ' + wordToBlock;
        });
      }
    });
  });
  