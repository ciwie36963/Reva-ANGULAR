import { ErgoAdminModule } from './ergo-admin.module';

describe('ErgoAdminModule', () => {
  let ergoAdminModule: ErgoAdminModule;

  beforeEach(() => {
    ergoAdminModule = new ErgoAdminModule();
  });

  it('should create an instance', () => {
    expect(ergoAdminModule).toBeTruthy();
  });
});
