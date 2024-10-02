import { formatedDate, setDate, weekDaysFromLocal } from '../date/index.js';

describe('date', () => {
  describe('formatedDate', () => {
    it('should return formated date', () => {
      expect(formatedDate({ date: new Date('2021-06-01') })).toBe(
        '2021-06-01'
      );
    });
  });
  //todo: rework this test
  // describe('setDate', () => {
  //   it('should return date with hours added', () => {
  //     expect(setDate({ hours: 1 })).toEqual(
  //       new Date(new Date().setHours(new Date().getHours() + 1))
  //     );
  //   });
  //   it('should return date with days added', () => {
  //     expect(setDate({ days: 1 })).toEqual(
  //       new Date(new Date().setDate(new Date().getDate() + 1))
  //     );
  //   });
  // });
  describe('weekDaysFromLocal', () => {
    it('should return week days from local', () => {
      expect(weekDaysFromLocal('fr')).toEqual([
        'dimanche',
        'lundi',
        'mardi',
        'mercredi',
        'jeudi',
        'vendredi',
        'samedi',
      ]);
    });
  });
});
