import { UniqueIdService } from "./unique-id.service";

describe(UniqueIdService.name, () => {
  let prefixMethod = `#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}`;

  it(`${prefixMethod} should generate id when called with prefix`, () => {
    const service = new UniqueIdService();
    const id = service.generateUniqueIdWithPrefix('app');
    expect(id.startsWith('app-')).toBeTrue();
  });

  it(`${prefixMethod} should not generate duplicate IDs when called with multiple times`, () => {
    const service = new UniqueIdService();
    const ids = new Set();
    for(let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    expect(ids.size).toBe(50);
  });
});
