import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Injector,
  Input,
  Renderer2,
} from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { DOCUMENT } from '@angular/common';
import { unescape } from 'querystring';

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input() tooltipText = '';
  componentFactoryResolver = inject(ComponentFactoryResolver);
  injector = inject(Injector);
  elementRef = inject(ElementRef);
  document = inject(DOCUMENT);
  appRef = inject(ApplicationRef);
  private tooltipComponent?: ComponentRef<any>;
  @HostListener('mouseenter')
  onMouseEnter(): void {
    console.log('onmouseEnter');
    if (this.tooltipComponent) {
      return;
    }
    const tooltipComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.tooltipComponent = tooltipComponentFactory.create(this.injector);
    this.document.body.appendChild(
      this.tooltipComponent.location.nativeElement
    );
    this.setTooltipComponentProperties();
    this.tooltipComponent.hostView.detectChanges();
  }
  @HostListener('mouseleave')
  onmouseleave(): void {
    console.log('onmouseleave');
    if (!this.tooltipComponent) {
      return;
    }
    this.appRef.detachView(this.tooltipComponent?.hostView);
    this.tooltipComponent.destroy();
    this.tooltipComponent = undefined;
  }

  private setTooltipComponentProperties() {
    if (!this.tooltipComponent) {
      return;
    }
    this.tooltipComponent.instance.text = this.tooltipText;
    const { left, right, bottom } =
      this.elementRef.nativeElement.getBoundingClientRect();
    this.tooltipComponent.instance.left = (right - left) / 2 + left;
    this.tooltipComponent.instance.top = bottom;
  }
}
