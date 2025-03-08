  const Form = document.getElementById('js-form');
  const SelectWrap = document.querySelector('.p-form__select-wrapper');
  const fields = [
    { element: document.getElementById('select'), errorMessage: "お問合せ種類を選択してください。" },
    { element: document.getElementById('comment'), errorMessage: "お問い合わせ内容を入力してください。" },
    { element: document.getElementById('name'), errorMessage: "お名前を記入してください" },
    { element: document.getElementById('email'), errorMessage: "メールアドレスを入力してください。" },
  ];

  // フォームが存在する場合のみ処理を実行
  if (Form) {
    Form.addEventListener('submit', (e) => {
      e.preventDefault();
      let formIsValid = true; // ここで初期化

      fields.forEach((field) => {
        if (field.element) { // 要素が存在する場合のみチェック
          const inputElement = field.element;
          const errorElement = inputElement.nextElementSibling;

          if (inputElement.value.trim() === '') {
            errorElement.textContent = field.errorMessage;
            errorElement.classList.add('p-error');
            SelectWrap?.classList.add('error'); // SelectWrapが存在する場合にのみ操作
            inputElement.classList.add('error');
            formIsValid = false;
          } else {
            errorElement.textContent = '';
            errorElement.classList.remove('p-error');
            SelectWrap?.classList.remove('error');
            inputElement.classList.remove('error');
          }
        }
      });

      if (formIsValid) {
        console.log('フォームは有効です。送信します。');
        // フォームが有効な場合の送信処理をここに追加
      } else {
        console.error('フォームにエラーがあります。');
      }
    });
  } else {
    console.warn('Form element with id "js-form" not found on this page.');
  }

