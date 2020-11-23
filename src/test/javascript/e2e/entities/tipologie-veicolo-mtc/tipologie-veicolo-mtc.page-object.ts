import { element, by, ElementFinder } from 'protractor';

export class TipologieVeicoloMTCComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipologie-veicolo-mtc div table .btn-danger'));
  title = element.all(by.css('jhi-tipologie-veicolo-mtc div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class TipologieVeicoloMTCUpdatePage {
  pageTitle = element(by.id('jhi-tipologie-veicolo-mtc-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descrizioneInput = element(by.id('field_descrizione'));

  tipologiaVeicoloSelect = element(by.id('field_tipologiaVeicolo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescrizioneInput(descrizione: string): Promise<void> {
    await this.descrizioneInput.sendKeys(descrizione);
  }

  async getDescrizioneInput(): Promise<string> {
    return await this.descrizioneInput.getAttribute('value');
  }

  async tipologiaVeicoloSelectLastOption(): Promise<void> {
    await this.tipologiaVeicoloSelect.all(by.tagName('option')).last().click();
  }

  async tipologiaVeicoloSelectOption(option: string): Promise<void> {
    await this.tipologiaVeicoloSelect.sendKeys(option);
  }

  getTipologiaVeicoloSelect(): ElementFinder {
    return this.tipologiaVeicoloSelect;
  }

  async getTipologiaVeicoloSelectedOption(): Promise<string> {
    return await this.tipologiaVeicoloSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TipologieVeicoloMTCDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipologieVeicoloMTC-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipologieVeicoloMTC'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
