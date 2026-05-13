import './Tooltip.css';

let activeTooltip = null;

export function bindTooltip(element, text, position = 'top') {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  tooltip.style.position = 'absolute';
  tooltip.style.zIndex = '1001';
  tooltip.style.pointerEvents = 'none';

  let showTimeout;

  function show() {
    if (activeTooltip && activeTooltip !== tooltip) {
      hide(activeTooltip);
    }

    document.body.appendChild(tooltip);
    activeTooltip = tooltip;

    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top = rect.top + window.scrollY - tooltipRect.height - 6;
    let left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;

    if (position === 'bottom') {
      top = rect.bottom + window.scrollY + 6;
    } else if (position === 'left') {
      top = rect.top + window.scrollY + rect.height / 2 - tooltipRect.height / 2;
      left = rect.left + window.scrollX - tooltipRect.width - 6;
    } else if (position === 'right') {
      top = rect.top + window.scrollY + rect.height / 2 - tooltipRect.height / 2;
      left = rect.right + window.scrollX + 6;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.classList.add('tooltip--visible');
  }

  function hide() {
    if (tooltip.parentNode) {
      tooltip.parentNode.removeChild(tooltip);
    }
    if (activeTooltip === tooltip) {
      activeTooltip = null;
    }
  }

  element.addEventListener('mouseenter', () => {
    showTimeout = setTimeout(show, 300);
  });

  element.addEventListener('mouseleave', () => {
    clearTimeout(showTimeout);
    hide();
  });

  element.addEventListener('click', () => {
    clearTimeout(showTimeout);
    hide();
  });

  return {
    destroy() {
      element.removeEventListener('mouseenter', show);
      element.removeEventListener('mouseleave', hide);
      element.removeEventListener('click', hide);
      hide();
    }
  };
}
