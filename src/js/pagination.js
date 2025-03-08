// ページネーション要素の取得
const PaginationNumBers = document.getElementById('is-pagination-numbers'); // ページ番号ボタンの親要素
const PrevBtn = document.getElementById('prev'); // 「前へ」ボタン
const NextBtn = document.getElementById('next'); // 「次へ」ボタン
const TotalPages = 7; // 総ページ数
let currentPage = 1; // 現在のページ番号

// 要素が存在するかを確認
if (PaginationNumBers && PrevBtn && NextBtn) {
  // ボタンの有効・無効状態を更新する関数
  const UpdateButtons = () => {
    PrevBtn.disabled = currentPage === 1; // 1ページ目では「前へ」ボタンを無効化
    NextBtn.disabled = currentPage === TotalPages; // 最終ページでは「次へ」ボタンを無効化
  };

  // ページ番号ボタンを生成する関数
  const CreateNumbers = () => {
    PaginationNumBers.innerHTML = ""; // 既存のページ番号ボタンをクリア

    if (TotalPages <= 5) {
      // ページ数が5以下の場合はすべてのボタンを表示
      for (let i = 1; i <= TotalPages; i++) {
        CreatePageBtn(i);
      }
    } else {
      // ページ数が6以上の場合の表示制御
      if (currentPage <= 3) {
        // 1〜3ページ目の場合
        for (let i = 1; i <= 3; i++) CreatePageBtn(i);
        CreateEllipsis(); // 省略記号
        CreatePageBtn(TotalPages);
      } else if (currentPage === 4) {
        // 4ページ目の場合
        CreatePageBtn(1);
        for (let i = 3; i <= 5; i++) CreatePageBtn(i);
        CreateEllipsis();
        CreatePageBtn(TotalPages);
      } else if (currentPage >= TotalPages - 2) {
        // 最後の3ページの場合
        CreatePageBtn(1);
        CreateEllipsis();
        for (let i = TotalPages - 2; i <= TotalPages; i++) CreatePageBtn(i);
      } else {
        // その他の場合
        CreatePageBtn(1);
        CreateEllipsis();
        for (let i = currentPage - 1; i <= currentPage + 1; i++) CreatePageBtn(i);
        CreateEllipsis();
        CreatePageBtn(TotalPages);
      }
    }
    UpdateButtons(); // ボタンの状態を更新
  };

  // ページ番号ボタンを作成する関数
  const CreatePageBtn = (i) => {
    const PageBtn = document.createElement("button"); // ボタン要素を生成
    PageBtn.classList.add("c-page-btn");
    PageBtn.innerText = i;
    PageBtn.setAttribute("aria-label", `${i}ページ目`); // スクリーンリーダー用のラベル
    PageBtn.setAttribute("tabindex", "0"); // キーボード操作対応

    if (i === currentPage) {
      PageBtn.classList.add("is-active"); // 現在ページの場合
      PageBtn.setAttribute("aria-current", "page"); // 現在のページを示す
    }

    PageBtn.addEventListener("click", () => {
      currentPage = i; // 現在ページを更新
      CreateNumbers(); // ページボタンを再生成
    });

    PaginationNumBers.appendChild(PageBtn); // 親要素に追加
  };

  // 省略記号(...)を作成する関数
  const CreateEllipsis = () => {
    const Ellipsis = document.createElement("span"); // span要素を生成
    Ellipsis.classList.add("c-ellipsis");
    Ellipsis.innerText = "...";
    Ellipsis.setAttribute("aria-hidden", "true"); // スクリーンリーダーが読み上げないように設定
    PaginationNumBers.appendChild(Ellipsis);
  };

  // 「前へ」ボタンのクリックイベント
  PrevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      CreateNumbers();
    }
  });

  // 「次へ」ボタンのクリックイベント
  NextBtn.addEventListener("click", () => {
    if (currentPage < TotalPages) {
      currentPage++;
      CreateNumbers();
    }
  });

  // 初期表示
  CreateNumbers();
}