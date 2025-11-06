import { test } from 'node:test';
import { strict as assert } from 'node:assert';

import { textOps } from "../apps/text-ops/textOps.js";

test("should convert to lowercase", () => {
    let instance = textOps();

    assert.strictEqual(instance.text, "");
    instance.text = "PRIVATE_KEY";
    instance.toLowerCase({});

    assert.strictEqual(instance.text, "private_key");
});

test("should convert to start case", () => {
    let instance = textOps();

    assert.strictEqual(instance.text, "");
    instance.text = "PRIVATE_KEY PUBLIC_KEY";
    instance.toStartCase({});

    assert.strictEqual(instance.text, "Private_key Public_key");
});
