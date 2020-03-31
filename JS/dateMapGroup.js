function date_map_group( data, date_list, date_mapper, value_reducer, default_value){
  const ret_obj = date_list.reduce( (acc, date) => (acc[date] = [], acc), {})
  ret_obj['_residue'] = []
  for( let datum of data ){
    const targetKey = date_mapper(datum)
    if( !ret_obj.hasOwnProperty(targetKey) ){
      ret_obj['_residue'].push(datum)
    }else{
      ret_obj[targetKey].push(datum)
    }
  }
  for( let date of date_list ){
    ret_obj[date] = value_reducer(ret_obj[date])
  }
  return ret_obj
}



// example
const data = [
  {date:'2020-02-29', value: 1},
  {date:'2020-03-01', value: 1},
  {date:'2020-03-02', value: 1},
  {date:'2020-03-09', value: 1},
  {date:'2020-04-01', value: 1}
]

const date_list = [
  '2020-01',
  '2020-02',
  '2020-03',
]

const date_mapper = (datum) => datum.date.slice(0,7)
const value_reducer = (arr) => arr.reduce( (acc, datum) => acc+datum.value, 0)

const result = date_map_group(data, date_list, date_mapper, value_reducer, 0)
console.log(result)
