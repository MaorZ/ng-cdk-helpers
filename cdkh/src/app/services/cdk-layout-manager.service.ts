import {
  Injectable,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayConfig,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class CdkLayoutManagerService {
  private overlayRefs: { [id: string]: OverlayRef } = {};

  constructor(private overlay: Overlay) {}

  public createOverlayRef(overlayConfig: OverlayConfig) {
    return this.overlay.create(overlayConfig);
  }

  public attachTemplate(
    layoutRef: OverlayRef,
    template: TemplateRef<any>,
    containerRef: ViewContainerRef
  ) {
    layoutRef.attach(new TemplatePortal(template, containerRef));
  }

  public createPopover(
    connectedElement: ElementRef,
    positions: ConnectedPosition[],
    panelClass: string | string[],
    backdropClass: string | string[],
    extraConfig: OverlayConfig
  ) {
    if (!positions || positions.length < 1) {
      positions = [];
      positions.push({
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'top',
      });
    }
    const posStrategy = this.overlay
      .position()
      .flexibleConnectedTo(connectedElement)
      .withPositions(positions);

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass,
      panelClass,
      disposeOnNavigation: true,
      positionStrategy: posStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      ...extraConfig,
    });
    return this.createOverlayRef(overlayConfig);
  }
}
