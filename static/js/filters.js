// filters.js — vanilla JS, no dependencies
// Hugo stamps data-tags and data-ym on each feed item.
// data-ym format: YYYYMM (e.g. "202604") — lexicographic == chronological.

var activeTags = new Set();

function allItems() {
  return document.querySelectorAll('[data-ym]');
}

function applyFilters() {
  var fromEl  = document.getElementById('sel-from');
  var toEl    = document.getElementById('sel-to');
  var fromVal = fromEl ? fromEl.value : '';
  var toVal   = toEl   ? toEl.value   : '';
  var items   = allItems();
  var visible = 0;

  items.forEach(function(el) {
    var tags     = el.dataset.tags ? el.dataset.tags.split(' ') : [];
    var ym       = el.dataset.ym;
    var tagMatch = activeTags.size === 0 || tags.some(function(t) { return activeTags.has(t); });
    var show     = tagMatch && (!fromVal || ym >= fromVal) && (!toVal || ym <= toVal);
    el.classList.toggle('hidden', !show);
    if (show) visible++;
  });

  var total = items.length;
  var rc = document.getElementById('result-count');
  if (rc) rc.textContent = visible < total ? 'showing ' + visible + ' of ' + total : '';

  var empty = document.getElementById('empty-state');
  var feed  = document.getElementById('feed');
  if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
  if (feed)  feed.style.display  = visible === 0 ? 'none'  : 'block';
}

function toggleTag(el) {
  var tag = el.dataset.tag;
  if (tag === 'all') {
    activeTags.clear();
    document.querySelectorAll('.pill').forEach(function(p) { p.classList.remove('active'); });
    el.classList.add('active');
  } else {
    var allPill = document.querySelector('.pill[data-tag="all"]');
    if (allPill) allPill.classList.remove('active');
    if (activeTags.has(tag)) {
      activeTags.delete(tag);
      el.classList.remove('active');
      if (activeTags.size === 0 && allPill) allPill.classList.add('active');
    } else {
      activeTags.add(tag);
      el.classList.add('active');
    }
  }
  applyFilters();
}

function clearFilters() {
  activeTags.clear();
  document.querySelectorAll('.pill').forEach(function(p) { p.classList.remove('active'); });
  var allPill = document.querySelector('.pill[data-tag="all"]');
  if (allPill) allPill.classList.add('active');
  var fromEl = document.getElementById('sel-from');
  var toEl   = document.getElementById('sel-to');
  if (fromEl) fromEl.value = '';
  if (toEl)   toEl.value   = '';
  applyFilters();
}

function openTagsOverlay(e) {
  e.preventDefault();
  var overlay = document.getElementById('tags-overlay');
  if (overlay) overlay.classList.add('open');
}

function closeTagsOverlay() {
  var overlay = document.getElementById('tags-overlay');
  if (overlay) overlay.classList.remove('open');
}

function toggleDark() {
  var site   = document.getElementById('site');
  var isDark = site.classList.contains('dark');
  site.classList.toggle('dark',  !isDark);
  site.classList.toggle('light',  isDark);
  var btn = document.querySelector('.toggle-btn');
  if (btn) btn.textContent = isDark ? 'dark mode' : 'light mode';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Restore saved theme preference before first paint
(function() {
  var saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    var site = document.getElementById('site');
    if (site) {
      site.classList.remove('light');
      site.classList.add('dark');
      var btn = document.querySelector('.toggle-btn');
      if (btn) btn.textContent = 'light mode';
    }
  }
  applyFilters();
})();
