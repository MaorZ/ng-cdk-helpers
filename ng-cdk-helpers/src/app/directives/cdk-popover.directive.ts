import {
  Directive,
  ElementRef,
  Input,
  ViewContainerRef,
  HostListener,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import {
  OverlayRef,
  ConnectedPosition,
  OverlayConfig,
} from '@angular/cdk/overlay';
import { CdkLayoutManagerService } from '../services/cdk-layout-manager.service';

@Directive({
  selector: '[cdkhPopover]',
  exportAs: 'popoverRef',
})
export class CdkPopoverDirective implements OnDestroy {
  private _popoverRef: OverlayRef;

  @Input() cdkhPopover: TemplateRef<any>;
  @Input() cdkhPopoverPosisitions: ConnectedPosition[];
  @Input() cdkhOverlayConfig: OverlayConfig;
  @Input() cdkhPopoverClass: string | string[];
  @Input() cdkhPopoverOpenOnClick = true;

  constructor(
    private overlayService: CdkLayoutManagerService,
    private elementRef: ElementRef,
    private containerRef: ViewContainerRef
  ) {}

  public open() {
    this._popoverRef = this.overlayService.createPopover(
      this.elementRef,
      this.cdkhPopoverPosisitions,
      this.cdkhPopoverClass || '',
      this.cdkhOverlayConfig
    );

    this.overlayService.attachTemplate(
      this._popoverRef,
      this.cdkhPopover,
      this.containerRef
    );
  }

  public close() {
    if (this._popoverRef) {
      this._popoverRef.detach();
      this._popoverRef.dispose();
    }
  }

  @HostListener('click')
  click() {
    if (this.cdkhPopoverOpenOnClick) {
      this.open();
    }
  }

  ngOnDestroy() {
    this.close();
  }
}
