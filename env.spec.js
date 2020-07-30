describe("environment", function () {
    it("should be using the testing database", function () {
        expect(process.env.DB_ENV).toBe("testing");
    });
});