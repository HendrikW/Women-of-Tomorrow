'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// quadpay-widget-2.2.1.js
(function () {
  "use strict";
  // Informational modal

  function modal() {
    var mod = document.createElement('div');
    mod.id = 'qp-modal__overlay';
    mod.className = 'qp-modal__overlay';
    mod.innerHTML = '\n    <style>\n    .qp-modal__overlay {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        overflow-y: auto;\n        width: 100%;\n        height: 100%;\n        display: none;\n        background: rgba(15, 15, 17, .66);\n        z-index: 200000001 !important;\n    }\n\n    .qp-modal__container {\n        font-family: Montserrat, sans-serif;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-box-pack: justify;\n            -ms-flex-pack: justify;\n                justify-content: space-between;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        max-width: 420px;\n        width: 90%;\n        min-height: 580px;\n        height: 80%;\n        max-height: 700px;\n        padding: 20px 20px 20px 20px;\n        margin: 1em auto;\n        color: #13131F;\n        background: white;\n        position: relative;\n        opacity: 1;\n        z-index: 200000002;\n        overflow-x: hidden;\n        overflow-y: auto;\n        -webkit-box-shadow: 0px 6px 20px 2px rgba(100, 100, 100, .5);\n                box-shadow: 0px 6px 20px 2px rgba(100, 100, 100, .5);\n    }\n\n    .qp-modal__close {\n        width: 20px;\n        height: 20px;\n        -ms-flex-item-align: end;\n            align-self: flex-end;\n        position: absolute;\n        top: 20px;\n        right: 20px;\n        opacity: 1;\n        cursor: pointer;\n    }\n\n    .qp-modal__close:before,\n    .qp-modal__close:after {\n        position: absolute;\n        bottom: 0;\n        right: 8px;\n        content: \' \';\n        height: 22px;\n        width: 4px;\n        background-color: #1D73EC;\n    }\n\n    .qp-modal__close:before {\n        -webkit-transform: rotate(45deg);\n            -ms-transform: rotate(45deg);\n                transform: rotate(45deg);\n    }\n\n    .qp-modal__close:after {\n        -webkit-transform: rotate(-45deg);\n            -ms-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n    }\n\n    .qp-modal__close:hover::before,\n    .qp-modal__close:hover::after {\n        background-color: #13131F;\n        -webkit-box-shadow: 0 1px 1px 1px rgba(100, 100, 100, .1);\n                box-shadow: 0 1px 1px 1px rgba(100, 100, 100, .1);\n    }\n\n    .qp-modal__logo {\n        margin-top: 2em;\n    }\n\n    .qp-modal__step-container {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-box-pack: space-evenly;\n            -ms-flex-pack: space-evenly;\n                justify-content: space-evenly;\n        margin: 0.2em 0 0.8em 0;\n        max-width: 80%;\n    }\n\n    .qp-modal__step-icon {\n        margin-bottom: 0.75em;\n    }\n\n    .qp-modal__tag {\n        font-size: 110%;\n        font-weight: 700;\n        width: 80%;\n        text-align: center;\n        margin: 1em 0;\n        max-width: 80%;\n    }\n\n    .qp-modal__subtitle {\n        text-align: center;\n        margin: 0 0 2em 0;\n        color: #4C515D;\n        width: 90%;\n        font-weight: 500;\n        font-size: 95%;\n    }\n\n    .qp-modal__subhead {\n        text-align: center;\n        margin: 0 0 2em 0;\n        color: #4C515D;\n        font-weight: 500;\n        font-size: 95%;\n    }\n\n    .qp-modal__step-header {\n        font-size: 110%;\n        font-weight: bold;\n        margin: 0 0 0.4em 0;\n        text-align: center;\n        font-weight: 700;\n    }\n\n    .qp-modal--nowrap {\n        white-space: nowrap;\n        font-weight: inherit;\n        font-family: inherit;\n        font-size: inherit;\n    }\n\n    /* To handle when parent site specifies SVG fill and stroke globally */\n    #qp-modal__logo-q {\n        fill: #1D73EC;\n    }\n    #qp-modal__logo-uqadpay {\n        fill: #13131F;\n    }\n    .qp-modal__logo svg *\n    {\n        stroke: none;\n    }\n    #qp-modal__step-icon--choose path,\n    #qp-modal__step-icon--pay path\n    {\n        fill: none;\n    }\n\n    @media screen and (max-width: 420px) {\n        .qp-modal__container {\n          padding: 20px 6px 20px 6px;\n          width: 96%;\n        }\n\n        .qp-modal__tag { width: 85%; }\n\n        .qp-modal__step-container { width: 85%; }\n      }    \n\n    </style>\n    \n    <div class="qp-modal__container" id="qp-modal__container">\n    \n        <div class="qp-modal__close" id="qp-modal__close"></div>\n        <div class="qp-modal__logo" id="qp-modal__logo">\n            <a href="https://www.quadpay.com/how-it-works/" target="new">\n                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="27" viewBox="0 0 108 21" version="1.1"><title>  QuadPay - Pay in 4 installments, zero interest</title><g style="fill-rule:evenodd;fill:none"><path id="qp-modal__logo-q" d="M18.27 15.61L16.5 13.26C16.41 13.15 16.28 13.08 16.14 13.08L7.32 13.08C4.91 12.82 3.1 10.75 3.1 8.26 3.1 5.58 5.21 3.41 7.81 3.41 7.93 3.41 8.04 3.41 8.15 3.42 9.21 3.5 10.2 3.94 10.99 4.67 11.86 5.49 12.18 6.6 12.29 7.8L12.29 7.88 12.29 10.51C12.29 10.76 12.49 10.95 12.73 10.95L15.07 10.95C15.31 10.95 15.51 10.76 15.51 10.51 15.51 10.51 15.51 10.51 15.51 10.51 15.51 8.73 15.5 7.82 15.5 7.79 15.26 3.55 11.85 0.23 7.76 0.23 3.48 0.23 0 3.84 0 8.28 0 12.45 3.02 15.89 7.02 16.29 7.04 16.29 7.17 16.3 7.74 16.32L11.66 16.32 12.29 16.32 12.29 17.2 12.29 18.19 12.29 18.87C12.29 19.01 12.36 19.14 12.48 19.23L14.82 20.89C15.02 21.03 15.29 20.98 15.43 20.78 15.49 20.71 15.52 20.62 15.52 20.52L15.51 17.2 15.51 16.32 16.36 16.32 17.92 16.32C18.16 16.32 18.36 16.12 18.36 15.88 18.36 15.78 18.33 15.69 18.27 15.61Z" fill="#1D73EC"/><path id="qp-modal__logo-uqadpay" d="M20 10.36C20 13.83 22.82 16.43 26.31 16.43 29.82 16.43 32.67 13.83 32.67 10.36L32.67 0.66C32.67 0.43 32.47 0.23 32.24 0.23L29.51 0.23C29.27 0.23 29.09 0.43 29.09 0.66L29.09 10.18C29.09 11.85 27.91 12.78 26.31 12.78 24.73 12.78 23.58 11.85 23.58 10.18L23.58 0.66C23.58 0.43 23.4 0.23 23.16 0.23L20.42 0.23C20.2 0.23 20 0.43 20 0.66L20 10.36ZM35.04 16.21C34.71 16.21 34.53 15.91 34.67 15.61L41.62 0.25C41.69 0.11 41.84 0 42 0L42.22 0C42.38 0 42.53 0.11 42.6 0.25L49.56 15.61C49.69 15.91 49.51 16.21 49.18 16.21L46.71 16.21C46.31 16.21 46.13 16.07 45.93 15.64L45.13 13.83 39.09 13.83 38.29 15.66C38.18 15.93 37.93 16.21 37.49 16.21L35.04 16.21ZM40.42 10.73L43.8 10.73 42.11 6.96 42.09 6.96 40.42 10.73ZM52.2 15.77L52.2 0.66C52.2 0.43 52.38 0.23 52.6 0.23L58.02 0.23C62.31 0.23 65.82 3.81 65.82 8.19 65.82 12.62 62.31 16.21 58.02 16.21L52.6 16.21C52.38 16.21 52.2 16 52.2 15.77ZM55.67 12.83L58 12.83C60.51 12.83 62.13 10.8 62.13 8.19 62.13 5.62 60.51 3.58 58 3.58L55.67 3.58 55.67 12.83ZM69.36 15.77L69.36 0.66C69.36 0.43 69.53 0.23 69.78 0.23L75.13 0.23C78.07 0.23 80.11 2.51 80.11 5.27 80.11 8.1 78.07 10.41 75.16 10.41L72.82 10.41 72.82 15.77C72.82 16 72.62 16.21 72.4 16.21L69.78 16.21C69.53 16.21 69.36 16 69.36 15.77ZM72.82 7.08L75.07 7.08C76.02 7.08 76.69 6.3 76.69 5.27 76.69 4.31 76.02 3.58 75.07 3.58L72.82 3.58 72.82 7.08ZM80.47 16.21C80.13 16.21 79.96 15.91 80.09 15.61L87.04 0.25C87.11 0.11 87.27 0 87.42 0L87.64 0C87.8 0 87.96 0.11 88.02 0.25L94.98 15.61C95.11 15.91 94.93 16.21 94.6 16.21L92.13 16.21C91.73 16.21 91.56 16.07 91.36 15.64L90.56 13.83 84.51 13.83 83.71 15.66C83.6 15.93 83.36 16.21 82.91 16.21L80.47 16.21ZM85.84 10.73L89.22 10.73 87.53 6.96 87.51 6.96 85.84 10.73ZM99.24 15.77L99.24 8.51 94.33 0.89C94.16 0.59 94.33 0.23 94.69 0.23L97.58 0.23C97.76 0.23 97.87 0.34 97.93 0.43L101.02 5.11 104.11 0.43C104.18 0.34 104.27 0.23 104.47 0.23L107.36 0.23C107.71 0.23 107.89 0.59 107.71 0.89L102.73 8.49 102.73 15.77C102.73 16 102.53 16.21 102.31 16.21L99.67 16.21C99.42 16.21 99.24 16 99.24 15.77Z" fill="#13131F"/></g></svg>\n            </a>\n        </div>\n        <div class="qp-modal__tag" id="qp-modal__tag">Shop online now, pay over time. <span class="qp-modal--nowrap">Zero interest.</span></span></div>\n        <div class="qp-modal__subtitle" id="qp-modal__subtitle">We split the purchase amount into 4 interest-free payments, spread over 6 weeks.</div>\n    \n        <div class="qp-modal__step-container"  id="qp-modal__step-icon--choose">\n            <div class="qp-modal__step-icon">\n                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="33" viewBox="0 0 30 33" version="1.1"><title>  Choose QuadPay at checkout</title><g style="fill-rule:evenodd;fill:none;stroke-linecap:round;stroke-linejoin:round"><g style="stroke-width:2.87999975;stroke:#13131F"><path d="M3.78 11.39C3.9 10.21 4.97 9.25 6.17 9.25L23.83 9.25C25.03 9.25 26.1 10.21 26.22 11.39L27.99 28.86C28.11 30.04 27.24 31 26.05 31L3.95 31C2.76 31 1.89 30.04 2.01 28.86L3.78 11.39Z"/><path d="M20.06 13.6L20.06 7.07C20.06 4.28 17.79 2 15 2 12.21 2 9.94 4.28 9.94 7.07L9.94 13.6"/></g></g></svg>\n            </div>\n            <div class="qp-modal__step-header">Choose QuadPay at checkout</div>\n            <div class="qp-modal__subhead">Quick and easy. No hidden fees.</div>\n        </div>\n    \n        <div class="qp-modal__step-container">\n            <div class="qp-modal__step-icon"  id="qp-modal__step-icon--use">\n                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24" version="1.1"><style>.a{stroke-linecap:round;stroke-linejoin:round;stroke-width:2.87999975;stroke:#000;}</style><title>  QuadPay works with debit and credit cards</title><g style="fill-rule:evenodd;fill:none;stroke-width:1;stroke:none"><rect x="2" y="2" width="29" height="20" rx="2.16" class="a"/><rect x="2" y="6.29" width="29" height="4.29" fill="#000"/><path d="M7.08 17L8.52 17" class="a"/><path d="M13.6 17L17.95 17" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:2.87999975;stroke:#13131F"/></g></svg>\n            </div>\n            <div class="qp-modal__step-header">Use your debit or credit card</div>\n            <div class="qp-modal__subhead">No long forms and instant approval.</div>\n        </div>\n    \n        <div class="qp-modal__step-container">\n            <div class="qp-modal__step-icon"  id="qp-modal__step-icon--pay">\n                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="33" viewBox="0 0 28 33" version="1.1"><title>  Pay over 4 payments and enjoy your purchase straight away.</title><g style="fill-rule:evenodd;fill:none;stroke-linecap:round;stroke-linejoin:round"><g style="stroke-width:2.87999975;stroke:#13131F"><path d="M21.62 13.37C20.78 13.01 19.79 12.62 18.64 12.24 17.29 11.79 16.17 11.47 15.27 11.25L14.84 4.17C14.76 2.97 13.75 2 12.58 2L11.89 2C10.72 2 9.76 2.98 9.76 4.18L9.76 18.76 4 17.41C2.9 17.41 2 18.32 2 19.44L2 21.48C2 21.48 7.51 24.29 8.51 24.81 9.75 25.45 11.28 26.53 12.26 28.86 12.66 29.8 13.54 31 14.7 31L23.89 31C25.05 31 26 30.03 26 28.82L26 8.53C26 7.32 25.05 6.35 23.89 6.35 23.1 6.35 22.39 7 22.29 7.8L21.62 13.37 21.62 13.37Z"/></g></g></svg>\n            </div>\n            <div class="qp-modal__step-header">Pay over 4 payments</div>\n            <div class="qp-modal__subhead">Enjoy your purchase straight away.</div>\n        </div>\n    </div>';

    return mod;
  }
  // Create widget template
  function widgetTemplate() {
    var tmpl = document.createElement('template');
    tmpl.innerHTML = '\n    <!-- QuadPay widget -->\n    <!-- Geoblock widget -->\n    <link rel="stylesheet" href="https://widgets.quadpay.com/geo-hide-widget.css" /> \n    <style>\n    .qp-container {\n      margin: 0;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: none;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n      width: 100%;\n      min-height: 20px;\n      z-index: 1\n    }\n  \n    .qp-price {\n        font-weight: 700;\n        display: inherit;\n        margin-left: 0.3em;\n    }\n    \n    .qp-link {\n        cursor: pointer;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n    }\n    \n    .qp-logo {\n        margin: 0 0 0 0.3em;\n        position: relative;\n        display: -webkit-inline-box;\n        display: -ms-inline-flexbox;\n        display: inline-flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n    }\n\n    .qp-logo a {\n      text-decoration: none;\n    }\n    \n    .qp--align-center {\n        -webkit-box-pack: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n    }\n    \n    .qp--align-right {\n        -webkit-box-pack: end;\n        -ms-flex-pack: end;\n        justify-content: flex-end;\n    }\n    \n    .qp--align-left {\n        -webkit-box-pack: start;\n        -ms-flex-pack: start;\n        justify-content: flex-start;\n    }\n    \n    .qp--nowrap {\n        display: -webkit-inline-box;\n        display: -ms-inline-flexbox;\n        display: inline-flex;\n        white-space: nowrap;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        margin-left: 0;\n        margin-right: 0.3em;\n    }\n\n    .qp--align-right .qp--nowrap {\n      margin-right: 0;margin-left: 0.3em;\n    }\n\n  </style>\n\n    <div id="qp-container" class="qp-container">\n      <span class="qp--nowrap">or 4 interest-free payments</span>\n      <span class="qp--nowrap">\n        <slot name="qpCustomText">on orders over</slot> \n        <span id="qp-price" class="qp-price"> \n          <slot name="qpDisplayAmount">$35</slot> \n        </span>\n      </span> \n      <span class="qp--nowrap"> by\n        <span id="qp-link" class="qp-link">\n          <span id="qp-logo" class="qp-logo"><a href="https://www.quadpay.com/how-it-works/" target ="new">QuadPay</a></span>\n        </span>   \n      </span>  \n    </div>\n    ';
    return tmpl;
  }

  var QuadPayWidget = function (_HTMLElement) {
    _inherits(QuadPayWidget, _HTMLElement);

    function QuadPayWidget() {
      _classCallCheck(this, QuadPayWidget);

      // Attach a shadow root to the element.
      var _this = _possibleConstructorReturn(this, (QuadPayWidget.__proto__ || Object.getPrototypeOf(QuadPayWidget)).call(this));

      var shadowRoot = _this.attachShadow({ mode: 'open' });
      var qpWidget = widgetTemplate();
      shadowRoot.appendChild(qpWidget.content.cloneNode(true));

      // Setup a click listener on widget itself.
      _this.shadowRoot.getElementById('qp-link').addEventListener('click', _this.displayModal);
      return _this;
    }

    _createClass(QuadPayWidget, [{
      key: 'showCustomWidgetText',


      // Based on full amount, show customized widget
      value: function showCustomWidgetText(fullAmount, min, max) {
        min = Number(min);
        max = Number(max);
        min = parseInt(min || this.minDefault, 10);
        max = parseInt(max || this.maxDefault, 10);
        fullAmount = QuadPayWidget.parseFullAmount(fullAmount);

        var displayAmount = min;
        var qpCustomText = void 0;

        if (fullAmount > max) {
          qpCustomText = 'on orders up to';
          displayAmount = '$' + max;
        } else if (fullAmount >= min && fullAmount <= max) {
          qpCustomText = 'of';
          displayAmount = '$' + this.calcInstallmentAmount(fullAmount);
          this.shadowRoot.getElementById('qp-price').classList.add('qp-price');
          if (this.priceColor) {
            this.updatePriceColor(this.priceColor);
          }
        } else {
          // Includes when fullAmount < min and fullAmount is invalid
          qpCustomText = 'on orders over';
          displayAmount = '$' + min;
        }

        this.innerHTML = '\n      <span slot="qpCustomText">' + qpCustomText + '</span> \n      <span slot="qpDisplayAmount">' + displayAmount + '</span> \n    ';
      }
    }, {
      key: 'calcInstallmentAmount',
      value: function calcInstallmentAmount(fullAmount) {
        return (parseFloat(fullAmount, 10) / 4).toFixed(2);
      }

      // Show logo, if needed resize and adjust color

    }, {
      key: 'showWidgetLogo',
      value: function showWidgetLogo(logoContainer, resize, color) {
        var defaultWidth = 94;
        var width = defaultWidth;
        var logoMinPercent = .6;
        var logoMaxPercent = 1.2;
        if (resize) {
          resize = parseFloat(resize, 10) / 100;
          if (resize >= logoMinPercent & resize <= logoMaxPercent) {
            width = Math.round(defaultWidth * resize);
          }
        }
        // Note: Ability to increase logo size limited by span max-width and SVG height (TODO someday)

        var defaultColor = '#13131F';
        // Check if valid hex color
        if (!/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(color)) {
          color = defaultColor;
        }

        // Check to prevent duplicate logos in widget when conflicts with plugins
        if (!logoContainer.firstChild) {
          var logo = document.createElement('svg');
          logoContainer.appendChild(logo);
          logo.outerHTML = '\n        <svg version="1.1" width="' + width + '" height="15" viewBox="0 0 107 17" xmlns="http://www.w3.org/2000/svg"><title>QuadPay - Pay in 4 installments, no interest.</title><g fill="none" fill-rule="evenodd"><g transform="translate(0 2)" fill="' + color + '"><path d="m14.331 11.092l-1.348-1.6237c-0.06583-0.079292-0.16354-0.12517-0.2666-0.12517h-6.9553c-1.8958-0.18262-3.3253-1.6637-3.3253-3.4451 0-1.9098 1.6658-3.4637 3.7131-3.4637 0.089272 0 0.17819 0.0029803 0.2666 0.0088878 0.82947 0.055424 1.6146 0.36851 2.2346 0.89547 0.68467 0.58197 0.93434 1.3741 1.0205 2.2306l0.0029623 0.058259 9.556e-5 1.8504c8.32e-6 0.19136 0.15514 0.34648 0.3465 0.34648l1.8393-1.439e-5c0.19135 0 0.34647-0.15512 0.34647-0.34647 0-1.721e-4 -1e-7 -3.4419e-4 -4e-7 -5.1629e-4 -0.001863-1.2502-0.0036722-1.8882-0.0054277-1.9139-0.1935-3.0289-2.8707-5.4001-6.0949-5.4001-3.3668 0-6.1059 2.5786-6.1059 5.7482 0 2.9809 2.3749 5.441 5.5242 5.7223 0.019494 0.0016034 0.11878 0.0068593 0.57086 0.025299l3.0857 5.345e-4 0.49401 8.91e-5v0.62348 0.70757l6.77e-5 0.45914c1.737e-5 0.11774 0.059823 0.22742 0.15879 0.2912l1.8434 1.1881c0.16085 0.10367 0.37529 0.057311 0.47896-0.10354 0.03609-0.055997 0.055272-0.12121 0.055248-0.18783l-8.276e-4 -2.3544-1.912e-4 -0.62375h0.6691 1.1853c0.19137 0 0.3465-0.15513 0.3465-0.3465 0-0.08084-0.028266-0.15914-0.079904-0.22133z"/><path d="m15.741 7.4022c0 2.4783 2.2212 4.337 4.9671 4.337 2.7634 0 5.0021-1.8587 5.0021-4.337v-6.9293c0-0.16304-0.15741-0.30978-0.3323-0.30978h-2.1512c-0.19239 0-0.3323 0.14674-0.3323 0.30978v6.7989c0 1.1902-0.92695 1.8587-2.1862 1.8587-1.2418 0-2.1512-0.66848-2.1512-1.8587v-6.7989c0-0.16304-0.13992-0.30978-0.3323-0.30978h-2.1512c-0.1749 0-0.3323 0.14674-0.3323 0.30978v6.9293zm11.841 4.1739c-0.26235 0-0.40226-0.21196-0.29733-0.42391l5.4743-10.973c0.052469-0.097826 0.1749-0.17935 0.29733-0.17935h0.1749c0.12243 0 0.24486 0.081522 0.29733 0.17935l5.4743 10.973c0.10494 0.21196-0.034979 0.42391-0.29733 0.42391h-1.9414c-0.31481 0-0.45473-0.097826-0.61214-0.40761l-0.62963-1.288h-4.7572l-0.62963 1.3043c-0.087449 0.19565-0.27984 0.3913-0.62963 0.3913h-1.9239zm4.2325-3.913h2.6584l-1.3292-2.6902h-0.01749l-1.3117 2.6902zm9.2695 3.6033v-10.793c0-0.16304 0.13992-0.30978 0.31481-0.30978h4.2675c3.3755 0 6.1389 2.5598 6.1389 5.6902 0 3.163-2.7634 5.7228-6.1389 5.7228h-4.2675c-0.1749 0-0.31481-0.14674-0.31481-0.30978zm2.7284-2.1033h1.8364c1.9763 0 3.2531-1.4511 3.2531-3.3098 0-1.8424-1.2767-3.2935-3.2531-3.2935h-1.8364v6.6033zm10.774 2.1033v-10.793c0-0.16304 0.13992-0.30978 0.3323-0.30978h4.215c2.3086 0 3.9177 1.6304 3.9177 3.6033 0 2.0217-1.6091 3.6685-3.9002 3.6685h-1.8364v3.8315c0 0.16304-0.15741 0.30978-0.3323 0.30978h-2.0638c-0.19239 0-0.3323-0.14674-0.3323-0.30978zm2.7284-6.212h1.7665c0.75206 0 1.2767-0.55435 1.2767-1.288 0-0.68478-0.52469-1.2065-1.2767-1.2065h-1.7665v2.4946zm6.0165 6.5217c-0.26235 0-0.40226-0.21196-0.29733-0.42391l5.4743-10.973c0.052469-0.097826 0.1749-0.17935 0.29733-0.17935h0.1749c0.12243 0 0.24486 0.081522 0.29733 0.17935l5.4743 10.973c0.10494 0.21196-0.034979 0.42391-0.29733 0.42391h-1.9414c-0.31481 0-0.45473-0.097826-0.61214-0.40761l-0.62963-1.288h-4.7572l-0.62963 1.3043c-0.087449 0.19565-0.27984 0.3913-0.62963 0.3913h-1.9239zm4.2325-3.913h2.6584l-1.3292-2.6902h-0.01749l-1.3117 2.6902zm10.546 3.6033v-5.1848l-3.8652-5.4457c-0.13992-0.21196 0-0.47283 0.27984-0.47283h2.2737c0.13992 0 0.22737 0.081522 0.27984 0.14674l2.4311 3.3424 2.4311-3.3424c0.052469-0.065217 0.12243-0.14674 0.27984-0.14674h2.2737c0.27984 0 0.41975 0.26087 0.27984 0.47283l-3.9177 5.4293v5.2011c0 0.16304-0.15741 0.30978-0.3323 0.30978h-2.0813c-0.19239 0-0.3323-0.14674-0.3323-0.30978z"/></g><g transform="translate(91)" fill="' + color + '"><path transform="translate(8 8.2) scale(1 -1) translate(-8 -8.2)" d="m8 12.4c-0.66274 0-1.2-0.53726-1.2-1.2s0.53726-1.2 1.2-1.2 1.2 0.53726 1.2 1.2-0.53726 1.2-1.2 1.2zm-1.2-7.2024c0-0.66143 0.53264-1.1976 1.2-1.1976 0.66274 0 1.2 0.53509 1.2 1.1976v2.6048c0 0.66143-0.53264 1.1976-1.2 1.1976-0.66274 0-1.2-0.53509-1.2-1.1976v-2.6048z"/><path d="m8 16c-4.4183 0-8-3.5817-8-8s3.5817-8 8-8 8 3.5817 8 8-3.5817 8-8 8zm0-1.6c3.5346 0 6.4-2.8654 6.4-6.4s-2.8654-6.4-6.4-6.4-6.4 2.8654-6.4 6.4 2.8654 6.4 6.4 6.4z"/></g></g></svg>\n      ';
        }
      }
    }, {
      key: 'hideWidgetLogo',
      value: function hideWidgetLogo(logoContainer) {
        var textQuadPay = document.createTextNode('QuadPay');
        logoContainer.appendChild(textQuadPay);
      }
    }, {
      key: 'removeLink',
      value: function removeLink(logoContainer) {
        logoContainer.removeChild(logoContainer.firstChild);
      }

      // Create container for modal, if not already created  

    }, {
      key: 'createModal',
      value: function createModal() {
        var alreadyModal = document.getElementById('qp-modal__overlay');
        if (!alreadyModal) {
          var infoModal = modal();
          infoModal.addEventListener('click', this.hideModal);
          // To ensure modal is top-most layer, modal needs to be added 
          // at end of DOM, even if there are slow or no-load scripts
          document.addEventListener('readystatechange', function () {
            if (document.readyState === 'complete') {
              document.body.appendChild(infoModal);
            }
          });
        }
      }
    }, {
      key: 'displayModal',
      value: function displayModal() {
        var modalContainer = document.getElementById('qp-modal__overlay');
        modalContainer.style.display = 'block';
      }
    }, {
      key: 'hideModal',
      value: function hideModal() {
        var modalContainer = document.getElementById('qp-modal__overlay');
        modalContainer.style.display = 'none';
      }

      // Update container alignment CSS 

    }, {
      key: 'updateAlignment',
      value: function updateAlignment(qpContainer, alignment) {
        if (alignment === "center") {
          qpContainer.classList.add('qp--align-center');
        } else if (alignment === "right") {
          qpContainer.classList.add('qp--align-right');
        } else {
          qpContainer.classList.add('qp--align-left');
        }
      }

      // Update widget font size  

    }, {
      key: 'updateWidgetSize',
      value: function updateWidgetSize(qpContainer, size) {
        size = parseInt(size, 10);
        qpContainer.setAttribute('style', 'font-size: ' + size + '%;');
      }
    }, {
      key: 'updateLogoAlignment',
      value: function updateLogoAlignment(logoContainer, logoVertAlign) {
        logoVertAlign = parseInt(logoVertAlign, 10);
        logoContainer.setAttribute('style', 'bottom: ' + logoVertAlign + 'px;');
      }
    }, {
      key: 'updatePriceColor',
      value: function updatePriceColor(priceColor) {
        this.shadowRoot.getElementById('qp-price').setAttribute('style', 'color: ' + priceColor + ';');
      }

      // Change alignment for media query

    }, {
      key: 'handleMediaQuery',
      value: function handleMediaQuery(qpContainer, breakpointPx, breakpointAlign) {
        var alignPrefix = "flex-";
        var mediaQuerySpanStyling = "margin-left: 0;margin-right: 0.3em;";
        if (breakpointAlign === "center") {
          breakpointAlign = "center";
          alignPrefix = "";
        } else if (breakpointAlign === "left") {
          breakpointAlign = "start";
        } else if (breakpointAlign === "right") {
          breakpointAlign = "end";
          mediaQuerySpanStyling = "margin-left: 0.3em;margin-right: 0;";
        }
        var mediaQueryStyle = document.createElement('style');
        mediaQueryStyle.innerHTML = '\n      @media screen and (max-width: ' + breakpointPx + 'px) {\n        .qp-container {\n          -webkit-box-pack: ' + breakpointAlign + ';\n          -ms-flex-pack: ' + breakpointAlign + ';\n          justify-content: ' + alignPrefix + breakpointAlign + ';\n        }\n        .qp--nowrap {\n          ' + mediaQuerySpanStyling + '\n        }\n      }\n    ';
        this.shadowRoot.insertBefore(mediaQueryStyle, qpContainer);
      }

      // When there is change in price or subtotal, update installment price

    }, {
      key: 'listenForAmountChange',
      value: function listenForAmountChange(amountSelector, widget, mutationSelector) {
        if (!mutationSelector) {
          mutationSelector = amountSelector;
        }
        var newAmount = document.querySelector('' + amountSelector).innerText;
        var mutationObserver = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            newAmount = document.querySelector('' + amountSelector).innerText;
            newAmount = QuadPayWidget.parseFullAmount(newAmount);
            if (!isNaN(newAmount)) {
              widget.setAttribute('amount', newAmount);
            }
          });
        });

        // Starts listening for any changes to price/total 
        mutationObserver.observe(document.querySelector('' + mutationSelector), {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true
        });
      }
    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal != newVal) {
          this.showCustomWidgetText(newVal, this.min, this.max);
        }
      }
    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        var qpContainer = this.shadowRoot.getElementById('qp-container');
        var logoContainer = this.shadowRoot.getElementById('qp-logo');
        this.showCustomWidgetText(this.amount, this.min, this.max);
        this.createModal();

        // Remove QuadPay A HREF (added for SEO) 
        if (logoContainer.firstChild.tagName === 'A') {
          this.removeLink(logoContainer);
        }

        // Option to hide QuadPay logo 
        if (this.hideLogo === 'true') {
          this.hideWidgetLogo(logoContainer);
        } else {
          this.showWidgetLogo(logoContainer, this.logoSize, this.logoColor);
        }

        if (this.alignment) {
          this.updateAlignment(qpContainer, this.alignment);
        }

        if (this.size) {
          this.updateWidgetSize(qpContainer, this.size);
        }

        if (this.logoAlignment) {
          this.updateLogoAlignment(logoContainer, this.logoAlignment);
        }

        if (this.breakpointAlignment) {
          // Match number only for breakpoint
          var numbersonly = /[0-9]/g;
          var breakpoint = parseInt(this.breakpointAlignment.match(numbersonly).join(''), 10);
          var alignment = this.breakpointAlignment.split(' ')[1];
          this.handleMediaQuery(qpContainer, breakpoint, alignment);
        }

        if (this.amountSelector) {
          var selector = void 0;
          var separateMutationSelector = void 0;
          // For the sites where the mutationObserver needs to be separate from the amount selector
          var amountSplit = this.amountSelector.split(',');
          if (amountSplit.length >= 2) {
            selector = amountSplit[0];
            separateMutationSelector = amountSplit[1];
          } else {
            selector = this.amountSelector;
          }
          this.listenForAmountChange(selector, this, separateMutationSelector);
        }

        // Temporary, experimental investigation features 
        if (this.qpFeature === 'true') {
          // Investigating how sites declare currency use and how to hide widget when currency not USD  
          if (document.cookie.match('currency=') & !document.cookie.match('currency=USD')) {
            console.log('does not match currency=USD');
            qpContainer.setAttribute('style', 'display: none;');
          }
        }
      }
    }, {
      key: 'amount',
      get: function get() {
        return this.getAttribute('amount');
      },
      set: function set(newVal) {
        this.setAttribute('amount', newVal);
      }
    }, {
      key: 'min',
      get: function get() {
        return this.getAttribute('min');
      }
    }, {
      key: 'max',
      get: function get() {
        return this.getAttribute('max');
      }
    }, {
      key: 'minDefault',
      get: function get() {
        return 35;
      }
    }, {
      key: 'maxDefault',
      get: function get() {
        return 1500;
      }
    }, {
      key: 'alignment',
      get: function get() {
        return this.getAttribute('alignment');
      }
    }, {
      key: 'size',
      get: function get() {
        return this.getAttribute('size');
      }
    }, {
      key: 'logoSize',
      get: function get() {
        return this.getAttribute('logoSize') || this.getAttribute('logosize');
      }
    }, {
      key: 'logoAlignment',
      get: function get() {
        return this.getAttribute('logoAlignment') || this.getAttribute('logoalignment');
      }
    }, {
      key: 'logoColor',
      get: function get() {
        return this.getAttribute('logoColor');
      }
    }, {
      key: 'priceColor',
      get: function get() {
        return this.getAttribute('priceColor') || this.getAttribute('pricecolor');
      }
    }, {
      key: 'breakpointAlignment',
      get: function get() {
        return this.getAttribute('breakpointAlignment') || this.getAttribute('breakpointalignment');
      }
    }, {
      key: 'amountSelector',
      get: function get() {
        return this.getAttribute('amountSelector');
      }
    }, {
      key: 'hideLogo',
      get: function get() {
        return this.getAttribute('hideLogo') || this.getAttribute('hidelogo');
      }
    }, {
      key: 'qpFeature',
      get: function get() {
        return this.getAttribute('qpFeature');
      }
    }], [{
      key: 'parseFullAmount',


      // Utility to convert all amount types to clean number 
      value: function parseFullAmount(fullAmount) {
        if (fullAmount) {
          var numbersdecimalonly = /[0-9\.]/g;
          fullAmount = fullAmount.toString();
          fullAmount = fullAmount.match(numbersdecimalonly);
          if (fullAmount) {
            fullAmount = fullAmount.join('');
            fullAmount = parseFloat(Number(fullAmount).toFixed(2));
            return fullAmount;
          }
        }
        return 0;
      }
    }, {
      key: 'observedAttributes',
      get: function get() {
        return ['amount'];
      }
    }]);

    return QuadPayWidget;
  }(HTMLElement);

  customElements.define('quadpay-widget', QuadPayWidget);
})();