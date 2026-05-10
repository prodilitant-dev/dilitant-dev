import { createButton } from '@shared/components/Button';
import { createInput } from '@shared/components/Input';
import { createTextarea } from '@shared/components/Textarea';
import { createCheckbox } from '@shared/components/Checkbox';
import { createRadio } from '@shared/components/Radio';
import { createToggle } from '@shared/components/Toggle';
import { createSelect } from '@shared/components/Select';
import { createMultiSelect } from '@shared/components/MultiSelect';
import { createImage } from '@shared/components/Image';
import { showConfirmDialog } from '@shared/components/ConfirmDialog';
import { bindTooltip } from '@shared/components/Tooltip';
import { showToast } from '@shared/components/ToastController';

const demos = [
  {
    title: 'Кнопка (Button)',
    render: (box) => {
      box.appendChild(createButton({ label: 'Обычная', variant: 'secondary' }));
      box.appendChild(createButton({ label: 'Главная', variant: 'primary' }));
      box.appendChild(createButton({ label: 'Опасная', variant: 'danger' }));
      box.appendChild(createButton({ label: 'Заблокирована', disabled: true }));
    },
    code: `createButton({ label: 'Обычная', variant: 'secondary' })\ncreateButton({ label: 'Главная', variant: 'primary' })\ncreateButton({ label: 'Опасная', variant: 'danger' })\ncreateButton({ label: 'Заблокирована', disabled: true })`
  },
  {
    title: 'Поле ввода (Input)',
    render: (box) => {
      box.appendChild(createInput({ placeholder: 'Введите текст', onChange: (v) => console.log(v) }));
    },
    code: `createInput({ placeholder: 'Введите текст', onChange: (v) => console.log(v) })`
  },
  {
    title: 'Текстовая область (Textarea)',
    render: (box) => {
      box.appendChild(createTextarea({ placeholder: 'Введите описание', rows: 3, onChange: (v) => console.log(v) }));
    },
    code: `createTextarea({ placeholder: 'Введите описание', rows: 3, onChange: (v) => console.log(v) })`
  },
  {
    title: 'Флажок (Checkbox)',
    render: (box) => {
      box.appendChild(createCheckbox({ label: 'Согласен с правилами', onChange: (val) => console.log('checked:', val) }));
    },
    code: `createCheckbox({ label: 'Согласен с правилами', onChange: (val) => console.log('checked:', val) })`
  },
  {
    title: 'Радиокнопки (Radio)',
    render: (box) => {
      const group = document.createElement('div');
      group.appendChild(createRadio({ name: 'color', value: 'red', label: 'Красный', onChange: (v) => console.log(v) }));
      group.appendChild(createRadio({ name: 'color', value: 'green', label: 'Зелёный', checked: true }));
      group.appendChild(createRadio({ name: 'color', value: 'blue', label: 'Синий' }));
      box.appendChild(group);
    },
    code: `createRadio({ name: 'color', value: 'red', label: 'Красный', onChange: (v) => console.log(v) })\ncreateRadio({ name: 'color', value: 'green', label: 'Зелёный', checked: true })\ncreateRadio({ name: 'color', value: 'blue', label: 'Синий' })`
  },
  {
    title: 'Переключатель (Toggle)',
    render: (box) => {
      box.appendChild(createToggle({ checked: false, onChange: (val) => console.log('toggle:', val) }));
    },
    code: `createToggle({ checked: false, onChange: (val) => console.log('toggle:', val) })`
  },
  {
    title: 'Выпадающий список (Select)',
    render: (box) => {
      const sel = createSelect({
        items: [
          { value: 'forest', label: 'Чернолесье' },
          { value: 'reef', label: 'Бесконечный риф' },
          { value: 'dust', label: 'Пыльный тракт' }
        ],
        selected: 'forest',
        onChange: (v) => showToast(`Выбрано: ${v}`, 'info')
      });
      box.appendChild(sel);
    },
    code: `createSelect({ items: [...], selected: 'forest', onChange: (v) => showToast('Выбрано: ' + v, 'info') })`
  },
  {
    title: 'Мультивыбор (MultiSelect)',
    render: (box) => {
      const ms = createMultiSelect({
        items: [
          { value: 'sword', label: 'Меч' },
          { value: 'shield', label: 'Щит' },
          { value: 'potion', label: 'Зелье' },
          { value: 'amulet', label: 'Амулет' }
        ],
        selected: ['sword'],
        onChange: (arr) => showToast(`Выбрано: ${arr.join(', ')}`, 'info')
      });
      box.appendChild(ms);
    },
    code: `createMultiSelect({ items: [...], selected: ['sword'], onChange: (arr) => showToast('Выбрано: ' + arr.join(', '), 'info') })`
  },
  {
    title: 'Изображение (Image)',
    render: (box) => {
      const imgWithSrc = createImage({
        src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%23e67e22%22/%3E%3C/svg%3E',
        alt: 'Оранжевый круг'
      });
      const imgPlaceholder = createImage({ placeholderText: '🖼️', alt: 'Заглушка' });
      box.appendChild(imgWithSrc);
      box.appendChild(imgPlaceholder);
    },
    code: `createImage({ src: 'https://...', alt: 'Картинка' })\ncreateImage({ placeholderText: '🖼️' })`
  },
  {
    title: 'Диалог подтверждения (ConfirmDialog)',
    render: (box) => {
      const btn = createButton({
        label: 'Удалить',
        variant: 'danger',
        onClick: () => {
          showConfirmDialog({
            title: 'Удаление',
            message: 'Вы уверены, что хотите удалить этот элемент?',
            confirmText: 'Удалить',
            danger: true,
            onConfirm: () => showToast('Элемент удалён', 'success'),
            onCancel: () => showToast('Отменено', 'info')
          });
        }
      });
      box.appendChild(btn);
    },
    code: `showConfirmDialog({\n  title: 'Удаление',\n  message: 'Вы уверены, что хотите удалить этот элемент?',\n  confirmText: 'Удалить',\n  danger: true,\n  onConfirm: () => showToast('Элемент удалён', 'success')\n})`
  },
  {
    title: 'Тултип (Tooltip)',
    render: (box) => {
      const btn = createButton({ label: 'Наведи на меня', variant: 'secondary' });
      bindTooltip(btn, 'Это всплывающая подсказка', 'top');
      box.appendChild(btn);
    },
    code: `bindTooltip(buttonElement, 'Это всплывающая подсказка', 'top')`
  },
  {
    title: 'Тост-уведомления (Toast)',
    render: (box) => {
      box.appendChild(createButton({ label: 'Успех', variant: 'primary', onClick: () => showToast('Операция выполнена!', 'success') }));
      box.appendChild(createButton({ label: 'Ошибка', variant: 'danger', onClick: () => showToast('Что-то пошло не так', 'error') }));
      box.appendChild(createButton({ label: 'Инфо', onClick: () => showToast('Для информации', 'info') }));
    },
    code: `showToast('Операция выполнена!', 'success')\nshowToast('Что-то пошло не так', 'error')\nshowToast('Для информации', 'info')`
  }
];

export function ShowcasePage(container) {
  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'showcase-wrapper';

  demos.forEach((demo) => {
    const section = document.createElement('section');
    section.className = 'demo-section';

    const title = document.createElement('h2');
    title.textContent = demo.title;
    section.appendChild(title);

    const box = document.createElement('div');
    box.className = 'demo-box';
    demo.render(box);
    section.appendChild(box);

    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = demo.code;
    pre.appendChild(code);
    section.appendChild(pre);

    wrapper.appendChild(section);
  });

  container.appendChild(wrapper);
}
