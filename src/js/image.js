
  const mainImage = document.getElementById('js-mainImage');
  const thumbBtns = document.querySelectorAll('.p-cart-detail__thumb-btn');

  thumbBtns.forEach((button, index) => {
    button.addEventListener('click', () => {
      // すべてのボタンから "active" クラスを削除
      thumbBtns.forEach(btn => btn.classList.remove('active'));

      // クリックされたボタンに "active" クラスを追加
      button.classList.add('active');

      // メイン画像を切り替え
      switch (index) {
        case 0:
          mainImage.src = '../images/wooden-cat-nail-sharpener-front.jpg';
          break;
        case 1:
          mainImage.src = '../images/wooden-cat-nail-sharpener-angle.jpg';
          break;
        case 2:
          mainImage.src = '../images/wooden-cat-nail-sharpener-box.jpg';
          break;
      }

      // クリックされたボタンにフォーカスを設定
      button.focus();
    });

    // キーボード操作のサポート
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        button.click();
      }
    });
  });
