// type Func<A extends undefined ?,R> = (arg:A)=> R;
type Func<A, R> = undefined extends A ? (arg?:A)=>R : (arg:A)=>R;
// T extends U → A が undefined を含むなら

// 使用例
const f1: Func<number, number> = num => num + 10;
const v1: number = f1(10);

const f2: Func<undefined, number> = () => 0;
const v2: number = f2();
const v3: number = f2(undefined);

type Ex1 = number | undefined extends undefined ? (arg?: number | undefined) => number : (arg: number | undefined) => number
const f3: Func<number | undefined, number> = num => (num || 0) + 10;
const v4: number = f3(123);
const v5: number = f3();

// エラー例
const v6: number = f1();