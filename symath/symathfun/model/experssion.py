import string


class expression:
    def reduce(self):
        ...


class eqaulity(expression):
    left: expression
    right: expression

    def __init__(self, left: expression, right: expression):
        self.left = left
        self.right = right



class parameter(expression):
    symbol: string

    def __init__(self, symbol: string) -> None:
        self.symbol = symbol


class number(expression):
    value: float

    def __init__(self, value: float) -> None:
        self.value = value

class monomial(expression):
    pass