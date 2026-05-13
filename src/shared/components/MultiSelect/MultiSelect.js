import './MultiSelect.css';

export function createMultiSelect({ items = [], selected = [], onChange } = {}) {
  const container = document.createElement('div');
  container.className = 'ui-multiselect';

  const selectedSet = new Set(selected);
  const trigger = document.createElement('div');
  trigger.className = 'ui-multiselect__trigger';
  const triggerText = document.createElement('span');
  triggerText.textContent = selectedSet.size > 0
    ? `Выбрано: ${selectedSet.size}`
    : items[0]?.label || '—';
  trigger.appendChild(triggerText);

  const indicator = document.createElement('span');
  indicator.className = 'ui-multiselect__indicator';
  if (selectedSet.size > 0) {
    indicator.classList.add('ui-multiselect__indicator--active');
  }
  trigger.prepend(indicator);

  const dropdown = document.createElement('div');
  dropdown.className = 'ui-multiselect__dropdown';

  items.forEach(item => {
    const option = document.createElement('div');
    option.className = 'ui-multiselect__option';
    option.dataset.value = item.value;
    option.textContent = item.label;
    if (selectedSet.has(item.value)) {
      option.classList.add('ui-multiselect__option--selected');
    }
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = item.value;
      if (selectedSet.has(val)) {
        selectedSet.delete(val);
        option.classList.remove('ui-multiselect__option--selected');
      } else {
        selectedSet.add(val);
        option.classList.add('ui-multiselect__option--selected');
      }
      const arr = Array.from(selectedSet);
      triggerText.textContent = arr.length > 0 ? `Выбрано: ${arr.length}` : items[0]?.label || '—';
      indicator.classList.toggle('ui-multiselect__indicator--active', arr.length > 0);
      if (onChange) onChange(arr);
    });
    dropdown.appendChild(option);
  });

  container.appendChild(trigger);
  container.appendChild(dropdown);

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('ui-multiselect__dropdown--open');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('ui-multiselect__dropdown--open');
  });

  return container;
}
