// TODO : invalid inputs check

function addObj(a, b){
  if( typeof b == 'number' ){
    return (a || 0) + b
  }
  let c = {...(a || {}) }
  for( let key of Object.keys(b) ){
    c[key] = addObj(c[key], b[key])
  }
  return c
}


/* -- Test Sample
  const a = {
    os: {
      linux: {
        alpine: 2,
        debian: 2,
        centos: { "5" : 1, "6" : 2, }
      },
      mac: 2
    },
    cpu: {
      amd: 1,
    }
  }

  const b = {
    os: {
      window: 2,
      linux: {
        centos: { "5" : 1 },
        debian: 2,
      }
    },
    cpu: {
      intel: 3,
      amd: 1
    }
  }

  const result = addObj(a,b)
  console.log(JSON.stringify(result, null, 2))
*/

