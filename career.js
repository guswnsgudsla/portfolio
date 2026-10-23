(() => {
  const rows = [...document.querySelectorAll('.career li[data-start]')];
  const parts = new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit'}).formatToParts(new Date());
  const year = Number(parts.find(part => part.type === 'year').value);
  const month = Number(parts.find(part => part.type === 'month').value);
  const currentMonth = `${year}-${String(month).padStart(2, '0')}`;
  const monthIndex = value => {
    const [y, m] = value.split('-').map(Number);
    return y * 12 + m - 1;
  };
  const formatDuration = months => {
    const years = Math.floor(months / 12);
    const rest = months % 12;
    return [years ? `${years}년` : '', rest ? `${rest}개월` : ''].filter(Boolean).join(' ') || '0개월';
  };
  let totalMonths = 0;
  rows.forEach(row => {
    const duration = Math.max(0, monthIndex(row.dataset.end || currentMonth) - monthIndex(row.dataset.start) + 1);
    row.querySelector('.career-duration').textContent = formatDuration(duration);
    totalMonths += duration;
  });
  const total = document.getElementById('career-total');
  total.replaceChildren(document.createTextNode(`${Math.floor(totalMonths / 12)}년`));
  if (totalMonths % 12) {
    const rest = document.createElement('span');
    rest.textContent = `${totalMonths % 12}개월`;
    total.append(document.createTextNode(' '), rest);
  }
  document.getElementById('career-level').textContent = `${Math.floor(totalMonths / 12) + 1}년차 개발자`;
  document.getElementById('career-calculation').textContent = `${year}.${String(month).padStart(2, '0')} 기준 · 재직기간 합산`;
})();
