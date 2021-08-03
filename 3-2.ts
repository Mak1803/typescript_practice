type MyPartial<S> = {[P in keyof S]?:S[P]};
// 使用例
/*
 * T1は { foo?: number; bar?: string; } となる
 */
type T1 = MyPartial<{
    foo: number;
    bar: string;
  }>;
  /*
   * T2は { hoge?: { piyo: number; } } となる
   */
  type T2 = MyPartial<{
    hoge: {
      piyo: number;
    };
  }>;
// 

interface Foo {
  foo: string;
  bar: number;
}

type KeyOfFoo = keyof Foo 

type PropNullable<T> = {[P in keyof T]: T[P] | null};
type PropNullable1<T> = {[P in "foo" | "bar"]: T[P] | null};
type PropNullable2<T> = {[P in "foo" | "bar"]: { foo: string; bar: number }[P] | null};
type PropNullable3<T> = {"foo": { foo: string; bar: number }["foo"] | null, "bar": { foo: string; bar: number }["bar"] | null};
type PropNullable4<T> = {"foo": string | null, "bar": number | null};
// PropNullable<Foo> 
interface NullableFoo {
  foo: string | null;
  bar: number | null;
}