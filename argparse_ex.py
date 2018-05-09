# ref : https://docs.python.org/3/library/argparse.html

import os,sys
import argparse

### example parsing two option arguments --dir and --debug
### cmd_ex : python3 argparse_ex.py --dir=/home/example --debug
parser = argparse.ArgumnetParser()

parser.add_argumnet('--dir')
parser.add_argument('--debug', action='store_true')     ## dont need to explicitly assign --debug=1

known, unknown = parser.parse_known_args()              ## unknown arguments may used to other library

args = vars(known)         ## can use 'args' as dictionary
print(args['dir'])         ## '/home/example'
pritn(args['debug'])       ## True
