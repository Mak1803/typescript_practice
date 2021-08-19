type PartiallyPartial<T,K extends keyof T>=Partial<Pick<T,K>>&Pick<T,Exclude<keyof T,K>>;

// 使用例

// 元のデータ
interface Data {
    foo: number;
    bar: string;
    baz: string;
  }
  /*
   * T3は { foo?: number; bar?: string; baz: string } 型
   */
  type T3 = PartiallyPartial<Data, "foo" | "bar">;