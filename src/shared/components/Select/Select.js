import './Select.css';

export function createSelect({ items = [], selected = '', onChange } = {}) {
  const container = document.createElement('div');
  container.className = 'ui-select';

  const trigger = document.createElement('div');
  trigger.className = 'ui-select__trigger';
  const triggerText = document.createElement('span');
  triggerText.textContent = items.find(i => i.value === selected)?.label || items[0]?.label || '—';
  trigger.appendChild(triggerText);

  const indicator = document.createElement('span');
  indicator.className = 'ui-select__indicator';
  if (selected && selected !== items[0]?.value) {
    indicator.classList.add('ui-select__indicator--active');
  }
  trigger.prepend(indicator);

  const dropdown = document.createElement('div');
  dropdown.className = 'ui-select__dropdown';

  items.forEach(item => {
    const option = document.createElement('div');
    option.className = 'ui-select__option';
    option.dataset.value = item.value;
    option.textContent = item.label;
    if (item.value === selected) {
      option.classList.add('ui-select__option--selected');
    }
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerText.textContent = item.label;
      if (item.value === items[0]?.value && !selected) {
        indicator.classList.remove('ui-select__indicator--active');
      } else {
        indicator.classList.add('ui-select__indicator--active');
      }
      dropdown.querySelectorAll('.ui-select__option').forEach(opt => opt.classList.remove('ui-select__option--selected'));
      option.classList.add('ui-select__option--selected');
      dropdown.classList.remove('ui-select__dropdown--open');
      if (onChange) onChange(item.value);
    });
    dropdown.appendChild(option);
  });

  container.appendChild(trigger);
  container.appendChild(dropdown);

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('ui-select__dropdown--open');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('ui-select__dropdown--open');
  });

  return container;
}
