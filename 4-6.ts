type Page =
  | {
      page: "top";
    }
  | {
      page: "mypage";
      userName: string;
    }
  | {
      page: "ranking";
      articles: string[];
    };

    type PageGenerators = {
        [P in Page["page"]]: (page: Extract<Page, { page: P }>) => string
      };

const pageGenerators: PageGenerators = {
  top: () => "<p>top page</p>",
  mypage: ({ userName }) => `<p>Hello, ${userName}!</p>`,
  ranking: ({ articles }) =>
    `<h1>ranking</h1>
         <ul>
        ${articles.map(name => `<li>${name}</li>`).join("")}</ul>`
};
const renderPage = (page: Page) => pageGenerators[page.page](page as any);