import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'app-cortes',
  standalone: true,
  imports: [FluidModule, ButtonModule],
  template: `
    <p-fluid>
      <div>
        <h1>Generación de cortes</h1>
      </div>
      <div class="card flex">
        <!-- Iframe ocupa la mayor parte del espacio -->
        <iframe
          title="Cortes_Comparativas v5.0"
          width="1140"
          height="800.25"
          src="https://app.powerbi.com/reportEmbed?reportId=348b1de7-d2a8-41bc-8200-849d2d522746&autoAuth=true&ctid=83eb77c9-5785-466f-8b7d-3a8165e1ef5a"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>

        <!-- Contenedor para los botones -->
        <div class="flex flex-col items-start gap-4 ml-4">
          <div class="font-semibold text-xl">Portales</div>
          <p-button (click)="openPortals()">Abrir Portales</p-button>
          <div class="font-semibold text-xl">Reportes</div>
          <p-button (click)="openReports()" severity="info"
            >Reportes Hoy</p-button
          >
          <p-button (click)="openReportOficina()" severity="warn"
            >Reporte Oficina Hoy</p-button
          >
          <p-button (click)="openReportsYestarday()" severity="info"
            >Reportes Ayer</p-button
          >
          <p-button (click)="openReportOficinaYesterday()" severity="warn"
            >Reporte Oficina Ayer</p-button
          >
        </div>
      </div>
    </p-fluid>
  `,
})
export class Cortes {
  openPortals(): void {
    const links = [
      'https://itau.bytte.com.co/casb/web/(S(cehgeaouu2p45ic4h1tjj0s4))/Reportes/ReporteConsultaLogANI',
      'https://casb.bytte.com.co/Dev/CASB.WebSiteBytte/(S(wopmmeahvfqnm35nbkflppc5))/default',
      'https://casbp.tuid.uy/CASB/CASB.WebSite/',
      //'https://portal.miid.bio/',
      // 'https://portal.bytte.com.co:9743/Monitoreo/ByKeeper/ByKeeperWeb/#/home/dashboardBytte',
      'https://finkeeperform.fingo.co/',
      'https://app.powerbi.com/groups/29bef4d2-7066-4416-ad4c-f1b70d7e4d38/list?experience=power-bi&subfolderId=8745',
      'https://bytte.sharepoint.com/sites/AnalistasOperacionesII/Documentos%20compartidos/Forms/AllItems.aspx?id=%2Fsites%2FAnalistasOperacionesII%2FDocumentos%20compartidos%2FGeneral%2FCortes&viewid=4ad22e39%2D7cfc%2D4b43%2Dbb34%2Dd27ded1b53f6',
    ];

    links.forEach((link) => {
      window.open(link, '_blank');
    });
  }

