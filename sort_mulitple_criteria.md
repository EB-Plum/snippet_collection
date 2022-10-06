# Sort By Multiple Criteria 

## prerequisite
there is a sort function can recieve a custom sort function

the custom sort function should recieve two arguments(`X` and `Y`), and returns `true` if `X is ahead of Y` or `X == Y`



## what i want
want to generate custom function using some data mapper and sort_order list

ex)
```js
mapper = (json) => [json.name, json.date, json.height]
sort_order_list = ["desc", "asc", "desc"]
```

WIP
