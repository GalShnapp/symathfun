class sum(expression):
    operands: set[expression]

    def __init__(self, operands: set[expression]):
        self.operands = operands

    def __init__(self, **operands):
        self.operands = operands

    def reduce(self):
        opcop = self.operands.copy()
        numbers = {op for op in opcop if isinstance(op, number)}
        opcop -= numbers
        params = {op for op in opcop if isinstance(op, parameter)}
        opcop -= params
        