'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend-bytte-operaciones documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AccesosComponent.html" data-type="entity-link" >AccesosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Access.html" data-type="entity-link" >Access</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppConfigurator.html" data-type="entity-link" >AppConfigurator</a>
                            </li>
                            <li class="link">
                                <a href="components/AppFloatingConfigurator.html" data-type="entity-link" >AppFloatingConfigurator</a>
                            </li>
                            <li class="link">
                                <a href="components/AppFooter.html" data-type="entity-link" >AppFooter</a>
                            </li>
                            <li class="link">
                                <a href="components/AppLayout.html" data-type="entity-link" >AppLayout</a>
                            </li>
                            <li class="link">
                                <a href="components/AppMenu.html" data-type="entity-link" >AppMenu</a>
                            </li>
                            <li class="link">
                                <a href="components/AppMenuitem.html" data-type="entity-link" >AppMenuitem</a>
                            </li>
                            <li class="link">
                                <a href="components/AppSidebar.html" data-type="entity-link" >AppSidebar</a>
                            </li>
                            <li class="link">
                                <a href="components/AppTopbar.html" data-type="entity-link" >AppTopbar</a>
                            </li>
                            <li class="link">
                                <a href="components/BestSellingWidget.html" data-type="entity-link" >BestSellingWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonDemo.html" data-type="entity-link" >ButtonDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/ChartDemo.html" data-type="entity-link" >ChartDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/Cortes.html" data-type="entity-link" >Cortes</a>
                            </li>
                            <li class="link">
                                <a href="components/Crud.html" data-type="entity-link" >Crud</a>
                            </li>
                            <li class="link">
                                <a href="components/Dashboard.html" data-type="entity-link" >Dashboard</a>
                            </li>
                            <li class="link">
                                <a href="components/Documentation.html" data-type="entity-link" >Documentation</a>
                            </li>
                            <li class="link">
                                <a href="components/Empty.html" data-type="entity-link" >Empty</a>
                            </li>
                            <li class="link">
                                <a href="components/Error.html" data-type="entity-link" >Error</a>
                            </li>
                            <li class="link">
                                <a href="components/Facturacion.html" data-type="entity-link" >Facturacion</a>
                            </li>
                            <li class="link">
                                <a href="components/FeaturesWidget.html" data-type="entity-link" >FeaturesWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/FileDemo.html" data-type="entity-link" >FileDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterWidget.html" data-type="entity-link" >FooterWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/FormLayoutDemo.html" data-type="entity-link" >FormLayoutDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/HeroWidget.html" data-type="entity-link" >HeroWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/HighlightsWidget.html" data-type="entity-link" >HighlightsWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/InputDemo.html" data-type="entity-link" >InputDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/Landing.html" data-type="entity-link" >Landing</a>
                            </li>
                            <li class="link">
                                <a href="components/ListDemo.html" data-type="entity-link" >ListDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogsComponent.html" data-type="entity-link" >LogsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MediaDemo.html" data-type="entity-link" >MediaDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuDemo.html" data-type="entity-link" >MenuDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/MessagesDemo.html" data-type="entity-link" >MessagesDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/MiscDemo.html" data-type="entity-link" >MiscDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/Notfound.html" data-type="entity-link" >Notfound</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationsWidget.html" data-type="entity-link" >NotificationsWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/OverlayDemo.html" data-type="entity-link" >OverlayDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/PanelsDemo.html" data-type="entity-link" >PanelsDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/PricingWidget.html" data-type="entity-link" >PricingWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/RecentSalesWidget.html" data-type="entity-link" >RecentSalesWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterComponent.html" data-type="entity-link" >RegisterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ReporteInformacionComponent.html" data-type="entity-link" >ReporteInformacionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RevenueStreamWidget.html" data-type="entity-link" >RevenueStreamWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/StatsWidget.html" data-type="entity-link" >StatsWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/TableDemo.html" data-type="entity-link" >TableDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/TimelineDemo.html" data-type="entity-link" >TimelineDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/TopbarWidget.html" data-type="entity-link" >TopbarWidget</a>
                            </li>
                            <li class="link">
                                <a href="components/TreeDemo.html" data-type="entity-link" >TreeDemo</a>
                            </li>
                            <li class="link">
                                <a href="components/UserFormComponent.html" data-type="entity-link" >UserFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserListComponent.html" data-type="entity-link" >UserListComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccesosService.html" data-type="entity-link" >AccesosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountryService.html" data-type="entity-link" >CountryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link" >CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconService.html" data-type="entity-link" >IconService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InviteService.html" data-type="entity-link" >InviteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService.html" data-type="entity-link" >LayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NodeService.html" data-type="entity-link" >NodeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PhotoService.html" data-type="entity-link" >PhotoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/authGuard.html" data-type="entity-link" >authGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Accesos.html" data-type="entity-link" >Accesos</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Column.html" data-type="entity-link" >Column</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Country.html" data-type="entity-link" >Country</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Customer.html" data-type="entity-link" >Customer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/expandedRows.html" data-type="entity-link" >expandedRows</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportColumn.html" data-type="entity-link" >ExportColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InventoryStatus.html" data-type="entity-link" >InventoryStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/layoutConfig.html" data-type="entity-link" >layoutConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayoutState.html" data-type="entity-link" >LayoutState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuChangeEvent.html" data-type="entity-link" >MenuChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Representative.html" data-type="entity-link" >Representative</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfo.html" data-type="entity-link" >UserInfo</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});