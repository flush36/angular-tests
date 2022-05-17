import { UniqueIdService } from "./unique-id.service";

describe(UniqueIdService.name, () => {

  let service: UniqueIdService;
  beforeEach(() => {
    service = new UniqueIdService();
  });

  let prefixMethod    = `#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}`;
  let numbersUniqueId = `#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name}`;

  it(`${prefixMethod} should generate id when called with prefix`, () => {
    const id = service.generateUniqueIdWithPrefix('app');
    expect(id.startsWith('app-')).toBeTrue();
  });

  it(`${prefixMethod} should not generate duplicate IDs when
    called with multiple times`, () => {
      const ids = new Set();
      for(let i = 0; i < 50; i++) {
        ids.add(service.generateUniqueIdWithPrefix('app'));
      }
      expect(ids.size).toBe(50);
  });

  it(`${numbersUniqueId} should return the number of generatedIds
    when called`, () => {
      service.generateUniqueIdWithPrefix('app');
      service.generateUniqueIdWithPrefix('app');
      expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  });

  //Quando quer testar se lança exceção tem que chamar dentro de uma função () =>
  it(`${prefixMethod} should throw when called with empty`, () => {
    const emptyValues = [null, undefined, '', '0', '1'];
    emptyValues.forEach(emptyValue => {
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
      .withContext(`Empty value: ${emptyValue}`)
      .toThrow();
    });
  });
});
