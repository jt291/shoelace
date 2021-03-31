import { createFixture } from '../helpers.js';
import { expect, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../dist/components/alert/alert.js';

describe('sl-alert', () => {
  it('should not be visible without open attribute', async () => {
    const el = await createFixture(html` <sl-alert>I am an alert</sl-alert> `);
    const base = el.shadowRoot.querySelector('[part="base"]');
    expect(window.getComputedStyle(base).visibility).to.equal('hidden');
  });

  it('should be visible with open attribute', async () => {
    const el = await createFixture(html` <sl-alert open>I am an alert</sl-alert> `);
    const base = el.shadowRoot.querySelector('[part="base"]');
    expect(window.getComputedStyle(base).visibility).to.equal('visible');
  });

  it('should be visible after calling show()', async () => {
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();
    const el = await createFixture(html`
      <sl-alert @sl-show=${showHandler} @sl-after-show=${afterShowHandler}> I am an alert </sl-alert>
    `);
    const base = el.shadowRoot.querySelector('[part="base"]');

    el.show();
    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(el.open).to.equal(true);
  });

  it('should be hidden after calling hide()', async () => {
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();
    const el = await createFixture(html`
      <sl-alert open @sl-hide=${hideHandler} @sl-after-hide=${afterHideHandler}> I am an alert </sl-alert>
    `);
    const base = el.shadowRoot.querySelector('[part="base"]');

    el.hide();
    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(el.open).to.equal(false);
  });
});
