
// slide関数
const slideUp = (selector, duration = 500) => {
  const $target = document.querySelector(selector);
  $target.dataset.height = `${$target.clientHeight}px`;
  $target.animate(
    [
      { height: $target.dataset.height, opacity: 1 },
      { height: '0px', opacity: 0 },
    ],
    { duration: duration, fill: 'forwards', easing: 'ease-in-out' }
  ).onfinish = () => {
    $target.style.display = 'none';
  };
};

const slideDown = (selector, duration = 500) => {
  const $target = document.querySelector(selector);
  $target.style.display = 'block';
  if (!$target.dataset.height) {
    $target.dataset.height = `${$target.clientHeight}px`;
  }
  $target.animate(
    [
      { height: '0px', opacity: 0 },
      { height: $target.dataset.height, opacity: 1 },
    ],
    { duration: duration, fill: 'forwards', easing: 'ease-in-out' }
  );
};

const slideToggle = (selector, duration = 500) => {
  const $target = document.querySelector(selector);
  if ($target.style.display === 'none' || window.getComputedStyle($target).display === 'none') {
    slideDown(selector, duration);
  } else {
    slideUp(selector, duration);
  }
};

const MenuBtn = document.getElementById('menu-btn')
const Nav = document.getElementById('is-nav');

MenuBtn.addEventListener('click', () => {
  const Expanded = MenuBtn.getAttribute('aria-expanded');
  slideToggle('.l-nav', 700);

  if (Expanded === 'false') {
    MenuBtn.setAttribute('aria-expanded', 'true');
    Nav.setAttribute('aria-hidden', 'false');
  } else {
    MenuBtn.setAttribute('aria-expanded', 'false');
    Nav.setAttribute('aria-hidden', 'true');
  }
});

// 画面幅によるaria-hiddenの切り替え
const mediaQuery = window.matchMedia('(min-width: 992px)'); // PCのブレークポイント

const handleAriaHidden = (e) => {
  if (e.matches) {
    Nav.setAttribute('aria-hidden', 'false'); // PC画面で表示
    MenuBtn.setAttribute('aria-expanded', 'false'); // メニューボタンをリセット
  } else {
    Nav.setAttribute('aria-hidden', 'true'); // SP画面で非表示
    Nav.style.display = 'none'; // ナビゲーションを非表示
    MenuBtn.setAttribute('aria-expanded', 'false'); // メニューボタンもリセット
  }
};

mediaQuery.addEventListener('change', handleAriaHidden);
handleAriaHidden(mediaQuery); // 初回実行
