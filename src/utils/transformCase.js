import camelCase from 'lodash/camelCase.js';

// DB 스키마가 스네이크 케이스로 작성되어 있기 때문에 SELECT 쿼리를 사용하면 스네이크 케이스로 반환해줄텐데
// 이걸 카멜 케이스로 쓰기 위해 lodash에서 제공하는 함수로 변환해줌
export const toCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    // 배열인 경우, 배열의 각 요소에 대해 재귀적으로 toCamelCase 함수를 호출
    return obj.map((v) => toCamelCase(v));
  } else if (
    obj !== null &&
    typeof obj === 'object' &&
    obj.constructor === Object
  ) {
    // 객체인 경우, 객체의 키를 카멜케이스로 변환하고, 값에 대해서도 재귀적으로 toCamelCase 함수를 호출
    return Object.keys(obj).reduce((result, key) => {
      result[camelCase(key)] = toCamelCase(obj[key]);
      return result;
    }, {});
  }
  // 객체도 배열도 아닌 경우, 원본 값을 반환
  return obj;
};
