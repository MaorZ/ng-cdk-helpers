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
  @Input() cdkhPopoverBackdropClass: string | string[];

  constructor(
    private overlayService: CdkLayoutManagerService,
    private elementRef: ElementRef,
    private containerRef: ViewContainerRef
  ) {
    console.log('a');
  }

  get overlayRef() {
    return this._popoverRef;
  }

  public init() {
    this._popoverRef = this.overlayService.createPopover(
      this.elementRef,
      this.cdkhPopoverPosisitions,
      this.cdkhPopoverClass || '',
      this.cdkhPopoverBackdropClass || 'popup-backdrop',
      this.cdkhOverlayConfig
    );
  }

  public open() {
    if (!this._popoverRef) {
      this.init();
    }

    this.overlayService.attachTemplate(
      this._popoverRef,
      this.cdkhPopover,
      this.containerRef
    );

    this._popoverRef.backdropClick().subscribe(() => {
      this._popoverRef.detach();
    });
  }

  public close() {
    if (this._popoverRef.hasAttached()) {
      this._popoverRef.detach();
    }
  }

  @HostListener('click')
  click() {
    if (this.cdkhPopoverOpenOnClick) {
      if (!this._popoverRef || !this._popoverRef.hasAttached()) {
        this.open();
      }
    }
  }

  ngOnDestroy() {
    if (this._popoverRef) {
      this._popoverRef.dispose();
    }
  }
}
