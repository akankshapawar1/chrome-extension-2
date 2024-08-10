document.getElementById('add-button').addEventListener('click', () => {
  let url = document.getElementById('url-input').value.trim();
  
  // Ensure the URL has a protocol (http:// or https://)
  if (!/^https?:\/\//i.test(url)) {
      alert('Invalid URL: Please enter a valid URL that starts with http:// or https://');
      return;
  }

  // Simple URL validation
  try {
      new URL(url);
  } catch (e) {
      alert('Invalid URL: Please enter a valid URL.');
      return;
  }

  // Add the URL to storage
  chrome.runtime.sendMessage({ action: 'addWebpage', url }, (response) => {
      if (response.status === 'success') {
          document.getElementById('url-input').value = '';
          alert('URL added to the list!');
      }
  });
});

document.getElementById('nudge-button').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'getRandomWebpage' }, (response) => {
      if (response.url) {
          const nudgeOutput = document.getElementById('nudge-output');
          nudgeOutput.innerHTML = `<a href="${response.url}" target="_blank">${response.url}</a>`;
      } else {
          alert('No URLs in the list. Please add some!');
      }
  });
});
