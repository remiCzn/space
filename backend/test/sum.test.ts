const sum = (a: number, b: number) => {
    return a + b;
}

test("Sum", () => {
    expect(sum(1, 2)).toBe(3);
})