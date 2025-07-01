import {
  DragDropModule,
  moveItemInArray
} from "./chunk-GGJPVBWW.js";
import {
  Listbox
} from "./chunk-62OEWVJV.js";
import "./chunk-D354PBOY.js";
import "./chunk-VP5S7TL6.js";
import {
  ButtonDirective
} from "./chunk-IQS3KTCQ.js";
import "./chunk-CHJNV32Y.js";
import "./chunk-XDXLSOGS.js";
import "./chunk-F5EQQ5KI.js";
import "./chunk-IC5EF4FN.js";
import "./chunk-5G7WYC4N.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-NXUEYVGX.js";
import {
  Ripple
} from "./chunk-APEGNTHH.js";
import {
  AngleDoubleDownIcon,
  AngleDoubleUpIcon,
  AngleDownIcon,
  AngleUpIcon
} from "./chunk-2A5CJI2Q.js";
import "./chunk-WE2NZRLN.js";
import {
  BaseComponent
} from "./chunk-5XKJN3WW.js";
import "./chunk-TWY7W6OD.js";
import {
  BaseStyle
} from "./chunk-VER6NC4S.js";
import {
  FilterService,
  PrimeTemplate,
  SharedModule
} from "./chunk-FHY75DV6.js";
import {
  find,
  findSingle,
  hasClass,
  isHidden,
  scrollInView,
  setAttribute,
  uuid
} from "./chunk-GFVF2TMO.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-WMUV6G2J.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  numberAttribute,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsetNgModuleScope,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-PYHRC3GA.js";
import "./chunk-4N4GOYJH.js";
import "./chunk-5OPE3T2R.js";
import "./chunk-FHTVLBLO.js";
import "./chunk-ITKLJM62.js";
import {
  findIndexInList,
  insertIntoOrderedArray
} from "./chunk-AWYL7S6O.js";
import {
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-orderlist.mjs
var theme = ({
  dt
}) => `
.p-orderlist {
    display: flex;
    gap: ${dt("orderlist.gap")};
}

.p-orderlist-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${dt("orderlist.controls.gap")};
}
`;
var classes = {
  root: "p-orderlist p-component",
  controls: "p-orderlist-controls"
};
var OrderListStyle = class _OrderListStyle extends BaseStyle {
  name = "orderlist";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵOrderListStyle_BaseFactory;
    return function OrderListStyle_Factory(__ngFactoryType__) {
      return (ɵOrderListStyle_BaseFactory || (ɵOrderListStyle_BaseFactory = ɵɵgetInheritedFactory(_OrderListStyle)))(__ngFactoryType__ || _OrderListStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _OrderListStyle,
    factory: _OrderListStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderListStyle, [{
    type: Injectable
  }], null, null);
})();
var OrderListClasses;
(function(OrderListClasses2) {
  OrderListClasses2["root"] = "p-orderlist";
  OrderListClasses2["controls"] = "p-orderlist-controls";
})(OrderListClasses || (OrderListClasses = {}));
var _c0 = ["item"];
var _c1 = ["empty"];
var _c2 = ["emptyfilter"];
var _c3 = ["filter"];
var _c4 = ["header"];
var _c5 = ["moveupicon"];
var _c6 = ["movetopicon"];
var _c7 = ["movedownicon"];
var _c8 = ["movebottomicon"];
var _c9 = ["filtericon"];
var _c10 = ["listelement"];
var _c11 = (a0, a1, a2) => ({
  "p-orderlist p-component": true,
  "p-orderlist-striped": a0,
  "p-orderlist-controls-left": a1,
  "p-orderlist-controls-right": a2
});
var _c12 = (a0, a1, a2) => ({
  $implicit: a0,
  selected: a1,
  index: a2
});
function OrderList_AngleUpIcon_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleUpIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "moveupicon");
  }
}
function OrderList_4_ng_template_0_Template(rf, ctx) {
}
function OrderList_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, OrderList_4_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function OrderList_AngleDoubleUpIcon_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDoubleUpIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movetopicon");
  }
}
function OrderList_7_ng_template_0_Template(rf, ctx) {
}
function OrderList_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, OrderList_7_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function OrderList_AngleDownIcon_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDownIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movedownicon");
  }
}
function OrderList_10_ng_template_0_Template(rf, ctx) {
}
function OrderList_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, OrderList_10_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function OrderList_AngleDoubleDownIcon_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "AngleDoubleDownIcon");
  }
  if (rf & 2) {
    ɵɵattribute("data-pc-section", "movebottomicon");
  }
}
function OrderList_13_ng_template_0_Template(rf, ctx) {
}
function OrderList_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, OrderList_13_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function OrderList_ng_container_17_ng_template_1_0_ng_template_0_Template(rf, ctx) {
}
function OrderList_ng_container_17_ng_template_1_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, OrderList_ng_container_17_ng_template_1_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function OrderList_ng_container_17_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, OrderList_ng_container_17_ng_template_1_0_Template, 1, 0, null, 7);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate || ctx_r1._headerTemplate);
  }
}
function OrderList_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, OrderList_ng_container_17_ng_template_1_Template, 1, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function OrderList_ng_container_18_ng_template_1_0_ng_template_0_Template(rf, ctx) {
}
function OrderList_ng_container_18_ng_template_1_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, OrderList_ng_container_18_ng_template_1_0_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function OrderList_ng_container_18_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, OrderList_ng_container_18_ng_template_1_0_Template, 1, 0, null, 10);
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    const selected_r4 = ctx.selected;
    const index_r5 = ctx.index;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.itemTemplate || ctx_r1._itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(2, _c12, option_r3, selected_r4, index_r5));
  }
}
function OrderList_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, OrderList_ng_container_18_ng_template_1_Template, 1, 6, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
var OrderList = class _OrderList extends BaseComponent {
  /**
   * Text for the caption.
   * @group Props
   */
  header;
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
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex;
  /**
   * Defines a string that labels the input for accessibility.
   * @group Props
   */
  ariaLabel;
  /**
   * Specifies one or more IDs in the DOM that labels the input field.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Inline style of the list element.
   * @group Props
   */
  listStyle;
  /**
   * A boolean value that indicates whether the component should be responsive.
   * @group Props
   */
  responsive;
  /**
   * When specified displays an input field to filter the items on keyup and decides which fields to search against.
   * @group Props
   */
  filterBy;
  /**
   * Placeholder of the filter input.
   * @group Props
   */
  filterPlaceholder;
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale;
  /**
   * When true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
   * @group Props
   */
  metaKeySelection = false;
  /**
   * Whether to enable dragdrop based reordering.
   * @group Props
   */
  dragdrop = false;
  /**
   * Defines the location of the buttons with respect to the list.
   * @group Props
   */
  controlsPosition = "left";
  /**
   * Defines a string that labels the filter input.
   * @group Props
   */
  ariaFilterLabel;
  /**
   * Defines how the items are filtered.
   * @group Props
   */
  filterMatchMode = "contains";
  /**
   * Indicates the width of the screen at which the component should change its behavior.
   * @group Props
   */
  breakpoint = "960px";
  /**
   * Whether to displays rows with alternating colors.
   * @group Props
   */
  stripedRows;
  /**
   * When present, it specifies that the component should be disabled.
   * @group Props
   */
  disabled = false;
  /**
   * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
   * @group Props
   */
  trackBy = (index, item) => item;
  /**
   * Height of the viewport, a scrollbar is defined if height of list exceeds this value.
   * @group Props
   */
  scrollHeight = "14rem";
  /**
   * Whether to focus on the first visible or selected element.
   * @group Props
   */
  autoOptionFocus = true;
  /**
   * A list of values that are currently selected.
   * @group Props
   */
  set selection(val) {
    this.d_selection = val;
  }
  get selection() {
    return this.d_selection;
  }
  /**
   * Array of values to be displayed in the component.
   * It represents the data source for the list of items.
   * @group Props
   */
  set value(val) {
    this._value = val;
    if (this.filterValue) {
      this.filter();
    }
  }
  get value() {
    return this._value;
  }
  /**
   * Used to pass all properties of the ButtonProps to the Button component.
   * @group Props
   */
  buttonProps = {
    severity: "secondary"
  };
  /**
   * Used to pass all properties of the ButtonProps to the move up button inside the component.
   * @group Props
   */
  moveUpButtonProps;
  /**
   * Used to pass all properties of the ButtonProps to the move top button inside the component.
   * @group Props
   */
  moveTopButtonProps;
  /**
   * Used to pass all properties of the ButtonProps to the move down button inside the component.
   * @group Props
   */
  moveDownButtonProps;
  /**
   * Used to pass all properties of the ButtonProps to the move bottom button inside the component.
   * @group Props
   */
  moveBottomButtonProps;
  /**
   * Callback to invoke on selection change.
   * @param {*} any - selection instance.
   * @group Emits
   */
  selectionChange = new EventEmitter();
  /**
   * Callback to invoke when list is reordered.
   * @param {*} any - list instance.
   * @group Emits
   */
  onReorder = new EventEmitter();
  /**
   * Callback to invoke when selection changes.
   * @param {OrderListSelectionChangeEvent} event - Custom change event.
   * @group Emits
   */
  onSelectionChange = new EventEmitter();
  /**
   * Callback to invoke when filtering occurs.
   * @param {OrderListFilterEvent} event - Custom filter event.
   * @group Emits
   */
  onFilterEvent = new EventEmitter();
  /**
   * Callback to invoke when the list is focused
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when the list is blurred
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  listViewChild;
  filterViewChild;
  /**
   * Custom item template.
   * @group Templates
   */
  itemTemplate;
  /**
   * Custom empty template.
   * @group Templates
   */
  emptyMessageTemplate;
  /**
   * Custom empty filter template.
   * @group Templates
   */
  emptyFilterMessageTemplate;
  /**
   * Custom filter template.
   * @group Templates
   */
  filterTemplate;
  /**
   * Custom header template.
   * @group Templates
   */
  headerTemplate;
  /**
   * Custom move up icon template.
   * @group Templates
   */
  moveUpIconTemplate;
  /**
   * Custom move top icon template.
   * @group Templates
   */
  moveTopIconTemplate;
  /**
   * Custom move down icon template.
   * @group Templates
   */
  moveDownIconTemplate;
  /**
   * Custom move bottom icon template.
   * @group Templates
   */
  moveBottomIconTemplate;
  /**
   * Custom filter icon template.
   * @group Templates
   */
  filterIconTemplate;
  get moveUpAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.moveUp : void 0;
  }
  get moveTopAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.moveTop : void 0;
  }
  get moveDownAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.moveDown : void 0;
  }
  get moveBottomAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.moveBottom : void 0;
  }
  _componentStyle = inject(OrderListStyle);
  filterOptions;
  d_selection = [];
  movedUp;
  movedDown;
  itemTouched;
  styleElement;
  id = uuid("pn_id_");
  focused = false;
  focusedOptionIndex = -1;
  focusedOption;
  filterValue;
  visibleOptions;
  _value;
  filterService = inject(FilterService);
  getButtonProps(direction) {
    switch (direction) {
      case "up":
        return __spreadValues(__spreadValues({}, this.buttonProps), this.moveUpButtonProps);
      case "top":
        return __spreadValues(__spreadValues({}, this.buttonProps), this.moveTopButtonProps);
      case "down":
        return __spreadValues(__spreadValues({}, this.buttonProps), this.moveDownButtonProps);
      case "bottom":
        return __spreadValues(__spreadValues({}, this.buttonProps), this.moveBottomButtonProps);
      default:
        return this.buttonProps;
    }
  }
  ngOnInit() {
    super.ngOnInit();
    if (this.responsive) {
      this.createStyle();
    }
    if (this.filterBy) {
      this.filterOptions = {
        filter: (value) => this.onFilterKeyup(value),
        reset: () => this.resetFilter()
      };
    }
  }
  ngAfterViewChecked() {
    if (this.movedUp || this.movedDown) {
      let listItems = find(this.listViewChild?.el.nativeElement, "li.p-listbox-option-selected");
      let listItem;
      if (listItems.length > 0) {
        if (this.movedUp) listItem = listItems[0];
        else listItem = listItems[listItems.length - 1];
        scrollInView(this.listViewChild?.el.nativeElement, listItem);
      }
      this.movedUp = false;
      this.movedDown = false;
    }
  }
  templates;
  _itemTemplate;
  _emptyMessageTemplate;
  _emptyFilterMessageTemplate;
  _filterTemplate;
  _headerTemplate;
  _moveUpIconTemplate;
  _moveTopIconTemplate;
  _moveDownIconTemplate;
  _moveBottomIconTemplate;
  _filterIconTemplate;
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "item":
          this._itemTemplate = item.template;
          break;
        case "empty":
          this._emptyMessageTemplate = item.template;
          break;
        case "emptyfilter":
          this._emptyFilterMessageTemplate = item.template;
          break;
        case "filter":
          this._filterTemplate = item.template;
          break;
        case "header":
          this._headerTemplate = item.template;
          break;
        case "moveupicon":
          this._moveUpIconTemplate = item.template;
          break;
        case "movetopicon":
          this._moveTopIconTemplate = item.template;
          break;
        case "movedownicon":
          this._moveDownIconTemplate = item.template;
          break;
        case "movebottomicon":
          this._moveBottomIconTemplate = item.template;
          break;
        case "filtericon":
          this._filterIconTemplate = item.template;
          break;
        default:
          this._itemTemplate = item.template;
          break;
      }
    });
  }
  onItemClick(event, item, index, selectedId) {
    this.itemTouched = false;
    let focusedIndex = index ? index : findIndexInList(this.focusedOption, this.value);
    let selectedIndex = findIndexInList(item, this.d_selection);
    let selected = selectedIndex !== -1;
    let metaSelection = this.itemTouched ? false : this.metaKeySelection;
    if (selectedId) {
      this.focusedOptionIndex = selectedId;
    }
    if (metaSelection) {
      let metaKey = event.metaKey || event.ctrlKey;
      if (selected && metaKey) {
        this.d_selection = this.d_selection.filter((val, focusedIndex2) => focusedIndex2 !== selectedIndex);
      } else {
        this.d_selection = metaKey ? this.d_selection ? [...this.d_selection] : [] : [];
        insertIntoOrderedArray(item, focusedIndex, this.d_selection, this.value);
      }
    } else {
      if (selected) {
        this.d_selection = this.d_selection.filter((val, focusedIndex2) => focusedIndex2 !== selectedIndex);
      } else {
        this.d_selection = this.d_selection ? [...this.d_selection] : [];
        insertIntoOrderedArray(item, focusedIndex, this.d_selection, this.value);
      }
    }
    this.selectionChange.emit(this.d_selection);
    this.onSelectionChange.emit({
      originalEvent: event,
      value: this.d_selection
    });
  }
  onFilterKeyup(event) {
    this.filterValue = event.target.value.trim().toLocaleLowerCase(this.filterLocale);
    this.filter();
    this.onFilterEvent.emit({
      originalEvent: event,
      value: this.visibleOptions
    });
  }
  filter() {
    let searchFields = this.filterBy.split(",");
    this.visibleOptions = this.filterService.filter(this.value, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
  }
  /**
   * Callback to invoke on filter reset.
   * @group Method
   */
  resetFilter() {
    this.filterValue = null;
    this.filterViewChild && (this.filterViewChild.nativeElement.value = "");
  }
  isItemVisible(item) {
    if (this.filterValue && this.filterValue.trim().length) {
      for (let i = 0; i < this.visibleOptions.length; i++) {
        if (item == this.visibleOptions[i]) {
          return true;
        }
      }
    } else {
      return true;
    }
  }
  onItemTouchEnd() {
    this.itemTouched = true;
  }
  isSelected(item) {
    return findIndexInList(item, this.d_selection) !== -1;
  }
  isEmpty() {
    return this.filterValue ? !this.visibleOptions || this.visibleOptions.length === 0 : !this.value || this.value.length === 0;
  }
  moveUp() {
    if (this.selection) {
      for (let i = 0; i < this.selection.length; i++) {
        let selectedItem = this.selection[i];
        let selectedItemIndex = findIndexInList(selectedItem, this.value);
        if (selectedItemIndex != 0 && this.value instanceof Array) {
          let movedItem = this.value[selectedItemIndex];
          let temp = this.value[selectedItemIndex - 1];
          this.value[selectedItemIndex - 1] = movedItem;
          this.value[selectedItemIndex] = temp;
        } else {
          break;
        }
      }
      if (this.dragdrop && this.filterValue) this.filter();
      this.movedUp = true;
      this.onReorder.emit(this.selection);
    }
    this.listViewChild?.cd?.markForCheck();
  }
  moveTop() {
    if (this.selection) {
      for (let i = this.selection.length - 1; i >= 0; i--) {
        let selectedItem = this.selection[i];
        let selectedItemIndex = findIndexInList(selectedItem, this.value);
        if (selectedItemIndex != 0 && this.value instanceof Array) {
          let movedItem = this.value.splice(selectedItemIndex, 1)[0];
          this.value.unshift(movedItem);
        } else {
          break;
        }
      }
      if (this.dragdrop && this.filterValue) this.filter();
      this.onReorder.emit(this.selection);
      setTimeout(() => {
        this.listViewChild.scrollInView(0);
      });
    }
    this.listViewChild?.cd?.markForCheck();
  }
  moveDown() {
    if (this.selection) {
      for (let i = this.selection.length - 1; i >= 0; i--) {
        let selectedItem = this.selection[i];
        let selectedItemIndex = findIndexInList(selectedItem, this.value);
        if (this.value instanceof Array && selectedItemIndex != this.value.length - 1) {
          let movedItem = this.value[selectedItemIndex];
          let temp = this.value[selectedItemIndex + 1];
          this.value[selectedItemIndex + 1] = movedItem;
          this.value[selectedItemIndex] = temp;
        } else {
          break;
        }
      }
      if (this.dragdrop && this.filterValue) this.filter();
      this.movedDown = true;
      this.onReorder.emit(this.selection);
    }
    this.listViewChild?.cd?.markForCheck();
  }
  moveBottom() {
    if (this.selection) {
      for (let i = 0; i < this.selection.length; i++) {
        let selectedItem = this.selection[i];
        let selectedItemIndex = findIndexInList(selectedItem, this.value);
        if (this.value instanceof Array && selectedItemIndex != this.value.length - 1) {
          let movedItem = this.value.splice(selectedItemIndex, 1)[0];
          this.value.push(movedItem);
        } else {
          break;
        }
      }
      if (this.dragdrop && this.filterValue) this.filter();
      this.onReorder.emit(this.selection);
      this.listViewChild.scrollInView(this.value?.length - 1);
    }
    this.listViewChild?.cd?.markForCheck();
  }
  onDrop(event) {
    let previousIndex = event.previousIndex;
    let currentIndex = event.currentIndex;
    if (previousIndex !== currentIndex) {
      if (this.visibleOptions) {
        if (this.filterValue) {
          previousIndex = findIndexInList(event.item.data, this.value);
          currentIndex = findIndexInList(this.visibleOptions[currentIndex], this.value);
        }
        moveItemInArray(this.visibleOptions, event.previousIndex, event.currentIndex);
      }
      moveItemInArray(this.value, previousIndex, currentIndex);
      this.changeFocusedOptionIndex(currentIndex);
      this.onReorder.emit([event.item.data]);
    }
  }
  onListFocus(event) {
    const focusableEl = findSingle(this.listViewChild.el.nativeElement, '[data-p-highlight="true"]') || findSingle(this.listViewChild.el.nativeElement, '[data-pc-section="item"]');
    if (focusableEl) {
      const findIndex = findIndexInList(focusableEl, this.listViewChild.el.nativeElement.children);
      this.focused = true;
      const index = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : focusableEl ? findIndex : -1;
      this.changeFocusedOptionIndex(index);
    }
    this.onFocus.emit(event);
  }
  onListBlur(event) {
    this.focused = false;
    this.focusedOption = null;
    this.focusedOptionIndex = -1;
    this.onBlur.emit(event);
  }
  onItemKeydown(event) {
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event);
        break;
      case "Home":
        this.onHomeKey(event);
        break;
      case "End":
        this.onEndKey(event);
        break;
      case "Enter":
        this.onEnterKey(event);
        break;
      case "Space":
        this.onSpaceKey(event);
        break;
      case "KeyA":
        if (event.ctrlKey) {
          this.d_selection = [...this.value];
          this.selectionChange.emit(this.d_selection);
        }
      default:
        break;
    }
  }
  onOptionMouseDown(index) {
    this.focused = true;
    this.focusedOptionIndex = index;
  }
  onArrowDownKey(event) {
    const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);
    this.changeFocusedOptionIndex(optionIndex);
    if (event.shiftKey) {
      this.onEnterKey(event);
    }
    event.preventDefault();
  }
  onArrowUpKey(event) {
    const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);
    this.changeFocusedOptionIndex(optionIndex);
    if (event.shiftKey) {
      this.onEnterKey(event);
    }
    event.preventDefault();
  }
  onHomeKey(event) {
    if (event.ctrlKey && event.shiftKey) {
      let visibleOptions = this.getVisibleOptions();
      let focusedIndex = findIndexInList(this.focusedOption, visibleOptions);
      this.d_selection = [...this.value].slice(0, focusedIndex + 1);
      this.selectionChange.emit(this.d_selection);
    } else {
      this.changeFocusedOptionIndex(0);
    }
    event.preventDefault();
  }
  onEndKey(event) {
    if (event.ctrlKey && event.shiftKey) {
      let visibleOptions = this.getVisibleOptions();
      let focusedIndex = findIndexInList(this.focusedOption, visibleOptions);
      this.d_selection = [...this.value].slice(focusedIndex, visibleOptions.length - 1);
      this.selectionChange.emit(this.d_selection);
    } else {
      this.changeFocusedOptionIndex(find(this.listViewChild.el.nativeElement, '[data-pc-section="item"]').length - 1);
    }
    event.preventDefault();
  }
  onEnterKey(event) {
    this.onItemClick(event, this.focusedOption);
    event.preventDefault();
  }
  onSpaceKey(event) {
    event.preventDefault();
    if (event.shiftKey && this.selection && this.selection.length > 0) {
      let visibleOptions = this.getVisibleOptions();
      let lastSelectedIndex = this.getLatestSelectedVisibleOptionIndex(visibleOptions);
      if (lastSelectedIndex !== -1) {
        let focusedIndex = findIndexInList(this.focusedOption, visibleOptions);
        this.d_selection = [...visibleOptions.slice(Math.min(lastSelectedIndex, focusedIndex), Math.max(lastSelectedIndex, focusedIndex) + 1)];
        this.selectionChange.emit(this.d_selection);
        this.onSelectionChange.emit({
          originalEvent: event,
          value: this.d_selection
        });
        return;
      }
    }
    this.onEnterKey(event);
  }
  findNextOptionIndex(index) {
    const items = find(this.listViewChild.el.nativeElement, '[data-pc-section="item"]');
    const matchedOptionIndex = [...items].findIndex((link) => link.id === index);
    return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
  }
  findPrevOptionIndex(index) {
    const items = find(this.listViewChild.el.nativeElement, '[data-pc-section="item"]');
    const matchedOptionIndex = [...items].findIndex((link) => link.id === index);
    return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
  }
  getLatestSelectedVisibleOptionIndex(visibleOptions) {
    const latestSelectedItem = [...this.d_selection].reverse().find((item) => visibleOptions.includes(item));
    return latestSelectedItem !== void 0 ? visibleOptions.indexOf(latestSelectedItem) : -1;
  }
  getVisibleOptions() {
    return this.visibleOptions && this.visibleOptions.length > 0 ? this.visibleOptions : this.value && this.value.length > 0 ? this.value : null;
  }
  getFocusedOption(index) {
    if (index === -1) return null;
    return this.visibleOptions && this.visibleOptions.length ? this.visibleOptions[index] : this.value && this.value.length ? this.value[index] : null;
  }
  changeFocusedOptionIndex(index) {
    const items = find(this.listViewChild.el.nativeElement, '[data-pc-section="item"]');
    let order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;
    this.focusedOptionIndex = items[order] ? items[order].getAttribute("id") : -1;
    this.focusedOption = this.getFocusedOption(order);
    this.scrollInView(this.focusedOptionIndex);
  }
  scrollInView(id) {
    const element = findSingle(this.listViewChild.el.nativeElement, `[data-pc-section="item"][id="${id}"]`);
    if (element) {
      element.scrollIntoView && element.scrollIntoView({
        block: "nearest",
        inline: "nearest"
      });
    }
  }
  findNextItem(item) {
    let nextItem = item.nextElementSibling;
    if (nextItem) return !hasClass(nextItem, "p-orderlist-item") || isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
    else return null;
  }
  findPrevItem(item) {
    let prevItem = item.previousElementSibling;
    if (prevItem) return !hasClass(prevItem, "p-orderlist-item") || isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
    else return null;
  }
  moveDisabled() {
    if (this.disabled || !this.selection.length) {
      return true;
    }
  }
  focusedOptionId() {
    return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
  }
  createStyle() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.styleElement) {
        this.renderer.setAttribute(this.el.nativeElement.children[0], this.id, "");
        this.styleElement = this.renderer.createElement("style");
        this.renderer.setAttribute(this.styleElement, "type", "text/css");
        this.renderer.appendChild(this.document.head, this.styleElement);
        let innerHTML = `
                    @media screen and (max-width: ${this.breakpoint}) {
                        .p-orderlist[${this.id}] {
                            flex-direction: column;
                        }

                        .p-orderlist[${this.id}] .p-orderlist-controls {
                            padding: var(--content-padding);
                            flex-direction: row;
                        }

                        .p-orderlist[${this.id}] .p-orderlist-controls .p-button {
                            margin-right: var(--inline-spacing);
                            margin-bottom: 0;
                        }

                        .p-orderlist[${this.id}] .p-orderlist-controls .p-button:last-child {
                            margin-right: 0;
                        }
                    }
                `;
        this.renderer.setProperty(this.styleElement, "innerHTML", innerHTML);
        setAttribute(this.styleElement, "nonce", this.config?.csp()?.nonce);
      }
    }
  }
  destroyStyle() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.styleElement) {
        this.renderer.removeChild(this.document, this.styleElement);
        this.styleElement = null;
        ``;
      }
    }
  }
  ngOnDestroy() {
    this.destroyStyle();
    super.ngOnDestroy();
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵOrderList_BaseFactory;
    return function OrderList_Factory(__ngFactoryType__) {
      return (ɵOrderList_BaseFactory || (ɵOrderList_BaseFactory = ɵɵgetInheritedFactory(_OrderList)))(__ngFactoryType__ || _OrderList);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _OrderList,
    selectors: [["p-orderList"], ["p-orderlist"], ["p-order-list"]],
    contentQueries: function OrderList_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4);
        ɵɵcontentQuery(dirIndex, _c1, 4);
        ɵɵcontentQuery(dirIndex, _c2, 4);
        ɵɵcontentQuery(dirIndex, _c3, 4);
        ɵɵcontentQuery(dirIndex, _c4, 4);
        ɵɵcontentQuery(dirIndex, _c5, 4);
        ɵɵcontentQuery(dirIndex, _c6, 4);
        ɵɵcontentQuery(dirIndex, _c7, 4);
        ɵɵcontentQuery(dirIndex, _c8, 4);
        ɵɵcontentQuery(dirIndex, _c9, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyMessageTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyFilterMessageTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.moveUpIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.moveTopIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.moveDownIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.moveBottomIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function OrderList_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c10, 5);
        ɵɵviewQuery(_c3, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterViewChild = _t.first);
      }
    },
    inputs: {
      header: "header",
      style: "style",
      styleClass: "styleClass",
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      ariaLabel: "ariaLabel",
      ariaLabelledBy: "ariaLabelledBy",
      listStyle: "listStyle",
      responsive: [2, "responsive", "responsive", booleanAttribute],
      filterBy: "filterBy",
      filterPlaceholder: "filterPlaceholder",
      filterLocale: "filterLocale",
      metaKeySelection: [2, "metaKeySelection", "metaKeySelection", booleanAttribute],
      dragdrop: [2, "dragdrop", "dragdrop", booleanAttribute],
      controlsPosition: "controlsPosition",
      ariaFilterLabel: "ariaFilterLabel",
      filterMatchMode: "filterMatchMode",
      breakpoint: "breakpoint",
      stripedRows: [2, "stripedRows", "stripedRows", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute],
      trackBy: "trackBy",
      scrollHeight: "scrollHeight",
      autoOptionFocus: [2, "autoOptionFocus", "autoOptionFocus", booleanAttribute],
      selection: "selection",
      value: "value",
      buttonProps: "buttonProps",
      moveUpButtonProps: "moveUpButtonProps",
      moveTopButtonProps: "moveTopButtonProps",
      moveDownButtonProps: "moveDownButtonProps",
      moveBottomButtonProps: "moveBottomButtonProps"
    },
    outputs: {
      selectionChange: "selectionChange",
      onReorder: "onReorder",
      onSelectionChange: "onSelectionChange",
      onFilterEvent: "onFilterEvent",
      onFocus: "onFocus",
      onBlur: "onBlur"
    },
    features: [ɵɵProvidersFeature([OrderListStyle]), ɵɵInputTransformsFeature, ɵɵInheritDefinitionFeature],
    decls: 19,
    vars: 53,
    consts: [["listelement", ""], ["header", ""], ["item", ""], [3, "ngClass", "ngStyle"], [1, "p-orderlist-controls"], ["type", "button", "pButton", "", "pRipple", "", 1, "p-button-icon-only", 3, "click", "disabled", "buttonProps"], [4, "ngIf"], [4, "ngTemplateOutlet"], [1, "p-orderlist-list-container"], ["optionLabel", "name", 3, "ngModelChange", "onFocus", "onBlur", "keydown", "multiple", "options", "ngModel", "id", "listStyle", "striped", "tabindex", "ariaLabel", "disabled", "metaKeySelection", "scrollHeight", "autoOptionFocus", "filter", "filterBy", "filterLocale", "filterPlaceHolder"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function OrderList_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "div", 3)(1, "div", 4)(2, "button", 5);
        ɵɵlistener("click", function OrderList_Template_button_click_2_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.moveUp());
        });
        ɵɵtemplate(3, OrderList_AngleUpIcon_3_Template, 1, 1, "AngleUpIcon", 6)(4, OrderList_4_Template, 1, 0, null, 7);
        ɵɵelementEnd();
        ɵɵelementStart(5, "button", 5);
        ɵɵlistener("click", function OrderList_Template_button_click_5_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.moveTop());
        });
        ɵɵtemplate(6, OrderList_AngleDoubleUpIcon_6_Template, 1, 1, "AngleDoubleUpIcon", 6)(7, OrderList_7_Template, 1, 0, null, 7);
        ɵɵelementEnd();
        ɵɵelementStart(8, "button", 5);
        ɵɵlistener("click", function OrderList_Template_button_click_8_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.moveDown());
        });
        ɵɵtemplate(9, OrderList_AngleDownIcon_9_Template, 1, 1, "AngleDownIcon", 6)(10, OrderList_10_Template, 1, 0, null, 7);
        ɵɵelementEnd();
        ɵɵelementStart(11, "button", 5);
        ɵɵlistener("click", function OrderList_Template_button_click_11_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.moveBottom());
        });
        ɵɵtemplate(12, OrderList_AngleDoubleDownIcon_12_Template, 1, 1, "AngleDoubleDownIcon", 6)(13, OrderList_13_Template, 1, 0, null, 7);
        ɵɵelementEnd()();
        ɵɵelementStart(14, "div", 8)(15, "p-listbox", 9, 0);
        ɵɵtwoWayListener("ngModelChange", function OrderList_Template_p_listbox_ngModelChange_15_listener($event) {
          ɵɵrestoreView(_r1);
          ɵɵtwoWayBindingSet(ctx.d_selection, $event) || (ctx.d_selection = $event);
          return ɵɵresetView($event);
        });
        ɵɵlistener("onFocus", function OrderList_Template_p_listbox_onFocus_15_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onListFocus($event));
        })("onBlur", function OrderList_Template_p_listbox_onBlur_15_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onListBlur($event));
        })("keydown", function OrderList_Template_p_listbox_keydown_15_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onItemKeydown($event));
        });
        ɵɵtemplate(17, OrderList_ng_container_17_Template, 3, 0, "ng-container", 6)(18, OrderList_ng_container_18_Template, 3, 0, "ng-container", 6);
        ɵɵelementEnd()()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngClass", ɵɵpureFunction3(49, _c11, ctx.stripedRows, ctx.controlsPosition === "left", ctx.controlsPosition === "right"))("ngStyle", ctx.style);
        ɵɵattribute("data-pc-section", "root");
        ɵɵadvance();
        ɵɵattribute("data-pc-section", "controls");
        ɵɵadvance();
        ɵɵproperty("disabled", ctx.moveDisabled())("buttonProps", ctx.getButtonProps("up"));
        ɵɵattribute("aria-label", ctx.moveUpAriaLabel)("data-pc-section", "moveUpButton");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.moveUpIconTemplate && !ctx._moveUpIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.moveUpIconTemplate || ctx._moveUpIconTemplate);
        ɵɵadvance();
        ɵɵproperty("disabled", ctx.moveDisabled())("buttonProps", ctx.getButtonProps("top"));
        ɵɵattribute("aria-label", ctx.moveTopAriaLabel)("data-pc-section", "moveTopButton");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.moveTopIconTemplate && !ctx._moveTopIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.moveTopIconTemplate || ctx._moveTopIconTemplate);
        ɵɵadvance();
        ɵɵproperty("disabled", ctx.moveDisabled())("buttonProps", ctx.getButtonProps("down"));
        ɵɵattribute("aria-label", ctx.moveDownAriaLabel)("data-pc-section", "moveDownButton");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.moveDownIconTemplate && !ctx._moveDownIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.moveDownIconTemplate || ctx._moveDownIconTemplate);
        ɵɵadvance();
        ɵɵproperty("disabled", ctx.moveDisabled())("buttonProps", ctx.getButtonProps("bottom"));
        ɵɵattribute("aria-label", ctx.moveBottomAriaLabel)("data-pc-section", "moveBottomButton");
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.moveBottomIconTemplate && !ctx._moveBottomIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.moveBottomIconTemplate || ctx._moveBottomIconTemplate);
        ɵɵadvance();
        ɵɵattribute("data-pc-section", "container");
        ɵɵadvance();
        ɵɵproperty("multiple", true)("options", ctx.value);
        ɵɵtwoWayProperty("ngModel", ctx.d_selection);
        ɵɵproperty("id", ctx.id + "_list")("listStyle", ctx.listStyle)("striped", ctx.stripedRows)("tabindex", ctx.tabindex)("ariaLabel", ctx.ariaLabel)("disabled", ctx.disabled)("metaKeySelection", ctx.metaKeySelection)("scrollHeight", ctx.scrollHeight)("autoOptionFocus", ctx.autoOptionFocus)("filter", ctx.filterBy)("filterBy", ctx.filterBy)("filterLocale", ctx.filterLocale)("filterPlaceHolder", ctx.filterPlaceholder);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.headerTemplate || ctx._headerTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.itemTemplate || ctx._itemTemplate);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, NgStyle, ButtonDirective, Ripple, DragDropModule, AngleDoubleDownIcon, AngleDoubleUpIcon, AngleUpIcon, AngleDownIcon, Listbox, FormsModule, NgControlStatus, NgModel, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderList, [{
    type: Component,
    args: [{
      selector: "p-orderList, p-orderlist, p-order-list",
      standalone: true,
      imports: [CommonModule, ButtonDirective, Ripple, DragDropModule, AngleDoubleDownIcon, AngleDoubleUpIcon, AngleUpIcon, AngleDownIcon, Listbox, FormsModule, SharedModule],
      template: `
        <div
            [ngClass]="{
                'p-orderlist p-component': true,
                'p-orderlist-striped': stripedRows,
                'p-orderlist-controls-left': controlsPosition === 'left',
                'p-orderlist-controls-right': controlsPosition === 'right'
            }"
            [ngStyle]="style"
            [class]="styleClass"
            [attr.data-pc-section]="'root'"
        >
            <div class="p-orderlist-controls" [attr.data-pc-section]="'controls'">
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveUp()" [attr.aria-label]="moveUpAriaLabel" [attr.data-pc-section]="'moveUpButton'" [buttonProps]="getButtonProps('up')">
                    <AngleUpIcon *ngIf="!moveUpIconTemplate && !_moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate || _moveUpIconTemplate"></ng-template>
                </button>
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveTop()" [attr.aria-label]="moveTopAriaLabel" [attr.data-pc-section]="'moveTopButton'" [buttonProps]="getButtonProps('top')">
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate && !_moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate || _moveTopIconTemplate"></ng-template>
                </button>
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveDown()" [attr.aria-label]="moveDownAriaLabel" [attr.data-pc-section]="'moveDownButton'" [buttonProps]="getButtonProps('down')">
                    <AngleDownIcon *ngIf="!moveDownIconTemplate && !_moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate || _moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [disabled]="moveDisabled()"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    (click)="moveBottom()"
                    [attr.aria-label]="moveBottomAriaLabel"
                    [attr.data-pc-section]="'moveBottomButton'"
                    [buttonProps]="getButtonProps('bottom')"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate && !_moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate || _moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-orderlist-list-container" [attr.data-pc-section]="'container'">
                <p-listbox
                    #listelement
                    [multiple]="true"
                    [options]="value"
                    [(ngModel)]="d_selection"
                    optionLabel="name"
                    [id]="id + '_list'"
                    [listStyle]="listStyle"
                    [striped]="stripedRows"
                    [tabindex]="tabindex"
                    (onFocus)="onListFocus($event)"
                    (onBlur)="onListBlur($event)"
                    (keydown)="onItemKeydown($event)"
                    [ariaLabel]="ariaLabel"
                    [disabled]="disabled"
                    [metaKeySelection]="metaKeySelection"
                    [scrollHeight]="scrollHeight"
                    [autoOptionFocus]="autoOptionFocus"
                    [filter]="filterBy"
                    [filterBy]="filterBy"
                    [filterLocale]="filterLocale"
                    [filterPlaceHolder]="filterPlaceholder"
                >
                    <ng-container *ngIf="headerTemplate || _headerTemplate">
                        <ng-template #header>
                            <ng-template *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-template>
                        </ng-template>
                    </ng-container>
                    <ng-container *ngIf="itemTemplate || _itemTemplate">
                        <ng-template #item let-option let-selected="selected" let-index="index">
                            <ng-template *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: option, selected: selected, index: index }"></ng-template>
                        </ng-template>
                    </ng-container>
                </p-listbox>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [OrderListStyle]
    }]
  }], null, {
    header: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    ariaLabel: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    listStyle: [{
      type: Input
    }],
    responsive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filterBy: [{
      type: Input
    }],
    filterPlaceholder: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    metaKeySelection: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dragdrop: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    controlsPosition: [{
      type: Input
    }],
    ariaFilterLabel: [{
      type: Input
    }],
    filterMatchMode: [{
      type: Input
    }],
    breakpoint: [{
      type: Input
    }],
    stripedRows: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    trackBy: [{
      type: Input
    }],
    scrollHeight: [{
      type: Input
    }],
    autoOptionFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selection: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    buttonProps: [{
      type: Input
    }],
    moveUpButtonProps: [{
      type: Input
    }],
    moveTopButtonProps: [{
      type: Input
    }],
    moveDownButtonProps: [{
      type: Input
    }],
    moveBottomButtonProps: [{
      type: Input
    }],
    selectionChange: [{
      type: Output
    }],
    onReorder: [{
      type: Output
    }],
    onSelectionChange: [{
      type: Output
    }],
    onFilterEvent: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    listViewChild: [{
      type: ViewChild,
      args: ["listelement"]
    }],
    filterViewChild: [{
      type: ViewChild,
      args: ["filter"]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["item", {
        descendants: false
      }]
    }],
    emptyMessageTemplate: [{
      type: ContentChild,
      args: ["empty", {
        descendants: false
      }]
    }],
    emptyFilterMessageTemplate: [{
      type: ContentChild,
      args: ["emptyfilter", {
        descendants: false
      }]
    }],
    filterTemplate: [{
      type: ContentChild,
      args: ["filter", {
        descendants: false
      }]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    moveUpIconTemplate: [{
      type: ContentChild,
      args: ["moveupicon", {
        descendants: false
      }]
    }],
    moveTopIconTemplate: [{
      type: ContentChild,
      args: ["movetopicon", {
        descendants: false
      }]
    }],
    moveDownIconTemplate: [{
      type: ContentChild,
      args: ["movedownicon", {
        descendants: false
      }]
    }],
    moveBottomIconTemplate: [{
      type: ContentChild,
      args: ["movebottomicon", {
        descendants: false
      }]
    }],
    filterIconTemplate: [{
      type: ContentChild,
      args: ["filtericon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassDebugInfo(OrderList, {
    className: "OrderList",
    filePath: "orderlist.ts",
    lineNumber: 124
  });
})();
var OrderListModule = class _OrderListModule {
  static ɵfac = function OrderListModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderListModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _OrderListModule
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [OrderList, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderListModule, [{
    type: NgModule,
    args: [{
      imports: [OrderList, SharedModule],
      exports: [OrderList, SharedModule]
    }]
  }], null, null);
})();
(function() {
  (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(OrderListModule, {
    imports: [OrderList, SharedModule],
    exports: [OrderList, SharedModule]
  });
})();
export {
  OrderList,
  OrderListClasses,
  OrderListModule,
  OrderListStyle
};
//# sourceMappingURL=primeng_orderlist.js.map
