import { describe, it, expect } from 'vitest';

const validInput = {
  someValue: "aaaa",
  someOtherValue: "bbbb"
}

const relatedOutput = {
  body: '{"someValue":"aaaa","someOtherValue":"bbbb}',
  headers: {
    "Content-Type": "application/json",
  }

}

describe('buildJsonInit', () => {
  it("Creates a json object", () => {

  });
  it('Serializes the payload in a body attribute', () => {
  });
  it('Adds a content type header', () => {
  });

});
