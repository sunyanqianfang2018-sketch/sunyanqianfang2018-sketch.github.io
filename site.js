document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
document.querySelector('#print-cv')?.addEventListener('click', () => window.print());
const projectControls = document.querySelector('.project-controls');
if (projectControls) {
  const projects = [...document.querySelectorAll('.work-card[data-categories]')];
  const filters = [...projectControls.querySelectorAll('[data-filter]')];
  const projectGrid = document.querySelector('.work-grid');
  const matches = (project, category) => category === 'all' || project.dataset.categories.split(' ').includes(category);
  projectControls.hidden = false;
  filters.forEach(button => {
    const category = button.dataset.filter;
    button.querySelector('[data-count]').textContent = projects.filter(project => matches(project, category)).length;
    button.addEventListener('click', () => {
      filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
      let count = 0;
      projects.forEach(project => {
        project.hidden = !matches(project, category);
        if (!project.hidden) count++;
      });
      projectGrid.hidden = ![...projectGrid.querySelectorAll('.work-card')].some(project => !project.hidden);
      const label = button.childNodes[0].textContent.trim();
      document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown${category === 'all' ? '' : ` · ${label}`}`;
    });
  });
  document.querySelector('#filter-status').textContent = `${projects.length} projects · Projects can span more than one discipline`;
}
const copyButton = document.querySelector('.copy-email');
if (copyButton) copyButton.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('sunyanqianfang2018@gmail.com');
    status.textContent = 'Email copied.';
    copyButton.textContent = 'Copied ✓';
    setTimeout(() => { copyButton.textContent = 'Copy email'; status.textContent = ''; }, 3500);
  } catch { status.textContent = 'Please select and copy the email address.'; }
});
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
}
