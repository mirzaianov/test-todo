import { describe, it, expect } from 'vitest';
import { DATA } from './data.ts';

describe('DATA', () => {
  it('should export correct data structure', () => {
    expect(DATA).toEqual([
      {
        id: 1,
        text: 'Тестовое задание',
        completed: false,
      },
      {
        id: 2,
        text: 'Прекрасный код',
        completed: true,
      },
      {
        id: 3,
        text: 'Покрытие тестами',
        completed: false,
      },
    ]);
    expect(DATA).toHaveLength(3);
  });
});
