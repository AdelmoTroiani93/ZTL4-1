import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  TipologieVeicoloMTCComponentsPage,
  TipologieVeicoloMTCDeleteDialog,
  TipologieVeicoloMTCUpdatePage,
} from './tipologie-veicolo-mtc.page-object';

const expect = chai.expect;

describe('TipologieVeicoloMTC e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipologieVeicoloMTCComponentsPage: TipologieVeicoloMTCComponentsPage;
  let tipologieVeicoloMTCUpdatePage: TipologieVeicoloMTCUpdatePage;
  let tipologieVeicoloMTCDeleteDialog: TipologieVeicoloMTCDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipologieVeicoloMTCS', async () => {
    await navBarPage.goToEntity('tipologie-veicolo-mtc');
    tipologieVeicoloMTCComponentsPage = new TipologieVeicoloMTCComponentsPage();
    await browser.wait(ec.visibilityOf(tipologieVeicoloMTCComponentsPage.title), 5000);
    expect(await tipologieVeicoloMTCComponentsPage.getTitle()).to.eq('myZtl4App.tipologieVeicoloMTC.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(tipologieVeicoloMTCComponentsPage.entities), ec.visibilityOf(tipologieVeicoloMTCComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TipologieVeicoloMTC page', async () => {
    await tipologieVeicoloMTCComponentsPage.clickOnCreateButton();
    tipologieVeicoloMTCUpdatePage = new TipologieVeicoloMTCUpdatePage();
    expect(await tipologieVeicoloMTCUpdatePage.getPageTitle()).to.eq('myZtl4App.tipologieVeicoloMTC.home.createOrEditLabel');
    await tipologieVeicoloMTCUpdatePage.cancel();
  });

  it('should create and save TipologieVeicoloMTCS', async () => {
    const nbButtonsBeforeCreate = await tipologieVeicoloMTCComponentsPage.countDeleteButtons();

    await tipologieVeicoloMTCComponentsPage.clickOnCreateButton();

    await promise.all([
      tipologieVeicoloMTCUpdatePage.setDescrizioneInput('descrizione'),
      tipologieVeicoloMTCUpdatePage.tipologiaVeicoloSelectLastOption(),
    ]);

    expect(await tipologieVeicoloMTCUpdatePage.getDescrizioneInput()).to.eq(
      'descrizione',
      'Expected Descrizione value to be equals to descrizione'
    );

    await tipologieVeicoloMTCUpdatePage.save();
    expect(await tipologieVeicoloMTCUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipologieVeicoloMTCComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last TipologieVeicoloMTC', async () => {
    const nbButtonsBeforeDelete = await tipologieVeicoloMTCComponentsPage.countDeleteButtons();
    await tipologieVeicoloMTCComponentsPage.clickOnLastDeleteButton();

    tipologieVeicoloMTCDeleteDialog = new TipologieVeicoloMTCDeleteDialog();
    expect(await tipologieVeicoloMTCDeleteDialog.getDialogTitle()).to.eq('myZtl4App.tipologieVeicoloMTC.delete.question');
    await tipologieVeicoloMTCDeleteDialog.clickOnConfirmButton();

    expect(await tipologieVeicoloMTCComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
