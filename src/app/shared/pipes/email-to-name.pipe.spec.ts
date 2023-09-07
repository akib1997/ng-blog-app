import { EmailToNamePipe } from './email-to-name.pipe';

describe('EmailToNamePipe', () => {
  it('create an instance', () => {
    const pipe = new EmailToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
