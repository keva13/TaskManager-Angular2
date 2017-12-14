import { TaskManagerPage } from './app.po';

describe('task-manager App', () => {
  let page: TaskManagerPage;

  beforeEach(() => {
    page = new TaskManagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