  openReports(): void {
    const eightDaysAgo = new Date();
    eightDaysAgo.setDate(eightDaysAgo.getDate() - 8); // 8 días atrás
    const eightDaysAgoDMY = this.getFormattedDate(eightDaysAgo, 'dd/mm/yyyy');
    const todayDMY = this.getFormattedDate(new Date(), 'dd/mm/yyyy');
    const tomorrowDMY = this.getFormattedDate(
      this.addDays(new Date(), 1),
      'dd/mm/yyyy',
    );
    const todayISO = this.getFormattedDate(new Date(), 'yyyy-mm-dd');

    const eightDaysAgoISO = new Date();
    eightDaysAgoISO.setDate(eightDaysAgoISO.getDate() - 8);

    const dateEightDaysAgoISO = this.getFormattedDate(
      eightDaysAgoISO,
      'yyyy-mm-dd',
    );
    const tomorrowISO = this.getFormattedDate(
      this.addDays(new Date(), 1),
      'yyyy-mm-dd',
    );

    const links = [
      `https://portal.bytte.com.co/CASB/ByKeeper/ByKeeperAPI/(S(jcx0dvzc2eauuu0sksgi0ezq))/PReportes.aspx?IdOpcion=RptDetalleTransacciones&FechaInicio=${eightDaysAgoDMY}%200:0&FechaFinal=${todayDMY}%2023:55&NoIdentificacion=&TipoCliente=`,
      `https://web.miid.bio/MiiD/MIIDReports/?IdOpcion=ReporteTransacciones&FechaInicio=${dateEightDaysAgoISO}&FechaFinal=${tomorrowISO}&TipoDocumento=&NumeroDocumento=&IdEc=-1&NivelPermiso=1&Id_EcParent=-1&Id_Ecb=-1`,
      `https://casbp.tuid.uy/CASB/Casb.WebSite/Reportes/PReportes?IdOpcion=ReportePADetalleAutenticaciones&FechaInicio=${eightDaysAgoDMY}&FechaFinal=${tomorrowDMY}&IdProceso=&NoIdentificacion=`,
      `https://casb.bytte.com.co/Dev/CASB.WebSiteBytte/Reportes/PReportes?IdOpcion=ReporteListadoAutenticaciones&FechaInicio=${todayDMY}&FechaFinal=${tomorrowDMY}&IdMotivoRechazo=&TipoIdentificacion=&NoIdentificacion=&VersionCedula=&IdOficina=`,
    ];

    links.forEach((link) => {
      window.open(link, '_blank');
    });
  }
  openReportsYestarday(): void {
    const todayDMY = this.getFormattedDate(new Date(), 'dd/mm/yyyy');
    const tomorrowDMY = this.getFormattedDate(
      this.addDays(new Date(), 1),
      'dd/mm/yyyy',
    );
    const todayISO = this.getFormattedDate(new Date(), 'yyyy-mm-dd');
    const tomorrowISO = this.getFormattedDate(
      this.addDays(new Date(), 1),
      'yyyy-mm-dd',
    );
    const yesterdayDMY = this.getFormattedDate(
      this.addDays(new Date(), -1),
      'dd/mm/yyyy',
    );
    const yesterdayISO = this.getFormattedDate(
      this.addDays(new Date(), -1),
      'yyyy-mm-dd',
    );

    const links = [
      `https://portal.bytte.com.co/CASB/ByKeeper/ByKeeperAPI/(S(jcx0dvzc2eauuu0sksgi0ezq))/PReportes.aspx?IdOpcion=RptDetalleTransacciones&FechaInicio=${yesterdayDMY}%200:0&FechaFinal=${todayDMY}%2023:55&NoIdentificacion=&TipoCliente=`,
      `https://web.miid.bio/MiiD/MIIDReports/?IdOpcion=ReporteTransacciones&FechaInicio=${yesterdayISO}&FechaFinal=${todayISO}&TipoDocumento=&NumeroDocumento=&IdEc=-1&NivelPermiso=1&Id_EcParent=-1&Id_Ecb=-1`,
      `https://casbp.tuid.uy/CASB/Casb.WebSite/Reportes/PReportes?IdOpcion=ReportePADetalleAutenticaciones&FechaInicio=${yesterdayDMY}&FechaFinal=${todayDMY}&IdProceso=&NoIdentificacion=`,
      `https://casb.bytte.com.co/Dev/CASB.WebSiteBytte/Reportes/PReportes?IdOpcion=ReporteCuentaDigital&FechaInicio=${yesterdayDMY}&FechaFinal=${yesterdayDMY}&VersionCedula=${todayDMY}&IdOficina=`,
      `https://itau.bytte.com.co/CASB/Web/(S(zl2c1le00g4cvsoll0nty4ga))/Reportes/PReportes?IdOpcion=ReportePADetalleTransacciones2&FechaInicio=${yesterdayDMY}&FechaFinal=${todayDMY}`,
    ];

    links.forEach((link) => {
      window.open(link, '_blank');
    });
  }
  openReportOficina(): void {
    const todayDMY = this.getFormattedDate(new Date(), 'dd/mm/yyyy');
    const tomorrowDMY = this.getFormattedDate(
      this.addDays(new Date(), 1),
      'dd/mm/yyyy',
    );
    const todayISO = this.getFormattedDate(new Date(), 'yyyy-mm-dd');
    const tomorrowISO = this.getFormattedDate(
      this.addDays(new Date(), 1),
      'yyyy-mm-dd',
    );

    const links = [
      `https://casb.bytte.com.co/Dev/CASB.WebSiteBytte/Reportes/PReportes?IdOpcion=ReporteListadoAutenticaciones&FechaInicio=${todayDMY}&FechaFinal=${tomorrowDMY}&IdMotivoRechazo=&TipoIdentificacion=&NoIdentificacion=&VersionCedula=&IdOficina=`,
    ];

    links.forEach((link) => {
      window.open(link, '_blank');
    });
  }
  openReportOficinaYesterday(): void {
    const todayDMY = this.getFormattedDate(new Date(), 'dd/mm/yyyy');
    const tomorrowDMY = this.getFormattedDate(
      this.addDays(new Date(), 1),
      'dd/mm/yyyy',
    );
    const todayISO = this.getFormattedDate(new Date(), 'yyyy-mm-dd');
    const tomorrowISO = this.getFormattedDate(
      this.addDays(new Date(), 1),
      'yyyy-mm-dd',
    );
    const yesterdayDMY = this.getFormattedDate(
      this.addDays(new Date(), -1),
      'dd/mm/yyyy',
    );
    const yesterdayISO = this.getFormattedDate(
      this.addDays(new Date(), -1),
      'yyyy-mm-dd',
    );

    const links = [
      `https://casb.bytte.com.co/Dev/CASB.WebSiteBytte/Reportes/PReportes?IdOpcion=ReporteListadoAutenticaciones&FechaInicio=${yesterdayDMY}&FechaFinal=${todayDMY}&IdMotivoRechazo=&TipoIdentificacion=&NoIdentificacion=&VersionCedula=&IdOficina=`,
    ];

    links.forEach((link) => {
      window.open(link, '_blank');
    });
  }

  private getFormattedDate(
    date: Date,
    format: 'dd/mm/yyyy' | 'yyyy-mm-dd',
  ): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    if (format === 'yyyy-mm-dd') {
      return `${year}-${month}-${day}`;
    }
    return `${day}/${month}/${year}`;
  }

  private addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
}
