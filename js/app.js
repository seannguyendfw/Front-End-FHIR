// ===== APP.JS — Shared JS for all pages =====

// ===== JSON SYNTAX HIGHLIGHTER (static) =====
function syntaxHighlight(json) {
  return json.replace(/(\"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*\"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}\[\],])/g, function (match) {
    let cls = 'json-number';
    if (/^\"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'json-key';
        match = match.replace(/:$/, '');
        return `<span class="${cls}">${match}</span>:`;
      } else { cls = 'json-string'; }
    } else if (/true|false/.test(match)) { cls = 'json-bool';
    } else if (/null/.test(match)) { cls = 'json-null';
    } else if (/[{}\[\]]/.test(match)) { cls = 'json-brace';
    } else if (/,/.test(match)) { cls = 'json-comma'; }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

// ===== INTERACTIVE JSON BUILDER =====
// annotations: { "keyName": "Plain English explanation" }
function buildInteractiveJson(obj, annotations, onKeyClick) {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/(\"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*\"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}\[\],])/g, function (match) {
    if (/^\"/.test(match) && /:$/.test(match)) {
      const key = match.replace(/^"|":$/g, '').replace(/:$/, '');
      const hasAnnotation = annotations && annotations[key];
      const cls = hasAnnotation ? 'json-key json-key-clickable' : 'json-key';
      const dataAttr = hasAnnotation ? `data-key="${key}"` : '';
      const cleanKey = match.replace(/:$/, '');
      return `<span class="${cls}" ${dataAttr}>${cleanKey}</span>:`;
    }
    let cls = 'json-number';
    if (/^\"/.test(match)) { cls = 'json-string';
    } else if (/true|false/.test(match)) { cls = 'json-bool';
    } else if (/null/.test(match)) { cls = 'json-null';
    } else if (/[{}\[\]]/.test(match)) { cls = 'json-brace';
    } else if (/,/.test(match)) { cls = 'json-comma'; }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

// ===== COPY JSON =====
function copyJson(preId, btn) {
  const pre = document.getElementById(preId);
  const text = pre ? pre.innerText : '';
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
  });
}

// ===== TAB SWITCHER =====
function switchTab(groupId, tabIndex) {
  const group = document.getElementById(groupId);
  if (!group) return;
  const tabs = group.querySelectorAll('.tab-btn');
  const contents = group.querySelectorAll('.tab-content');
  tabs.forEach((t, i) => t.classList.toggle('active', i === tabIndex));
  contents.forEach((c, i) => c.classList.toggle('active', i === tabIndex));
}

// ===== INIT TABS =====
function initTabGroups() {
  document.querySelectorAll('.tab-group').forEach(group => {
    const tabs = group.querySelectorAll('.tab-btn');
    const contents = group.querySelectorAll('.tab-content');
    if (tabs.length > 0) tabs[0].classList.add('active');
    if (contents.length > 0) contents[0].classList.add('active');
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tabs[i].classList.add('active');
        if (contents[i]) contents[i].classList.add('active');
      });
    });
  });
}

// ===== RENDER JSON BLOCKS =====
function renderJsonBlocks() {
  document.querySelectorAll('pre[data-json]').forEach(pre => {
    try {
      const obj = JSON.parse(pre.getAttribute('data-json') || pre.textContent);
      pre.innerHTML = syntaxHighlight(JSON.stringify(obj, null, 2));
    } catch(e) {}
  });
}

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    a.classList.toggle('active', href === current);
  });
}

// ===== LIVE FHIR FETCHER =====
const FHIR_BASE = 'https://hapi.fhir.org/baseR4';

async function fetchFhirResource(resourceType, params = '') {
  const url = `${FHIR_BASE}/${resourceType}?_count=1&_format=json${params ? '&' + params : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const bundle = await res.json();
  if (bundle.entry && bundle.entry.length > 0) {
    return bundle.entry[0].resource;
  }
  if (bundle.resourceType === resourceType) return bundle;
  throw new Error('No entries found');
}

async function fetchFhirById(resourceType, id) {
  const url = `${FHIR_BASE}/${resourceType}/${id}?_format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

// ===== QUIZ ENGINE =====
function initQuiz(quizId, questions) {
  const container = document.getElementById(quizId);
  if (!container) return;
  let score = 0;
  let answered = 0;

  questions.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-q"><span class="quiz-num">Q${qi + 1}</span> ${q.question}</div>
      <div class="quiz-options">
        ${q.options.map((opt, oi) => `
          <button class="quiz-option" data-qi="${qi}" data-oi="${oi}">${opt}</button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="qfb-${quizId}-${qi}"></div>
    `;
    container.appendChild(card);
  });

  container.addEventListener('click', e => {
    const btn = e.target.closest('.quiz-option');
    if (!btn) return;
    const qi = parseInt(btn.dataset.qi);
    const oi = parseInt(btn.dataset.oi);
    const card = btn.closest('.quiz-card');
    if (card.dataset.answered) return;
    card.dataset.answered = '1';
    answered++;
    const correct = questions[qi].correct;
    const fb = document.getElementById(`qfb-${quizId}-${qi}`);
    card.querySelectorAll('.quiz-option').forEach((b, i) => {
      b.disabled = true;
      if (i === correct) b.classList.add('correct');
      else if (i === oi) b.classList.add('wrong');
    });
    if (oi === correct) {
      score++;
      fb.innerHTML = `<span class="fb-correct">✅ Correct!</span> ${questions[qi].explanation}`;
    } else {
      fb.innerHTML = `<span class="fb-wrong">❌ Not quite.</span> ${questions[qi].explanation}`;
    }
    // Show final score when all answered
    const scoreEl = document.getElementById(quizId + '-score');
    if (scoreEl && answered === questions.length) {
      const pct = Math.round((score / questions.length) * 100);
      scoreEl.innerHTML = `
        <div class="quiz-score">
          <div class="quiz-score-num">${score}/${questions.length}</div>
          <div class="quiz-score-label">${pct >= 80 ? '🎉 Excellent!' : pct >= 50 ? '👍 Good effort!' : '📚 Keep studying!'}</div>
        </div>`;
      scoreEl.style.display = 'block';
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initTabGroups();
  renderJsonBlocks();
});
