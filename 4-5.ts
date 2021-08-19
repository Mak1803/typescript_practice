type Partiallypartial<T,K extends keyof T>=Partial<Pick<T,K>>&
Pick<T,Exclude<keyof T,K>>;

type AtLeastOne<T> =spread<T,keyof T>;
type spread<T,K extends keyof T> = K extends keyof T
? Partiallypartial<T,Exclude<keyof T,K>>:never;

// 使用例
interface Options {
    foo: number;
    bar: string;
    baz: boolean;
  }

  function test(options: AtLeastOne<Options>) {
    const { foo, bar, baz } = options;
    // 省略
  }
  test({
    foo: 123,
    bar: "bar"
  });
  test({
    baz: true
  });
  
  // エラー例
  test({});

