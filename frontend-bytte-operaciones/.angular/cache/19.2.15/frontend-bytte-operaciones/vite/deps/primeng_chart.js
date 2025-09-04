import {
  auto_default
} from "./chunk-VFVFL6AB.js";
import "./chunk-OVWGJKQU.js";
import {
  BaseStyle
} from "./chunk-SVFMKIZL.js";
import {
  SharedModule
} from "./chunk-W2EVCJTA.js";
import "./chunk-GFVF2TMO.js";
import {
  CommonModule
} from "./chunk-UCCE5RQP.js";
import {
  isPlatformBrowser
} from "./chunk-B5QHEHR4.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  ViewEncapsulation,
  booleanAttribute,
  setClassMetadata,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵstyleProp
} from "./chunk-RFZ2BTTM.js";
import "./chunk-WPM5VTLQ.js";
import "./chunk-PEBH6BBU.js";
import "./chunk-4S3KYZTJ.js";
import "./chunk-VEIYLGKH.js";
import "./chunk-74JPDVWP.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-chart.mjs
var UIChart = class _UIChart {
  platformId;
  el;
  zone;
  /**
   * Type of the chart.
   * @group Props
   */
  type;
  /**
   * Array of per-chart plugins to customize the chart behaviour.
   * @group Props
   */
  plugins = [];
  /**
   * Width of the chart.
   * @group Props
   */
  width;
  /**
   * Height of the chart.
   * @group Props
   */
  height;
  /**
   * Whether the chart is redrawn on screen size change.
   * @group Props
   */
  responsive = true;
  /**
   * Used to define a string that autocomplete attribute the current element.
   * @group Props
   */
  ariaLabel;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Data to display.
   * @group Props
   */
  get data() {
    return this._data;
  }
  set data(val) {
    this._data = val;
    this.reinit();
  }
  /**
   * Options to customize the chart.
   * @group Props
   */
  get options() {
    return this._options;
  }
  set options(val) {
    this._options = val;
    this.reinit();
  }
  /**
   * Callback to execute when an element on chart is clicked.
   * @group Emits
   */
  onDataSelect = new EventEmitter();
  isBrowser = false;
  initialized;
  _data;
  _options = {};
  chart;
  constructor(platformId, el, zone) {
    this.platformId = platformId;
    this.el = el;
    this.zone = zone;
  }
  ngAfterViewInit() {
    this.initChart();
    this.initialized = true;
  }
  onCanvasClick(event) {
    if (this.chart) {
      const element = this.chart.getElementsAtEventForMode(event, "nearest", {
        intersect: true
      }, false);
      const dataset = this.chart.getElementsAtEventForMode(event, "dataset", {
        intersect: true
      }, false);
      if (element && element[0] && dataset) {
        this.onDataSelect.emit({
          originalEvent: event,
          element: element[0],
          dataset
        });
      }
    }
  }
  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      let opts = this.options || {};
      opts.responsive = this.responsive;
      if (opts.responsive && (this.height || this.width)) {
        opts.maintainAspectRatio = false;
      }
      this.zone.runOutsideAngular(() => {
        this.chart = new auto_default(this.el.nativeElement.children[0].children[0], {
          type: this.type,
          data: this.data,
          options: this.options,
          plugins: this.plugins
        });
      });
    }
  }
  getCanvas() {
    return this.el.nativeElement.children[0].children[0];
  }
  getBase64Image() {
    return this.chart.toBase64Image();
  }
  generateLegend() {
    if (this.chart) {
      return this.chart.generateLegend();
    }
  }
  refresh() {
    if (this.chart) {
      this.chart.update();
    }
  }
  reinit() {
    if (this.chart) {
      this.chart.destroy();
      this.initChart();
    }
  }
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.initialized = false;
      this.chart = null;
    }
  }
  static ɵfac = function UIChart_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UIChart)(ɵɵdirectiveInject(PLATFORM_ID), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _UIChart,
    selectors: [["p-chart"]],
    inputs: {
      type: "type",
      plugins: "plugins",
      width: "width",
      height: "height",
      responsive: [2, "responsive", "responsive", booleanAttribute],
      ariaLabel: "ariaLabel",
      ariaLabelledBy: "ariaLabelledBy",
      data: "data",
      options: "options"
    },
    outputs: {
      onDataSelect: "onDataSelect"
    },
    decls: 2,
    vars: 8,
    consts: [[2, "position", "relative"], ["role", "img", 3, "click"]],
    template: function UIChart_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0)(1, "canvas", 1);
        ɵɵlistener("click", function UIChart_Template_canvas_click_1_listener($event) {
          return ctx.onCanvasClick($event);
        });
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵstyleProp("width", ctx.responsive && !ctx.width ? null : ctx.width)("height", ctx.responsive && !ctx.height ? null : ctx.height);
        ɵɵadvance();
        ɵɵattribute("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledBy)("width", ctx.responsive && !ctx.width ? null : ctx.width)("height", ctx.responsive && !ctx.height ? null : ctx.height);
      }
    },
    dependencies: [CommonModule, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UIChart, [{
    type: Component,
    args: [{
      selector: "p-chart",
      standalone: true,
      imports: [CommonModule, SharedModule],
      template: `
        <div style="position:relative" [style.width]="responsive && !width ? null : width" [style.height]="responsive && !height ? null : height">
            <canvas role="img" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy" [attr.width]="responsive && !width ? null : width" [attr.height]="responsive && !height ? null : height" (click)="onCanvasClick($event)"></canvas>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: ElementRef
  }, {
    type: NgZone
  }], {
    type: [{
      type: Input
    }],
    plugins: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    responsive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    ariaLabel: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    data: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    onDataSelect: [{
      type: Output
    }]
  });
})();
var ChartModule = class _ChartModule {
  static ɵfac = function ChartModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChartModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ChartModule,
    imports: [UIChart, SharedModule],
    exports: [UIChart, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [UIChart, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartModule, [{
    type: NgModule,
    args: [{
      imports: [UIChart, SharedModule],
      exports: [UIChart, SharedModule]
    }]
  }], null, null);
})();
var inlineStyles = {
  root: {
    position: "relative"
  }
};
var classes = {
  root: "p-chart"
};
var ChartStyle = class _ChartStyle extends BaseStyle {
  name = "chart";
  classes = classes;
  inlineStyles = inlineStyles;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵChartStyle_BaseFactory;
    return function ChartStyle_Factory(__ngFactoryType__) {
      return (ɵChartStyle_BaseFactory || (ɵChartStyle_BaseFactory = ɵɵgetInheritedFactory(_ChartStyle)))(__ngFactoryType__ || _ChartStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _ChartStyle,
    factory: _ChartStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartStyle, [{
    type: Injectable
  }], null, null);
})();
var ChartClasses;
(function(ChartClasses2) {
  ChartClasses2["root"] = "p-chart";
})(ChartClasses || (ChartClasses = {}));
export {
  ChartClasses,
  ChartModule,
  ChartStyle,
  UIChart
};
//# sourceMappingURL=primeng_chart.js.map
