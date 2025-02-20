async function vote(option) {
    await fetch('http://localhost:30001/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ option })
    });
    updateResults();
  }
  
  async function updateResults() {
    const res = await fetch('http://localhost:30001/results');
    const data = await res.json();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = Object.entries(data)
      .map(([key, val]) => `<p><strong>${key}:</strong> ${val} głosów</p>`)
      .join('');
  }
  
  updateResults(); // Początkowe wczytanie wyników