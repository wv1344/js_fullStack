/**
 * [
 * {userName:'',content:''}
 * ]
 */

export default function(state = [],action){
  switch (action.type){
    case 'ADD_CONTENT':
      const { userName,content } = action;
      return [{userName,content},...state];
    default:
      return state; 
  }
}