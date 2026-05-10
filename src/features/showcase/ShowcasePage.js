import { createButton } from '@shared/components/Button';
import { createInput } from '@shared/components/Input';
import { createTextarea } from '@shared/components/Textarea';
import { createCheckbox } from '@shared/components/Checkbox';
import { createRadio } from '@shared/components/Radio';
import { createToggle } from '@shared/components/Toggle';

const demos = [
  {
    title: 'Кнопка (Button)',
    render: (box) => {
      box.appendChild(createButton({ label: 'Вторичная', variant: 'secondary' }));
      box.appendChild(createButton({ label: 'Главная', variant: 'primary' }));
      box.appendChild(createButton({ label: 'Опасная', variant: 'danger' }));
      box.appendChild(createButton({ label: 'Заблокирована', disabled: true }));
    },
    code: `createButton({ label: 'Вторичная' })\ncreateButton({ label: 'Главная', variant: 'primary' })\ncreateButton({ label: 'Опасная', variant: 'danger' })\ncreateButton({ label: 'Заблокирована', disabled: true })`
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
