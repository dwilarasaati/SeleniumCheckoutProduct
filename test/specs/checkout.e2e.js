const { Builder, By, Capabilities  } = require('selenium-webdriver');
const assert = require('assert');

// Define Chrome options
const chromeOptions = new Capabilities();
chromeOptions.set('browserName', 'chrome');
chromeOptions.set('acceptInsecureCerts', true);

(async () => {
 
const driver = new Builder()
  .withCapabilities(chromeOptions)
  .forBrowser('chrome')
  .build();


  try {
    await driver.get('https://www.bathandbodyworks.co.id/'); // Replace with your target URL

    // Find the img element by its alt attribute using an XPath locator
    const imgBodyCare = await driver.findElement(By.xpath('//img[@alt="Body care"]'));

    // Click on the img element
    await imgBodyCare.click();

    console.log('Clicked on the "Body care" img element.');

     // Find the <img> element with title="Pure Wonder"
    const imgProduct = await driver.findElement(By.css('img[title="Pure Wonder"]'));

    // Click on the <img> element
    await imgProduct.click();
    console.log('Clicked on the "Pure Wonder" product');

    // Find the <h1> element using a CSS selector
    const h1Element = await driver.findElement(By.css('h1'));
    const h2Element = await driver.findElement(By.css('h2.catlog_block'));
     const priceElement = await driver.findElement(By.css('span.pdwebprice'));

    // Get the text of the element
    const h1Text = await h1Element.getText();
    const h2Text = await h2Element.getText();
    const priceText = await priceElement.getText();


    // Define the expected text
    const expectedText = 'PURE WONDER'; // Replace with the expected text

    // Assert that the actual text matches the expected text
    assert.strictEqual(h1Text, expectedText, `Expected "${expectedText}", but got "${h1Text}"`);
    
    console.log('Validation passed: Product title on product detail page contains the expected text.');

     // Find the <input> element with the id "txtYAMLQuantity"
    const inputQty = await driver.findElement(By.id('txtYAMLQuantity'));

    // Get the value of the <input> element
    const valueQtyBefore = await inputQty.getAttribute('value');

    // Find buttonQty Increase
    const buttonQtyIncrease = await driver.findElement(By.className('btn_qtyincrease'));
    await buttonQtyIncrease.click();

    // Get the value of the <input> element
    const valueQty = await inputQty.getAttribute('value');

    if (valueQty === valueQtyBefore + 1) {
      console.log('Validation passed : Qty increased by 1');
    } else {
      console.log('Validation failed : Qty not increased by 1');
    }

    const buttonAddToBag = await driver.findElement(By.css('.mj_btnbg.BuyNow.pdp-add-to-cart'));

    // Click on the button element
    await buttonAddToBag.click();

    console.log('Clicked on the button ADD TO BAG');

     // Find the link element by its class using a CSS selector
    const btnViewCart = await driver.findElement(By.css('.buttonlnk'));

    // Click on the link element
    await btnViewCart.click();

    console.log('Clicked on the button View Cart');


    // Find the <span> element with class "ptitle" and "catalogcode" using a CSS selector
    const spanProductTitle = await driver.findElement(By.css('span.ptitle'));
    const spanCatalogCode = await driver.findElement(By.css('span.catalogcode'));
    const spanPrice = await driver.findElement(By.css('div.cart-Webprice'));

    // Get the text of the <span> element
    const titleProduct = await spanProductTitle.getText();
    const titleCatalogCode = await spanCatalogCode.getText();
    const priceProduct = await spanPrice.getText();


    // Assert that the actual text matches the expected text
    assert.strictEqual(h1Text, titleProduct, `Expected "${h1Text}", but got "${titleProduct}"`);
    console.log('Test passed: Product success added to cart')
    console.log('Validation passed: Title product "ptitle" contains the expected text.')
    assert.strictEqual(h2Text, titleCatalogCode, `Expected "${h2Text}", but got "${titleCatalogCode}"`);
    console.log('Validation passed: Catalog Code with class "catalogcode" contains the expected text.')
     assert.strictEqual(priceText, priceProduct, `Expected "${priceText}", but got "${priceProduct}"`);
    console.log('Validation passed: Price with class "cart-webprice" contains the expected amount.')

     // Find the <input> element with the specified class names using a CSS selector
    const inputQtyCart = await driver.findElement(By.css('input.text_qty.qtytxt'));

    // Get the value of the <input> element
    const valueQtyCart = await inputQtyCart.getAttribute('value');

    // Assert that the actual value matches the expected value
    assert.strictEqual(valueQty, valueQtyCart, `Expected "${valueQty}", but got "${valueQtyCart}"`);
    console.log('Validation passed: Total qty of product same as inputted before')

    // Find the checkout button
    const buttonCheckout = await driver.findElement(By.id('btnSinglePagecheckout'));

    // Click on the checkout button
    await buttonCheckout.click();
    console.log('Clicked on the button Checkout');

     // Get the current page title
    const pageTitle = await driver.getTitle();

    // Define the expected page title
    const expectedTitle = 'Singlepage Checkout'; // Replace with the expected page title

    // Assert that the actual page title matches the expected page title
    assert.strictEqual(pageTitle, expectedTitle, `Expected "${expectedTitle}", but got "${pageTitle}"`);
    console.log('Test passed: Redirect to page Checkout')

    // Find the <span> element with class "catlog_block" and "p-qty" using a CSS selector
    const spanProductCheckout = await driver.findElement(By.css('table.summery-table span.ptitle'));
    const spanCatlogBlock = await driver.findElement(By.css('table.summery-table span.catlog_block'));
    const spanQty = await driver.findElement(By.css('table.summery-table span.p-qty'));

    // Get the text of the <span> element
    const textProductCheckout = await spanProductCheckout.getText();
    const textCatlogCheckout = await spanCatlogBlock.getText();
    const textQtyCheckout = await spanQty.getText();

   
    // Check if the elementText includes the expectedPartialText
    if (textProductCheckout.includes(h1Text)) {
      console.log(`Validation passed: Product title contains "${h1Text}".`);
      
    } else {
      console.error(`Validation failed: Product title not contain "${h1Text}".`);
    }

    if (textCatlogCheckout.includes(h2Text)) {
      console.log(`Validation passed: Catalog Code text contains expected "${h2Text}" text.`);
    } else {
      console.error(`Validation failed: Catalog Code does not contain expected "${h2Text}" text.`);
    }

    if (textQtyCheckout.includes(valueQtyCart)) {
      console.log(`Validation passed: Total Qty is same with expected value :"${valueQtyCart}" `);
    } else {
      console.error(`Validation failed: Total Qty is does not same with expected value : ${valueQtyCart}`);
    }


  } catch (error) {
console.error('Test failed:', error.message);
  } finally {
    await driver.quit();
  }
})();

