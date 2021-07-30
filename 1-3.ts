const is_Positive: IsPositiveFunc = num => num >= 0;

type IsPositiveFunc = (arg:number)=>boolean;

// 使用例
is_Positive(5);

// エラー例
is_Positive('foo');
const res: number = is_Positive(123);