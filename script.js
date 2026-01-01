let currentShortUrl = "";

async function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value;

  if (!longUrl) {
    alert("Please enter a URL");
    return;
  }

  const response = await fetch("/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: longUrl })
  });

  const data = await response.json();
  showShortUrl(data.shortUrl);
}

function showShortUrl(url) {
  currentShortUrl = url;
  const input = document.getElementById("shortUrlInput");
  if (input) {
    input.value = url;
    input.focus();
    input.select();
  }
  const actions = document.getElementById("actions");
  if (actions) actions.style.display = "block";
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) copyBtn.style.display = 'inline-block';
}

async function copyShortUrl() {
  if (!currentShortUrl) return;
  const btn = document.getElementById("copyBtn");
  try {
    await navigator.clipboard.writeText(currentShortUrl);
    if (btn) {
      // preserve original HTML (icon + text) so we can restore it
      if (!btn.dataset.origHtml) btn.dataset.origHtml = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = btn.dataset.origHtml;
        btn.disabled = false;
      }, 1200);
    }
  } catch (e) {
    const input = document.getElementById("shortUrlInput");
    if (input) {
      input.select();
      document.execCommand('copy');
      if (btn) {
        if (!btn.dataset.origHtml) btn.dataset.origHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
        setTimeout(() => (btn.innerHTML = btn.dataset.origHtml), 1200);
      } else {
        alert('Copied to clipboard');
      }
    }
  }
}

function visitShortUrl() {
  if (!currentShortUrl) return;
  window.open(currentShortUrl, '_blank');
}

function shareShortUrl() {
  if (!currentShortUrl) return;
  if (navigator.share) {
    navigator.share({ title: 'Short URL', text: currentShortUrl, url: currentShortUrl }).catch(() => {});
  } else {
    copyShortUrl();
    alert('Share not supported in this browser — URL copied to clipboard.');
  }
}

function clearLongUrl(){
  const input = document.getElementById('longUrl');
  if(input){
    input.value = '';
    input.focus();
  }
  // clear result area
  const shortInput = document.getElementById('shortUrlInput');
  if(shortInput){ shortInput.value = ''; }
  const actions = document.getElementById('actions');
  if(actions) actions.style.display = 'none';
  const copyBtn = document.getElementById('copyBtn');
  if(copyBtn) copyBtn.style.display = 'none';
  currentShortUrl = '';
}
