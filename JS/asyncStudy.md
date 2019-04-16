Callback, Promise, Async

## 1. 함수라는 객체  

자바스크립트에서 함수를 선언하는 방법이 대표적인 두가지 방법이 있다.

```js
function Foo(){ ... }
var Bar = function (){...}
```
두 경우 각각 Foo와 Bar라는 이름의 함수를 만들게 되고,  
각 함수의 호출은 Foo() 라는 식으로 함수 이름 뒤에 괄호를 붙여줘서 실행이 된다.  
하지만 만약 괄호를 붙이지 않으면, 함수 그 자체를 가리키게 되며, 함수의 인자로 넘겨주는 등의 작업을 할 수 있다.
<hr/>

## 2. 콜백의 사용  

#### a. 기본적인 콜백의 사용법
콜백은 어떤 비동기적 함수에게,  
작업이 끝난후 작동하길 원하는 함수를 전달해 주는 식으로 사용한다.

``` js
function pleaseExcuteThis( a, b ){ // --- 1
  console.log('done', a, b)
}
oneAsyncJob( pleaseExcuteThis ) // --- 2
// 위와 같이 함수 pleaseExcuteThis를 넘겨준다.
// oneAsyncJob은 작업이 끝날때 내부에서 pleaseExcuteThis(결과들) 형식으로 호출한다.
console.log('not done') // --- 3

// 출력
// not done
// done Arg1 Arg2
```
위의 예시의 경우 일반적으로 보면 2-1-3 순서로 실행되길 기대하겠지만,  
비동기의 경우 전달된 콜백이 호출되는 타이밍이 비동기적이므로,  
2-1-3 또는 2-3-1 순으로 그 순서가 불확실하다. 그러므로 비동기 작업은 항상 특정 순서를 기대하면 안된다.
<hr/>

#### b. 익명의 콜백 함수
콜백으로 전달할 함수는 익명의 함수도 가능하다

```js
oneAsyncJob( function( a, b){
  console.log('done', a, b)
})
```
이 예시는 앞선 pleaseExcuteThis 와 동일한 형태이지만 이름이 없이 함수를 만들어준 콜백 형태이다.
<hr/>  

#### c. 비동기 및 콜백 함수의 return(?)
비동기 함수들을 쓰다보면 함수의 return 값을 활용하려고 하는데 에러가 날 경우가 많다.
상당수의 비동기 함수들의 자체 반환값은 undefined 이며, 콜백 함수의 인자로 결과값을 보내주는 형식이다.
그래서 다음과 같은 실수를 할 수 있다.  
잘못된 방식
```js
// asyncHello 함수는 작업의 결과로 'hello'를 돌려준다고 알고 있음.
let a = asyncHello( function (result){ return result } )
console.log(a) //-- 'hello' 를 기대했지만 undefined 가 찍힘.
```
콜백함수는 비동기 함수(asyncHello) 내부에서 호출되기 때문에 콜백함수의 return 은 a로 반환되는 것이 아니다.
a에 할당되는 asyncHello의 반환값은 비동기 함수마다 다르지만, 작업의 결과가 아닌 참조용 데이터인 경우가 많다.

만약 비동기적 작업이 끝난뒤에 그 결과를 이용해서 작업이 연결되고자 한다면
올바른 방식은
```js
asnycHello( function( result ){
  console.log( 'do something from here' )
  console.log( result )
})
console.log( 'not here' )

// 출력
// not here
// do something from here
// 'hello'
```
위와 같이 콜백 내부에서 원하는 작업들이 계속되도록 하는것이 좋다.
<hr/>

#### d. 비동기 함수의 순차적 사용법

여러개의 비동기적 함수를 순차적으로 호출하려고 할때 아래와 같은 실수를 할 수 있다.

```js
// 잘못된 방식
let aa = firstAsync( function cb1 ( a ){ return a } )
let bb = secondAsync( aa, function cb2 ( b ){ return b } )
let cc = thirdAsync( bb, function cb3 ( c ){ return c } )
// aa,bb,cc 전부 undefined 가 되어 있을 가능성이 매우 높다.

// 원했던 방식
firstAsync( function cb1 ( a ){
  secondAsync( a, function cb2 ( b ){
    thridAsync( b, function cb3 ( c ){
      doWork( c )
    })
  })
})
```
세가지 비동기 작업을 순차적으로 실행하기 위해 연속해서 콜백으로 엮은 형태이다.  
구분을 위해 각 콜백 함수에 cb1, cb2, cb3 라는 이름을 붙였다.  
실행 순서를 살펴보면,  
firstAsync에 cb1을 전달했기 때문에,  
firstAsync가 끝나면 cb1가 호출되고, cb1은 seconAsync를 호출하고,  
secondAsync가 끝나면 cb2가 호출되고, cb2는 thirdAsync를 호출하고,  
thirdAsync가 끝나면 cb3가 호출되어 작업이 끝나는 형태이다.  

이러한 형태가 깊어지면 피라미드 형태로 들여쓰기가 깊어지는데 이를 두고 지옥의 콜백 피라미드라고 한다.  
단 3개만 묶었음에도 코드가 읽기 힘들어 지는걸 알수있고, 그 이상에서는 어떻게 될지는 뻔하다.

#### e. 프로미스의 필요성
일반적으로 비동기 작업 결과를 받기위해 콜백 형태는 주로

```js
function callback( err, result ){
  if( err != null ) handleError( err )
  else doWork( result )
}
```
와 같이 에러와 결과를 받아서, 에러인 경우 에러처리를, 그외엔 결과처리를 하는 식의 구조로 자주 사용되는데  
이 같은 패턴이 흔해지고, 콜백과 같은 비동기적 흐름을 좀 더 체계적으로 관리하기 위해 개발된것이 Promise이다.


## 3. 프로미스
