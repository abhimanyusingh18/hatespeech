document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.getElementById('addButton');
  const readButton = document.getElementById('readButton');
  const wordInput = document.getElementById('wordInput');
  const status = document.getElementById('status');

  addButton.addEventListener('click', function() {
    const word = wordInput.value.trim();
    if (word !== '') {
      chrome.runtime.sendMessage({ action: 'addWord', word }, (response) => {
        if (response.success) {
          status.textContent = 'Word added successfully.';
          wordInput.value = '';
        } else {
          status.textContent = 'Error adding word.';
        }
      });
    }
  });

  readButton.addEventListener('click', function() {
    readCSVFile();
  });
});
