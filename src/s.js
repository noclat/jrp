const root = document.getElementById('root');

const video = document.createElement('video');
video.classList.add('v');
video.playsInline = true;
root.appendChild(video);
const source = document.createElement('source');
source.type = 'video/mp4';
source.src = './p/v.mp4';
video.appendChild(source);

const main = document.createElement('main');
main.classList.add('m');
root.appendChild(main);

const header = document.createElement('header');
header.classList.add('h');
header.innerHTML = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg><span>sound on</span>`;
main.appendChild(header);

const list = document.createElement('ul');
list.classList.add('l');
main.appendChild(list);

const tic = new Audio('./p/t.m4a');
const success = new Audio('./p/s.mp3');
const error = new Audio('./p/e.mp3');

const swap = (a, b) => {
  let dummy = document.createElement('span');
  a.before(dummy);
  b.before(a);
  dummy.replaceWith(b);
};

const handleClick = (e) => {
  tic.load();
  tic.play();
  const selected = document.querySelector('.i.a');
  if (selected) {
    selected.classList.remove('a');
    swap(selected, e.target);
  } else {
    e.target.classList.add('a');
  }
};

const solution = 'JNBRTLC';
const shuffle = (string) => {
  const arr = string.split('');
  let currentIndex = arr.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex], arr[currentIndex]];
  }
  const output = arr.join('');
  return string === output ? shuffle(string) : output;
};

const letters = shuffle(solution);
const items = [];
for (let i = 0, l = letters.length; i<l; i++) {
  const item = document.createElement('li');
  item.classList.add('i');
  item.innerText = letters[i];
  item.addEventListener('click', handleClick);
  items.push(item);
  list.appendChild(item);
}

const button = document.createElement('button');
button.classList.add('b');
button.innerHTML = `
<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
`;
button.addEventListener('click', (e) => {
  const text = list.innerText.replace(/\W/g, '');
  const order = new RegExp(solution, 'i');
  if (order.test(text)) {
    if (!document.body.classList.contains('s')) {
      document.body.classList.add('s');
      success.load();
      success.play();
    } else {
      document.body.classList.add('w');
      setTimeout(() => video.play(), 500);
    }
  } else {
    document.body.classList.add('e');
    error.load();
    error.play();
    setTimeout(() => document.body.classList.remove('e'), 1000);
  }
});
main.appendChild(button);