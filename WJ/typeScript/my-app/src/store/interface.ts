// 约束一个对象必须拥有哪些属性或方法
export interface State {
  movieList: movie[]
}

export interface movie {
  name:string;
  title:string;
  id:string
}
// let numArr :number[] = [1,3,2];