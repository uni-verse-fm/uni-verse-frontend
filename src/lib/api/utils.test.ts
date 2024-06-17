import { describe, it, expect } from 'vitest';
import { buildJsonInit } from './utils';

const validInput = {
  someValue: "aaaa",
  someOtherValue: "bbbb"
}

const relatedOutput = {
  body: '{"someValue":"aaaa","someOtherValue":"bbbb"}',
  headers: {
    "Content-Type": "application/json",
  }

}

describe('buildJsonInit', () => {
  it('Serializes the payload in a body attribute', () => {
    const res = buildJsonInit(validInput);

    expect(() => { JSON.parse(res.body) }).not.toThrowError()

  });
  it('Adds a content type header', () => {
    const res = buildJsonInit(validInput);
    expect(res.headers).toHaveProperty("Content-Type")
    expect(res.headers["Content-Type"]).toEqual("application/json")
  });

  it("Serializes the body and adds the header", () => {
    expect(buildJsonInit(validInput)).toEqual(relatedOutput)
  });
});
