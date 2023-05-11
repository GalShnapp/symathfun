import sympy
from sympy.parsing.latex import parse_latex
import sys
import base64
import requests
import json
import re

# put desired file path here
file_path = 'limit.jpg'
image_uri = "data:image/jpg;base64," + base64.b64encode(open(file_path, "rb").read()).decode()


r = requests.post("https://api.mathpix.com/v3/latex",
    data=json.dumps({'url': image_uri}),
    headers={"app_id": "CENSORED", "app_key": "CENSORED",
        "Content-type": "application/json"})

# print (r.text)
# print(r.json()["latex"])

# x,y = sympy.symbols('x y')
# expr = x + 2*y
# print(expr)
# print(expr + 1)
# print(expr + 1 - x)

def operatorNameCleanUp(originalLatexString):
    return re.sub(r"(operatorname { ([a-z]*) })", r"\2", originalLatexString)

l = r.json()["latex"]
ql = operatorNameCleanUp(l)
print(ql)
expr = parse_latex(ql)
print(expr)
