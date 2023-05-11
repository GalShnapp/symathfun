import sympy
from sympy.parsing.latex import parse_latex
import re
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Row(BaseModel):
    latex: str

def operatorNameCleanUp(originalLatexString):
    return re.sub(r"(operatorname { ([a-z]*) })", r"\2", originalLatexString)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/row")
async def create_row(row: Row) -> dict:
    latex = row.latex
    cleandLatex = operatorNameCleanUp(latex)
    expr = parse_latex(cleandLatex)
    x = sympy.Symbol('x')
    sol = sympy.solve(expr, x)[0]
    return {
        "data": sol.__str__()
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)