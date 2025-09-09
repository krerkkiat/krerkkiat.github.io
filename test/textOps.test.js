const textOps = require("../static/apps/text-ops/textOps");

describe("text-ops", () => {
    let instance;

    beforeEach(() => {
        instance = textOps()
    });

    test("should convert to lowercase", () => {
        expect(instance.text).toBe("");
        instance.text = "PRIVATE_KEY";
        instance.toLowerCase({});

        expect(instance.text).toBe("private_key");
    });

    test("should convert to start case", () => {
        expect(instance.text).toBe("");
        instance.text = "PRIVATE_KEY PUBLIC_KEY";
        instance.toStartCase({});

        expect(instance.text).toBe("Private_key Public_key");
    });
});