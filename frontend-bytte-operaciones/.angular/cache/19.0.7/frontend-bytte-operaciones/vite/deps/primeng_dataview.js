import {
  Paginator,
  PaginatorModule
} from "./chunk-TOC2X3BH.js";
import "./chunk-G6AD7BOS.js";
import "./chunk-KLP5UZR2.js";
import "./chunk-OA7ILPTP.js";
import "./chunk-DLXQMXV4.js";
import "./chunk-PPLIO6PS.js";
import "./chunk-SAMLWKCS.js";
import "./chunk-USJYINML.js";
import "./chunk-H7LTTG6U.js";
import "./chunk-CYEEP2YI.js";
import "./chunk-5G7WYC4N.js";
import "./chunk-NXUEYVGX.js";
import "./chunk-2ZXM7VXU.js";
import "./chunk-YRY6CHKV.js";
import {
  SpinnerIcon
} from "./chunk-BK6PFI6M.js";
import {
  BaseComponent
} from "./chunk-WYDSYGPZ.js";
import "./chunk-C7GVLDKY.js";
import {
  BaseStyle
} from "./chunk-4MTOJ33D.js";
import {
  FilterService,
  Footer,
  Header,
  SharedModule,
  TranslationKeys
} from "./chunk-YDXZLNY7.js";
import "./chunk-GFVF2TMO.js";
import "./chunk-JTCDLDFO.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
  SlicePipe
} from "./chunk-WMUV6G2J.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  numberAttribute,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsetNgModuleScope,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-PYHRC3GA.js";
import "./chunk-4N4GOYJH.js";
import "./chunk-5OPE3T2R.js";
import "./chunk-FHTVLBLO.js";
import "./chunk-O2NX5PGS.js";
import {
  resolveFieldData
} from "./chunk-5GVB2IES.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-dataview.mjs
var theme = ({
  dt
}) => `
.p-dataview {
    border-color: ${dt("dataview.border.color")};
    border-width: ${dt("dataview.border.width")};
    border-style: solid;
    border-radius: ${dt("dataview.border.radius")};
    padding: ${dt("dataview.padding")};
}

.p-dataview-header {
    background: ${dt("dataview.header.background")};
    color: ${dt("dataview.header.color")};
    border-color: ${dt("dataview.header.border.color")};
    border-width: ${dt("dataview.header.border.width")};
    border-style: solid;
    padding: ${dt("dataview.header.padding")};
    border-radius: ${dt("dataview.header.border.radius")};
}

.p-dataview-content {
    background: ${dt("dataview.content.background")};
    border-color: ${dt("dataview.content.border.color")};
    border-width: ${dt("dataview.content.border.width")};
    border-style: solid;
    color: ${dt("dataview.content.color")};
    padding: ${dt("dataview.content.padding")};
    border-radius: ${dt("dataview.content.border.radius")};
}

.p-dataview-footer {
    background: ${dt("dataview.footer.background")};
    color: ${dt("dataview.footer.color")};
    border-color: ${dt("dataview.footer.border.color")};
    border-width: ${dt("dataview.footer.border.width")};
    border-style: solid;
    padding: ${dt("dataview.footer.padding")};
    border-radius: ${dt("dataview.footer.border.radius")};
}

.p-dataview-paginator-top {
    border-width: ${dt("dataview.paginator.top.border.width")};
    border-color: ${dt("dataview.paginator.top.border.color")};
    border-style: solid;
}

.p-dataview-paginator-bottom {
    border-width: ${dt("dataview.paginator.bottom.border.width")};
    border-color: ${dt("dataview.paginator.bottom.border.color")};
    border-style: solid;
}
`;
var classes = {
  root: ({
    props
  }) => ["p-dataview p-component", {
    "p-dataview-list": props.layout === "list",
    "p-dataview-grid": props.layout === "grid"
  }],
  header: "p-dataview-header",
  pcPaginator: ({
    position
  }) => "p-dataview-paginator-" + position,
  content: "p-dataview-content",
  emptyMessage: "p-dataview-empty-message",
  // TODO: remove?
  footer: "p-dataview-footer"
};
var DataViewStyle = class _DataViewStyle extends BaseStyle {
  name = "dataview";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDataViewStyle_BaseFactory;
    return function DataViewStyle_Factory(__ngFactoryType__) {
      return (ɵDataViewStyle_BaseFactory || (ɵDataViewStyle_BaseFactory = ɵɵgetInheritedFactory(_DataViewStyle)))(__ngFactoryType__ || _DataViewStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _DataViewStyle,
    factory: _DataViewStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataViewStyle, [{
    type: Injectable
  }], null, null);
})();
var DataViewClasses;
(function(DataViewClasses2) {
  DataViewClasses2["root"] = "p-dataview";
  DataViewClasses2["header"] = "p-dataview-header";
  DataViewClasses2["pcPaginator"] = "p-dataview-paginator-[position]";
  DataViewClasses2["content"] = "p-dataview-content";
  DataViewClasses2["emptyMessage"] = "p-dataview-empty-message";
  DataViewClasses2["footer"] = "p-dataview-footer";
})(DataViewClasses || (DataViewClasses = {}));
var _c0 = ["list"];
var _c1 = ["grid"];
var _c2 = ["header"];
var _c3 = ["emptymessage"];
var _c4 = ["footer"];
var _c5 = ["paginatorleft"];
var _c6 = ["paginatorright"];
var _c7 = ["paginatordropdownitem"];
var _c8 = ["loadingIcon"];
var _c9 = ["listicon"];
var _c10 = ["gridicon"];
var _c11 = [[["p-header"]], [["p-footer"]]];
var _c12 = ["p-header", "p-footer"];
var _c13 = (a0, a1) => ({
  "p-dataview p-component": true,
  "p-dataview-list": a0,
  "p-dataview-grid": a1
});
var _c14 = (a0) => ({
  $implicit: a0
});
function DataView_div_1_i_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap("p-dataview-loading-icon pi-spin " + ctx_r0.loadingIcon);
  }
}
function DataView_div_1_ng_container_3_SpinnerIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "SpinnerIcon", 14);
  }
  if (rf & 2) {
    ɵɵproperty("spin", true)("styleClass", "p-dataview-loading-icon");
  }
}
function DataView_div_1_ng_container_3_2_ng_template_0_Template(rf, ctx) {
}
function DataView_div_1_ng_container_3_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataView_div_1_ng_container_3_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function DataView_div_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, DataView_div_1_ng_container_3_SpinnerIcon_1_Template, 1, 2, "SpinnerIcon", 12)(2, DataView_div_1_ng_container_3_2_Template, 1, 0, null, 13);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.loadingicon);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.loadingicon);
  }
}
function DataView_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9)(1, "div", 10);
    ɵɵtemplate(2, DataView_div_1_i_2_Template, 1, 2, "i", 11)(3, DataView_div_1_ng_container_3_Template, 3, 2, "ng-container", 6);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.loadingIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.loadingIcon);
  }
}
function DataView_div_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DataView_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 15);
    ɵɵprojection(1);
    ɵɵtemplate(2, DataView_div_2_ng_container_2_Template, 1, 0, "ng-container", 13);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.headerTemplate);
  }
}
function DataView_p_paginator_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-paginator", 16);
    ɵɵlistener("onPageChange", function DataView_p_paginator_3_Template_p_paginator_onPageChange_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.paginate($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("rows", ctx_r0.rows)("first", ctx_r0.first)("totalRecords", ctx_r0.totalRecords)("pageLinkSize", ctx_r0.pageLinks)("alwaysShow", ctx_r0.alwaysShowPaginator)("rowsPerPageOptions", ctx_r0.rowsPerPageOptions)("dropdownAppendTo", ctx_r0.paginatorDropdownAppendTo)("dropdownScrollHeight", ctx_r0.paginatorDropdownScrollHeight)("templateLeft", ctx_r0.paginatorleft)("templateRight", ctx_r0.paginatorright)("currentPageReportTemplate", ctx_r0.currentPageReportTemplate)("showFirstLastIcon", ctx_r0.showFirstLastIcon)("dropdownItemTemplate", ctx_r0.paginatordropdownitem)("showCurrentPageReport", ctx_r0.showCurrentPageReport)("showJumpToPageDropdown", ctx_r0.showJumpToPageDropdown)("showPageLinks", ctx_r0.showPageLinks)("styleClass", ctx_r0.paginatorStyleClass);
  }
}
function DataView_Conditional_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DataView_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataView_Conditional_5_ng_container_0_Template, 1, 0, "ng-container", 17);
    ɵɵpipe(1, "slice");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.listTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(6, _c14, ctx_r0.paginator ? ɵɵpipeBind3(1, 2, ctx_r0.filteredValue || ctx_r0.value, ctx_r0.lazy ? 0 : ctx_r0.first, (ctx_r0.lazy ? 0 : ctx_r0.first) + ctx_r0.rows) : ctx_r0.filteredValue || ctx_r0.value));
  }
}
function DataView_Conditional_6_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DataView_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataView_Conditional_6_ng_container_0_Template, 1, 0, "ng-container", 17);
    ɵɵpipe(1, "slice");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.gridTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(6, _c14, ctx_r0.paginator ? ɵɵpipeBind3(1, 2, ctx_r0.filteredValue || ctx_r0.value, ctx_r0.lazy ? 0 : ctx_r0.first, (ctx_r0.lazy ? 0 : ctx_r0.first) + ctx_r0.rows) : ctx_r0.filteredValue || ctx_r0.value));
  }
}
function DataView_div_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.emptyMessageLabel, " ");
  }
}
function DataView_div_7_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, null, 0);
  }
}
function DataView_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div")(1, "div", 18);
    ɵɵtemplate(2, DataView_div_7_ng_container_2_Template, 2, 1, "ng-container", 19)(3, DataView_div_7_ng_container_3_Template, 2, 0, "ng-container", 13);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r0.emptymessageTemplate)("ngIfElse", ctx_r0.empty);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.emptymessageTemplate);
  }
}
function DataView_p_paginator_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-paginator", 20);
    ɵɵlistener("onPageChange", function DataView_p_paginator_8_Template_p_paginator_onPageChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.paginate($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("rows", ctx_r0.rows)("first", ctx_r0.first)("totalRecords", ctx_r0.totalRecords)("pageLinkSize", ctx_r0.pageLinks)("alwaysShow", ctx_r0.alwaysShowPaginator)("rowsPerPageOptions", ctx_r0.rowsPerPageOptions)("dropdownAppendTo", ctx_r0.paginatorDropdownAppendTo)("dropdownScrollHeight", ctx_r0.paginatorDropdownScrollHeight)("templateLeft", ctx_r0.paginatorleft)("templateRight", ctx_r0.paginatorright)("currentPageReportTemplate", ctx_r0.currentPageReportTemplate)("showFirstLastIcon", ctx_r0.showFirstLastIcon)("dropdownItemTemplate", ctx_r0.paginatordropdownitem)("showCurrentPageReport", ctx_r0.showCurrentPageReport)("showJumpToPageDropdown", ctx_r0.showJumpToPageDropdown)("showPageLinks", ctx_r0.showPageLinks)("styleClass", ctx_r0.paginatorStyleClass);
  }
}
function DataView_div_9_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DataView_div_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 21);
    ɵɵprojection(1, 1);
    ɵɵtemplate(2, DataView_div_9_ng_container_2_Template, 1, 0, "ng-container", 13);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.footerTemplate);
  }
}
var DataView = class _DataView extends BaseComponent {
  /**
   * When specified as true, enables the pagination.
   * @group Props
   */
  paginator;
  /**
   * Number of rows to display per page.
   * @group Props
   */
  rows;
  /**
   * Number of total records, defaults to length of value when not defined.
   * @group Props
   */
  totalRecords;
  /**
   * Number of page links to display in paginator.
   * @group Props
   */
  pageLinks = 5;
  /**
   * Array of integer/object values to display inside rows per page dropdown of paginator
   * @group Props
   */
  rowsPerPageOptions;
  /**
   * Position of the paginator.
   * @group Props
   */
  paginatorPosition = "bottom";
  /**
   * Custom style class for paginator
   * @group Props
   */
  paginatorStyleClass;
  /**
   * Whether to show it even there is only one page.
   * @group Props
   */
  alwaysShowPaginator = true;
  /**
   * Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @group Props
   */
  paginatorDropdownAppendTo;
  /**
   * Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
   * @group Props
   */
  paginatorDropdownScrollHeight = "200px";
  /**
   * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
   * @group Props
   */
  currentPageReportTemplate = "{currentPage} of {totalPages}";
  /**
   * Whether to display current page report.
   * @group Props
   */
  showCurrentPageReport;
  /**
   * Whether to display a dropdown to navigate to any page.
   * @group Props
   */
  showJumpToPageDropdown;
  /**
   * When enabled, icons are displayed on paginator to go first and last page.
   * @group Props
   */
  showFirstLastIcon = true;
  /**
   * Whether to show page links.
   * @group Props
   */
  showPageLinks = true;
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @group Props
   */
  lazy;
  /**
   * Whether to call lazy loading on initialization.
   * @group Props
   */
  lazyLoadOnInit = true;
  /**
   * Text to display when there is no data. Defaults to global value in i18n translation configuration.
   * @group Props
   */
  emptyMessage = "";
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Style class of the grid.
   * @group Props
   */
  gridStyleClass = "";
  /**
   * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
   * @group Props
   */
  trackBy = (index, item) => item;
  /**
   * Comma separated list of fields in the object graph to search against.
   * @group Props
   */
  filterBy;
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale;
  /**
   * Displays a loader to indicate data load is in progress.
   * @group Props
   */
  loading;
  /**
   * The icon to show while indicating data load is in progress.
   * @group Props
   */
  loadingIcon;
  /**
   * Index of the first row to be displayed.
   * @group Props
   */
  first = 0;
  /**
   * Property name of data to use in sorting by default.
   * @group Props
   */
  sortField;
  /**
   * Order to sort the data by default.
   * @group Props
   */
  sortOrder;
  /**
   * An array of objects to display.
   * @group Props
   */
  value;
  /**
   * Defines the layout mode.
   * @group Props
   */
  layout = "list";
  /**
   * Callback to invoke when paging, sorting or filtering happens in lazy mode.
   * @param {DataViewLazyLoadEvent} event - Custom lazy load event.
   * @group Emits
   */
  onLazyLoad = new EventEmitter();
  /**
   * Callback to invoke when pagination occurs.
   * @param {DataViewPageEvent} event - Custom page event.
   * @group Emits
   */
  onPage = new EventEmitter();
  /**
   * Callback to invoke when sorting occurs.
   * @param {DataViewSortEvent} event - Custom sort event.
   * @group Emits
   */
  onSort = new EventEmitter();
  /**
   * Callback to invoke when changing layout.
   * @param {DataViewLayoutChangeEvent} event - Custom layout change event.
   * @group Emits
   */
  onChangeLayout = new EventEmitter();
  /**
   * Template for the list layout.
   * @group Templates
   */
  listTemplate;
  /**
   * Template for grid layout.
   * @group Templates
   */
  gridTemplate;
  /**
   * Template for the header section.
   * @group Templates
   */
  headerTemplate;
  /**
   * Template for the empty message section.
   * @group Templates
   */
  emptymessageTemplate;
  /**
   * Template for the footer section.
   * @group Templates
   */
  footerTemplate;
  /**
   * Template for the left side of paginator.
   * @group Templates
   */
  paginatorleft;
  /**r* Template for the right side of paginator.
   * @group Templates
   */
  paginatorright;
  /**
   * Template for items in paginator dropdown.
   * @group Templates
   */
  paginatordropdownitem;
  /**
   * Template for loading icon.
   * @group Templates
   */
  loadingicon;
  /**
   * Template for list icon.
   * @group Templates
   */
  listicon;
  /**
   * Template for grid icon.
   * @group Templates
   */
  gridicon;
  header;
  footer;
  _value;
  filteredValue;
  filterValue;
  initialized;
  _layout = "list";
  translationSubscription;
  _componentStyle = inject(DataViewStyle);
  get emptyMessageLabel() {
    return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
  }
  filterService = inject(FilterService);
  ngOnInit() {
    super.ngOnInit();
    if (this.lazy && this.lazyLoadOnInit) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    this.translationSubscription = this.config.translationObserver.subscribe(() => {
      this.cd.markForCheck();
    });
    this.initialized = true;
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
  ngOnChanges(simpleChanges) {
    super.ngOnChanges(simpleChanges);
    if (simpleChanges.value) {
      this._value = simpleChanges.value.currentValue;
      this.updateTotalRecords();
      if (!this.lazy && this.hasFilter()) {
        this.filter(this.filterValue);
      }
    }
    if (simpleChanges.sortField || simpleChanges.sortOrder) {
      if (!this.lazy || this.initialized) {
        this.sort();
      }
    }
  }
  updateTotalRecords() {
    this.totalRecords = this.lazy ? this.totalRecords : this._value ? this._value.length : 0;
  }
  paginate(event) {
    this.first = event.first;
    this.rows = event.rows;
    if (this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    this.onPage.emit({
      first: this.first,
      rows: this.rows
    });
  }
  sort() {
    this.first = 0;
    if (this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    } else if (this.value) {
      this.value.sort((data1, data2) => {
        let value1 = resolveFieldData(data1, this.sortField);
        let value2 = resolveFieldData(data2, this.sortField);
        let result = null;
        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === "string" && typeof value2 === "string") result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return this.sortOrder * result;
      });
      if (this.hasFilter()) {
        this.filter(this.filterValue);
      }
    }
    this.onSort.emit({
      sortField: this.sortField,
      sortOrder: this.sortOrder
    });
  }
  isEmpty() {
    let data = this.filteredValue || this.value;
    return data == null || data.length == 0;
  }
  createLazyLoadMetadata() {
    return {
      first: this.first,
      rows: this.rows,
      sortField: this.sortField,
      sortOrder: this.sortOrder
    };
  }
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  filter(filter, filterMatchMode = "contains") {
    this.filterValue = filter;
    if (this.value && this.value.length) {
      let searchFields = this.filterBy.split(",");
      this.filteredValue = this.filterService.filter(this.value, searchFields, filter, filterMatchMode, this.filterLocale);
      if (this.filteredValue.length === this.value.length) {
        this.filteredValue = null;
      }
      if (this.paginator) {
        this.first = 0;
        this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
      }
      this.cd.markForCheck();
    }
  }
  hasFilter() {
    return this.filterValue && this.filterValue.trim().length > 0;
  }
  ngOnDestroy() {
    if (this.translationSubscription) {
      this.translationSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDataView_BaseFactory;
    return function DataView_Factory(__ngFactoryType__) {
      return (ɵDataView_BaseFactory || (ɵDataView_BaseFactory = ɵɵgetInheritedFactory(_DataView)))(__ngFactoryType__ || _DataView);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _DataView,
    selectors: [["p-dataView"], ["p-dataview"], ["p-data-view"]],
    contentQueries: function DataView_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 5);
        ɵɵcontentQuery(dirIndex, _c1, 5);
        ɵɵcontentQuery(dirIndex, _c2, 5);
        ɵɵcontentQuery(dirIndex, _c3, 5);
        ɵɵcontentQuery(dirIndex, _c4, 5);
        ɵɵcontentQuery(dirIndex, _c5, 5);
        ɵɵcontentQuery(dirIndex, _c6, 5);
        ɵɵcontentQuery(dirIndex, _c7, 5);
        ɵɵcontentQuery(dirIndex, _c8, 5);
        ɵɵcontentQuery(dirIndex, _c9, 5);
        ɵɵcontentQuery(dirIndex, _c10, 5);
        ɵɵcontentQuery(dirIndex, Header, 5);
        ɵɵcontentQuery(dirIndex, Footer, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.gridTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptymessageTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.paginatorleft = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.paginatorright = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.paginatordropdownitem = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loadingicon = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listicon = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.gridicon = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.header = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footer = _t.first);
      }
    },
    inputs: {
      paginator: [2, "paginator", "paginator", booleanAttribute],
      rows: [2, "rows", "rows", numberAttribute],
      totalRecords: [2, "totalRecords", "totalRecords", numberAttribute],
      pageLinks: [2, "pageLinks", "pageLinks", numberAttribute],
      rowsPerPageOptions: "rowsPerPageOptions",
      paginatorPosition: "paginatorPosition",
      paginatorStyleClass: "paginatorStyleClass",
      alwaysShowPaginator: [2, "alwaysShowPaginator", "alwaysShowPaginator", booleanAttribute],
      paginatorDropdownAppendTo: "paginatorDropdownAppendTo",
      paginatorDropdownScrollHeight: "paginatorDropdownScrollHeight",
      currentPageReportTemplate: "currentPageReportTemplate",
      showCurrentPageReport: [2, "showCurrentPageReport", "showCurrentPageReport", booleanAttribute],
      showJumpToPageDropdown: [2, "showJumpToPageDropdown", "showJumpToPageDropdown", booleanAttribute],
      showFirstLastIcon: [2, "showFirstLastIcon", "showFirstLastIcon", booleanAttribute],
      showPageLinks: [2, "showPageLinks", "showPageLinks", booleanAttribute],
      lazy: [2, "lazy", "lazy", booleanAttribute],
      lazyLoadOnInit: [2, "lazyLoadOnInit", "lazyLoadOnInit", booleanAttribute],
      emptyMessage: "emptyMessage",
      style: "style",
      styleClass: "styleClass",
      gridStyleClass: "gridStyleClass",
      trackBy: "trackBy",
      filterBy: "filterBy",
      filterLocale: "filterLocale",
      loading: [2, "loading", "loading", booleanAttribute],
      loadingIcon: "loadingIcon",
      first: [2, "first", "first", numberAttribute],
      sortField: "sortField",
      sortOrder: [2, "sortOrder", "sortOrder", numberAttribute],
      value: "value",
      layout: "layout"
    },
    outputs: {
      onLazyLoad: "onLazyLoad",
      onPage: "onPage",
      onSort: "onSort",
      onChangeLayout: "onChangeLayout"
    },
    features: [ɵɵProvidersFeature([DataViewStyle]), ɵɵInputTransformsFeature, ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature],
    ngContentSelectors: _c12,
    decls: 10,
    vars: 15,
    consts: [["empty", ""], [3, "ngClass", "ngStyle"], ["class", "p-dataview-loading", 4, "ngIf"], ["class", "p-dataview-header", 4, "ngIf"], ["styleClass", "p-paginator-top", 3, "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "dropdownAppendTo", "dropdownScrollHeight", "templateLeft", "templateRight", "currentPageReportTemplate", "showFirstLastIcon", "dropdownItemTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showPageLinks", "styleClass", "onPageChange", 4, "ngIf"], [1, "p-dataview-content"], [4, "ngIf"], ["styleClass", "p-paginator-bottom", 3, "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "dropdownAppendTo", "dropdownScrollHeight", "templateLeft", "templateRight", "currentPageReportTemplate", "showFirstLastIcon", "dropdownItemTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showPageLinks", "styleClass", "onPageChange", 4, "ngIf"], ["class", "p-dataview-footer", 4, "ngIf"], [1, "p-dataview-loading"], [1, "p-dataview-loading-overlay", "p-overlay-mask"], [3, "class", 4, "ngIf"], [3, "spin", "styleClass", 4, "ngIf"], [4, "ngTemplateOutlet"], [3, "spin", "styleClass"], [1, "p-dataview-header"], ["styleClass", "p-paginator-top", 3, "onPageChange", "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "dropdownAppendTo", "dropdownScrollHeight", "templateLeft", "templateRight", "currentPageReportTemplate", "showFirstLastIcon", "dropdownItemTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showPageLinks", "styleClass"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-dataview-emptymessage"], [4, "ngIf", "ngIfElse"], ["styleClass", "p-paginator-bottom", 3, "onPageChange", "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "dropdownAppendTo", "dropdownScrollHeight", "templateLeft", "templateRight", "currentPageReportTemplate", "showFirstLastIcon", "dropdownItemTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showPageLinks", "styleClass"], [1, "p-dataview-footer"]],
    template: function DataView_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c11);
        ɵɵelementStart(0, "div", 1);
        ɵɵtemplate(1, DataView_div_1_Template, 4, 2, "div", 2)(2, DataView_div_2_Template, 3, 1, "div", 3)(3, DataView_p_paginator_3_Template, 1, 17, "p-paginator", 4);
        ɵɵelementStart(4, "div", 5);
        ɵɵtemplate(5, DataView_Conditional_5_Template, 2, 8, "ng-container")(6, DataView_Conditional_6_Template, 2, 8, "ng-container")(7, DataView_div_7_Template, 4, 3, "div", 6);
        ɵɵelementEnd();
        ɵɵtemplate(8, DataView_p_paginator_8_Template, 1, 17, "p-paginator", 7)(9, DataView_div_9_Template, 3, 1, "div", 8);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngClass", ɵɵpureFunction2(12, _c13, ctx.layout === "list", ctx.layout === "grid"))("ngStyle", ctx.style);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.loading);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.header || ctx.headerTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.paginator && (ctx.paginatorPosition === "top" || ctx.paginatorPosition == "both"));
        ɵɵadvance(2);
        ɵɵconditional(ctx.layout === "list" ? 5 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.layout === "grid" ? 6 : -1);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.isEmpty() && !ctx.loading);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.paginator && (ctx.paginatorPosition === "bottom" || ctx.paginatorPosition == "both"));
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.footer || ctx.footerTemplate);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, NgStyle, SlicePipe, PaginatorModule, Paginator, SpinnerIcon, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataView, [{
    type: Component,
    args: [{
      selector: "p-dataView, p-dataview, p-data-view",
      standalone: true,
      imports: [CommonModule, PaginatorModule, SpinnerIcon, SharedModule],
      template: `
        <div [ngClass]="{ 'p-dataview p-component': true, 'p-dataview-list': layout === 'list', 'p-dataview-grid': layout === 'grid' }" [ngStyle]="style" [class]="styleClass">
            <div class="p-dataview-loading" *ngIf="loading">
                <div class="p-dataview-loading-overlay p-overlay-mask">
                    <i *ngIf="loadingIcon" [class]="'p-dataview-loading-icon pi-spin ' + loadingIcon"></i>
                    <ng-container *ngIf="!loadingIcon">
                        <SpinnerIcon *ngIf="!loadingicon" [spin]="true" [styleClass]="'p-dataview-loading-icon'" />
                        <ng-template *ngTemplateOutlet="loadingicon"></ng-template>
                    </ng-container>
                </div>
            </div>
            <div class="p-dataview-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)"
                styleClass="p-paginator-top"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [templateLeft]="paginatorleft"
                [templateRight]="paginatorright"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatordropdownitem"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showPageLinks]="showPageLinks"
                [styleClass]="paginatorStyleClass"
            ></p-paginator>

            <div class="p-dataview-content">
                @if (layout === 'list') {
                    <ng-container
                        *ngTemplateOutlet="
                            listTemplate;
                            context: {
                                $implicit: paginator ? (filteredValue || value | slice: (lazy ? 0 : first) : (lazy ? 0 : first) + rows) : filteredValue || value
                            }
                        "
                    ></ng-container>
                }
                @if (layout === 'grid') {
                    <ng-container
                        *ngTemplateOutlet="
                            gridTemplate;
                            context: {
                                $implicit: paginator ? (filteredValue || value | slice: (lazy ? 0 : first) : (lazy ? 0 : first) + rows) : filteredValue || value
                            }
                        "
                    ></ng-container>
                }
                <div *ngIf="isEmpty() && !loading">
                    <div class="p-dataview-emptymessage">
                        <ng-container *ngIf="!emptymessageTemplate; else empty">
                            {{ emptyMessageLabel }}
                        </ng-container>
                        <ng-container #empty *ngTemplateOutlet="emptymessageTemplate"></ng-container>
                    </div>
                </div>
            </div>
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)"
                styleClass="p-paginator-bottom"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [templateLeft]="paginatorleft"
                [templateRight]="paginatorright"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatordropdownitem"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showPageLinks]="showPageLinks"
                [styleClass]="paginatorStyleClass"
            ></p-paginator>
            <div class="p-dataview-footer" *ngIf="footer || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [DataViewStyle]
    }]
  }], null, {
    paginator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    rows: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    totalRecords: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    pageLinks: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    rowsPerPageOptions: [{
      type: Input
    }],
    paginatorPosition: [{
      type: Input
    }],
    paginatorStyleClass: [{
      type: Input
    }],
    alwaysShowPaginator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    paginatorDropdownAppendTo: [{
      type: Input
    }],
    paginatorDropdownScrollHeight: [{
      type: Input
    }],
    currentPageReportTemplate: [{
      type: Input
    }],
    showCurrentPageReport: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showJumpToPageDropdown: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showFirstLastIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showPageLinks: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    lazy: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    lazyLoadOnInit: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    emptyMessage: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    gridStyleClass: [{
      type: Input
    }],
    trackBy: [{
      type: Input
    }],
    filterBy: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    loading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    loadingIcon: [{
      type: Input
    }],
    first: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    sortField: [{
      type: Input
    }],
    sortOrder: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    value: [{
      type: Input
    }],
    layout: [{
      type: Input
    }],
    onLazyLoad: [{
      type: Output
    }],
    onPage: [{
      type: Output
    }],
    onSort: [{
      type: Output
    }],
    onChangeLayout: [{
      type: Output
    }],
    listTemplate: [{
      type: ContentChild,
      args: ["list"]
    }],
    gridTemplate: [{
      type: ContentChild,
      args: ["grid"]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header"]
    }],
    emptymessageTemplate: [{
      type: ContentChild,
      args: ["emptymessage"]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer"]
    }],
    paginatorleft: [{
      type: ContentChild,
      args: ["paginatorleft"]
    }],
    paginatorright: [{
      type: ContentChild,
      args: ["paginatorright"]
    }],
    paginatordropdownitem: [{
      type: ContentChild,
      args: ["paginatordropdownitem"]
    }],
    loadingicon: [{
      type: ContentChild,
      args: ["loadingIcon"]
    }],
    listicon: [{
      type: ContentChild,
      args: ["listicon"]
    }],
    gridicon: [{
      type: ContentChild,
      args: ["gridicon"]
    }],
    header: [{
      type: ContentChild,
      args: [Header]
    }],
    footer: [{
      type: ContentChild,
      args: [Footer]
    }]
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassDebugInfo(DataView, {
    className: "DataView",
    filePath: "dataview.ts",
    lineNumber: 139
  });
})();
var DataViewModule = class _DataViewModule {
  static ɵfac = function DataViewModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DataViewModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DataViewModule
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [DataView, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataViewModule, [{
    type: NgModule,
    args: [{
      imports: [DataView, SharedModule],
      exports: [DataView, SharedModule]
    }]
  }], null, null);
})();
(function() {
  (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(DataViewModule, {
    imports: [DataView, SharedModule],
    exports: [DataView, SharedModule]
  });
})();
export {
  DataView,
  DataViewClasses,
  DataViewModule,
  DataViewStyle
};
//# sourceMappingURL=primeng_dataview.js.map
