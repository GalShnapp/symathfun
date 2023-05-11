class product(expression):
    operands: set[expression]

    def __init__(self, operands: set[expression]):
        self.operands = operands

    def __init__(self, **operands):
        self.operands = operands

